const app = require('express')()

app.get('/', (req, res) => {
  res.send("Hello from Appsody-Actions");
});
 
module.exports.app = app;
