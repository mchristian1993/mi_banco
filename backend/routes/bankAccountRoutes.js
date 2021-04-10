// REQUIRE USERS CONTROLLER
const BankAccountController = require('../controllers/bankAccountController');
const passport = require('passport');


module.exports = (app) => {
    /**
     * GET ROUTES
     */
    app.get('/api/bank_account/findById/:id', passport.authenticate('jwt', { session: false }), BankAccountController.findById);
   
   
    /**
     * POST ROUTES
     */


    app.post('/api/bank_account/create', passport.authenticate('jwt', { session: false }),BankAccountController .create);

}