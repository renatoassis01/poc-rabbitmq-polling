rabbitmq-poc-polling

Usando o rabbitmq com o conceito de polling, consumindo direto da fila.

crie o arquivo notas.json com a seguinte estrutura

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

Para acessar o RabbitMQ Management: http://localhost:15672/

user: user definido no env
password: password definido no env
