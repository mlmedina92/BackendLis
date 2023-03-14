// archivo para el renderizzado de VISTAS
import { Router } from "express"; //importo router

const router = Router()

//vistas
router.get('/login',(req,res)=>{
    res.render('login')
})
router.get('/registro',(req,res)=>{
    res.render('registro')
})

router.get('/errorRegistro',(req,res)=>{
    res.render('errorRegistro')
})

router.get('/errorLogin',(req,res)=>{
    res.render('errorLogin')
})

export default router 