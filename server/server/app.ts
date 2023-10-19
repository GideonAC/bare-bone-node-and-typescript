import http, { IncomingMessage, Server, ServerResponse } from "http";
import { createData, fetchedData, putData, deleteData } from './engine'
/*
implement your server code here
*/


const server: Server = http.createServer((req: IncomingMessage, res: ServerResponse) => {

  if (req.method === "POST" && req.url=="/data/add") {
    return createData(req, res)

   }else if(req.method === "GET" && req.url == "/data") {
     return fetchedData(req, res)

   }else if(req.method === "PUT" && req.url == "/data/update") {
     return  putData(req, res)
     
   }else if(req.method === "DELETE" && req.url == "/data/delete"){
     return deleteData(req, res)
   }
   else{
    res.end("Request Not Found!!!!")
   }

    
    
    
  });


server.listen(3005, () => console.log (`Server is listening on port ${3005}`));
