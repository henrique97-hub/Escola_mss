# Historico_envios

Básicas funções para o microserviço de atividades.
Port 1700.

## Trabalho.:
- id:uuid (Gerado quando um novo trabalho é criado. Usado para atualizar um trabalho)
- nome:str (Não necessário)
- aluno_id: str (Necessário para identificar e filtrar por aluno)
- data_entregue: Data (Não necessário. Default - Dia executado)
- nota : int (Não necessário. Default - 0)

## Professor.:
### Post '/professor/novotrabalho/' - Novo trabalho
- Requer aluno_id para criar.
- post format json. [{"aluno_id": "", "nome": "", "data_entregue": "", "nota":0}]
- Retorna (Se succesful).: {"message":"New entry created. id.: <id>","data":{"id":<id> ,"trabalho":{"aluno_id":"","nota":0,"data_entregue":"<data>"}}}

### Put '/professor/updatetrabalho/' - Atualiza trabalho
- Requer id para atualizar.
- post format json. [{"aluno_id": "", "nome": "", "data_entregue": "", "nota":0}]
- Adicione o campo dejesado para alterar. Caso não queira alterar uma propriedade, não adicione no post format json.
- Retorna (Se succesful).: {"message":"Trabalho updated.","data":{"trabalhofound":{"aluno_id":"<id>","nota":<nota>,"data_entregue":"<data>"}}}

### Get
Há gets para ano (todos), bimestre, semestre.
- /professor/todos/<ano/bimestre/semestre> para retornar todos;
- /professor/<ano/bimestre/semestre>/:id para retornar todos baseado no aluno_id enviado;

## Aluno.:
### Get
Há gets para ano, bimestre, semestre.
- /aluno/<ano/bimestre/semestre>/:id para retornar todos baseado no aluno_id enviado