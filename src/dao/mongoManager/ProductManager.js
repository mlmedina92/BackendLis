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
  async getProducts(queryParams) { //recibe objeto query y destructura sus props
    const { page = 1, limit = 10, category = null, stock = null, sort = null } = queryParams //si arranca en null no hace nada

    let query = {}
    if (category) { // ej: http://localhost:3000/api/products?category=categorria2 
      query.category = category;
    }
    if (stock) { // ej: http://localhost:3000/api/products?stock=0 . Esto retorna todos los prod con stock 
      query.stock = { $gt: stock } // muestra los resultados que sea >= al param que viene
    }

    // ejemplo precio asc http://localhost:3000/api/products?sort=price
    // ejemplo precio desc http://localhost:3000/api/products?sort=-price

    const myCustomLabels = {
      docs: 'payload'
    };

    // status:success/error
    // payload: Resultado de los productos solicitados
    // totalPages: Total de páginas
    // prevPage: Página anterior
    // nextPage: Página siguiente
    // page: Página actual
    // hasPrevPage: Indicador para saber si la página previa existe
    // hasNextPage: Indicador para saber si la página siguiente existe.
    // prevLink: Link directo a la página previa (null si hasPrevPage=false)
    // nextLink: Link directo a la página siguiente (null si hasNextPage=false)


    const prods = await productsModel.paginate(query, { page, limit, sort, customLabels: myCustomLabels });

    const status = prods !== 'error' ? 'success' : 'error' // como seria????
    const prevLink = prods.hasPrevPage ? `http://localhost:3000/api/products?page=${prods.prevPage}` : null
    const nextLink = prods.hasNextPage ? `http://localhost:3000/api/products?page=${prods.nextPage}` : null

    return { ...prods, status: status, prevLink: prevLink, nextLink: nextLink };
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
