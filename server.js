const express = require('express');
const { emailQ } = require('./emailQueue');

const app = express();
app.use(require('morgan')('dev'));

app.get('/q', async (req, res) => {
  // adding to the queue
  for (let i = 0; i < 10000; i++) {
    console.log(6);
  }

  await emailQ.add(
    'email_send_test',
    {
      name: 'basit',
      email: 'abfcodes@gmail.com',
    },
    { attempts: 2, delay: 4 * 1000, removeOnComplete: true }
  );

  // sending response
  res.status(200).json({
    status: 'success',
    message: 'recieved & added to queue!',
  });
});

app.get('/q2', async (req, res) => {
  // adding to the queue
  await emailQ.add(
    'message_send_test',
    {
      name: 'basit',
      email: 'abfcodes@gmail.com',
    },
    { attempts: 2, delay: 6 * 1000 }
  );
  for (let i = 0; i < 10000; i++) {}
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

const server = app.listen(3006, '127.0.0.1', () => {
  const add = server.address().address;
  const port = server.address().port;
  console.log('Server is running on http://%s:%s', add, port);
});
