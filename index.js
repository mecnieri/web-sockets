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

let dartymebi = [];

let first = {};

io.on("connection", (socket) => {
  console.log("made socket connection with id of ", socket.id);

  socket.on("chat", (obj) => {
    if (!dartymebi.includes(obj.name)) {
      dartymebi.push(obj.name);
      // io.sockets.emit("chat", obj);

      if (first.name) {
        io.sockets.emit("chat", obj, timeDifference(Date.now(), first.time));
        // showResult(data.name, timeDifference(Date.now(), first.time));
      } else {
        io.sockets.emit("chat", obj);
        // showResult(data.name, getTime());
        first = { name: obj.name, time: Date.now() };
      }
    }
  });

  socket.on("clear", () => {
    console.log("clear");
    dartymebi = [];
    io.sockets.emit("clear");
    first = {};
  });
});

const timeDifference = (first, second) => {
  let diff = (first - second).toString();
  console.log(diff);
  console.log(diff.length);
  if (diff.length > 3) {
    diff =
      diff.substring(0, diff.length - 3) +
      "." +
      diff.substring(diff.length - 3, diff.length);
  }
  console.log(diff);
  return "+" + diff;
};
// socket.on("browseridanServerze", (params) => {
//   socket.broadcast.emit("serveridan-browserebze", params);
// });

// io.sockets.emit("serveridan-browserebze", params);

// socket.on("typing", (data) => {
//   socket.broadcast.emit("typing", data);
// });
