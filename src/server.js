const { urlencoded } = require('express');
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const PassportLocal = require('passport-local').Strategy;
const app = express();

//RUTAS
const tutorRoutes = require('./router/tutorRouter')
const adminRoutes = require('./router/adminRouter')
const enfermeriaRoutes = require('./router/enfermeriaRouter')

//PARA BASES DE DATOS
const myconnection = require('express-myconnection');
const mysql = require('mysql')
const bodyParser = require('body-parser')


//Declaración de rutas
app.set('views', './src/views')
app.set('view engine', 'ejs');
// Ruta de archivos estaticos
app.use(express.static('./src/public'))

// !CONEXIÓN DE LA BASE DE DATOS
app.use(bodyParser.json());
app.use(myconnection(mysql,{
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'proyectoccp'
}));

// NOTE Configuración del Servidor
const host = process.env.HOST || '0.0.0.0'; //En caso de no tener un host se asignara el host 0.0.0.0
const port = process.env.PORT || 3000; //En caso de no tener un post se asignara el puerto 3000

app.listen(port, host, () => {
    console.log('Servidor funcionando en el puerto: ', port);
});

//ANCHOR AUTENTICACION DE LOGIN
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser('secret'));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new PassportLocal(function(username, password, done) {
    if (username === 'administración' && password === '12#admin_CCP')
        return done(null, { id: 1, name: "Cody" });
    done(null, false);
}));

//serealizacion
passport.serializeUser(function(user, done) {
        done(null, user.id);
    })
    //desearealización
passport.deserializeUser(function(id, done) {
    done(null, { id: 1, name: "Cody" });
})
app.post('/login', passport.authenticate('local', {
    successRedirect: "/administrador",
    failureRedirect: "/login"
}));

// *NOTE Rutas de vistas dentro
//app.get('/administrador', (req,res,next) => {
//    if(req.isAuthenticated()) return next();
//res.redirect('/login')
//},(req,res)=>{
//res.render('./admin/index-admin')
//});
//app.get('/enfermeria', (req,res,next) => {
//    if(req.isAuthenticated()) return next();
//    res.redirect('/login')
//}, (req,res) =>{
//    res.render('./enfermeria/index-enfermeria')
//})


//Fuente: https://www.iteramos.com/pregunta/15253/como-redirigir-404-errores-a-una-pagina-en-expressjs


app.get('/Usuarios', (req, res) => {
    res.render('extras/usersSelect', {
        title: 'Selecciona tu Usuario'
    })
});

app.get('/login', (req, res) => {
    res.render('extras/login', {
        title: 'Autorización'
    })
});


/* RUTAS ADMINISTRADOR MICKY */
app.use('/', adminRoutes);

/* RUTAS ENFERMERIA SAYDEL */


app.use('/', enfermeriaRoutes);

app.get('/enfermeria/editar-Registro', (req, res) => {
    res.render('enfermeria/editar', {
        title: 'Editar Registro'
    })
})
app.get('/enfermeria/ver-Registro', (req,res) => {
    res.render('enfermeria/ver', {
        title: 'Información Alumno'
    })
})
/* RUTAS TUTORADOS  NOE*/

app.use('/', tutorRoutes);

app.get('/', (req,res) => {
    res.render('tutor/home', {
        title: 'HomePage'
    })
})
app.get('/ayuda', (req,res) =>{
    res.render('tutor/ayuda', {
        title:'Ayuda'
    })
})
//Otras Rutas
app.get('*', (req,res) => {
    res.render('extras/error404')
});