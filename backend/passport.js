const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const Member = mongoose.model('members');
const opts = {};

opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';

module.exports = passport => {
    passport.use(new JWTStrategy(opts, (jwt_payload, done) => {
        Member.findById(jwt_payload.id)
            .then(member => {
                if(member) {
                    return done(null, member);
                }
                return done(null, false);
            })
            .catch(err => console.error(err));
    }));
}
