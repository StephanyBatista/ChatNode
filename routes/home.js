
module.exports = function(app){
  
  var controller = app.controllers.home;
  app.get('/', controller.index);
  app.get('/logon', controller.logon);
}
