const { default: axios } = require('axios');
const Aluno = require('../Models/aluno')
const alunoD = {}
const funcoes = {
    Notas:(aluno) =>{
        const alunoDados = alunoD[aluno.id];
        const alunoPostarNota = alunoDados.find((o)=> o.id === alunoDados.id);
        alunoPostarNota.status = alunoDados.status;
        axios.post('http://localhost:10000/eventos', {
            tipo: "Nota do Aluno atualizada",
            dados:{
                id: alunoDados.id,
                turma: alunoDados.turma,
                nome: alunoDados.nome,
                dataPublicacao: alunoDados.dataPublicacao,
                status: alunoDados.status,
                nota: alunoDados.nota
            }
        });
    }
}
module.exports = app => {
   
    app.get('/aluno', (req, res) => {
        Aluno.lista(res)
    })

    app.get('/aluno/:id', (req, res) => {
        const id = parseInt(req.params.id)

        Aluno.buscaPorId(id, res)
    })

    app.post('/aluno', (req, res) => {
       const aluno = req.body

       Aluno.adicionaAluno(aluno, res)
    }) 

    app.put('/aluno/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const valores = req.body

        Aluno.alteraNotas(id, valores, res)
    })
    app.post("/eventos", (req, res) => {
        try{
            funcoes[req.params.id](req.body.dados);
          }catch (err){}
          res.status(200).send({msg: 'ok'});
         });

}