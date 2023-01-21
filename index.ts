import { WebSocketServer } from "ws";
import { httpServer } from "./src/http_server/index.js";

const HTTP_PORT = 8181;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const wss = new WebSocketServer({
  port: 8080
});

wss.on('connection', (ws: WebSocketServer) => {
  console.log('Connection accepted!');
  ws.on('message', (data: Buffer) => {
    console.log(data.toString());
  });
});

wss.on('close', () => {
  console.log('WS close');
});