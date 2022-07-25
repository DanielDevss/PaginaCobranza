const { urlencoded } = require('express');
const express = require('express');
const myconnection = require('express-myconnection');
const mysql = require('mysql')
const session = require('express-session');
const bcryptjs = require('bcryptjs')
const bodyParser = require('body-parser')
const app = express();
const pdf = require('html-pdf')
//STRIPE
const stripe = require('stripe')('sk_test_51L8pPNJpziZXWqtXkwB7vjzgcgYdhhPIBp9wPy98uUv2zJd7K73JaEX9HHvJbsbFawO2ZuMUp1KPnBGcJNGNeFol00WPOxShAd');

const tutorRoutes = require('./router/tutorRouter')
const adminRoutes = require('./router/adminRouter')
const enfermeriaRoutes = require('./router/enfermeriaRouter')

//PARA BASES DE DATOS

// * Declaración de rutas
app.set('views', './src/views')
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(bodyParser.json());

// * Ruta de archivos estaticos
app.use(express.static('./src/public'))

// !CONEXIÓN DE LA BASE DE DATOS
app.use(myconnection(mysql,{
    host: process.env.DB_HOST || '162.241.61.130',
    user: process.env.DB_USER || 'centr287_root',
    password: process.env.DB_PASS || '9nA_nB+WBD08',
   // port: 3306,
    database: process.env.DB_NOMBRE ||'centr287_centroculturaldepetatlan'
}))

// NOTE Configuración de Express session
app.use(session({
    secret:'secret',
    resave:true,
    saveUninitialized:true
}))

// ! Configuración del Servidor
const host = process.env.HOST || '0.0.0.0'; //En caso de no tener un host se asignara el host 0.0.0.0
const port = process.env.PORT || 3000; //En caso de no tener un post se asignara el puerto 3000

app.listen(port, host, () => {
    console.log('Servidor funcionando en el puerto: ', port);
});

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


/**  ANCHOR VISTAS DE ADMIN, TUTORES Y ENFERMERIA **/
app.use('/', adminRoutes);
app.use('/', enfermeriaRoutes);
app.use('/', tutorRoutes);

// * Otras Rutas
app.get('/seleccionarUsuario', (req, res) => {
    if(req.session.loggedin){
        res.render('extras/usersSelect',{
            title:"Selector de Rol"
        })
    }else{
        res.redirect('login')
    }
});
app.get('*', (req,res) => {
    res.render('extras/error404')
});
