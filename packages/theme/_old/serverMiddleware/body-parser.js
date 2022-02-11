const bodyParser = require('~/_old/serverMiddleware/body-parser');
const app = require('express')();

app.use(bodyParser.json());
module.exports = app;
