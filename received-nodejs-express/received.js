var express = require('express')

var app = express();

var ampq = require('amqplib/callback_api');

const port = 3000;
ampq.connect('amqp://192.168.99.100', (err, conn)=>{
    
    conn.createChannel((err, ch)=>{
        var queue = 'firstQueue';
        

        ch.assertQueue(queue, {durable: false});
        console.log(`waiting for message in ${queue}`)
        ch.consume(queue, (message)=>{
                console.log(`received ${message.content}`)
        },{noAck:true})
        
    })
})

app.listen(port, ()=>console.log(`App listening on port ${port}`))