const BankAccount = require('../models/bank_account');

//AMBIENTE
const env = require('../config/env')

module.exports = {

    /**
     * @GET 
     * OBTENER CUENTAS POR ID DE USUARIO
     */
     findById(req, res, next) {
        const id = req.params.id;
        BankAccount.findById(id)
            .then(data => {
                res.status(201).json(data.rows);
            })
            .catch(err => {
                if (!env.production) console.log('error: ', err);
                return res.status(501).json({
                    message: 'No se pudo obtener las cuentas',
                    success: false,
                    err: err,
                });
            });
        return
    },

    /**
     * @POST
     * REGISTRAR UN NUEVO USUARIO EN LA BASE DE DATOS
     */
    create(req, res, next) {
        const bankAccount = req.body;
        bankAccount.id_user = bankAccount.user.id
       bankAccount.id_type_account = bankAccount.tipocuenta.id
        bankAccount.id_banking_entity = bankAccount.tipoNombreBanco.id 
            BankAccount.create(bankAccount)
                .then(() => {
            
                    return res.status(201).json({

                        message: 'Cuenta bancaria registrado correctamente'
                    });
                })
                .catch(err => {
                    console.log(err)

                    return res.status(501).json({
                        message: 'Error al registrar la cuenta bancaria',
                        success: false,
                        err: err,
                    });
                })
    }
};