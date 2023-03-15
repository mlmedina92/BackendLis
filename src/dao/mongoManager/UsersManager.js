import { comparePasswords, hashPassword } from '../../utils.js';//cdo alguien se registar usamos el hasheo de la contraseña
import { userModel } from '../models/users.model.js'

export default class UsersManager {
    async createUser(user) {
        const { email, password } = user//contraseña q me pasan :123
        try {
            const existeUsuario = await userModel.find({ email })
            console.log('existe', existeUsuario);
            if (existeUsuario.length === 0) {
                const hashNewPassword = await hashPassword(password)//para hashear la conrrtraseña q me pasan
                const newUser = { ...user, password: hashNewPassword } //gurado un obj con todo lo q venia en el objeto user y ahora su password vale hashNewPassword q es la contra hasheada.. en mongo atals se guarda 
                // password:"$2b$10$NGY21aAVEBOSz2mnI3dp.cjjaWkQmVuv70kWviMoIq" de 123 pasa a esto
                await userModel.create(newUser)
                return newUser
            } else {
                return null
            }
        } catch (error) {
            console.log(error)
            throw new Error(error)
        }
    }

    async loginUser(user) { //comparar contraseña hasheada con la q ingresa el us
        const { email, password } = user //DE USER SACO amil y pasaword
        const usuario = await userModel.findOne({ email }) // se fija si existe un us con ese mail registradopasswordBD
        if (usuario) {//si existe un us q cumple con mail ejecuto el metodo comparePassword pasandole la passwrd q ingreso el us y la q  esta en la BD . el metodo nos da true o flase
            const isPassword =  await comparePasswords(password, usuario.password)//da true o false
            if (isPassword) {//si existe
                return usuario
            }
        }
        return null
    }
}