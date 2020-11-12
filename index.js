const fs = require('fs');
const path = require('path');

// ¿Ruta absoluta o relativa? 
let pathFile = process.argv[2];
// let options = {
//   validate: false
// };

// Métodos de path que devuelven una ruta absoluta
pathFile = path.resolve(pathFile); // Absoluta
pathFile = path.normalize(pathFile); // normaliza y resuelve '..' y '.'


// Método de fs recibe parametros y una callback 
const mdLinks = () => {
  fs.readFile(pathFile, "utf-8", (error, content) => {
    if (error) {
      console.log(error + 'Por favor ingresa una ruta correcta');
    } else {
      linkMarkdown(content);
    }
  });
}

const linkMarkdown = (content) => {
  //Separa el texto en diferentes líneas
  const separateText = content.split("\n");
  const regexMdLinks = /\[([^\[]+)\](\(.*\))/gm;
  // const singleMatch = /\[([^\[]+)\]\((.*)\)/;
  // const urlRegex = /\[(.+)\]\(([^ ]+?)( "(.+)")?\)/;
  const linkArray = [];
  separateText.forEach((element) => {
    const links = element.match(regexMdLinks);
    if (links !== null) {
      linkArray.push(links);
    }
  })
  console.log(linkArray)
};

mdLinks();
