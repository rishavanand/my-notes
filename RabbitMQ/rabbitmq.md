# RabbitMQ

## About messaging queues

- message is data transported between sender and receiver application
- queue is a line of messages that gets transported/consumed in a first come first server order

### Architecture

- The producer applications create messages and deliver them to the messaging queue
- The consumer connects to the queue, de-queues a message and start working on them
- Messages remain in the queue until consumed

### Why messaging queues?

- It provides asynchronous messaging protocol where system puts a message in the queue and does not require an immediate response

### Decoupling

- Decoupling is reducing the reliance of one system onto another. MQs allows systems to communicate with other system in an autonomous manner.
- Good systems are preferred to be highly decoupled.
- aka Micro-services

### Scalability

- Consumers can be added and removed and will still function as they do not depend on other consumers/processes.

### Simple examples

1. Email Service: Sender send an email Receiver checks and replies to it in his own time. Both of them do not need to be connected at the same time for the message transfer.

2. Pizza shop: The number of orders taken and the number of pizzas served are not often at the same rate. So the orders can be put in a queue and the cook can pull orders sequentially and server them.

3. A web service where no requests can get lost and needs to pass thorough a function. The web service can put the request in the queue and other processes can process them when available.

[Read more](https://www.cloudamqp.com/blog/2014-12-03-what-is-message-queuing.html)

## Terminologies

1. Client / Consumer - Responsible for message processing
2. Producer Publisher - Responsible for message publishing
3. Queue - Responsible for message storing
4. Broker - The complete service that is responsible for message routing from producer to client, eg: RabbitMQ
5. Exchange - Responsible for routing messages to specific queues

## Advanced Message Queue Processing (AMQP)

- Protocol that allows communication between the client and message broker

[Read More](https://www.rabbitmq.com/tutorials/amqp-concepts.html)

## About RabbitMQ

- Open source message broker
- lightweight, easy to deploy and scalable aka distributed deployment
- monitoring UI
- Alternatives Kafka, Amazon SNS etc

[Read more](https://www.rabbitmq.com/#features)

## RabbitMQ installation

```
docker run -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management
```

## Delaying messages

RabbitMQ provides the Delayed Message Exchange plugin that allows users to create an exchange to delay messages. This exchanges forwards the message to its respective queue only after a specified time. This can be helpful in scenarios like when the service initiates a new cluster deployment and the status is to be checked only after 5 mins. It can also be used to delay the next status check.

[Read more](https://github.com/rabbitmq/rabbitmq-delayed-message-exchange)

## Handling worker crashes

When workers crash they do not send an acknowledgement back to the Broker. So after a certain amount of time, the broker assumes that the message was not delivered and re-queues so that it is taken up by another consumer.

[Read more](https://stackoverflow.com/questions/42375034/what-happens-to-fetched-messages-when-rabbitmq-consumer-crashes)

## Prefetch

Prefect is used to fetch n number of messages at once and start processing each of them. This increases the throughput incase of single/multiple fast workers as the workers do not have to wait for a message to arrive and directly start execution of the next task.

### Choosing prefetch value

[Read more](https://www.mariuszwojcik.com/how-to-choose-prefetch-count-value-for-rabbitmq/)

## Reject and Requeue
