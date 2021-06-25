const mysql = require('mysql')

const conexao = mysql.createConnection({
    host: 'mysqldb',
    port: 3306,
    user: 'root',
    password: 'Ps502415',
    database: 'notas'
})

module.exports = conexao