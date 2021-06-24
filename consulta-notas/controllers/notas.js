const Aluno = require('../models/ver-notas-aluno')

module.exports = app  => {
    app.get('/ver-notas-aluno/:id', (req, res) => {
        const id = parseInt(req.params.id)

        Aluno.buscaPorId(id, res)
    })
}