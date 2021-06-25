const express = require ('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const compararPorNotas = {};

function NotasComparadas(aluno){
    const notasAlunos = compararPorNotas[aluno.notasId];
    const notasParaComparar = notasAlunos.find((o) => o.id === aluno.id);
    const calculoDaMedia = new CalculoMedia();
    const notasComparadas = console.log("nota do aluno:", notasParaComparar + "nota media da turma:" , calculoDaMedia);
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


const funcoes = {
    
}

const id = [];
const notas = [];

function NotasMedias() {
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
 }

function CalculoMedia(){
      
     var notasMediasTurma = new NotasMedias();
     for(var i = 0; i <notas.length; i++){
         notasMediasTurma+= notas[i];
     }
     media = notasMediasTurma/id.length;
     return media;
 }


const calculo = {
    
}

app.get('/Comparar_Notas',(req,res)=>{
    res.send(CalculoMedia() || []);

});

app.post('/eventos', (req, res)=>{
    try{
        funcoes[req.params.id](req.body.dados);
    }catch(err){}
    res.status(200).send({msg: "Ok"})
});

app.listen(5100, () => console.log("microserviço de Comparar Notas. Porta 5100"));