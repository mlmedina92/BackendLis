import mongoose from 'mongoose'

const URI = 'mongodb+srv://lm30540:Montiel9@cluster0.fq2dase.mongodb.net/Ecommerce?retryWrites=true&w=majority'

mongoose.set("strictQuery", true);
mongoose.connect(URI, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log('conectado con exito a la b de datos');
    }
})