const express = require ('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const compararPorNotas = {};

const funcoes = {
    NotasComparadas:(aluno)=>{
        const notasAlunos = compararPorNotas[aluno.notasId];
        const notasParaComparar = notasAlunos.find((o) => o.id === aluno.id);
        const calculoDaMedia = new CalculoMedia(id);
        //const notasMedias = new compararPorNotas[aluno.notasTurmaId]
        const notasComparadas = console.log("nota do aluno:", notasParaComparar + "nota media da turma:" , calculoDaMedia);
        notasComparadas.status = aluno.status;
        axios.post('http://localhost:10000/eventos'),{
            tipo: "NotasAtualizadas",
            dados: {
                notasmediaTurmaId: aluno.notasTurmaId,
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
}

const id = [];
const notas = [];

const calculo = {
    
    NotasMedias:(id)=>{
       exports.nota = function(req, res){
           User.NotasAtualizadas(res).then(([rows]) => {
                if(rows.length > 0){
                    for(var i=0; i<rows.length; i++){
                        console.log(rows[i].nota); 
                        console.log(rows[i].id);
                        id.push(rows[i].id);
                        notas.push(rows[i].nota);
                    }
                }else{
                    console.log('Nothing to fetch');
                    
                }
           }).catch(err => console.log(err));
       }
    },
    CalculoMedia:(id)=>{
        const notasmedias;
        for(var i = 0; i <notas.length; i++){
            notasmedias+= notas[i];
        }
        media = notasmedias/id.length;
        return media;
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