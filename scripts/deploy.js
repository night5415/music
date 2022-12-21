const fs = require("fs"),
  public = "./public",
  inetpub = "C:/inetpub/wwwroot/Music/Server/public",
  moveFiles = (files) => files.forEach(moveFile);

function moveFile(fileName) {
  fs.copyFile(`${public}/${fileName}`, `${inetpub}/${fileName}`, (err) => {
    if (err) throw err;
    console.log(`${fileName} was moved to ${inetpub}`);
  });
}

fs.readdir(public, (_, files) => moveFiles(files));
