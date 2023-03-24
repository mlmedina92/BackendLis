import passport from 'passport';
import { Strategy as GithubStrategy } from 'passport-github2';
import {userModel} from '../dao/models/users.model.js'


passport.use('github', new GithubStrategy({
    clientID: "Iv1.8561a7991e79bdc2",
    clientSecret: "7fe59d640ad55f6c20a0fc386e137c0a68bc1aee",
    callbackURL: "http://localhost:3000/users/github"
}, async (accessToken, refreshToken, profile, done) => {
    const user = await userModel.findOne({ email: profile._json.email })//de la inf q me manda github agarro el mail
    if (!user) {//si no exite el us lo creo
        const newUser = {
            first_name: profile._json.name.split(' ')[0],
            last_name: profile._json.name.split(' ')[1] || ' ',
            email: profile._json.email,
            password: ' ' //ESA inf viene de githb
        }
        const userDB = await userModel.create(newUser)//lo creo, con los datos q traigo de githb de newuser
        done(null, userDB)
    }
    else {//si ya existe el us manda el us q encuentra en la bd
        done(null, user)
    }
}))


// siempre uso estas 2 funciones indpendienteente de q estrategia use
passport.serializeUser((user, done) => { //recibe un us y devuelve un id
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {//recibe el id y va a buscar el us y da la inf completa del us
    const user = await userModel.findById(id)//busca ese usuario en la BD
    done(null, user)
})


// Owned by: @mlmedina92
// App ID: 309695
// clientSecret: "7fe59d640ad55f6c20a0fc386e137c0a68bc1aee",
// Client ID: Iv1.8561a7991e79bdc2