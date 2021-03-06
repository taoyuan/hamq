import {Rabbit} from '@hamq/testlab';
import {Connection} from '../connection';

const debug = require('debug')('hamq:client:test:support');

export const TestExchangeNamePrefix = process.env.AMQPTEST_EXCHANGE_PREFIX ?? 'TestExchange_';
export const TestQueueNamePrefix = process.env.AMQPTEST_QUEUE_PREFIX ?? 'TestQueue_';

export const TestLongTimeout = 60000;

let exchangeSeq = 0;
let queueSeq = 0;

export const rabbit = new Rabbit();

export function nextExchangeName() {
  return TestExchangeNamePrefix + ++exchangeSeq;
}

export function nextQueueName() {
  return TestQueueNamePrefix + ++queueSeq;
}

export function givenAmqpConnection() {
  return new Connection(rabbit.url, {
    jitter: 'none',
    delayFirstAttempt: true,
  });
}

export async function cleanup(connection: Connection) {
  debug('cleanup');
  await connection.delete();
  connection.end();
}
