const moment = require('moment')
const conexao = require('../SQL/conexao')

class Aluno {
    adicionaAluno(aluno,res){
        const dataPublicacao = moment().format('YYYY-MM-DD HH:MM:SS')

        const atendimentoDatado = {...aluno, dataPublicacao}
        const sql = 'INSERT INTO BancoDeNotas SET ?'
            conexao.query(sql,atendimentoDatado,(erro, resultados) => {
                if(erro) {
                    res.status(400).json(erro)
                } else {
                    res.status(201).json(aluno)
                }
            })
        


    }
    alteraNotas(id, valores, res) {
              
        const sql = 'UPDATE BancoDeNotas SET ? WHERE id=?'

        conexao.query(sql, [valores, id], (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({...valores, id})
            }
        })
    }
    lista(res) {
        const sql = 'SELECT * FROM BancoDeNotas'

        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }
    buscaPorId(id, res) {
        const sql = `SELECT * FROM BancoDeNotas WHERE id=${id}`

        conexao.query(sql, (erro, resultados) => {
            const atendimento = resultados[0]
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(atendimento)
            }
        })
    }

}

module.exports = new Aluno