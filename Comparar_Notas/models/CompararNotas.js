const moment = require('moment')
const conexao = require('../SQL/conexao')

class CompararNotasAlunos {
    NotasAtualizadas(id,nome,valores,resultados) {
        
        const sql = 'SELECT nota FROM BancoDeNotas WHERE id LIKE=?'

        conexao.query(sql, [nome, id], (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({...valores, id})
            }
        })
    }
}

module.exports = new CompararNotasAlunos