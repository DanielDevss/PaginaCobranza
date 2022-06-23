const stripe = require('stripe')('sk_test_51L8pPNJpziZXWqtXkwB7vjzgcgYdhhPIBp9wPy98uUv2zJd7K73JaEX9HHvJbsbFawO2ZuMUp1KPnBGcJNGNeFol00WPOxShAd');
const YOUR_DOMAIN = "http://localhost:3000";

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

function homepage(req, res){
    res.render('tutor/home',{
        title:'HomePage'
    })
}
function help(req, res){
    res.render('tutor/ayuda', {
        title:'Ayuda'
    })
}

async function pagar(req,res){
    const id_student = req.params.id
    console.log(id_student)
    const session = await stripe.checkout.sessions.create({
        line_items:[
            {
                price: 'price_1LBZgjJpziZXWqtXSuu7XbnU',
                quantity: 1
            },
        ],
        payment_method_types:['card', 'oxxo'],
        mode: 'payment',
        success_url: `${YOUR_DOMAIN}/SubirData/`+id_student,
        cancel_url: `${YOUR_DOMAIN}/NoPagado`,
    });
    res.redirect(303, session.url);
}

function subirData (req,res){
    const id_student = req.params.id_student
    console.log('El usuario: ',id_student,' a pagado su colegiatura')
    res.redirect('/');
}

function pagado(req,res){
    res.render('tutor/success')
};
function pagoCancelado(req,res){
    res.render('tutor/pagoCancelado')
}

module.exports = {
    index:index,
    indexEduInc:indexEduInc,
    indexPre:indexPre,
    indexPri:indexPri,
    indexSec:indexSec,

    homepage:homepage,
    help:help,

    redesContactanos:redesContactanos,
    enviarMessage:enviarMessage,
    
    pagar:pagar,
    pagado:pagado,
    pagoCancelado:pagoCancelado,

    subirData:subirData,

}