import mongoose from "mongoose";

const cartsSchema = new mongoose.Schema({
    products: []
})

export const cartsModel = mongoose.model('Carts', cartsSchema)