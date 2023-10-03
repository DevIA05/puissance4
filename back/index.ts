import express, { Express, Request, Response , Application } from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io'

import dotenv from 'dotenv';

//For env File 
dotenv.config();
const port = process.env.PORT;

const app: Application = express();
const server = createServer(app)
const io = new Server(server, {
  cors:{
    origin: "*"
  }
})

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server');
});

io.on('connection', (socket) => {
  console.log('user connected')

  // Exemple message
  socket.emit('message', 'Welcome to Connect 4 backend via websocket');
  socket.on("test request", (req) => {
    console.log("req", req)
  })
})

server.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});