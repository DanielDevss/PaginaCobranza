const stripe = require('stripe')('sk_test_51L8pPNJpziZXWqtXkwB7vjzgcgYdhhPIBp9wPy98uUv2zJd7K73JaEX9HHvJbsbFawO2ZuMUp1KPnBGcJNGNeFol00WPOxShAd');
const YOUR_DOMAIN = "http://localhost:3000";

function index(req,res) {
    const datos = req.body
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM estudiantes', (err, tutor) => {
            if(err){
                res.json(err);
            }
            res.render('tutor/estudiantes', {
                tutor:tutor,
                total:tutor.length,
                title: 'Estudiantes Registrados',
                subtitle: 'Estudiantes Registrados'
            })
        })
    })
}
function indexEduInc(req,res) {
    const datos = req.body
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM estudiantes WHERE seccion = "Educacion Inicial"', (err, tutor) => {
            if(err){
                res.json(err);
            }
            res.render('tutor/estudiantes', {
                tutor:tutor,
                total:tutor.length,
                title: 'Estudiantes Registrados',
                subtitle: 'Estudiantes de Educación Inicial'
            })
        })
    })
}

function colegiaturasCajaTutor(req, res){
    const id_alumno = req.params.id
    const datosCol = req.body
    req.getConnection((req,conn) => {
        conn.query('SELECT * FROM alumnos_colegiaturas WHERE matricula = ?', [id_alumno], (err, colegiatura) => {
            if(err){
                res.json(err);
            }
            //console.log(colegiatura)
            res.render('tutor/colegiaturas', {
                colegiatura: colegiatura
            })
        })
    })
}

function indexPre(req,res) {
    const datos = req.body
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM estudiantes WHERE seccion = "Preescolar"', (err, tutor) => {
            if(err){
                res.json(err);
            }
            res.render('tutor/estudiantes', {
                tutor:tutor,
                total:tutor.length,
                title: 'Estudiantes Registrados',
                subtitle: 'Estudiantes de Preescolar'
            })
        })
    })
}
function indexPri(req,res) {
    const datos = req.body
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM estudiantes WHERE seccion = "Primaria"', (err, tutor) => {
            if(err){
                res.json(err);
            }
            res.render('tutor/estudiantes', {
                tutor:tutor,
                total:tutor.length,
                title: 'Estudiantes Registrados',
                subtitle: 'Estudiantes de Primaria'
            })
        })
    })
}
function indexSec(req,res) {
    const datos = req.body
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM estudiantes WHERE seccion = "Secundaria"', (err, tutor) => {
            if(err){
                res.json(err);
            }
            res.render('tutor/estudiantes', {
                tutor:tutor,
                total:tutor.length,
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
    const noticia = req.body;
    req.getConnection((err,conn)=>{
        conn.query('SELECT * FROM noticias ORDER BY fecha DESC;', (err, noticiaHome) => {
            if(err){
                console.log(err)
            }
            res.render('tutor/home',{

                noticiaHome:noticiaHome,
                title:'HomePage',
                numNoticias:noticiaHome.length
            })
        })
    })
}

function help(req, res){
    res.render('tutor/ayuda', {
        title:'Ayuda'
    })
}

async function pagar(req,res){
    const id_student = req.params.id
    const mes = req.params.mes
    console.log(id_student)
    const session = await stripe.checkout.sessions.create({
        line_items:[
            {
                price: 'price_1LMN3fJpziZXWqtX5ldu4Kcr',
                quantity: 1
            },
        ],
        payment_method_types:['card', 'oxxo'],
        mode: 'payment',
        success_url: `${YOUR_DOMAIN}/pago-realizado/${mes}/${id_student}`,
        cancel_url: `${YOUR_DOMAIN}/NoPagado`,
    });
    res.redirect(303, session.url);
}
async function incremento(req,res){
    const id_student = req.params.id
    const mes = req.params.mes
    console.log(id_student)
    const session = await stripe.checkout.sessions.create({
        line_items:[
            {
                price: 'price_1LMNAyJpziZXWqtX41ebtaA8',
                quantity: 1
            },
        ],
        payment_method_types:['card', 'oxxo'],
        mode: 'payment',
        success_url: `${YOUR_DOMAIN}/pago-realizado/${mes}/${id_student}`,
        cancel_url: `${YOUR_DOMAIN}/NoPagado`,
    });
    res.redirect(303, session.url);
}
function subirData (req,res){
    const id_student = req.params.id;
    const mes = req.params.mes
    //console.log('El usuario: ',id_student,' a pagado su colegiatura');
    req.getConnection((err,conn) => {
        conn.query(`UPDATE colegiaturas SET ${mes}='pagado' WHERE matricula = '${id_student}'`, (err,rows)=>{
            //console.log('pagado')
            res.redirect('/')
        })
    }) 
}

function pagado(req,res){
    //console.log('id llego a pagado')
    res.render('tutor/success', {
    })
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
  //  colegiaturaAlumno: colegiaturaAlumno,
    help:help,
    colegiaturasCajaTutor:colegiaturasCajaTutor,

    redesContactanos:redesContactanos,
    enviarMessage:enviarMessage,
    

    incremento:incremento,
    pagar:pagar,
    pagado:pagado,
    pagoCancelado:pagoCancelado,

    subirData:subirData,

}