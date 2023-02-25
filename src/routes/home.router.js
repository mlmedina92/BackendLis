// archivo para el renderizzado de VISTAS
import { Router } from "express"; //importo router
import ProductManager from "../dao/fileManagers/ProductManager.js";

const path = './files/products.json' // archivo donde se guardan los prod

const router = Router()

const pm = new ProductManager(path)

router.get('/',async (req, res) => { // si llamo al slash views renderio formualrio
    const prods = await pm.getProducts(req.query)
    res.render('productsList', { prods })//cdo estoy en / se va a renderizar el handlebars home
})

export default router 