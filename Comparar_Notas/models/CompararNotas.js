const moment = require('moment')
const conexao = require('../SQL/conexao')

var notas = 0;
var listaNotaAlunos = [];
var visualizacao = {"Sua Nota": 0, "Media da turma": 0} 

class CompararNotas {
    NotasAtualizadas(id, res) {

        const sql1 = `SELECT nota FROM bancoDeNotas WHERE id=${id}`

        var atendimento;

        conexao.query(sql1, (erro, resultados) => {
            atendimento = resultados[0]
        })

       
        const sql = 'SELECT * FROM bancodenotas'

        conexao.query(sql, (erro,rows, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                for(var i in rows) {
                    listaNotaAlunos.push(rows[i].listaNotaAlunos);
                    
                }
                var soma = 0;
                for(var i in rows){
                    soma += rows[i].nota;
                }
                
                visualizacao["Sua Nota"] = atendimento.nota
                visualizacao["Media da turma"] = soma/listaNotaAlunos.length

                res.status(200).json(visualizacao)
            }
        })

        var listaNotaAlunos = [];
    }
}

module.exports = new CompararNotas