const mysql = require('mysql')

const conexao = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Ps502415',
    database: 'notas'
})

module.exports = conexao