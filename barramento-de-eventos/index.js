const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

app.post('/eventos', (req, res) => {
const evento = req.body;
//envia o evento para o microsserviço de Historico de Envios
axios.post('http://localhost:1700/eventos', evento);
//envia o evento para o microsserviço de Comparar notas
axios.post('http://localhost:5100/eventos', evento);
// envia o evento pra o microsserviço de Consultar notas
axios.post('http://localhost:4200/eventos', evento);
// envia o evento pra o microsserviço de Notas
axios.post('http://localhost:3000/eventos', evento);

res.status(200).send({ msg: "ok" });
});
app.listen(10000, () => {
console.log('Barramento de eventos. Porta 10000.')
})
