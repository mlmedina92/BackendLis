import fs from 'fs'

export default class CartManager {
    constructor(path) { //cdo alguien creee una instancia, un objeto, tiene q pasar la ruta de donde se va a guardar esa inf que nos envien
        this.path = path
        this.carts = []
    }

    async saveFile() {
        //Guardo o sobreescribo el archivo
        await fs.promises.writeFile(this.path, JSON.stringify(this.carts, null, 2), 'utf-8')
        console.log(this.path, ' guardado con exito')
    }

    async readFile() {
        // Leer la inf del archivo 
        try {
            if (!fs.existsSync(this.path)) {
                console.log('Error: archivo no encontrado', this.path);
                return false;
            }

            const data = await fs.promises.readFile(this.path, 'utf-8')
            this.carts = JSON.parse(data) //la data que trae la prom la guardo en mi obj 
            console.log(this.path, ' leido con exito')
            return this.carts
        } catch (error) {
            console.log('Error: ', error)
        }

        return false;
    }

    async createCart() {
        // api/carts
        await this.readFile() //retorna el arreglo de prods

        const newCart = {
            "id": this.carts.length,
            "products": []
        }

        this.carts.push(newCart)//carts es el arreglo de carritos

        this.saveFile()

        return newCart
    }

    async getCartById(id) {
        // api/cart/1
        await this.readFile()

        const cart = this.carts.find((cart) => cart.id === id)

        if (!cart) {//si no lo encuentra
            console.log('el carrito ' + id + ' no se encontró')
            return false
        }

        return cart
    }

    async addToCart(cid, pid, quantity) {
        const cart = await this.getCartById(cid) //trae un solo carrito [{},{}]

        if (!cart) {
            return false
        }

        const prodInCart = cart.products.find((prodInCart) => prodInCart.productId === pid)

        if (prodInCart) {//si existe el producto
            prodInCart.quantity += quantity
        } else {//si no lo agrega
            cart.products.push({
                "productId": pid,
                "quantity": quantity
            })
        }

        this.saveFile()

        console.log('Carrito actualizado con éxito');
        return cart
    }
}
