// Libs
const express = require ('express');
const axios = require('axios');
const app = express();
const { v4: uuidv4} = require('uuid');
app.use(express.json());

// Vars
// var with all work (?)
const trabalhosarray = [];

// Functions
// Todo.: Function that returns all works
// Todo.: Function that returns all works per id
// Todo.: Function that segregates per period.


function newWork(requestbody){
    console.log("New work received.");
    var idObs = uuidv4();
    var trabalho = requestbody[0];
    var responsebody = {"status":0, "result":{}};
    
    // Default grade to 0, if not present.
    if (!is_nota_present(trabalho)) {
        trabalho.nota = 0;
    }

    // Default date to today, if not present.
    trabalho.data_entregue = fix_dataentregue(trabalho);

    // If aluno_id missing, return error.
    if (is_alunoid_present(trabalho)){
        responsebody.status = 201;
        responsebody.result.message = `New entry created. id.: ${idObs}`;
        responsebody.result.data = {id: idObs,  trabalho};
        trabalhosarray.push({id: idObs,  trabalho});
    } else {
        responsebody.status = 400;
        responsebody.result.message = "Missing aluno_id in json request.";
    }

    return responsebody
};

function updateWork(requestbody){
    console.log("update work received.");
    var trabalho = requestbody[0];
    var responsebody = {"status":0, "result":{}};
    var position = get_trabalho_by_uuid(trabalho);
    
    if (is_trabalho_present(position)){
        responsebody.status = 202;
        
    } else {
        responsebody.status = 404;
        responsebody.result.message = "Trabalho not found";
    }

    return responsebody
};

function get_trabalho_by_uuid(trabalho){
    for (let i = 0; i < trabalhosarray.length; i++) {
        if (trabalhosarray[i].id == trabalho.id){
            console.log("Trabalho found.");
            return i;
        }
    }
}

function fix_dataentregue(trabalho){
    if (!is_dataentregue_present(trabalho)) {
        return new Date()
    } else {
        return new Date(trabalho.data_entregue);
    }
}

function is_trabalho_present(position){
    return ((position != undefined) ? true : false);
}

function is_alunoid_present(trabalho){
    return ((trabalho.aluno_id != undefined) ? true : false);
}

function is_dataentregue_present(trabalho){
    return ((trabalho.data_entregue != undefined) ? true : false);
}

function is_nota_present(trabalho){
    return ((trabalho.nota != undefined) ? true : false);
}

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
    res.status(201).send(trabalhosarray);
});

app.get('/professor/todos/semestre',(req,res)=>{
    res.send("Insert whole semester json here");
});

app.get('/professor/todos/bimestre',(req,res)=>{
    res.send("Insert whole bimester json here");
});
// TODO.: Make proper post
app.post('/professor/novotrabalho/',(req,res)=>{
    var response = newWork(req.body);
    res.status(response.status).send(response.result);
});
// TODO.: Make proper put
app.put('/professor/updatetrabalho/:id',(req,res)=>{
    updateWork(req.body);
    res.status(201).send(trabalhosarray);
});



app.post('/eventos', (req, res)=>{
    try{
        funcoes[req.params.id](req.body.dados);
    }catch(err){}
    res.status(200).send({msg: "Ok"})
});

app.listen(1700, () => console.log("microserviço para histórico de envios. Porta 1700"));