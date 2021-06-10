// Libs
const express = require ('express');
const axios = require('axios');
const app = express();
const { v4: uuidv4} = require('uuid');
app.use(express.json());

// Functions
// Todo.: Function that returns all works
// Todo.: Function that returns all works per id
// Todo.: Function that segregates per period.

// Todo.: Add logic. If values missing, return error with details of error.
function newWork(requestbody){
    console.log("New work received.");
    const idObs = uuidv4();
    console.log("Request Body.: ", requestbody[0]);
    const trabalho = requestbody[0];
    trabalhos.push({id: idObs,  trabalho});
    return trabalhos
};

// Vars
// var with all work (?)
const trabalhos = [];


// Microservices ports
app.get('/aluno/ano/:id',(req,res)=>{
    res.send(req.params.id);
});

app.get('/aluno/semestre/:id',(req,res)=>{
    res.send(req.params.id);
});

app.get('/aluno/bimestre/:id',(req,res)=>{
    res.send(req.params.id);
});

app.get('/professor/ano/:id',(req,res)=>{
    res.send(req.params.id);
});


app.get('/professor/semestre/:id',(req,res)=>{
    res.send(req.params.id);
});

app.get('/professor/bimestre/:id',(req,res)=>{
    res.send(req.params.id);
});

app.get('/professor/todos/ano',(req,res)=>{
    res.send("Insert whole year json here");
});

app.get('/professor/todos/semestre',(req,res)=>{
    res.send("Insert whole semester json here");
});

app.get('/professor/todos/bimestre',(req,res)=>{
    res.send("Insert whole bimester json here");
});
// TODO.: Make proper post
app.post('/professor/novotrabalho/',(req,res)=>{
    res.status(201).send(newWork(req.body));
});
// TODO.: Make proper put
app.put('/professor/updatetrabalho/:id',(req,res)=>{
    const idObs = uuidv4();
    const { texto } = req.body;
    const trabalhoput = trabalhos[req.params.id] || [];
    trabalhoput.push({id: idObs, texto});
    trabalho[req.params.id] = trabalhoput;
    res.status(201).send(trabalhoput);
});



app.post('/eventos', (req, res)=>{
    try{
        funcoes[req.params.id](req.body.dados);
    }catch(err){}
    res.status(200).send({msg: "Ok"})
});

app.listen(1700, () => console.log("microserviço para histórico de envios. Porta 1700"));