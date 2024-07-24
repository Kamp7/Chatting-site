//const io=require('socket.io')(8000);
const { createServer } =require("http");
const { Server } = require("socket.io");
const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: '*'
  }
});

httpServer.listen((8000),()=>{console.log('server started at 8000')});


const users={};
io.on('connection', socket =>{
    console.log('connected',socket.id);
    socket.on('new-user-joined',name=>{
        users[socket.id]=name;
        socket.broadcast.emit('user-joined',name);
        });
        socket.on('send',message=>{
            socket.broadcast.emit('receive',{message:message,name:users[socket.id]});
        });
        socket.on('disconnect',message=>{
          socket.broadcast.emit('leave',users[socket.id]);
          delete users[socket.id];
          });
        
});
