// archivo para el renderizzado de VISTAS
import { Router } from "express"; //importo router
import passport from "passport";

const router = Router()

//vistas
router.get('/login',(req,res)=>{
    res.render('login')//rederiza el hanldlebars login
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


//creo dos rutas que van a usar la estrategia de github. Es llamado desde el boton 
router.get('/registro-git', passport.authenticate('github', { scope: ['user:email'] }))//la rta con la q voy a ir a github

router.get('/github', passport.authenticate('github'), (req, res) => {
    req.session.userName = req.user.first_name
    req.session.email = req.user.email
    res.redirect('/')//cdo se registra a raves de github se va a la home
})

export default router 