## rabbitmq-poc-polling

### Importante

O RabbitMQ oferece duas maneiras de receber mensagens que são o  `basic.get` e o `basic.consume`(**push-based**). Como decidir entre usar um consumidor e consumir as mensagens manualmente usando o `basic.get`?. Isto depende da carga de trabalho que cada um cria. O comando `basic.get` é relativamente caro quando se trata de recursos, tornando-se uma opção ruim para construir um aplicativo no RabbitMQ que se concentre na velocidade. Nesta POC (Proof of Concept) optou-se por basear no conceito de *polling* usando o comando `basic.get` devido a necessidade de consumir as mensagens manualmente. A velocidade neste caso não era um requisito obrigatório. 

Depedências:

- Docker
- Docker-compose
- Make
- Nodejs >= 10x

Rodar o projeto:

1. Crie o arquivo notas.json com a seguinte estrutura:

```json
[
  {
    "dfe": "NFSE-3100073",
    "event": "emit",
    "headers": {
      "tenantid": "e747fad3-86a6-493e-9f26-238e25375adb"
    },
    "body": {
      "x": "y"
    }
  }
]
```

2. Instale as depedências do projeto

```sh
npm install
```

3. Crie um arquivo _.env_ na raiz

```
RABBITMQ_USERNAME=user
RABBITMQ_PASSWORD=password
RABBITMQ_PORT=5672
RABBITMQ_HOST=localhost
```

> use o arquivo **.env.example** como base

4. Rodar o RabbitMQ pelo container

```sh
make
make producer
```

5. Acesse o RabbitMQ Management

   http://localhost:15672/

> user: user definido no .env

> password: password definido no .env

6. Rode o worker para consumir os dados da fila

```sh
make worker
```

## Referências

https://www.cloudamqp.com/blog/rabbitmq-basic-consume-vs-rabbitmq-basic-get.html

https://livebook.manning.com/book/rabbitmq-in-depth/chapter-5/12

http://nelsonsar.github.io/2013/11/07/RabbitMQ-exchange-types.html

http://nelsonsar.github.io/2013/10/29/AMQP-building-blocks.html

https://www.cloudamqp.com/blog/part4-rabbitmq-for-beginners-exchanges-routing-keys-bindings.html

https://imasters.com.br/back-end/rabbitmq-introducao-ao-mundo-das-filas
