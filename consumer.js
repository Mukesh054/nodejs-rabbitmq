const amqplib = require('amqplib');

const consumer = async () => {
    const connection = await amqplib.connect('amqp://localhost');
    const channel = await connection.createChannel();
    const queue = 'my_queue';
    const exchange = 'my_exchange';
    
    await channel.assertQueue(queue, { durable: false });

    await channel.assertExchange(exchange, 'direct', { durable: false });

    await channel.bindQueue(queue, exchange, '');

    channel.consume(queue, (message) => {
        console.log(`Received: ${message.content.toString()}`);
    }, { noAck: true });

    console.log('Waiting for messages...');

    process.on('SIGINT', () => {
        connection.close();
        process.exit(0);
    });
}

consumer();