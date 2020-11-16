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

// Método de fs recibe parametros y una callback 
const mdLinks = () => {
  fs.readFile(pathFile, "utf-8", (error, content) => {
    if (error) {
      console.log(error + 'Por favor ingresa una ruta correcta');
    } else {
      // Pasar mi archivo .md a html
      let fileMd = md.render(content);
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
