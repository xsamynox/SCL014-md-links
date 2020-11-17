const fs = require('fs');
const path = require('path');

const md = require('markdown-it')();
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

// Recibe una ruta
let pathFile = process.argv[2];

// Métodos de path que devuelven una ruta absoluta
pathFile = path.resolve(pathFile); // Absoluta
pathFile = path.normalize(pathFile); // normaliza y resuelve '..' y '.'

// Objeto
const options = {
  validate: false,
  stats: false
};

// Método de fs recibe parametros y una callback 
const mdLinks = () => {

  fs.readFile(pathFile, [options], (error, content) => {

    if (error) {
      console.log(error + 'Por favor ingresa una ruta correcta');
    } else {
      // Pasar mi archivo .md a html
      let fileMd = md.render(content.toString());
      // Crea un dom con el archivo html
      const dom = new JSDOM(fileMd);
      const links = dom.window.document.querySelectorAll("a");
      // Convertir una NodeList en un array
      const linksArray = Array.from(links);
      let linksInArray = [];
      let detailsLinks = {};
      linksArray.forEach((link) => {
        detailsLinks = {
          href: link.href,
          text: link.text,
          file: pathFile,
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
  });
}

mdLinks();

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


// export const readData = () => {
//   const db = firebase.firestore();

//   return new Promise((resolve, reject) => {
//     db.collection('recipe')
//       .get()
//       .then((querySnapshot) => {
//         const result = [];

//         querySnapshot.forEach((doc) => {
//           result.push({
//             ...doc.data(),
//             post: { ...doc.data().post, uid: doc.id },
//           });
//         });

//         return resolve(result);
//       })
//       .catch(err => reject(err));
//   });
// };

// const mdLinks = (pathFile, options) => {
//   return new Promise((resolve, reject) => {
//     mdLinks()
//       .then((links) => {
//         console.log('oliwis');
//         return resolve('oliwis');
//       })
//       .catch(err => reject(err));
//   });
// }

