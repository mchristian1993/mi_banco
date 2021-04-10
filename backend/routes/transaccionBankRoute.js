// REQUIRE USERS CONTROLLER
const TransaccionBankController= require('../controllers/transaccionBankController');
const passport = require('passport');


module.exports = (app) => {
    /**
     * GET ROUTES
     */
    app.get('/api/transaccion/findByIdAcoountHistory/:id', passport.authenticate('jwt', { session: false }),TransaccionBankController.findByIdAcoountHistory); 
  
    /**
     * POST ROUTES
     */



    app.post('/api/transaccion/create', passport.authenticate('jwt', { session: false }), TransaccionBankController.create);

 
   

}