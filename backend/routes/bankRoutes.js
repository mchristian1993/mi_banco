// REQUIRE USERS CONTROLLER
const BankController = require('../controllers/bankController');
const passport = require('passport');

module.exports = (app) => {
    /**
     * GET ROUTES
     */
    app.get('/api/bank/getAll', passport.authenticate('jwt', { session: false }), BankController .getAll);

}