import { createWebSocketStream, WebSocketServer, WebSocket } from "ws";
import { httpServer } from "./src/http_server/index.js";
import { getCommand } from "./src/utils/handler.js";

const HTTP_PORT = 8181;
const wsPort = 8080;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const wss = new WebSocketServer({
  port: wsPort
});

console.log(`Start websocket server on port ${wsPort}`);

wss.on('connection', async (ws: WebSocket) => {
  console.log('New websocket connection');

  const wsStream = createWebSocketStream(ws, {
    decodeStrings: false,
    encoding: 'utf8',
  });

  wsStream.on('data', async (data) => {
    const [command, ...rest] = data.split(' ');
    const commandHandler = getCommand(command);
    const result = typeof commandHandler === 'function'
      ? await commandHandler(rest, wsStream)
      : 'Command not found';
    console.log(data);
    console.log(result);
  });
});

wss.on('close', () => {
  console.log('Connection close!');
});