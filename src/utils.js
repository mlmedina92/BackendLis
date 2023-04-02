import { dirname } from 'path'
import { fileURLToPath } from 'url'
import bcrypt from 'bcrypt' //modulo para encriptar
// import jwt from 'jsonwebtoken'

export const __dirname = dirname(fileURLToPath(import.meta.url))


// funcioalidad pra hashear contraseña pq la voy a usar en muchos lugares
// metodo para hacer el hass: .hash
export const hashPassword= async (password) =>{
    return await bcrypt.hash(password,10)//retorno la contraseña hasheada. 10 es por deafult es un num de rondas 
}

//.compare metodo para comparar contraseñas, el us ingresa sus datos omrales y nosotros tenemos q comparar con los datos hasehadeos. le paso la contra q ingreso ell us y la q tenemos en la bd hasheada. el metodo da true o false 
export const comparePasswords= async (password,passwordBD) =>{
    return bcrypt.compare(password, passwordBD)
}


// export const generateToken=(user)=>{// funcion q genera token cdo hace login esto se hace siempre independientemenete de q trabaje con passport o no  con passport lo q puedo hacer es validar el token, sino trabajo con passport me toca hacer una funcion desde 0 q valide el token
//     return jwt.sign({user},'secretJWT',{expiresIn:'1h'})
// }

//  funcion q valida token cdo el us se mueve e/ rutas. 2 opciones : se puede hacer a traves de jwt passpord o con mi jwt directo.
