import express from "express";
import session from "express-session"; //modulo session:seteo las config de la session(QUE INF SE VA A GUARDAR)
import { __dirname } from "./utils.js";
import handlebars from "express-handlebars";
import cartsRouter from "./routes/carts.router.js";
import producstRouter from "./routes/products.router.js";
import homeRouter from "./routes/home.router.js";
import chatRouter from "./routes/chat.router.js";
import usersRouter from "./routes/users.router.js";
import apiUsersRouter from "./routes/api.users.router.js";
import realTimeProductsRouter from "./routes/realTimeProducts.router.js";
import { Server } from "socket.io";
import MessageManager from "./dao/mongoManager/MessageManager.js"; // TODO meter la clase en chat.router.js
import mongoStore from "connect-mongo"
import "./dao/dbConfig.js";

//Creacion del servidor
const app = express();
const PORT = 3000;

console.log(__dirname); //Brinda el path exacto para acceder a la carpeta PUBLIC

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));


// momngo session almacenar en BD
app.use(
  session({ //configuro el storage de session en mongo
      secret: 'sesionKey',
      resave: false,
      saveUninitialized: true,
      cookie: { maxAge: 30000 },
      store: new mongoStore({//ahora creo un new mongostore no filestore
          mongoUrl: 'mongodb+srv://lm30540:Montiel9@cluster0.fq2dase.mongodb.net/Ecommerce?retryWrites=true&w=majority' //le apso la url
      }),
  })
)

// Configurar handlebars
app.engine("handlebars", handlebars.engine()); //solo para handlebars.
app.set("views", __dirname + "/views"); //Ubicación de carpeta vistas
app.set("view engine", "handlebars"); //Qué motor de plantilla uso

// rutas
app.use("/api/products", producstRouter); //cdo llamo a ruta /api/products traer los prods en un json
app.use("/api/carts", cartsRouter);//cdo es /api son servicios
app.use("/", homeRouter);//renderiza los prods
app.use("/realTimeProducts", realTimeProductsRouter); 
app.use('/chat', chatRouter)
app.use('/api/users', apiUsersRouter)//servicios: son los llamados a la api
app.use('/users', usersRouter) //vistas 


//El servidor escucha al puerto
const httpServer = app.listen(PORT, () => {
  console.log(`Escuchando al puerto ${PORT}`);
});

//servidor socketServer
const socketServer = new Server(httpServer);

const mm = new MessageManager(); // TODO

//Emicion de eventos para el chat
socketServer.on("connection", (socket) => {
  socket.on("show", async () => {
    const getAll = await mm.getMsgs();
    socket.emit("loadMsg", getAll);
  });

  socket.on("sendInfo", async (e) => {
    const sendMsg = await mm.sendMsg(e);
    const getAll = await mm.getMsgs();
    socket.emit("sendMsg", sendMsg);
    socket.emit("loadMsg", getAll);
  });
});

export default socketServer;
