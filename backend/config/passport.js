const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const keys = require('../config/keys');

module.exports = function(passport) {
    let opts = {};
    console.log('secret', process.env.USERNAME);
    
    opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
    opts.secretOrKey = keys.secretOrKey;

    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    
        User.findById(jwt_payload.id, (err, user) => {
            if (err) {
                
                return done(err, false);
            }
            if (user) {
              
                return done(null, user);
            } else {
             
                return done(null, false);
            }
        });
    }));
}