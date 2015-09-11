var express = require('express');
var router = express.Router();

module.exports = function(app){
  
  var controller = app.controllers.home;
  app.use('/', router.get('/', controller.index));
  app.use('/logon', router.get('/logon', controller.logon));
}
