const open = require("amqplib").connect("amqp://localhost");

// Queue for longer tasks
const CRITICAL_TASKS_QUEUE = "critical-task-queue";
// Queue for shorter tasks
const REGULAR_TASKS_QUEUE = "regular-task-queue";

// Channel for a fast consumer
(async () => {
  try {
    const conn = await open;
    const ch = await conn.createChannel();
    // Fetch up to 20 tasks
    await ch.prefetch(20);
    await ch.assertQueue(REGULAR_TASKS_QUEUE, { durable: true });
    await ch.consume(
      REGULAR_TASKS_QUEUE,
      (msg) => {
        console.log(" [x] Received %s task", msg.content.toString());
        // Acknowledge or reject after some time
        setTimeout(function () {
          // Reject and requeue for certain messages
          if (msg.content.toString() === "regular 2") {
            console.log(" [x] Rejected regular task");
            ch.reject(msg, true);
          } else {
            // Acknowledge for other messages
            console.log(" [x] Done regular task");
            ch.ack(msg);
          }
        }, 1 * 1000);
      },
      {
        // Enable manual acknowledgement
        noAck: false,
      }
    );
  } catch (err) {
    console.log(err);
  }
})();

// Channel for a slow consumer.
(async () => {
  try {
    const conn = await open;
    const ch = await conn.createChannel();
    // Fetch and work on only one task at a time
    await ch.prefetch(1);
    await ch.assertQueue(CRITICAL_TASKS_QUEUE, { durable: true });
    await ch.consume(
      CRITICAL_TASKS_QUEUE,
      (msg) => {
        console.log(" [x] Received %s task", msg.content.toString());
        // Acknowledge or reject after some time
        setTimeout(function () {
          // Acknowledge after task completion
          console.log(" [x] Done critical task");
          ch.ack(msg);
        }, 10 * 1000);
      },
      {
        // Enable manual acknowledgement
        noAck: false,
      }
    );
  } catch (err) {
    console.log(err);
  }
})();
