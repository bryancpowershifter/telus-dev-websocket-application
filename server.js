const WebSocket = require('ws');

const wss = new WebSocket.Server({
  host: 'local.telus.com',
  port: 8080
});

const socketList = [];
const MAX_MESSAGE_HISTORY_LENGTH = 5;
const messageLog = [];

// connect
// add user
// change username
// receive message

const serverCommand = (type, params) => {
  return new Buffer(JSON.stringify({
    type: type,
    params: params
  }))
}

wss.on('connection', function connection(ws) {

  const user = {
    socket: ws,
    username: `user${socketList.length + 1}`
  }

  socketList.push(user);

  console.log(`user connected: ${user.username}`);

  ws.send(serverCommand("changeUsername", {"nickname": user.username}));

  ws.on('message', function incoming(command) {
    console.log('received: %s', command);

    commandObj = JSON.parse(command);

    switch (commandObj.type) {
      case 'message':
        console.log("message received: ", commandObj.body);
        break;
      case 'changeUsername':
        console.log("username change: ", commandObj.params.nickname);
        break;
      case 'quit':
        console.log("quit");
        socketList.splice(socketList.indexOf(ws), 1);
        ws.terminate();
        break;
    }
  });

  ws.on('close', function remove(ws) {
   // userList.splice(userList.indexOf(ws));
  })

});
