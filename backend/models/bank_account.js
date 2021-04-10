const db = require('../config/config');

// OBJECT
const BankAccount = {};
/**
 * @SELECT
 * BUSCAR CUENTAS CON ID DE USUARIO
 */

BankAccount.findById = (id_user) => {
    const sql = `
    SELECT
	    *
    FROM
	    bank_account AS BC
    INNER JOIN
	    users AS U
    ON
	    BC.id_user = U.id AND  U.id = $1
    INNER JOIN
	    type_account AS TA
    ON
	    BC.id_account_type = TA.id
    INNER JOIN
	    bank AS  B
    ON
	    BC.id_banking_entity = B.id
	
    `;
    return db.query(sql, [id_user]);

}

/**
 * @CREATE
 * CREAR UN USUARIO NUEVO EN LA BASE DE DATOS
 */
BankAccount.create = (bankAccount) => {

    const query = ` 
    INSERT INTO 
    bank_account(
            account_number,
            alias,
            saldo,
            coin,
            description,
            id_user,
            id_account_type,
            id_banking_entity,
            enabled,
            created_at,
            updated_at
        )
    VALUES 
        ($1,LOWER($2), $3, $4, LOWER($5), $6, $7, $8, $9, $10, $11) RETURNING id
    `;
    return db.query(query, [
        bankAccount.numerCuenta,
        bankAccount.aliasCuenta,
        bankAccount.saldoCuenta,
        bankAccount.monedaCuenta,
        bankAccount.descripcion,
        bankAccount.id_user,
        bankAccount.id_type_account,
        bankAccount.id_banking_entity,
        true,
        new Date(),
        new Date()
    ])
}






module.exports = BankAccount;