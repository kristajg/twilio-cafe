require('dotenv').config();

// 3rd party libraries
const http = require('http');
const express = require('express');
const cookieParser = require('cookie-parser');

// helpers
const { sendMessage } = require('./utils');

// constants
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

// twilio imports
const client = require('twilio')(accountSid, authToken);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.post('/send-sms-message', (req, res) => {
  const { From: userToReply, To: twilioNumber } = req.body;
  const body = 'Well well, howdy';
  sendMessage(client, body, userToReply, twilioNumber)
    .then(data => {
      console.log('success sending message ', data);
      res.send('success');
    })
    .catch(err => {
      console.log('err sending message ', err);
      res.send(err);
    });
});

app.get('/', (req, res) => {
  res.send('Server healthcheck - confirmed healthy!');
});

http.createServer(app).listen(8009, () => {
  console.log('Express server listening on port 8009');
});
