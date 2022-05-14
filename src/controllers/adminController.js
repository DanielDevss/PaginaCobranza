const { redirect } = require("express/lib/response");
const router = require("../router/tutorRouter");

function index(req,res) {
    req.getConnection((err,conn) => {
        conn.query('SELECT * FROM estudiantes', (err,admin) => {
            if (err){
                res.json(err);
            }
            res.render('admin/index', {
                admin:admin,
                subtitle: 'Estudiantes Registrados',
                title: 'Registros Administracion'
            })
        })
    })
}
function store(req,res) {
    const datosAdmin = req.body;
    req.getConnection((err,conn) => {
        conn.query('INSERT INTO estudiantes SET ?;', [datosAdmin],(err,rows) => {
            res.redirect('/admin')
        })
    })
    console.log(datosAdmin)
}

function subirENF(req,res){
    const datosSubirEnfermeria = req.body;
    req.getConnection((err,conn)=>{
        conn.query('INSERT INTO datos_enfermeria SET ?;', [datosSubirEnfermeria], (err,rows)=>{
            res.redirect('/admin')
        })
    })
    console.log(datosSubirEnfermeria)
}

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
}

function indexPre(req,res) {
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
}
function indexPri(req,res) {
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
}
function indexSec(req,res) {
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
    indexSec:indexSec
}
