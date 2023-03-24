const { env } = require("process"),
  fs = require("fs"),
  path = require("path"),
  inetpub = `C:\\inetpub\\wwwroot\\Music\\Stage\\public\\Saves\\Chill`,
  queue = `${env.HOMEPATH}\\Videos\\Saves`;

function moveFile(file) {
  const current = path.join(queue, file),
    destination = path.join(inetpub, file);

  fs.rename(current, destination, function (err) {
    if (err) {
      throw err;
    } else {
      console.log(`Successfully moved ${file}`);
    }
  });
}

fs.readdir(queue, (_, files) => files.forEach(moveFile));
