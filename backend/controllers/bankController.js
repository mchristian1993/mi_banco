const Bank= require('../models/bank');

//AMBIENTE
const env = require('../config/env')

module.exports = {

    /**
     * @GET 
     * OBTENER TODOS LOS BANCOS
     */
    getAll(req, res, next) {
        Bank.getAll()
            .then(data => {
                res.status(201).json(data['rows']);
            })
            .catch(err => console.error(err));
    },

};