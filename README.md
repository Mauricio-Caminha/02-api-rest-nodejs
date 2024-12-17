# RF

- [x] O usuário deve poder criar uma nova transação;
- [x] O usuário deve poder obter um resumo da sua conta;
- [x] O usuário deve poder listar todas transações que já ocorreram;
- [x] O usuário deve poder visualizar uma transação única;

# RN

- [x] A transação pode ser do tipo crédito que somará ao valor total, ou débito subtrairá;
- [ ] Deve ser possível identificarmos o usuário entre as requisições;
- [ ] O usuário só pode visualizar transações o qual ele criou;

# Testes

- **Unitários**: unidade da sua aplicação (muitos unitários)
- **Integração**: comunicação entre duas ou mais unidades (mais testes de integração)
- **e2e** - ponta a ponta: simulam um usuário operando em nossa aplicação (poucos)

- **front-end**: abre a página de login, digite o text email@provedor.com.br no campo com ID e-mail, clique no botão
- **back-end**: chamadas HTTP, WebSockets (o cliente do back é o front)

- **Pirâmide de testes**:
  **topo -> E2E** (não dependem de nenhuma tecnologia, não dependem da arquitetura) / lentos = poucos
  **meio -> Integração** / performaticos = mais testes de integração
  **base -> Unitários** / performaticos = muitos testes unitários
