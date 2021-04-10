const db = require('../config/config');


// OBJECT
const Bank = {};

/**
 * @SELECT
 * OBTENER TODOS BANCOS 
 */
 Bank.getAll = (id) => {
    const sql = `
    SELECT 
       B.id,
       B.name
        FROM
            bank AS B
       
    `;
    return db.query(sql);
}




module.exports = Bank;