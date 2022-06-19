const bcryptjs = require("bcryptjs");
const { redirect } = require("express/lib/response");
const router = require("../router/tutorRouter");

function index(req,res) {
    if(req.session.loggedin){ //Se confirma que existe un usuario logeado en el sistema, y si es si se adentra en el codigo
        req.getConnection((err,conn) => {
            conn.query('SELECT * FROM estudiantes', (err,admin) => { //Realización de consulta
                if (err){
                    res.json(err);
                }
                res.render('admin/index', { 
                    admin:admin,//Se exportan los datos de la base de datos
                    subtitle: 'Estudiantes Registrados',//"variables" para agregar a html por medio del motor de plantillas EJS
                    title: 'Registros Administracion' 
                })
            })
        })
    }else{
        res.redirect('/login') //Si el usuario no está autenticado es regresado a login
    }
}
function store(req,res) {
    if(req.session.loggedin){
        const datosAdmin = req.body;
        req.getConnection((err,conn) => {
            conn.query('INSERT INTO estudiantes SET ?;', [datosAdmin],(err,rows) => {
                res.redirect('/admin')
                //console.log(datosAdmin)
            })
        })
    }else{
        console.log('No se ha Iniciado Session')
        res.redirect('login')}
}

function subirENF(req,res){
            const datosSubirEnfermeria = req.body;
            req.getConnection((err,conn)=>{
                conn.query('INSERT INTO datos_enfermeria SET ?;', [datosSubirEnfermeria], (err,rows)=>{
                    res.redirect('/admin')
                    console.log(datosSubirEnfermeria)
                });
            });
};



function create(req,res) {
    res.render('admin/nuevoRegistro', {
        title: 'Nuevo Registro'
    })
};

function borrar(req,res){
    const id = req.body.id;
    req.getConnection((err,conn)=>{
        conn.query('DELETE FROM estudiantes WHERE id_estudiante = ?',[id],(err,rows)=>{
            res.redirect('/admin')
        })
    })
}

function editar(req,res) {
    if(req.session.loggedin){
     const idEdit = req.params.id
        req.getConnection((err,conn) => {
            conn.query('SELECT * FROM estudiantes WHERE id_estudiante = ?', [idEdit], (err,admin) => {
                if(err){
                    res.json(err);
                }
                res.render('admin/editarRegistro', {
                    admin:admin,
                    title: 'Editar Registro ' + idEdit
                })
            })
        })
    }else{
        console.log('No se ha Iniciado Session')
        res.redirect('login')}
}

function actualizar(req,res) {
    const idEdit = req.params.id
    const datosAdmin = req.body
    req.getConnection((err,conn)=>{
        conn.query('UPDATE estudiantes SET ? WHERE id_estudiante= ?', [datosAdmin, idEdit], (req,rows)=>{
            res.redirect('/admin')
        })
    })
}

//VER ESTUDIANTES CATEGORIAS
function indexEduIni(req,res) {
    if(req.session.loggedin){
        req.getConnection((err,conn) => {
            conn.query('SELECT * FROM estudiantes WHERE seccion = "Educacion Inicial"', (err,admin) => {
                if (err){
                    res.json(err);
                }
                res.render('admin/index', {
                    admin:admin,
                    subtitle: 'Estudiantes de Eduación Inicial',
                    title: 'Registros Administracion'
                })
            })
        })
    }else{
        console.log('No se ha Iniciado Session')
        res.redirect('login')}
}

function indexPre(req,res) {
    if(req.session.loggedin){
        req.getConnection((err,conn) => {
            conn.query('SELECT * FROM estudiantes WHERE seccion = "Preescolar"', (err,admin) => {
                if (err){
                    res.json(err);
                }
                res.render('admin/index', {
                    admin:admin,
                    subtitle: 'Estudiantes de Preescolar',
                    title: 'Registros Administracion'
                })
            })
        })
    }else{
        console.log('No se ha Iniciado Session')
        res.redirect('login')}
}
function indexPri(req,res) {
    if(req.session.loggedin){
        req.getConnection((err,conn) => {
            conn.query('SELECT * FROM estudiantes WHERE seccion = "Primaria"', (err,admin) => {
                if (err){
                    res.json(err);
                }
                res.render('admin/index', {
                    admin:admin,
                    subtitle: 'Estudiantes Primaria',
                    title: 'Registros Administracion'
                })
            })
        })
    }else{
        console.log('No se ha Iniciado Session')
        res.redirect('login')}
}
function indexSec(req,res) {
    if(req.session.loggedin){
        req.getConnection((err,conn) => {
            conn.query('SELECT * FROM estudiantes WHERE seccion = "Secundaria"', (err,admin) => {
                if (err){
                    res.json(err);
                }
                res.render('admin/index', {
                    admin:admin,
                    subtitle: 'Estudiantes de Secundaria',
                    title: 'Registros Administracion'
                })
            })
        })
    }else{
        console.log('No se ha Iniciado Session')
        res.redirect('login')}
}

//CONFIGURACIONES

function settingContac(req,res){
    if(req.session.loggedin){
        req.getConnection((err,conn) => {
            conn.query('SELECT * FROM contacto', (err,setting) => {
                if (err){
                    res.json(err);
                }
                res.render('admin/settings', {
                    setting:setting,
                    subtitle: 'Estudiantes Registrados',
                    title: 'Configuraciones'
                })
            })
        })
    }else{
        console.log('No se ha Iniciado Session')
        res.redirect('login')}
}
function settingContacUpdate(req,res){
    const datosSettings = req.body;
    req.getConnection((err,conn) => {
        conn.query('UPDATE contacto SET ? WHERE id = ?', [datosSettings, datosSettings.id], (err,rows) => {
            res.redirect('/admin')
        })
    })
}
function borrarUser(req,res){
    const id_ = req.body.id_user
    req.getConnection((err,conn)=>{
        conn.query('DELETE FROM users WHERE id_user = ?',[id_],(err,rows)=>{
            res.redirect('/datos-setting-Usuarios')
        })
    })
}
async function passwordsDB(req,res){
   if(req.session.loggedin){
        req.getConnection((err,conn) => {
            conn.query('SELECT * FROM users;', (err,passwordsDB) => {
                if (err){
                    res.json(err);
                }
                res.render('admin/settingUsers', {
                    passwordsDB:passwordsDB,
                    title:'Configuracion de Usuarios'
                })
            })
        })
    }
    else{
        console.log('No se ha iniciado sesion')
        res.redirect('login')
    }
}
async function settingRegister( req,res){
    const user = req.body.user;
    const pass = req.body.pass;
    const passConfirm = req.body.passConfirm;
    const passwordHaash = await bcryptjs.hash(pass, 8)
    const bodyUser  = {user:user, pass:passwordHaash, passConfirm:passConfirm}
 //   const datosUser = req.body;
    req.getConnection((err,conn) => {
        conn.query('INSERT INTO users SET ?;',[bodyUser], (err,rows)=>{
            if (err){
                console.log(err)
            }
            else{
                res.redirect('/datos-setting-Usuarios')
            }
        })
    })
}

async function autenticate(req,res){
    const user = req.body.user;
    const pass = req.body.pass;
    let passwordHaash = await bcryptjs.hash(pass, 8);
    if(user && pass){
        req.getConnection((err,conn) => {
            conn.query('SELECT * FROM users WHERE user = ?', [user], async(err,results) => {
                if(results.length == 0 || !(await bcryptjs.compare(pass,results[0].pass))){
                    console.log('Inicio de Sesion Incorrecto Usuario: '+ user)
                    res.render('extras/login', {
                        alert:true,
                        alertTitle: 'Error al Logear',
                        alertMessage: "¡Password o User incorrectos!",
                        alertIcon: 'error',
                        showConfirmButton: true,
                        timer: 5000,
                        ruta:'login'
                    })
                }else{
                    console.log('Inicio de Session Correcto por:'+user)
                    req.session.loggedin = true
                    req.session.name = results[0].name
                    res.render('extras/login', {
                        alert:true,
                        alertTitle: 'Login correcto',
                        alertMessage: "¡Se ha logeado correctamente!",
                        alertIcon: 'success',
                        showConfirmButton:false,
                        timer:1500,
                        ruta:'seleccionarUsuario'
                    })
                }
            })

        })
    }
}
function logout (req,res){
    req.session.destroy(()=>{
        res.redirect('/')
    })
}

//MENSAJES

function adminMensajes(req,res) {
    if(req.session.loggedin){
        req.getConnection((err,conn) => {
            conn.query('SELECT idmensajes, @num2:=@num2+1 AS num,date_format(fecha, "%y/%m/%d - %h:%m:%s hrs") as fecha, nombre, mensaje, contacto FROM mensajes t,(SELECT @num2:=0) r  ORDER BY fecha DESC;', (err,adminMensajes) => {
                if (err){
                    res.json(err);
                }
                res.render('admin/mensajes', {
                    adminMensajes:adminMensajes,
                    subtitle: 'Estudiantes Registrados',
                    title: 'Registros Administracion',
                })
            })
       })
    }else{
        console.log('No se ha Iniciado Session')
        res.redirect('login')}
}
function borrarMensajes(req,res){
    const idmensajes = req.body.idmensajes;
    req.getConnection((err,conn)=>{
        conn.query('DELETE FROM mensajes WHERE idmensajes = ?',[idmensajes],(err,rows)=>{
            res.redirect('/admin-mensajes')
        })
    })
}





module.exports = {
    index:index,
    indexEduIni:indexEduIni,
    indexPre:indexPre,
    indexPri:indexPri,
    indexSec:indexSec,

    store:store,
    create:create,
    borrar:borrar,
    subirENF:subirENF,
    editar:editar,
    actualizar:actualizar,
    indexSec:indexSec,

    settingContac:settingContac,
    settingContacUpdate:settingContacUpdate,
    settingRegister:settingRegister,
    passwordsDB:passwordsDB,
    borrarUser:borrarUser,
    autenticate:autenticate,
    logout:logout,

    adminMensajes:adminMensajes,
    borrarMensajes:borrarMensajes,
}
