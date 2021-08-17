const amqp = require("amqplib");
const dotenv = require("dotenv");

dotenv.config();

const connectionConfig = {
  protocol: "amqp",
  hostname: process.env.RABBITMQ_HOST,
  port: parseInt(process.env.RABBITMQ_PORT, 10) || 5672,
  username: process.env.RABBITMQ_USERNAME,
  password: process.env.RABBITMQ_PASSWORD,
};

const getNameQueue = (name) => {
  return `${name.toLowerCase()}-dfeservice-queue`;
};

const sizeQueue = async (channel, queueName) => {
  const result = await channel.checkQueue(queueName);
  return result.messageCount || 0;
};

const countQueue = async (queueName) => {
  const connection = await amqp.connect(connectionConfig);
  const channel = await connection.createChannel();
  channel.assertQueue(getNameQueue(queueName), { durable: true });
  const messageCount = await sizeQueue(channel, getNameQueue(queueName));
  return messageCount;
};

const getMessage = async (queueName, size) => {
  const items = [];
  let connection = await amqp.connect(connectionConfig);
  let channel = await connection.createChannel();

  channel.assertQueue(getNameQueue(queueName), { durable: true });

  const messageCount = await sizeQueue(channel, getNameQueue(queueName));

  if (messageCount === 0) return 0;

  const total = size || messageCount;

  while (items.length < total) {
    msg = await channel.get(getNameQueue(queueName), { noAck: true });
    if (msg === false) break;
    items.push(JSON.parse(msg.content.toString()));
  }
  console.log("total items", items.length);
  console.log(items);
  process.once("SIGINT", () => connection.close());
};
//getMessage("NSFE", 10);

(async () => {
  const count = await countQueue("CTE-35");
  console.log("count: %d", count);
})();
