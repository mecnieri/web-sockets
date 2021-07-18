import express from "express";
 import socket from "socket.io";

const port = "3000";

// App setup
let app = express();
let server = app.listen(process.env.PORT || port, () =>
  console.log(`listening to requests on port ${port}`)
);

// Static files
app.use(express.static("public"));

// Socket setup
let io = socket(server);

io.on("connection", (socket) => {
  console.log("made socket connection with id of ", socket.id);

  socket.on("chat", (data) => {
    io.sockets.emit("chat", data);
  });

  // socket.on("typing", (data) => {
  //   socket.broadcast.emit("typing", data);
  // });

  socket.on("browseridanServerze", (params) => {
    socket.broadcast.emit("serveridan-browserebze", params);
    // io.sockets.emit("serveridan-browserebze", params);
  });
});
