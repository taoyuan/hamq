const {Rabbit} = require('../dist/__tests__/rabbit');

const rabbit = new Rabbit('hamqp.amqp.tutorials', 5672, 15672);

rabbit.run().catch(console.error);
