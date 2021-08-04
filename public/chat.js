import { getTime } from "./getTime.js";
const sound = new Audio("sound.mp3");

//  Make Connection
const HOST = location.origin.replace(/^http/, "ws");
let socket = io.connect(HOST);

// Query DOM
let handle = document.getElementById("handle"),
  btn = document.getElementById("send"),
  output = document.getElementById("output"),
  feedback = document.getElementById("feedback");

// Emit event
btn.addEventListener("click", () =>
  socket.emit("chat", {
    name: handle.value,
  })
);

clear.addEventListener("click", () => socket.emit("clear"));

socket.on("chat", function (data) {
  sound.play();
  output.innerHTML +=
    "<p><strong>" + data.name + ":</strong> " + getTime() + "</p>";
  feedback.innerHTML = " ";
});

socket.on("clear", function () {
  output.innerHTML = " ";
  feedback.innerHTML = " ";
});

// message.addEventListener("keypress", function () {
//   socket.emit("typing", handle.value);
// });

// socket.on("typing", function (data) {
//   feedback.innerHTML = "<p><em>" + data + " is typing a message... </em></p>";
// });

// window.addEventListener("click", function () {
//   socket.emit("browseridanServerze", {
//     sender: handle.value,
//     X: event.clientX,
//     Y: event.clientY,
//   });
// });

// socket.on("serveridan-browserebze", function (params) {
//   console.log(params);
// });
