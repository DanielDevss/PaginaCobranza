const { urlencoded } = require('express');
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const PassportLocal = require('passport-local').Strategy;
const app = express();


//Declaración de rutas
app.set('views', './src/views')
app.set('view engine', 'ejs');
// Ruta de archivos estaticos
app.use(express.static('./src/public'))


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


Fuente: https://www.iteramos.com/pregunta/15253/como-redirigir-404-errores-a-una-pagina-en-expressjs

app.get('/Usuarios', (req, res) => {
    res.render('extras/usersSelect', {
        title: 'Selecciona tu Usuario'
    })
});

app.get('/login', (req, res) => {
    res.render('login', {
        title: 'Autorización'
    })
});
app.get('/', (req, res) => {
    res.render('index', {
        title: 'HomePage',
        h1: 'home'
    });
})
/* RUTAS ADMINISTRADOR MICKY */
app.get('/admin', (req, res) => {
    res.render('admin/index', {
        title: 'Administrador'
    })
})

/* RUTAS ENFERMERIA SAYDEL */
app.get('/enfermeria', (req, res) => {
    res.render('enfermeria/registros', {
        title: 'Estudiantes regitrados'
    })
})
app.get('/enfermeria/datos', (req, res) => {
    res.render('enfermeria/registros', {
        title: 'Informacion de alumno'
    })
})

/* RUTAS TUTORADOS  NOE*/
app.get('/tutor/', (req, res) => {
    res.render('/tutor/home', {
        title: 'Home Page'
    })

//Otras Rutas
app.get('*', (req,res) => {
    res.render('error404')
  })
})