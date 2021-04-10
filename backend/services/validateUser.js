const User = require('../models/user');

const Validate = {};

Validate.test = (req, res, next) => {

    // EXTRACT FORM DATA
    const { username, email, password } = req.body;

    // CHECK IF USERNAME IS VALID (NOT EMPTY)
    if(!username){
        return res.status(422).json({
            success: false,
            message: "El nombre de usuario es obligatorio"
        });

        next();
    }

    // CHECK IF PASSWORD IS VALID (NOT EMPTY)
    if(!password){
        return res.status(422).json({
            success: false,
            message: "La contraseña es obligatoria"
        });

        next();
    }

    // IF THE ROUTE MATCHES THIS, IT MEANS A NEW USER IS TRYING TO REGISTER
    // CHECK IF EMAIL IS PROVIDED THEN CHECK THE FORMAT OF EMAIL
    if(req.route.path === '/users/new'){
        // CHECK IF EMAIL IS VALID (NOT EMPTY)
        if(!email){
            return res.status(422).json({
                success: false,
                message: "El correo electronico es obligatorio"
            });

            next();
        }

        // CHECK EMAIL IF IT IS FORMATTED CORRECTLY 
        if(!User.validateEmail(email)){
            return res.status(422).json({
                success: false,
                message: 'Ingresa un correo electronico valido'
            });

            next();
        }
    }
    
    return next();
}

module.exports = Validate;