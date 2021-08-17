const amqp = require("amqplib");
const dotenv = require("dotenv");
const data = require("./notas.json");

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

const Producer = async () => {
  let conn = await amqp.connect(connectionConfig);
  let ch = await conn.createChannel();

  console.log("total publish items", data.length);

  for (const item of data) {
    await ch.assertQueue(getNameQueue(item["dfe"]), {
      durable: true,
    });

    ch.sendToQueue(
      getNameQueue(item["dfe"]),
      new Buffer.from(JSON.stringify(item))
    );
    console.log("publishing in queue", getNameQueue(item["dfe"]));
  }

  setTimeout(() => {
    conn.close();
    process.exit(0);
  }, 500);
};

Producer();

// for (let index = 0; index < 1000; index++) {
//   Producer();
// }
