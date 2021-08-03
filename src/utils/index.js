const fs = require('fs');

module.exports = {
  // Send Twilio Message
  sendMessage: async (client, body, to, from) => {
    console.log('preparing to send message ', body);
    await client
      .messages.create({ to, from, body })
      .then(message => {
        console.log('Message sent: ', message);
        return message;
      })
      .catch(err => {
        console.log('Message failed to send: ', err);
        return err;
      });
  },
  // Add participant to Twilio proxy session
  addProxyParticipant: (client, proxyServiceSID, proxySessionSID, name, number) => {
    console.log('adding proxy participant ', name);
    client.proxy.services(proxyServiceSID)
      .sessions(proxySessionSID)
      .participants
      .create({ friendlyName: name, identifier: number })
      .then(participant => {
        console.log('Success adding participant: ', participant)
      })
      .catch(err => {
        console.log('Failed to add proxy participant: ', err);
      });
  },
}
