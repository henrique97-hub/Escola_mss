const moment = require('moment')
const conexao = require('../SQL/conexao')

class CompararNotasAlunos {
    NotasAtualizadas(res) {
        
        const sql = 'SELECT nota,id FROM BancoDeNotas'

        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }
}

module.exports = new CompararNotasAlunos