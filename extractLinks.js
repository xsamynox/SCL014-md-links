const fs = require('fs');
const md = require('markdown-it')();
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

module.exports = (path, options) => {
  // Verificar que la ruta dada es un archivo o directorio
  // Dependiendo de eso se ejecuta lo requerido.
  fs.stat(path, (err, stats) => {
    if (!err) {
      if (stats.isFile()) {
        readFile(path);
      }
      if (stats.isDirectory()) {
        const files = readDirectory(path)
        readFile(files)
      }
    } else {
      throw err;
    }
  });
};

// Función que lee archivo .md y retorna los links
const readFile = (filePath) => {
  // Caso para file
  if (typeof filePath === 'string') {
    fs.readFile(filePath, (error, content) => {
      if (error) {
        console.log(error + ' Por favor ingresa una ruta correcta');
      } else {
        extractLinks(filePath, content);
      }
    })
    // Caso para directorio
  } else {
    filePath.forEach(file => {
      fs.readFile(file, (error, content) => {
        if (error) {
          throw error;
        } else {
          extractLinks(file, content);
        }
      })
    })
  }
}

// Leer el directorio.
// const readDirectory = (folderPath) => {
//   const myfiles = [];
//   fs.readdir(folderPath, 'utf-8', (error, files) => {
//     if (error) {
//       throw error;
//     } else {
//       files.forEach(file => {
//         if (file.includes('.md')) {
//           myfiles.push(file);
//         } else {
//           return;
//         }
//       });
//     }
//     return myfiles;
//   }); // acomodar sin sync
// };

const readDirectory = (folderPath) => {
  const myfiles = [];
  const arrayOfFiles = fs.readdirSync(folderPath); // acomodar sin sync
  arrayOfFiles.forEach(function (file) {
    if (file.includes('.md')) {
      myfiles.push(file);
    } else {
      return;
    }
  });
  return myfiles
}

// const readDirectory = (folderPath) => {
//   const myfiles = [];
//   fs.readdir(folderPath, (error, files) => {
//     files.forEach(file => {
//       console.log('file ', file);
//     })
//   })
// }


const extractLinks = (filePath, content) => {
  // Pasar mi archivo .md a html
  let fileMd = md.render(content.toString());
  // Crea un dom con el archivo html
  const dom = new JSDOM(fileMd);
  const links = dom.window.document.querySelectorAll("a");
  // Creo un array desde el nodeList
  var linksArray = Array.from(links);
  let linksInArray = [];
  let detailsLinks = {};
  linksArray.forEach((link) => {
    detailsLinks = {
      href: link.href,
      text: link.text,
      file: filePath,
    }
    const aboutBlank = 'about:blank';
    const regularExpression = new RegExp(aboutBlank, 'gi');
    if (!regularExpression.exec(link.href)) {
      linksInArray.push(detailsLinks);
    }
  })
  linksInArray = Array.from(new Set(linksInArray));
  console.log(linksInArray)
  return linksInArray;
}


// cambiar a fetch
// http.get(url, (respuesta) => {
//   respuesta.on("data", (param) => {
//     console.log(param.toString());
//   });
// });