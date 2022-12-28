const express = require("express"),
  app = express(),
  port = 3000;

app.get(/Chill/, (req, res) => {
  const decoded = decodeURI(req.url);
  res.sendFile(`${__dirname.replace("Server", "")}${decoded}`);
});

app.get(/Lofi/, (req, res) => {
  const decoded = decodeURI(req.url);
  res.sendFile(`${__dirname.replace("Server", "")}${decoded}`);
});

app.get(/Fun/, (req, res) => {
  const decoded = decodeURI(req.url);
  res.sendFile(`${__dirname.replace("Server", "")}${decoded}`);
});

app.use(express.static("public"));

app.listen(port, () => {
  console.log(`Player server listening on port ${port}`);
});
