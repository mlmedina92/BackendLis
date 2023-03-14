import { dirname } from 'path'
import { fileURLToPath } from 'url'
import bcrypt from 'bcrypt' //modulo para encriptar

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

