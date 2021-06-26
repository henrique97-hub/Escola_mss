const express = require ('express');
const axios = require('axios');
const aluno = require('./models/CompararNotas');
const app = express();
app.use(express.json());

const compararPorNotas = {};


function NotasComparadas(aluno){
    const notasAlunos = compararPorNotas[aluno.notasId];
    const notasParaComparar = notasAlunos.find((o) => o.id === aluno.id);
    const calculoDaMedia = new NotasAtualizadas();
    notasComparadas.status = aluno.status;
    axios.post('http://localhost:10000/eventos'),{
        tipo: "NotasAtualizadas",
        dados: {
            Aluno:[
                {
                    id: aluno.id,
                    nome: aluno.nome,
                    notasparciasId: aluno.notasId,
                    status: aluno.status
                }
            ]
        }
    }
}

app.get('/Comparar_Notas/:id',(req,res)=>{
    const id = parseInt(req.params.id)

    aluno.Comparacao(id, res)
});


app.post('/eventos', (req, res)=>{
    try{
        funcoes[req.params.id](req.body.dados);
    }catch(err){}
    res.status(200).send({msg: "Ok"})
});

app.listen(5100, () => console.log("microserviço de Comparar Notas. Porta 5100"));