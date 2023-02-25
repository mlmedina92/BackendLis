import { Router } from "express";//para crear rutas fuera de server
// import socketServer from '../server.js'

const router = Router()
 
router.get('/',(req,res)=>{
    res.render('realTimeProducts')
})

export default router
