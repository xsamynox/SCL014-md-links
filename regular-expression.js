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