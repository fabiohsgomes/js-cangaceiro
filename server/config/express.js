/* Código simplório, apenas para fornecer o serviço para a aplicação */

var express = require('express')
    ,app = express()
    ,routes = require('../app/routes')
    ,path =  require('path')
    ,bodyParser = require('body-parser')
    ,compression = require('compression');

/*
app.set('clientPath', path.join(__dirname, '../..', 'public'));
console.log(app.get('clientPath'));
app.use(express.static(app.get('clientPath')));
*/
app.use(bodyParser.json());
app.use(compression());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


routes(app);

module.exports = app;