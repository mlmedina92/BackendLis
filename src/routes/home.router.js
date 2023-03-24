// archivo para el renderizzado de VISTAS
import { Router } from "express"; //importo router
import ProductManager from "../dao/mongoManager/ProductManager.js";


const router = Router()

const pm = new ProductManager()

router.get('/', async (req, res) => { // si llamo al slash views renderio formualrio
    // si el us no esta logeado
    if (req.session && !req.session.email) {
        res.redirect('/users/login')//redireccion a vista de login
    } else {
        // si esta logueado ,muestro home
        const prods = await pm.getProducts(req.query)
        res.render('productsList', { 'prods': prods.payload, 'isAdminRole': req.session.role == 'admin', 'userName': req.session.userName })//cdo estoy en / se va a renderizar el handlebars home
    }
})

export default router 