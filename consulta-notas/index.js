const customExpress = require('./Express/express')
const conexao = require('./SQL/conexao')

conexao.connect(erro => {
    if(erro) {
        console.log(erro)
    } else {
        console.log('conectado com sucesso')
        
        Tabelas.init(conexao)
        
        const app = customExpress()

        app.listen(4200, () => console.log('Servidor rodando na porta 4200'))
    }
})