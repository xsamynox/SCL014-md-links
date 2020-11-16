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
            var linksArray = Array.from(links);
            const linksInArray = [];
            let detailsLinks = {};
            linksArray.forEach((link) => {
                detailsLinks = {
                    href: link.href,
                    text: link.text,
                    file: pathFile,
                }
                // Pushear el objeto creado al array
                linksInArray.push(detailsLinks);
            })

            // Eliminar los about:blank

        }
        console.log(linksInArray);
    });
}

mdLinks();
