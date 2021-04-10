const db = require('../config/config');


// OBJECT
const TypeAccount = {};

/**
 * @SELECT
 * OBTENER TODOS LOS TIPOS DE CUENTAS  
 */
 TypeAccount.getAll = (id) => {
    const sql = `
    SELECT 
       TA.id,
       TA.name
        FROM
            type_account AS TA
       
    `;
    return db.query(sql);
}




module.exports = TypeAccount;