function index(req,res) {
    const datosEnfermeria = req.body;
    req.getConnection((err,conn)=> {
        conn.query('SELECT * FROM vista_enfermeria', (err,enfermeria) => {
            if(err){
                res.json(err)
            }
            res.render('enfermeria/registros', {
                enfermeria:enfermeria,
                title:'Enfermeria',
                subtitle: 'Estudiantes Registrados'
            })
        })
    })
}

function verMas(req,res) {
    const id = req.params.id
    req.getConnection((req,conn) => {
        conn.query('SELECT * FROM vista_enfermeria WHERE id_estudiante = ?', [id], (err,enfermeria) => {
            if(err){
                res.json(err)
            }
            res.render('enfermeria/ver', {
                enfermeria:enfermeria,
                title: 'Registro '+id
            })
        })
    })
}
function editar(req,res) {
    const id = req.params.id
    req.getConnection((req,conn) => {
        conn.query('SELECT * FROM vista_enfermeria WHERE id_estudiante = ?', [id], (err,enfermeria) => {
            if(err){
                res.json(err)
            }
            res.render('enfermeria/editar', {
                enfermeria:enfermeria,
                title:'Editar ' +id
            })
        })
    })
}
function actualizar(req,res) {
    const id = req.params.id
    const datosEnfermeria = req.body

    req.getConnection((err,conn) => {
        conn.query('UPDATE datos_enfermeria SET ? WHERE id_estudiante = ?', [datosEnfermeria, id], (req, rows) => {
            res.redirect('/enfermeria/mas-informacion/'+[id])
        })
    })
}


//Ver REGISTROS ESPECIFICOS
function indexEduIni(req,res) {
    const datosEnfermeria = req.body;
    req.getConnection((err,conn)=> {
        conn.query('SELECT * FROM vista_enfermeria WHERE seccion = "Educacion Inicial"', (err,enfermeria) => {
            if(err){
                res.json(err)
            }
            res.render('enfermeria/registros', {
                enfermeria:enfermeria,
                title:'Enfermeria',
                subtitle: 'Estudiantes de Educación Inicial'
            })
        })
    })
}
function indexPres(req,res) {
    const datosEnfermeria = req.body;
    req.getConnection((err,conn)=> {
        conn.query('SELECT * FROM vista_enfermeria WHERE seccion = "Preescolar"', (err,enfermeria) => {
            if(err){
                res.json(err)
            }
            res.render('enfermeria/registros', {
                enfermeria:enfermeria,
                title:'Enfermeria',
                subtitle: 'Estudiantes de Preescolar'
            })
        })
    })
}
function indexPri(req,res) {
    const datosEnfermeria = req.body;
    req.getConnection((err,conn)=> {
        conn.query('SELECT * FROM vista_enfermeria WHERE seccion = "Primaria"', (err,enfermeria) => {
            if(err){
                res.json(err)
            }
            res.render('enfermeria/registros', {
                enfermeria:enfermeria,
                title:'Enfermeria',
                subtitle: 'Estudiantes de Primaria'
            })
        })
    })
}
function indexSec(req,res) {
    const datosEnfermeria = req.body;
    req.getConnection((err,conn)=> {
        conn.query('SELECT * FROM vista_enfermeria WHERE seccion = "Secundaria"', (err,enfermeria) => {
            if(err){
                res.json(err)
            }
            res.render('enfermeria/registros', {
                enfermeria:enfermeria,
                title:'Enfermeria',
                subtitle: 'Estudiantes de Secundaria'
            })
        })
    })
}

module.exports = {
    index:index,
    indexEduIni:indexEduIni,
    indexPres:indexPres,
    indexPri:indexPri,
    indexSec:indexSec,
    verMas:verMas,
    editar:editar,
    actualizar:actualizar
}