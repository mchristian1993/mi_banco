// REQUIRE USERS CONTROLLER
const TypeAccountController = require('../controllers/typeAccountController');
const passport = require('passport');

module.exports = (app) => {
    /**
     * GET ROUTES
     */
    app.get('/api/type_account/getAll', passport.authenticate('jwt', { session: false }), TypeAccountController.getAll);

}