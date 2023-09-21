import http, { IncomingMessage, Server, ServerResponse } from "http";
import {createServer} from "./engine"
/*
implement your server code here
*/

const server: Server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    if (req.method === "GET") {
      return createServer(req, res)
    }
  }
);

server.listen(3001, () => console.log("Server is listening to port 3001"));
