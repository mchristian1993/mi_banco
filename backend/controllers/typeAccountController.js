const TypeAccount= require('../models/type_account');

//AMBIENTE
const env = require('../config/env')

module.exports = {

    /**
     * @GET 
     * OBTENER TODOS LOS TIPOS DE CUENTA
     */
    getAll(req, res, next) {
        TypeAccount.getAll()
            .then(data => {
                res.status(201).json(data['rows']);
            })
            .catch(err => console.error(err));
    },

};