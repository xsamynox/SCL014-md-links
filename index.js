#!/usr/bin / env node

const fs = require("fs");
const path = require('path');
const util = require("util");
const md = require("markdown-it")();
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

// Recibe una ruta
let filePath = process.argv[2];
// Métodos de path que devuelven una ruta absoluta
filePath = path.resolve(filePath); // Absoluta
filePath = path.normalize(filePath); // normaliza y resuelve '..' y '.'

// Objeto
const options = {
  validate: false,
  stats: false
};

const readdir = util.promisify(fs.readdir);

module.exports.init = () => {
  // Verificar que la ruta dada es un archivo o directorio
  // Dependiendo de eso se ejecuta lo requerido.
  fs.stat(filePath, (error, stats) => {
    const isFile = stats.isFile();
    const isDirectory = stats.isDirectory();

    if (isFile) {
      return extractLinks([filePath])
        .then(data => console.log(data))
        .catch(error);
    } if (isDirectory) {
      readdir(filePath)
        .then(files => {
          const filesMarkdown = files.filter(file => file.includes('.md'));
          return extractLinks(filesMarkdown).then(data => console.log(data));
        })
        .catch(error);
    } else {
      throw error;
    }
  });
};

const readFileContent = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (error, content) => {
      if (error) {
        reject(error);
      }
      resolve({ fileName: file, content });
    });
  });
};

const extractLinks = (files) => {
  return new Promise((resolve, reject) => {
    if (!files.length) {
      reject('Arreglo no valido');
    }
    const promises = files.map(file => readFileContent(file));

    Promise.all(promises).then(files => {
      let linksInArray = [];
      let detailsLinks = {};
      for (const file of files) {
        // Pasar mi archivo .md a html
        const fileMd = md.render(file.content.toString());
        const domContent = new JSDOM(fileMd);
        // Creo un array desde el nodeList
        const links = Array.from(domContent.window.document.querySelectorAll('a'));
        links.forEach((link) => {
          detailsLinks = {
            href: link.href,
            text: link.text.slice(0, 50),
            file: filePath,
          }
          const aboutBlank = 'about:blank';
          const regularExpression = new RegExp(aboutBlank, 'gi');
          if (!regularExpression.exec(link.href)) {
            linksInArray.push(detailsLinks);
          }
        })
      }
      resolve(linksInArray);
    });
  });
};

this.init();

// fetch()
//   .then(response => response.json())
//   .then(data => console.log(data));