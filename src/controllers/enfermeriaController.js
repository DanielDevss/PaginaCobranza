function index(req,res) {
    if(req.session.loggedin){
        const datosEnfermeria = req.body;
        req.getConnection((err,conn)=> {
            conn.query('select datos_enfermeria.id_estudiante, nombre, seccion, grupo, nombre_tutor, tel_tutor, IMC,peso,talla,alergias,enfermedades,observaciones from estudiantes inner join datos_enfermeria on estudiantes.id_estudiante = datos_enfermeria.id_estudiante', (err,enfermeria) => {
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
    }else{
        console.log('No se ha Iniciado Sesion')
        res.redirect('login')}
}

function verMas(req,res) {
    if(req.session.loggedin){
        const id = req.params.id
        req.getConnection((req,conn) => {
            conn.query('select datos_enfermeria.id_estudiante AS id_estudiante, nombre, seccion, grupo, nombre_tutor, tel_tutor, IMC,peso,talla,alergias,enfermedades,observaciones from estudiantes inner join datos_enfermeria on estudiantes.id_estudiante = datos_enfermeria.id_estudiante WHERE estudiantes.id_estudiante = ?', [id], (err,enfermeria) => {
                if(err){
                    res.json(err)
                }
                res.render('enfermeria/ver', {
                    enfermeria:enfermeria,
                    title: 'Registro '+id
                })
            })
        })
    }else{
        console.log('No se ha Iniciado Sesion')
        res.redirect('login')}
}
function editar(req,res) {
    if(req.session.loggedin){
        const id = req.params.id
        req.getConnection((req,conn) => {
            conn.query('select datos_enfermeria.id_estudiante AS id_estudiante, nombre, seccion, grupo, nombre_tutor, tel_tutor, IMC,peso,talla,alergias,enfermedades,observaciones from estudiantes inner join datos_enfermeria on estudiantes.id_estudiante = datos_enfermeria.id_estudiante WHERE estudiantes.id_estudiante = ?', [id], (err,enfermeria) => {
                if(err){
                    res.json(err)
                }
                res.render('enfermeria/editar', {
                    enfermeria:enfermeria,
                    title:'Editar ' +id
                })
            })
        })
    }else{
        console.log('No se ha Iniciado Sesion')
        res.redirect('login')}
}
function actualizar(req,res) {
    if(req.session.loggedin){
        const id = req.params.id
        const datosEnfermeria = req.body
    
        req.getConnection((err,conn) => {
            conn.query('UPDATE datos_enfermeria SET ? WHERE id_estudiante = ?', [datosEnfermeria, id], (req, rows) => {
                res.redirect('/enfermeria/mas-informacion/'+[id])
            })
        })
    }else{
        console.log('No se ha Iniciado Sesion')
        res.redirect('login')}
}


//Ver REGISTROS ESPECIFICOS
function indexEduIni(req,res) {
    if(req.session.loggedin){
        const datosEnfermeria = req.body;
        req.getConnection((err,conn)=> {
            conn.query('select datos_enfermeria.id_estudiante AS id_estudiante, nombre, seccion, grupo, nombre_tutor, tel_tutor, IMC,peso,talla,alergias,enfermedades,observaciones from estudiantes inner join datos_enfermeria on estudiantes.id_estudiante = datos_enfermeria.id_estudiante WHERE estudiantes.seccion="Educacion Inicial";', (err,enfermeria) => {
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
    }else{
        console.log('No se ha Iniciado Sesion')
        res.redirect('login')}
}
function indexPres(req,res) {
    if(req.session.loggedin){
        const datosEnfermeria = req.body;
        req.getConnection((err,conn)=> {
            conn.query('select datos_enfermeria.id_estudiante AS id_estudiante, nombre, seccion, grupo, nombre_tutor, tel_tutor, IMC,peso,talla,alergias,enfermedades,observaciones   from estudiantes inner join datos_enfermeria on estudiantes.id_estudiante = datos_enfermeria.id_estudiante WHERE estudiantes.seccion="Preescolar"', (err,enfermeria) => {
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
    }else{
        console.log('No se ha Iniciado Sesion')
        res.redirect('login')}
}
function indexPri(req,res) {
    if(req.session.loggedin){
        const datosEnfermeria = req.body;
        req.getConnection((err,conn)=> {
            conn.query('select datos_enfermeria.id_estudiante AS id_estudiante, nombre, seccion, grupo, nombre_tutor, tel_tutor, IMC,peso,talla,alergias,enfermedades,observaciones from estudiantes inner join datos_enfermeria on estudiantes.id_estudiante = datos_enfermeria.id_estudiante WHERE estudiantes.seccion="Primaria";', (err,enfermeria) => {
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
    }else{
        console.log('No se ha Iniciado Sesion')
        res.redirect('login')}
}
function indexSec(req,res) {
    if(req.session.loggedin){
        const datosEnfermeria = req.body;
        req.getConnection((err,conn)=> {
            conn.query('select datos_enfermeria.id_estudiante AS id_estudiante, nombre, seccion, grupo, nombre_tutor, tel_tutor, IMC,peso,talla,alergias,enfermedades,observaciones from estudiantes inner join datos_enfermeria on estudiantes.id_estudiante = datos_enfermeria.id_estudiante WHERE estudiantes.seccion="Secundaria";', (err,enfermeria) => {
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
    }else{
        console.log('No se ha Iniciado Sesion')
        res.redirect('login')}
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