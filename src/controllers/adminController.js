const { redirect } = require("express/lib/response");
const router = require("../router/tutorRouter");

function index(req,res) {
    req.getConnection((err,conn) => {
        conn.query('SELECT * FROM estudiantes', (err,admin) => {
            if (err){
                res.json(err);
            }
            res.render('admin/index', {
                admin:admin
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
    res.render('admin/nuevoRegistro')
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
                admin:admin
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

module.exports = {
    index:index,
    store:store,
    create:create,
    borrar:borrar,
    subirENF:subirENF,
    editar:editar,
    actualizar:actualizar
}
