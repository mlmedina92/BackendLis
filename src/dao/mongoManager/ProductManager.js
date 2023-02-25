import { productsModel } from "../models/products.model.js";

export default class ProductManager {
  async addProduct({
    title,
    description,
    code,
    price,
    status = true,
    stock,
    category,
    thumbnails,
  }) {
    const addProd = await productsModel.create({
      title: title,
      description: description,
      code: code,
      price: price,
      status: status,
      stock: stock,
      category: category,
      thumbnails: thumbnails,
    });
    return addProd;
  }

  // consultar todos
  async getProducts(query) {
    const prods = await productsModel.find({});
    if (query) {
      const { limit } = query;
      if (limit) {
        return prods.splice(0, limit);
      }
    }
    return prods;
  }

  async getProductById(id) {
    try {
      const getById = await productsModel.findById(id);
      return getById;
    } catch (err) {
      console.log(err);
    }
  }

  async updateProductById(prodToUpdate) {
    const {
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnails,
    } = prodToUpdate.data;

    const found = await this.getProductById(prodToUpdate.id);

    found.title = title;
    found.description = description;
    found.code = code;
    found.price = price;
    found.status = status;
    found.stock = stock;
    found.category = category;
    found.thumbnails = thumbnails;

    const update = await productsModel.findOneAndUpdate(
      { _id: prodToUpdate.id },
      {
        $set: found,
      }
    );

    return update;
  }

  async removeProductById(id) {
    try {
      const deleted = await productsModel.findByIdAndDelete(id);
      return deleted;
    } catch (err) {
      console.log(err);
    }
  }
}
