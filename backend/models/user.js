const db = require('../config/config');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

// OBJECT
const User = {};

/**
 * @SELECT
 * BUSCAR USUARIO POR NOMBRE DE USUARIO
 */
User.findByUserName = (username) => {
    const sql = `
    SELECT 
    U.id,
    U.username,
    U.name,
    U.lastname,
    U.phone,
    U.password,
    U.enabled,
    U.email,
    U.identification,
    U.address,
    U.type_identification,
    U.age

    FROM
        users AS U
  
    WHERE
        U.username = trim($1)  OR
        U.email = trim($1)
    GROUP BY
        U.id
    `;
    return db.query(sql, [username]);
}






/**
 * @SELECT
 * OBTENER USUARIOS POR ID
 */
User.findById = (id, callback) => {
    const sql = `
    SELECT 
        id,
        username,
        name,
        lastname,
        email,
        phone,
        enabled,
        password,
        identification,
        address,
        type_identification,
        age
      
    FROM
        users AS U
    WHERE
        U.id = $1
    `;
    return db.query(sql, [id]).then(user => {

        callback(null, user);

    });
}



/**
 * @SELECT
 * OBTENER USUARIOS POR ID
 */
User.getById = (id) => {
    const sql = `
        SELECT 
        U.id,
        U.username,
        initcap(U.name) AS name,
        initcap(U.lastname) AS lastname ,
        U.email,
        U.phone,
        U.password,
        U.enabled,
        U.identification,
        U.address,
        U.type_identification,
        U.age
        FROM
            users AS U
        WHERE
            U.id = $1
    `;
    return db.query(sql, [id]);
}





/**
 * @CREATE
 * CREAR UN USUARIO NUEVO EN LA BASE DE DATOS
 */
User.create = (user) => {
    console.log(user)
    const query = ` 
    INSERT INTO 
        users(
            username,
            enabled,
            password,
            phone,
            identification,
            name,
            lastname,
            email,
            address,
            type_identification,
            age,
            last_login,
            created_at,
            updated_at
        )
    VALUES 
        (LOWER($1), $2, $3, $4, $5, LOWER($6), LOWER($7), $8, LOWER($9), LOWER($10), $11, $12, $13, $14) RETURNING id
    `;
    return db.query(query, [
        user.username,
        true,
        user.password,
        user.phone,
        user.identification,
        user.firstName,
        user.lastName,
        user.email,
        user.address,
        user.type_identification,
        user.age,
        new Date(),
        new Date(),
        new Date()
    ])
}

/**
 * @CREATE
 * AGREGAR USUARIO CON PASSWORD HASHED A LA BASE DE DATOS
 */
User.addUser = (user) => {

    /*   const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(user.password, salt); */
    const myPasswordHashed = crypto.createHash('md5').update(user.password).digest('hex');
    user.password = myPasswordHashed;

    return User.create(user);
}

/**
 * VERIFICAR QUE EL PASSWORD SEA IGUAL AL ALMACENADO EN LA BASE DE DATOS (MD5)
 */
User.isPasswordMatched = (candidatePassword, hash) => {
    const myPasswordHashed = crypto.createHash('md5').update(candidatePassword).digest('hex');
    console.log('hashed', myPasswordHashed);
    if (myPasswordHashed === hash) {
        console.log('Retorno true;');
        return true;
    }

    console.log('Retorno false');
    return false;
}

/**
 * COMPARAR PASSWORD ENVIADO POR EL USUARIO CON EL PASSWORD ENCRIPTADO ALMACENADO EN LA BASE DE DATOS
 */
User.comparePassword = (candidatePassword, hash, callback) => {
    bcrypt.compare(myPasswordHashed, hash, (err, isMatch) => {
        if (err) throw err;
        console.log('match ', isMatch);
        callback(null, isMatch);
    });
}

/**
 * VALIDAR CORREO ELECTRONICO
 */
User.validateEmail = email => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}


/**
 * @UPDATE
 * ACTUALIZAR UNA USUARIO  EN LA BASE DE DATOS
 */
User.update = (user) => {
    const sql = `
            UPDATE
            users
            SET
                username            = $2,
                phone               = $3,
                identification      = $4,
                address             = $5,
                type_identification = $6,
                age                 = $7,
                created_at          = $8,
                updated_at          = $9
           
         
            WHERE id = $1
                `;
    return db.query(sql, [
        user.id,
        user.nombre_usuario,
        user.telefono,  
        user.identificacion,
        user.direccion,
        user.tipoIdentificacion,
        user.edad,
        new Date(),
        new Date()
    ]);
}







module.exports = User;