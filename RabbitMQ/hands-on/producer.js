const open = require("amqplib").connect("amqp://localhost");

const CRITICAL_TASKS_QUEUE = "critical-task-queue";
const REGULAR_TASKS_QUEUE = "regular-task-queue";
const EXCHANGE = "task-exchange";

// Producer of quick tasks
(async () => {
  try {
    const conn = await open;
    const ch = await conn.createChannel();
    await ch.assertQueue(REGULAR_TASKS_QUEUE);
    await ch.assertExchange(EXCHANGE, "x-delayed-message", {
      arguments: { "x-delayed-type": "direct" },
    });
    await ch.bindQueue(REGULAR_TASKS_QUEUE, EXCHANGE);
    await ch.publish(EXCHANGE, "", Buffer.from("regular 1"), {
      persistent: true,
      // Add delay to message
      headers: { "x-delay": 10000 },
    });
    await ch.publish(EXCHANGE, "", Buffer.from("regular 2"), {
      persistent: true,
      // Add delay to message
      headers: { "x-delay": 10000 },
    });
    await ch.publish(EXCHANGE, "", Buffer.from("regular 3"));
    console.log("sent!");
  } catch (err) {
    console.log(err);
  }
})();

// Producer of slow tasks
(async () => {
  try {
    const conn = await open;
    const ch = await conn.createChannel();
    await ch.assertQueue(CRITICAL_TASKS_QUEUE);
    await ch.sendToQueue(CRITICAL_TASKS_QUEUE, Buffer.from("critical 1"));
    await ch.sendToQueue(CRITICAL_TASKS_QUEUE, Buffer.from("critical 2"));
    await ch.sendToQueue(CRITICAL_TASKS_QUEUE, Buffer.from("critical 3"));
    console.log("sent!");
  } catch (err) {
    console.log(err);
  }
})();
