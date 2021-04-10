// REQUIRE USERS CONTROLLER
const UsersController = require('../controllers/usersController');
const passport = require('passport');


module.exports = (app) => {
    /**
     * GET ROUTES
     */
    app.get('/api/users/getAll', passport.authenticate('jwt', { session: false }), UsersController.getAll);
 
  app.get('/api/users/findById/:id', passport.authenticate('jwt', { session: false }), UsersController.findById);
   
    /**
     * POST ROUTES
     */

  
    app.post('/api/users/login', UsersController.LogIn);

    app.post('/api/users/register', UsersController.register);

 
   

    /**
     * PUT ROUTES
     */
    app.put('/api/users/update', passport.authenticate('jwt', { session: false }), UsersController.update);

}