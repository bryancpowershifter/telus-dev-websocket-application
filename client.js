const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:8080');

const userInfo = {
  name: ''
}

const userCommand = (type, params) => {
  return new Buffer(JSON.stringify({
    type: type,
    params: params
  }))
}

ws.on('open', function open() {
  ws.send(userCommand("message", {"body": "hello dudes"}));
  ws.send(userCommand("changeUsername", {"nickname": "Johnford"}));
  ws.send(userCommand("quit"));
});

ws.on('message', function incoming(command) {

  //console.log('received: %s', command);

  serverCommandObj = JSON.parse(command);

  switch(serverCommandObj.type) {
    case 'changeUsername':
      console.log(`Your username is now '${serverCommandObj.params.nickname}'`);
      userInfo.name = serverCommandObj.params.nickname;
      break;
  }
});
