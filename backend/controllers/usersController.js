const User = require('../models/user');


const jwt = require('jsonwebtoken');
const keys = require('../config/keys');





//AMBIENTE
const env = require('../config/env')

module.exports = {

    /**
     * @GET 
     * OBTENER TODOS LOS USUARIOS
     */
    getAll(req, res, next) {
        User.getAllUsers()
            .then(data => {
                //print('Usuario: ', user)
                res.status(201).json(data);
            })
            .catch(err => console.error(err));
    },


    /**
     * @GET 
     * OBTENER TODOS LOS USUARIOS
     */
    findById(req, res, next) {
        const id = req.params.id;
        User.getById(id)
            .then(data => {
                res.status(201).json(data.rows);
            })
            .catch(err => {
                if (!env.production) console.log('error: ', err);
                return res.status(501).json({
                    message: 'No se pudo obtener el usuario',
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
    register(req, res, next) {
        const user = req.body;
        User.addUser(user)
            .then((id_user) => {
                const id = id_user.rows

                id.forEach((i) => {
                    console.log(i.id)

                })


                return res.status(201).json({

                    message: 'El usuario se ha registrado correctamente'
                });
            })
            .catch(err => {
                console.log(err)
                if (err.code === '23505') {
                    return res.status(501).json({
                        message: 'El usuario que ingresaste ya esta registrado',
                        success: false,
                        err: err,
                    });
                } else {
                    return res.status(501).json({
                        message: 'Error al registrar el usuario',
                        success: false,
                        err: err,
                    });
                }
            });
    },

    /**
     * @POST
     * @param email
     * @param password
     * CONTROLADOR DE LOGIN DE USUARIO  
     */
    LogIn(req, res, next) {
        const username = req.body.username;
        const password = req.body.password;
  

  
        User.findByUserName(username).then(user => {
            if (!user) {
                return res.status(401).json({ success: false, message: 'Usuario no encontrado' });
            }

            const userD = user.rows
            let passwordD = null
            let id = null
            let name = null
            let lastname = null
            let username = null
            let phone = null
            let enabled = null
            userD.forEach((uD) => {
                id = uD.id
                passwordD = uD.password
                name = uD.name
                lastname = uD.lastname
                username = uD.username
                phone = uD.phone
                enabled = uD.enabled
            })
            if (User.isPasswordMatched(password, passwordD)) {
                // Crear token

                const token = jwt.sign({ id: user.id, username: user.username }, keys.secretOrKey, {
                    // expiresIn: 60 * 60 * 5 // 5 horas
                    // expiresIn: (60 * 1) // 1 Minuto
                    // expiresIn: (60 * 60 * 24) // 1 Hora
                });
                // Retornar los datos del usuario junto con el token
                const dataUser = {
                    id: id,
                    name: name,
                    lastname: lastname,

                    username: username,
                    phone: phone,

                    token: 'JWT ' + token,
                    enabled: enabled,

                    // profile_image_url: req.protocol + '://' + req.get('host') + '/api/users/images/profile/' + user.id
                }
                if (!env.production) console.log(dataUser)

                return res.status(200).json({
                    success: true,
                    data: dataUser
                });
            } else {
                if (!env.production) console.log('CONTRASEÑA INCORRECTA');
                return res.status(401).json({ success: false, message: 'La contraseña es incorrecta' });
            }
        });
    },





    /**
     * @PUT
     * ACTUALIZAR UN USUARIO EN LA BASE DE DATOS
     */
    async update(req, res, next) {
        const user = req.body
       

            User.update(user)
                .then(() => {
                    return res.status(201).json({
                
                        success: true,
                        message: 'El usuario se ha actualizado correctamente'
                    });
                })
                .catch(err => {
                    if (!env.production) console.log(err);
                    return res.status(501).json({
                        message: 'Error al actualizar el usuario',
                        success: false,
                        err: err,
                    })
                });
       

    },


};