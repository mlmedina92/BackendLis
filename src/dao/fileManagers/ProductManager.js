//Creamos la clase que tiene todas las funcionalidades:crear un us,eliminarlo. Esta inf se va a guardar en archivos objetos , ACA DEFINIMOS TODA LA FUNCIONALIDAD

import fs from 'fs' // para poder trabajar con archivos

//creo la clase
export default class ProductManager {
    constructor(path) { //cdo alguien creee una instancia un objeto, tiene q pasar la ruta de donde se va a guardar esa inf que nos envien
        this.path = path
        this.products = [];

    }
    async saveFile() {
        //Guardo o sobreescribo el archivo q guarda los productos
        await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2), 'utf-8')
        console.log(this.path, ' Guardado con éxito')
    }

    async readFile() {
        // Leer la inf del archivo 
        try {
            if (!fs.existsSync(this.path)) {//si es diferente a que exista
                console.log('Error: archivo no encontrado', this.path);
                return false;
            }

            const data = await fs.promises.readFile(this.path, 'utf-8')
            this.products = JSON.parse(data) //la data que trae la prom la guardo en mi obj 
            console.log(this.path, ' leído con éxito')
            return this.products
        } catch (error) {
            console.log('Error: ', error)
        }

        return false;
    }

    async addProduct({ title, description, code, price, status = true, stock, category, thumbnails }) {//le llega un obj c esas props
        // validar que todos los campos existan 

        if (!title || !description || !code || !price || !stock || !category) {
            console.log('Todos los parametros son obligatorios')
            return false;
        }

        await this.getProducts() // leo todos los prods del archivo y lo guardo en this.products

        // validar que el producto no exista en el array de productos
        const found = this.products.find((product) => product.code == code);//si existe se corta
        if (found) {
            console.log("El producto ya existe");
            return false;
        }

        // si  tiene todos los param, tiene valor y el prod no existe, lo agrega
        const id = this.products.length;// definir el id del producto
        this.products.push({ //al array products le pushea el objeto con los valores que te llegan por params
            'id': id,
            'title': title,
            'description': description,
            'code': code,
            'price': price,
            'status': status,
            'stock': stock,
            'category': category,
            'thumbnails': thumbnails
        });

        await this.saveFile() //actualizo el archivo con el nuevo producto cargado

        console.log('Producto agregado');
        return true;
    }

    // consultar todos 
    async getProducts(query) {
        const prods = await this.readFile();// si funciono nos da un array de obj productos
        if (query) {
            const { limit } = query
            if (limit) {
                return prods.splice(0, limit) // para obtener un pedazo de un arreglo
            }
        }
        return prods
    }

    // consultar uno
    async getProductById(id) {
        const prods = await this.getProducts() // nos trae array de objetos productos
        if (!prods) {
            return false
        }
        const found = prods.find((product) => product.id === id)
        if (found) {
            return found; //retorna el objeto enocntrado
        }
        console.log('Producto no encontrado')
        return false;
    }

    async updateProductById(prodToUpdate) {
        await this.getProducts() // leo todos los prods del archivo y lo guardo en this.products

        // prodToUpdate = {id, data:{ title, description, code, price, status, stock, category, thumbnails }}
        // se pasa un objeto completo con todos los valores en la variable
        const { title, description, code, price, status, stock, category, thumbnails } = prodToUpdate.data; //data es una prop de prodToUpdate

        //valido si existe el producto en el arreglo 
        const found = this.products.find((product) => product.id == prodToUpdate.id) //id es la primer prop de prodToUpdate esto me tare solo UN OBJETO

        if (!found) { //si no existe
            return false;
        }

        //si existe el prod ,valido que los campos no esten vacios
        if (!title || !description || !code || !price || status === undefined || (!stock && stock < 0) || !category || !thumbnails) {
            console.log('Todos los parametros son obligatorios')
            return false;
        }

        //Actualizar EL producto en el arreglo que encontrooc find
        found.title = title;
        found.description = description;
        found.code = code;
        found.price = price;
        found.status = status;
        found.stock = stock;
        found.category = category;
        found.thumbnails = thumbnails;

        await this.saveFile() //actualizo el archivo BD
        console.log('Producto actualizado')
        return true;
    }

    async removeProductById(id) {
        await this.getProducts() // leo todos los prods del archivo y lo guardo en this.products

        //valido si existe el producto. 
        const found = this.products.find((product) => product.id == id)
        if (!found) { //si no existe
            return false;
        }

        // borro el elemento [id]
        this.products.splice(id, 1);//splice:modifica el [] original

        this.saveFile() //actualizo el archivo

        console.log('Producto ha sido eliminado con éxito')
        return true;
    }
}