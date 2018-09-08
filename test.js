const line = require('@line/bot-sdk');
const express = require('express');
const axios = require('axios');
 
const config = {
  channelAccessToken: "bXsoHKBYFoZBEgp8ttWD7vFlDcepXmErffXdOYKk4HqyLek3eqMdFl5uoVDO4+u5iugvPvXsQiKYLrMReI7OXppR+Izzljz8A8qHVrTbEzpaQ93MCDRRLlsH57OdUjABn/jOC9n+yhQwCR7tJ/LGZQdB04t89/1O/w1cDnyilFU=",
  channelSecret: "590e7297fcc2a1ac82fbaa81d7179af9",
};
 
// create LINE SDK client
const client = new line.Client(config);
const app = express();
 
// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/callback', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((e)=>{
      console.log(e);
    });
 
});
 
function handleEvent(event) {
 
    if(event.message.text == "hai"){
      const echo = { type: 'text', text: "Halo juga :)·" };
      return client.replyMessage(event.replyToken, echo);
    }
 
    const echo = { type: 'text', text: "Saya tidak mengerti, saya simpan dulu" };
    return client.replyMessage(event.replyToken, echo);
}
 
// listen on port
const port = 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
