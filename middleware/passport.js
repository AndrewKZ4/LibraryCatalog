const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt


const db = require("../models");
const key = require("../config/keys")
const User = db.users;


const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: key.jwt
}

module.exports = passport => {
    passport.use(
        new JwtStrategy(options, async (payLoad, done) => {
            try {
                let user = User.findByPk(payLoad.id)
                if (user) {
                    done(null, user);
                } else {
                    done(null, false);
                }
            }
            catch(e){
                console.log(e)
            }
        })
    )
}