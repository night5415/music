const fs = require("fs"),
  path = require("path"),
  inetpub = "C:/inetpub/wwwroot/Music/Stage/",
  baseFolder = "public";

const moveFolder = (folderName) => {
   fs.readdir(folderName, (_, files) =>
     files.forEach((fileName) => moveFile(fileName, folderName))
   );
}

function moveFile(fileName, folderName) {
  const ext = path.extname(fileName),
    basePath = `${folderName}/${fileName}`,
    iNetPubPath = `${inetpub}/${folderName}/${fileName}`;

  if (!ext) {
    moveFolder(basePath);
    return;
  }

  fs.copyFile(basePath, iNetPubPath, (err) => {
    if (err) throw err;
    console.log(`${fileName} was moved to ${inetpub}`);
  });
}

moveFolder(baseFolder);
