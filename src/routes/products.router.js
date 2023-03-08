import { Router } from "express";//para crear rutas fuera de server
import socketServer from '../server.js'

// -- // fileSystem // -- //
// import ProductManager from "../dao/fileManagers/ProductManager.js";

// -- // fileSystem // -- //
// const path = './files/products.json'

// -- // MongoDB // -- //
import ProductManager from "../dao/mongoManager/ProductManager.js";

const router = Router()

// -- // fileSystem // -- //
// const pm = new ProductManager(path)

// -- // MongoDB // -- //
const pm = new ProductManager()

//  Creo las distintas rutas:
//Ruta para buscar todos los productos:
router.get('/', async (req, res) => {//aca te llega inf por QUERY
    const resp = await pm.getProducts(req.query)//lo que este desp del ? es query. se pueden concatenar con & . http://localhost:8080/products?limit=2
    res.json(resp)// te envia la rta con los productos dentro de un objeto 
})


//Ruta para bucar un prod en particular:  http://localhost:8080/products/1 
router.get('/:idProduct', async (req, res) => {
    const { idProduct } = req.params // te llega la info por params, la desectruturamos para acceder a ella 
    const product = await pm.getProductById(idProduct)
    res.json({ product })// te envia la rta con el producto dentro de un objeto 
})

// ruta para agregar produto
router.post('/', async (req, res) => {
    const resp = pm.addProduct(req.body)//hago lo mismo en un paso. la inf la pasamos por body
    if (resp) {
        res.status(200).json({ message: `Producto ${req.body.title} agregado con exito` })//message y prod son props del objeto
        socketServer.emit('product-added', `Producto ${req.body.title} agregado con exito`)
    } else {
        console.log('error');
    }
})
/* ejemplo de body para llamar al post
{
    "title": "jabon ala plus",
    "description": "jabon ala plus",
    "code": "jabon-plus",
    "price": 1,
    "stock": 8,
    "category": "productos1",
    "thumbnails": ["imagen1.png","imagen2.png"]
  }
*/

// ruta para actualizar un produto
router.put('/', async (req, res) => {
    const resp = pm.updateProductById(req.body)
    if (resp) {
        res.status(200).json({ message: 'Prod actualizado con éxito', prod: req.body })
    } else {
        console.log('Error');
    }
})
/* ejemplo de body para llamar al put
{
"id": 5,
"data": {
    "title": "jabon ala plus",
    "description": "jabon ala plus",
    "code": "jabon-plus",
    "price": 1,
    "status": false,
    "stock": 0,
    "category": "productos1",
    "thumbnails": ["imagen1.png","imagen2.png"]
  }
}
*/

// ruta para eliminar produto
router.delete('/', async (req, res) => {
    const resp = pm.removeProductById(req.body.id)//paso el id  por BODY
    if (resp) {
        res.status(200).json({ message: 'Producto eliminado con éxito', prod: req.body })
        socketServer.emit('product-removed', `Producto ${req.body.id} eliminado con éxito`)
    } else {
        console.log('error');
    }
})
/* ejemplo de body para llamar al delete
{
    "id": 5
    }
*/
export default router

