#!/usr/bin/env node
const fs = require("fs");
const path = require('path');
const util = require('util');
const md = require('markdown-it')();
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const fetchUrl = require('fetch').fetchUrl;

// Recibe una ruta
let filePath = process.argv[2];
// Métodos de path que devuelven una ruta absoluta
filePath = path.resolve(filePath); // Absoluta
filePath = path.normalize(filePath); // normaliza y resuelve '..' y '.'

// Si el arreglo de Process.argv incluye validate o stats
const validateParam = process.argv.includes('--validate') || process.argv.includes('--v')
const statsParam = process.argv.includes('--stats') || process.argv.includes('--s')

// Llevando a promesa readdir
const readdir = util.promisify(fs.readdir);

module.exports.init = () => {
  // Verificar que la ruta dada es un archivo o directorio
  // Dependiendo de eso se ejecuta lo requerido.
  fs.stat(filePath, (error, stats) => {
    const isFile = stats.isFile();
    const isDirectory = stats.isDirectory();

    if (isFile) {
      return extractLinks([filePath])
        .then(data => {
          console.log(data)
          return data;
        })
        .catch(error);

    } if (isDirectory) {
      readdir(filePath)
        .then(files => {
          const filesMarkdown = files.filter(file => file.includes('.md'));
          return extractLinks(filesMarkdown).then(data => {
            console.log(data)
            return data;
          });
        })
        .catch(error);
    } else {
      throw error;
    }
  });
};

// Función que lee el contenido de un archivo
const readFileContent = file => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (error, content) => {
      if (error) {
        reject(error);
      }
      resolve({ fileName: file, content });
    });
  });
};

// Función que extrae los links y la información
const extractLinks = (files) => {
  return new Promise((resolve, reject) => {
    if (!files.length) {
      reject('Arreglo no valido');
    }
    const promises = files.map(file => readFileContent(file));
    // Stats
    if (statsParam && !validateParam) {
      Promise.all(promises).then(files => {
        const allLinks = []
        for (const file of files) {
          // Pasar mi archivo .md a html
          const fileMd = md.render(file.content.toString());
          const domContent = new JSDOM(fileMd);
          const links = Array.from(domContent.window.document.querySelectorAll('a'));
          for (const link of links) {
            const aboutBlank = 'about:blank';
            const regularExpression = new RegExp(aboutBlank, 'gi');
            if (!regularExpression.exec(link.href)) {
              allLinks.push(link.href)
            }
          }
        }
        let uniqueLinks = Array.from(new Set(allLinks)).length
        resolve(`Total: ${allLinks.length} 
Unique: ${uniqueLinks}`);
      })
    }
    // Validate
    if (validateParam && !statsParam) {
      Promise.all(promises).then(files => {
        const promisesUrl = []
        for (const file of files) {
          // Pasar mi archivo .md a html
          const fileMd = md.render(file.content.toString());
          const domContent = new JSDOM(fileMd);
          const links = Array.from(domContent.window.document.querySelectorAll('a'));
          for (const link of links) {
            const aboutBlank = 'about:blank';
            const regularExpression = new RegExp(aboutBlank, 'gi');
            if (!regularExpression.exec(link.href)) {
              promisesUrl.push(getStatusUrl(link))
            }
          }
        }
        Promise.all(promisesUrl).then(urls => {
          resolve(urls.map(url => {
            const statusText = url.meta.status >= 400 ? 'fail' : 'ok';
            return `${filePath} ${url.meta.finalUrl} ${statusText} ${url.meta.status} ${url.text}`
          }))

        }).catch(console.log)
      })
    }
    // Validate y Stats
    if (validateParam && statsParam) {
      Promise.all(promises).then(files => {
        const promisesUrl = []
        for (const file of files) {
          // Pasar mi archivo .md a html
          const fileMd = md.render(file.content.toString());
          const domContent = new JSDOM(fileMd);
          const links = Array.from(domContent.window.document.querySelectorAll('a'));
          for (const link of links) {
            const aboutBlank = 'about:blank';
            const regularExpression = new RegExp(aboutBlank, 'gi');
            if (!regularExpression.exec(link.href)) {
              promisesUrl.push(getStatusUrl(link))
            }
          }
        }
        Promise.all(promisesUrl).then(urls => {
          let uniqueLinks = Array.from(new Set(promisesUrl)).length
          urls.map(url => {
            const statusText = url.meta.status >= 400 ? 'fail' : 'ok';
            resolve(`Total: ${promisesUrl.length} hisjdasdhajshkjahdfkjhadkj
              Unique: ${uniqueLinks} 
              Broken: ${statusText}
              abracadabra: `);
          })
        }).catch(console.log)
      })
    }
    // Comportamiento por defecto
    if (!validateParam && !statsParam) {
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
    }
  });
}
this.init();

// FETCH => Recibe la data de los links
const getStatusUrl = (link) => {
  return new Promise((resolve, reject) => {
    fetchUrl(link.href, (error, meta) => {
      if (error) {
        reject(error);
      } else {
        resolve({ text: link.text, meta });
      }
    });
  });
};
