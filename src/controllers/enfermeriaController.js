function index(req,res) {
    const datosEnfermeria = req.body;
    req.getConnection((err,conn)=> {
        conn.query('SELECT * FROM vista_enfermeria', (err,enfermeria) => {
            if(err){
                res.json(err)
            }
            res.render('enfermeria/registros', {
                enfermeria:enfermeria
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
                enfermeria:enfermeria
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
                enfermeria:enfermeria
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

module.exports = {
    index:index,
    verMas:verMas,
    editar:editar,
    actualizar:actualizar
}