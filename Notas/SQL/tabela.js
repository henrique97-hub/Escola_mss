class Tabelas {
    init(conexao) {
        this.conexao = conexao

        this.criarAtendimentos()
    }

    criarAtendimentos() {
        const sql = 'CREATE TABLE IF NOT EXISTS BancoDeNotas (id int NOT NULL AUTO_INCREMENT,turma int NOT NULL, nome varchar(50) NOT NULL, dataPublicacao datetime NOT NULL, status varchar(20) NOT NULL,nota float NOT NULL, PRIMARY KEY(id))'

        this.conexao.query(sql, erro => {
            if(erro) {
                console.log(erro)
            } else {
                console.log('Tabela BancoDeNotas criada com sucesso')
            }
        })
    }
}

module.exports = new Tabelas