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
        
        var trabalhofound = trabalhosarray[position].trabalho;

        if (is_alunoid_present(trabalho)){
            trabalhofound.aluno_id = trabalho.aluno_id;
        }

        if (is_dataentregue_present(trabalho)){
            trabalhofound.data_entregue = fix_dataentregue(trabalho);
        }

        if (is_nota_present(trabalho)){
            trabalhofound.nota = trabalho.nota;
        }

        if (is_nome_present(trabalho)){
            trabalhofound.nome = trabalho.nome;
        }

        console.log(trabalhosarray[position]);
        trabalhosarray[position].trabalho = trabalhofound;
        responsebody.status = 202;
        responsebody.result.message = "Trabalho updated.";
        responsebody.result.data = {trabalhofound};
        
    } else {
        responsebody.status = 404;
        responsebody.result.message = "Trabalho not found";
    }

    return responsebody
};

function get_by_semestre(filtro){
    var count = 0;
    var response = {0:{}, 1:{}};
    var responsebody = {"status":0, "result":{}};
    var position = 0;
    

    if (filtro == false) {
        trabalhosarray.forEach(element => {
            position = get_month_array_position(element.trabalho.data_entregue.getMonth(), 6);
            count = Object.keys(response[position]).length;
            response[position][count] = element;
        });
    } else {
        if (element.trabalho.aluno_id == filtro){
            trabalhosarray.forEach(element => {
                position = get_month_array_position(element.trabalho.data_entregue.getMonth(), 6);
                count = Object.keys(response[position]).length;
                response[position][count] = element;
            });
        }
    }
    responsebody.status = 200;
    responsebody.result = response;
    return responsebody;
}

function get_by_bimestre(filtro){
    var count = 0;
    var response = {0:{}, 1:{}, 2:{}, 3:{}, 4:{}, 5:{}};
    var responsebody = {"status":0, "result":{}};
    var position = 0;
    
    if (filtro == false) {
        trabalhosarray.forEach(element => {
            position = get_month_array_position(element.trabalho.data_entregue.getMonth(), 2);
            count = Object.keys(response[position]).length;
            response[position][count] = element;
        });
    } else {
        if (element.trabalho.aluno_id == filtro){
            trabalhosarray.forEach(element => {
                position = get_month_array_position(element.trabalho.data_entregue.getMonth(), 2);
                count = Object.keys(response[position]).length;
                response[position][count] = element;
            });
        }
    }

    responsebody.status = 200;
    responsebody.result = response;
    return responsebody;
}

function get_trabalho_by_uuid(trabalho){
    for (let i = 0; i < trabalhosarray.length; i++) {
        if (trabalhosarray[i].id == trabalho.id){
            console.log("Trabalho found.");
            return i;
        }
    }
}

function get_month_array_position(month, type){
    if (month%2 == 0) {
        return Math.ceil((month)/type);
    } else {
        return Math.ceil((month)/type) - 1;
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

function is_nome_present(trabalho){
    return ((trabalho.nome != undefined) ? true : false);
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
    var response = get_by_semestre(req.params.id);
    
    res.status(response.status).send(response.result);
});

app.get('/professor/bimestre/:id',(req,res)=>{
    res.send(req.params.id);
});

app.get('/professor/todos/ano',(req,res)=>{
    res.status(201).send(trabalhosarray);
});

app.get('/professor/todos/semestre',(req,res)=>{
    var response = get_by_semestre(false);
    res.status(response.status).send(response.result);
});

app.get('/professor/todos/bimestre',(req,res)=>{
    var response = get_by_bimestre(false);
    res.status(response.status).send(response.result);
});

app.post('/professor/novotrabalho/',(req,res)=>{
    var response = newWork(req.body);
    res.status(response.status).send(response.result);
});

app.put('/professor/updatetrabalho/:id',(req,res)=>{
    var response = updateWork(req.body);
    res.status(response.status).send(response.result);
});



app.post('/eventos', (req, res)=>{
    try{
        funcoes[req.params.id](req.body.dados);
    }catch(err){}
    res.status(200).send({msg: "Ok"})
});

app.listen(1700, () => console.log("microserviço para histórico de envios. Porta 1700"));