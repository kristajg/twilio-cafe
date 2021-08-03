module.exports = app => {
  app.post('/send-message', (req, res) => {
    const { From: userToReply, To: twilioNumber } = req.body;
    const body = 'Well well, howdy';
    sendMessage(client, body, userToReply, twilioNumber)
      .then(data => {
        console.log('success sending message ', data);
      })
      .catch(err => {
        console.log('err sending message ', err);
      });
  });
}
