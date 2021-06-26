const customExpress = require('./Express/express')
const conexao = require('./SQL/conexao')
const Tabelas = require('./SQL/tabela')

conexao.connect(erro => {
    if(erro) {
        console.log(erro)
    } else {
        console.log('conectado com sucesso')
        
        Tabelas.init(conexao)
        
        const app = customExpress()

        app.listen(3000, () => console.log('Servidor rodando na porta 3000'))
    }
})