const fs = require("fs"),
  path = require("path"),
  inetpub = "C:/inetpub/wwwroot/Music/Server/",
  baseFolder = "public";

const moveFolder = (folderName) => {
   fs.readdir(folderName, (_, files) =>
     files.forEach((fileName) => moveFile(fileName, folderName))
   );
}

function moveFile(fileName, folderName) {
  const ext = path.extname(fileName);

  if (!ext) {
    moveFolder(`${folderName}/${fileName}`);
    return;
  }

  fs.copyFile(`${folderName}/${fileName}`, `${inetpub}/${folderName}/${fileName}`, (err) => {
    if (err) throw err;
    console.log(`${fileName} was moved to ${inetpub}`);
  });
}

moveFolder(baseFolder);
