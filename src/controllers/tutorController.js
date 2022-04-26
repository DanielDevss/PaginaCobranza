function index(req,res) {
    const datos = req.body
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM vista_tutores', (err, tutor) => {
            if(err){
                res.json(err);
            }
            res.render('tutor/estudiantes', {
                tutor:tutor
            })
        })
    })
}

module.exports = {
    index:index,
}