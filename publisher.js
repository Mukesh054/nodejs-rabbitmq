const amqplib = require('amqplib');

const publisher = async () => {
    const connection = await amqplib.connect('amqp://localhost');
    const channel = await connection.createChannel();
    const exchange = 'my_exchange';
    const message = 'Hello World!';

    await channel.assertExchange(exchange, 'direct', { durable: false });

    channel.publish(exchange, '', Buffer.from(message));
    console.log(`Sent: ${message}`);

    setTimeout(() => {
        connection.close();
        process.exit(0);
    }, 500);
}

publisher();