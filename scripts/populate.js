const { env } = require("process"),
  fs = require("fs"),
  path = require("path"),
  inetpub = `C:\\inetpub\\wwwroot\\Music\\Server\\public\\Saves`,
  queue = `${env.HOMEPATH}\\videos\\saves`;

function addToList(file, destination) {
    fsreadFile("./public/data.js", (err, data) => {
      if (err) throw err;
      console.log(data);
    });
}

function moveFile(file) {
  const current = path.join(queue, file),
    destination = path.join(inetpub, file);

  fs.rename(current, destination, function (err) {
    if (err) {
      throw err;
    } else {
      console.log(`Successfully moved ${file}`);
      addToList(file, destination);
    }
  });
}

//fs.readdir(queue, (_, files) => files.forEach(moveFile));
console.dir(path);
