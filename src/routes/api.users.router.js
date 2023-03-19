// archivo para el renderizzado de VISTAS
import { Router } from "express"; //importo router
import UsersManager from "../dao/mongoManager/UsersManager.js";

const router = Router()

const usersManager = new UsersManager()// traigo las fncionalidades de Usermanager cisntanciando la clase

router.post('/login', async (req, res) => { // si llamo al slash views renderio formualrio
    const { email, password } = req.body
    const user = await usersManager.loginUser(req.body)
    if (user) { //si el us existe ccreo esas sesiones
        req.session.email = email //creo sesion
        req.session.password = password //creo sesion
        req.session.userName = user.first_name
        req.session.role = user.role
        res.redirect('/')//redireccion a home

    } else {

        res.redirect('/users/errorLogin')// si no exite lo lleva a otra vista
    }

})


router.post('/registro', async (req, res) => {//CDO UNA EPROSNA SE REGISTRA GIARDA LA INF EN BD
    const newUser = await usersManager.createUser(req.body)
    if (newUser) {//si se creo el us lo redirecciono al home
        res.redirect('/')
    } else {
        res.redirect('/errorRegistro')// si ya exite lo lleva a otra vista
    }
})

export default router 