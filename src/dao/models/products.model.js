import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'


const productsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique:true,
  },
  price: {
    type: Number,
    required: true,
  },
  status: {
    type: Boolean,
  },
  stock: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  thumbnails: {
    type: Array,
  }
});

productsSchema.plugin(mongoosePaginate) //le digo al esquema q va a usar el pluggin de mongoose paginate
export const productsModel = mongoose.model("products", productsSchema);
