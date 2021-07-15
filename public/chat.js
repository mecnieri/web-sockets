//  Make Connection
// const port = "localhost:3000";
var HOST = location.origin.replace(/^http/, 'ws')

let socket = io.connect(HOST);
 
// Query DOM
let message = document.getElementById("message"),
  handle = document.getElementById("handle"),
  btn = document.getElementById("send"),
  output = document.getElementById("output"),
  feedback = document.getElementById("feedback");

// Emit event

btn.addEventListener("click", function () {
  socket.emit("chat", {
    handle: handle.value,
    message: message.value,
  });
  message.value = "";
});

socket.on("chat", function (data) {
  output.innerHTML +=
    "<p><strong>" + data.handle + ":</strong>" + data.message + "</p>";
  feedback.innerHTML = " ";
});

message.addEventListener("keypress", function () {
  socket.emit("typing", handle.value);
});

socket.on("typing", function (data) {
  feedback.innerHTML = "<p><em>" + data + " is typing a message... </em></p>";
});

window.addEventListener("click", function () {
  socket.emit("browseridanServerze", {
    sender: handle.value,
    X: event.clientX,
    Y: event.clientY,
  });
});

socket.on("serveridan-browserebze", function (params) {
  console.log(params);
});
