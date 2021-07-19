const { Queue, Worker, QueueScheduler } = require('bullmq');
const { con, localCon } = require('./redisConnection');

// for making the delay based queues
new QueueScheduler('emailQ', localCon);

// Queue OBJ
exports.emailQ = new Queue('emailQ', localCon);

// WORKER TO PROCESS THE QUEUES
const emailQueueWorker = new Worker(
  'emailQ',
  async (job) => {
    console.log('email sent successfully!');
    //   TODO send the mail here
    // console.log({ job });
  },
  localCon
);

// WHEN THE TASK IN THE QUEUE DONE SUCCESSFULLY! (EVENT)
emailQueueWorker.on('completed', (job) => {
  // console.log('completed');
  // console.log({ job });
  //   counter++;
  //   console.log(counter);
});

/*

const express = require('express');
const { Queue, Worker, QueueScheduler } = require('bullmq');
const { con, localCon } = require('./redisConnection');

// const redis = require('./util');
// var Queue = require('bull');
// const bullmq = require('bullmq');

const app = express();
app.use(require('morgan')('dev'));

// const myQueueScheduler =
new QueueScheduler('emailQ', localCon);

new QueueScheduler('messageQ', localCon);

// Q1
const testQ = new Queue('emailQ', localCon);

// Q2
const testQ2 = new Queue('messageQ', localCon);

app.get('/q', async (req, res) => {
  // adding to the queue
  await testQ.add(
    'email_send_test',
    {
      name: 'basit',
      email: 'abfcodes@gmail.com',
    },
    { attempts: 2, delay: 4 * 1000 }
  );

  app.get('/q2', async (req, res) => {
    // adding to the queue
    await testQ2.add(
      'message_send_test',
      {
        name: 'basit',
        email: 'abfcodes@gmail.com',
      },
      { attempts: 2, delay: 6 * 1000 }
    );

    // sending response
    res.status(200).json({
      status: 'success',
      message: 'recieved & added to queue!',
    });
  });

  // sending response
  res.status(200).json({
    status: 'success',
    message: 'recieved & added to queue!',
  });
});

app.get('*', (req, res) =>
  res.status(200).json({
    message: 'Welcome to test project!!',
  })
);

const worker = new Worker(
  'emailQ',
  async (job) => {
    // console.log({ job });
  },
  localCon
);

new Worker(
  'messageQ',
  async (job) => {
    console.log({ message: 'here' });
  },
  localCon
);

let counter = 0;

worker.on('completed', (job) => {
  // console.log('completed');
  // console.log({ job });
  counter++;
  console.log(counter);
});

// instantiating BULL QUE
// const testQ = new Queue('testing q', {
//   redis: {
//     host: '127.0.0.1',
//     // port: 13262,
//     port: 6379,
//     // password: '5UFnT6uOyTcIbR96QrywsSYdFxL10sKJ',
//   },
// });

// testQ.add({ name: 'basit' });

// testQ.process((job, done) => {
//   job.progress(console.log('done'));
//   done(new Error('error transcoding'));
// });
// console.log();

const server = app.listen(3006, '127.0.0.1', () => {
  const add = server.address().address;
  const port = server.address().port;
  console.log('Server is running on http://%s:%s', add, port);
});


*/
