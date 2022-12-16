const keypress = require('keypress');
const WebSocketServer = require('ws').WebSocketServer;

const wssConfig = { port: 9000 };
const wss = new WebSocketServer(wssConfig);

let lastConnection;

wss.on('connection', function connection(ws) {
    console.log('connected')

    ws.on('message', function message(data) {
        console.log('received: %s', data);
    });

    lastConnection = ws;
});

keypress(process.stdin);

process.stdin.on('keypress', function (ch, key) {
    console.log('got "keypress"', key);

    if (key && key.ctrl && key.name == 'c') {
        process.stdin.pause();
        process.exit(0);
    }
    
    if (key.name == 'n') {
        lastConnection.send('new_message');
    }
});

process.stdin.setRawMode(true);
process.stdin.resume();