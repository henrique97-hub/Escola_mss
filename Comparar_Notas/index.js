const express = require ('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const compararPorNotas = {};

const funcoes = {
    NotasComparadas:(aluno)=>{
        const notasAlunos = compararPorNotas[aluno.notasId];
        const notasParaComparar = notasAlunos.find((o) => o.id === aluno.id);
        const notasMedias = new compararPorNotas[aluno.notasTurmaId]
        const notasComparadas = console.log("nota do aluno:", notasParaComparar + "nota media da turma" , notasMedias);
        notasComparadas.status = aluno.status;
        axios.post('http://localhost:10000/eventos'),{
            tipo: "NotasAtualizadas",
            dados: {
                id: aluno.id,
                texto: aluno.texto,
                notasparciasId: aluno.notasId,
                notasmediaTurmaId: aluno.notasTurmaId,
                status: aluno.status
            }
        }
    }
}


app.get('/Notas/:id/Comparar_Notas',(req,res)=>{
    res.send(compararPorNotas[req.params.id] || []);

});

app.post('/eventos', (req, res)=>{
    try{
        funcoes[req.params.id](req.body.dados);
    }catch(err){}
    res.status(200).send({msg: "Ok"})
});

app.listen(5100, () => console.log("microserviço de Comparar Notas. Porta 5100"));