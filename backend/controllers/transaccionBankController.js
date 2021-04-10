const TransaccionBank = require('../models/transaccion_bank');

//AMBIENTE
const env = require('../config/env')

module.exports = {

    /**
     * @GET 
     * OBTENER TODOS LOS USUARIOS
     */
     findByIdAcoountHistory(req, res, next) {
        const id = req.params.id;
        TransaccionBank.findByIdAcoountHistory(id)
            .then(data => {
                res.status(201).json(data.rows);
            })
            .catch(err => {
                return res.status(501).json({
                    message: 'No se pudo obtener las cuentas',
                    success: false,
                    err: err,
                });
            });
        
    },


    /**
     * @GET 
     * OBTENER TODOS LOS USUARIOS
     */
    findById(req, res, next) {
        const id = req.params.id;
        TransaccionBank.findById(id)
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
        
    },

    /**
     * @POST
     * REGISTRAR UN NUEVO USUARIO EN LA BASE DE DATOS
     */
    async create(req, res, next) {
        const transaccionBank = req.body;
        let saldo = parseInt(transaccionBank.valor)
        let saldoTotalAccountRoot = 0
        let saldoTotalAccountDes = 0
        createTransfer = await TransaccionBank.create(transaccionBank)
            .catch((err) => {
                console.log(err)
                return res.status(501).json({
                    message: 'Error al realizar la transacción',
                    success: false,
                    err: err,
                });

            })

        if (createTransfer) {
            dataAcoountRoot = await TransaccionBank.findByIdAcoount(transaccionBank.root_account)
                .catch((err) => {
                    console.log(err)
                    return res.status(501).json({
                        message: 'Error al obtener datos',
                        success: false,
                        err: err,
                    });

                })
            dataAcoountDes = await TransaccionBank.findByIdAcoount(transaccionBank.destination_account)
                .catch((err) => {
                    console.log(err)
                    return res.status(501).json({
                        message: 'Error al obtener datos',
                        success: false,
                        err: err,
                    });

                })

            if (dataAcoountRoot) {
                saldoTotalAccountRoot = dataAcoountRoot.rows[0].saldo - saldo

            }
            if (dataAcoountDes) {
                saldoTotalAccountDes = dataAcoountDes.rows[0].saldo + saldo
            }

            let accountRoot = {
                account_number: transaccionBank.root_account,
                saldo: saldoTotalAccountRoot
            }

            let accountDes = {
                account_number: transaccionBank.destination_account,
                saldo: saldoTotalAccountDes
            }

            accountRouteUpdate = await TransaccionBank.updateSaldo(accountDes)
                .catch((err) => {
                    console.log(err)
                    return res.status(501).json({
                        message: 'Error al actualizar saldo',
                        success: false,
                        err: err,
                    });

                })

                accountDeseUpdate = await TransaccionBank.updateSaldo(accountRoot)
                .catch((err) => {
                    console.log(err)
                    return res.status(501).json({
                        message: 'Error al actualizar saldo',
                        success: false,
                        err: err,
                    });

                })
            }

            if( accountRouteUpdate &&   accountDeseUpdate){
                return res.status(201).json({
                    message: 'La transacción se realizo con exito',
                    success: true,
                });
    

    
           
        }

    },


};