//const amqp = require('@hamq/client'); // normal use
const amqp = require('../..'); // for use inside this package

// Usage: receive_logs_topic.js <facility>.<severity>

const args = process.argv.length > 2 ? process.argv.slice(2) : ['anonymous.info'];

async function main() {
  // create a new connection (async)
  const connection = new amqp.Connection();

  // declare a new exchange, it will be created if it does not already exist (async)
  const exchange = connection.declareExchange('topic_logs', 'topic', {durable: false});

  // declare a new queue, it will be created if it does not already exist (async)
  const queue = connection.declareQueue('', {exclusive: true});

  // connect the queue to the exchange for each key pattern
  for (const s of args) {
    await queue.bind(exchange, s);
  }

  // create a consumer function for the queue
  // this will keep running until the program is halted or is stopped with queue.cancel()
  await queue.consume(
    message => {
      const content = message.content.toString();
      const routingKey = message.fields.routingKey;
      console.log(' [x] ' + routingKey + " : '" + content + "'");
    },
    {noAck: true},
  );

  console.log('started');
}

main().catch(console.error);
