const express = require ('express');
const axios = require('axios');
const app = express();
const { v4: uuidv4} = require('uuid');
app.use(express.json());

// var with all work (?)
const trabalhos = [];

// Todo.: Function that returns all works
// Todo.: Function that returns all works per id
// Todo.: Function that segregates per period.

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
    console.log("req.body - post.: ", req.body);
    console.log("json stringify.: ", JSON.stringify(req.body.query));
    const assistant = JSON.stringify(req.body.query);
    const idObs = uuidv4();
    const { texto } = req.body;
    trabalhos.push({id: idObs,  assistant});
    res.status(201).send(trabalhos);
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