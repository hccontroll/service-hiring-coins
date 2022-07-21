<h1 align="center">
    Service - Gerar Pontos (Hiring Coins) a cada R$ 1,00 em Compras na Loja Hiring Coders Store
</h1>

## 🛠 Etapas:
- [x] Order Hook efetuando POST no Serviço
- [x] Obter dados do Pedido através da API de Orders
- [x] Consultar no Masterdata no Documento de Clientes, para obter o e-mail real do Cliente
- [x] Tratar dados do Pedido (Valor dos Itens, Valor do Pedido, Data do Pedido em UTC e quantidade de Hiring Coins)
- [x] Enviar um PUT para a API na AWS para Salvar ou Atualizar o Cliente com o nome e e-mail
- [x] Com o retorno da requisição anterior, enviar POST para a API na AWS com uma transação do tipo "Crédito" e UUID do Cliente, creditando no saldo de pontos do Cliente.

## ⚙️ Executando
- vtex login {sua conta}
- vtex use {seu workspace}
- vtex link

## 📋 Documentações Utilizadas:

## Hook Configuration:
https://developers.vtex.com/vtex-rest-api/reference/order-hook-1#hookconfiguration

## Get Order para pegar o ID da Order
https://developers.vtex.com/vtex-rest-api/reference/orders

## Search para pegar o email descriptografado:
https://developers.vtex.com/vtex-rest-api/reference/search

## Como Importar os Clients do Vtex.io
https://learn.vtex.com/docs/course-calling-commerce-apis-step03importing-client-lang-pt

## Como Usar o MasterData
https://learn.vtex.com/docs/course-service-course-step06clients-masterdata-lang-pt

## Collection of ready-to-use VTEX IO Clients to access VTEX APIs
https://github.com/vtex/io-clients/tree/67d9d421a9f0d05a18766cb2d67dd3bb6041cfbe

## Explicação sobre o AuthToken
https://learn.vtex.com/docs/course-calling-commerce-apis-step02references-lang-pt

## 🦸 Desenvolvedor
- [Douglas Rodrigues](https://www.linkedin.com/in/douglas-rodrigues-pnz).
