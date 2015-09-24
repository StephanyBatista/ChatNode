
module.exports = function(app, controller){
  
  app.get('/', controller.index);
  app.get('/logon', controller.logon);
}
