const fs = require('fs');
const md = require('markdown-it')();
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

module.exports = (path, options) => {
  fs.readFile(path, "utf-8", (error, content) => {
    if (error) {
      console.log(error + 'Por favor ingresa una ruta correcta');
    } else {
      // Pasar mi archivo .md a html
      let fileMd = md.render(content);
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
          file: path,
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
  })
};

// Leer el directorio.

// const readDirectory = () => {
//   fs.readdir(directory, (error, records) => {
//     if (error) {
//       console.log(error + 'Algo salio mal');
//     }
//     else {
//       records.forEach(record => {
//         console.log(record)
//         return record;
//       })
//     }
//   });
// }

// readDirectory();