### rabbitmq-poc-polling

Usando o rabbitmq com o conceito de polling, consumindo direto da fila.

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
RABBITMQ_USERNAME=seidor
RABBITMQ_PASSWORD=seidor
RABBITMQ_PORT=5672
RABBITMQ_HOST=localhost
```

> use o arquivo **.env.example** como base

4. Rodar o RabbitMQ pelo container

```sh
make
node producer.js
node worker.js
```

4. Acesse o RabbitMQ Management

   http://localhost:15672/

> user: user definido no .env

> password: password definido no .env

## Referências

https://livebook.manning.com/book/rabbitmq-in-depth/chapter-5/12

http://nelsonsar.github.io/2013/11/07/RabbitMQ-exchange-types.html

http://nelsonsar.github.io/2013/10/29/AMQP-building-blocks.html

https://www.cloudamqp.com/blog/part4-rabbitmq-for-beginners-exchanges-routing-keys-bindings.html

https://imasters.com.br/back-end/rabbitmq-introducao-ao-mundo-das-filas
