let express = require("express");
let socket = require("socket.io");

// App setup
let app = express();
let server = app.listen(3000, function() {
  console.log("listening to requests on port 3000");
});

// Static files
app.use(express.static("public"));

// Socket setup
let io = socket(server);

io.on("connection", function(socket) {
  console.log("made socket connection with id of ", socket.id);

  socket.on("chat", function(data) {
    io.sockets.emit("chat", data);
  });

  socket.on("typing", function(data) {
    socket.broadcast.emit("typing", data);
  });

  socket.on("browseridanServerze", function(params) {
    socket.broadcast.emit("serveridan-browserebze", params);
    // io.sockets.emit("serveridan-browserebze", params);
  });
});
