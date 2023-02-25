import { Router } from "express";

// -- // fileSystem // -- //
// import CartManager from "../dao/fileManagers/CartManager.js";
// const path = './files/carts.json'


// -- // MongoDB // -- //
import CartManager from "../dao/mongoManager/CartManager.js";

const router = Router()

// -- // fileSystem // -- //
// const cm = new CartManager(path) 

// -- // MongoDB // -- //
const cm = new CartManager()


// creo un solo carrito con un id especifico y lo agrega al array de carritos
router.post('/', async (req, res) => {
    const newCart = await cm.createCart()
    res.status(200).json({ message: 'carrito creado con éxito', cart: newCart })//lo ve el cliente a este json(Ej thunderClient)
})

// traer todos los productos de un carrito
router.get('/:cid', async (req, res) => { //se lo paso x params
    const { cid } = req.params
    const cart = await cm.getCartById(cid)//traigo un solo carrito. entra a la prop product del obj cart
    res.status(200).json({ message: 'productos del carrito ' + cid, prods: cart.products })
})

// almaceno un porducto en un carrito que ya tengo creado
router.post('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params//recibe inf por params 
    const { quantity } = req.body//recibe inf por body

    const cart = await cm.addToCart(cid, pid, parseInt(quantity))
    res.status(200).json({ message: 'carrito actualizado ', cart: cart })
})

/*
{
    id: 0, autoincremental como los productos
    products: [
        {
            quantity: number,
            product: { objeto tipo producto }
        }
    ]
}
*/

export default router