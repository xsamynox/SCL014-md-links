const fs = require('fs');
const path = require('path');
const extractLinks = require('./extractLinks')

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
      console.log(extractLinks);
    }
  });
}

mdLinks();
