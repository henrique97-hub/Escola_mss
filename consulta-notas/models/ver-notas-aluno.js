const moment = require('moment')
const conexao = require('../SQL/conexao')

class VerNotas {
    visualizarNotas(id,nome,valores,resultados) {
        // seleciona as notas pelo nome do aluno ou pelo id
        const sql = 'SELECT nota FROM BancoDeNotas WHERE nome LIKE=? OR id LIKE=?'

        conexao.query(sql, [nome, id], (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({...valores, id})
            }
        })
    }
}

module.exports = new VerNotas