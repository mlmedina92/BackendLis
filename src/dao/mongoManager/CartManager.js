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
      const cart = await cartsModel.findById(cid);

      // me fijo si el carrito esta creado
      if (!!cart) {

        const prod = cart.products.find(e => e.productId === pid)

        // despues me fijo que el producto ya exista en el carrito
        if (!!prod) {
          const update = cart.products.map(prod => {
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
        return { error: "Carrito no encontrado" };
      }
    } catch (err) {
      console.log(err);
    }
  }

  // async deleteFromCart(cid, pid) {
  //   try {
  //     const cart = await cartsModel.findById(cid);

  //     // me fijo si el carrito esta creado
  //     if (!!cart) {
  //       cart.products.deleteOne(pid)

  //     }

  //   } catch (error) {
  //     console.log(err);
  //   }
  // }
}
