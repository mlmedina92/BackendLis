import { cartsModel } from "../models/carts.model.js";

export default class CartManager {
  async readFile() {
    const read = await cartsModel.find({});
    return read;
  }

  async createCart() {
    try {
      const create = await cartsModel.create({
        products: [],
      });
      return create;
    } catch (err) {
      console.log(err);
    }
  }

  async getCartById(id) {
    try {
      const getId = await cartsModel.findById(id);
      return getId;
    } catch (err) {
      console.log(err);
    }
  }

  async addToCart(cid, pid, quantity) {
    try {
      const getId = await cartsModel.findById(cid);
      
      // me fijo si el carrito esta creado
      if (!!getId) {

        const getProd = getId.products.find(e => e.productId === pid)

        // despues me fijo que el producto ya exista en el carrito
        if (!!getProd) {
          const update = getId.products.map(prod => {
            if (prod.productId == pid) {
              prod.quantity += quantity
            }
            return prod
          })
          return await cartsModel.findByIdAndUpdate(cid, { products: update })
        } else {
          const addProd = await cartsModel.findOneAndUpdate(
            { _id: cid },
            { $push: { products: { productId: pid, quantity: quantity } } }
          );
          return addProd
        }
      } else {
        return { error: "carrito no encontrado" };
      }
    } catch (err) {
      console.log(err);
    }
  }
}
