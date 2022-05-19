function index(req,res) {
    const datos = req.body
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM vista_tutores', (err, tutor) => {
            if(err){
                res.json(err);
            }
            res.render('tutor/estudiantes', {
                tutor:tutor,
                title: 'Estudiantes Registrados',
                subtitle: 'Estudiantes Registrados'
            })
        })
    })
}
function indexEduInc(req,res) {
    const datos = req.body
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM vista_tutores WHERE seccion = "Educacion Inicial"', (err, tutor) => {
            if(err){
                res.json(err);
            }
            res.render('tutor/estudiantes', {
                tutor:tutor,
                title: 'Estudiantes Registrados',
                subtitle: 'Estudiantes de Educación Inicial'
            })
        })
    })
}
function indexPre(req,res) {
    const datos = req.body
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM vista_tutores WHERE seccion = "Preescolar"', (err, tutor) => {
            if(err){
                res.json(err);
            }
            res.render('tutor/estudiantes', {
                tutor:tutor,
                title: 'Estudiantes Registrados',
                subtitle: 'Estudiantes de Preescolar'
            })
        })
    })
}
function indexPri(req,res) {
    const datos = req.body
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM vista_tutores WHERE seccion = "Primaria"', (err, tutor) => {
            if(err){
                res.json(err);
            }
            res.render('tutor/estudiantes', {
                tutor:tutor,
                title: 'Estudiantes Registrados',
                subtitle: 'Estudiantes de Primaria'
            })
        })
    })
}
function indexSec(req,res) {
    const datos = req.body
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM vista_tutores WHERE seccion = "Secundaria"', (err, tutor) => {
            if(err){
                res.json(err);
            }
            res.render('tutor/estudiantes', {
                tutor:tutor,
                title: 'Estudiantes Registrados',
                subtitle: 'Estudiantes de Secundaria'
            })
        })
    })
}

function redesContactanos(req,res) {
    const datos = req.body
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM contacto', (err, tutorContactos) => {
            if(err){
                res.json(err);
            }
            res.render('tutor/contacto', {
                tutorContactos:tutorContactos,
                title: 'Estudiantes Registrados',
                subtitle: 'Estudiantes Registrados'
            })
        })
    })
}
function enviarMessage(req, res) {
    const datosMensaje = req.body;
    req.getConnection((err,conn) => {
        conn.query('INSERT INTO mensajes SET ?;', [datosMensaje],(err,rows) => {
            res.redirect('/')
        })
    })
    console.log(datosMensaje)
}


module.exports = {
    index:index,
    indexEduInc:indexEduInc,
    indexPre:indexPre,
    indexPri:indexPri,
    indexSec:indexSec,

    redesContactanos:redesContactanos,
    enviarMessage:enviarMessage,
}