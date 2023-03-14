// archivo para el renderizzado de VISTAS
import { Router } from "express"; //importo router
import ProductManager from "../dao/mongoManager/ProductManager.js";


const router = Router()

const pm = new ProductManager()

router.get('/',async (req, res) => { // si llamo al slash views renderio formualrio
    // si el us no esta logeado
    if (req.session && !req.session.email) {
        res.redirect('/users/login')//redireccion a vista de login
    }
    
    // si esta logueado ,muestro home
     //TODO:mostrar nombre de us
    
    
    const prods = await pm.getProducts(req.query)
    res.render('productsList', { prods })//cdo estoy en / se va a renderizar el handlebars home
})

export default router 