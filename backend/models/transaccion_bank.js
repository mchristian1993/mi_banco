const db = require('../config/config');

// OBJECT
const TransaccionBank = {};


    /**
 * @SELECT
 * OBTENER HISTORIAL DE TRANSACCIONES POR ID DE CUENTA
 */
 TransaccionBank .findByIdAcoountHistory = (id) => {
  
   const sql = `
   SELECT
   TB.root_account ,
   TB.destination_account,
   TB.created_at,
   TB.amount
    FROM 
        bank_account AS BA
    INNER JOIN
        transacciones_bancarias AS TB
    ON
        BA.account_number = TB.root_account 
    OR 
        BA.account_number = TB.destination_account
    WHERE
        BA.account_number = $1
   


   `;
   return db.query(sql, [id])
}
/**
 * @SELECT
 * OBTENER USUARIOS POR ID
 */
 TransaccionBank .findByIdAcoount = (id) => {
    const sql = `
    SELECT 
    BA.account_number,
    BA.saldo
      
    FROM
        bank_account AS BA
    WHERE
        BA.account_number = $1
    `;
    return db.query(sql, [id])
}





/**
 * @CREATE
 * CREAR UN USUARIO NUEVO EN LA BASE DE DATOS
 */
 TransaccionBank .create = (transaccionBank ) => {
  
    const query = ` 
    INSERT INTO 
    transacciones_bancarias (
            root_account,
            destination_account, 
            amount,
            created_at,
            updated_at
        )
    VALUES 
        ($1, $2, $3, $4, $5) RETURNING id
    `;
    return db.query(query, [
        transaccionBank.root_account,
        transaccionBank.destination_account, 
        transaccionBank.valor,
        new Date(),
        new Date()
    ])
}

/**
 * @UPDATE
 * ACTUALIZAR SALDO DE UNA CUENTA
 */
TransaccionBank.updateSaldo = (transaccionBank) => {
    const sql = `
            UPDATE
            bank_account
            SET
                saldo            = $2
            WHERE account_number = $1
                `;
    return db.query(sql, [
        transaccionBank.account_number,
        transaccionBank.saldo
      
    ]);
}

module.exports = TransaccionBank ;