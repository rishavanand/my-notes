# RabbitMQ Hands On

This repo consists of a producer and a worker script that will help in demonstration of a basic RabbitMQ example. The example has the following features:

1. It makes use of two queues, for long and short tasks. This can be helpful when there are multiple workers. It will ensure that not all long tasks are fetched by a single worker and other workers are sitting idle.
2. Shorter tasks are pre-fetched, cached and executed in parallel (20 at a time)
3. Longer tasks are fetched one at a time and executed in sequence (1 at a time)
4. Some messages have a delay. This means the messages reach the queues after a certain delay. This can be helpfull where we are fetching the status of a deployment and updating it in the database. If status is not successful, the message can be rejected and requeued after a delay.

## RabbitMQ Docker Image

RabbitMQ Image is built locally by installing RabbitMQ Delayed Message Exchange plugin on top of the official RabbitMQ Docker Image.

### Credentials for RabbitMQ management console

- Username: `guest`
- Password: `guest`

## Running locally

1. Start Rabbit MQ container

```
docker-compose up -d
```

2. Install node packages: `npm i`
3. Start consumer: `node consumer`
4. Start producer: `node producer`

RabbitMQ management console: [http://127.0.0.1:15672](http://127.0.0.1:15672)
