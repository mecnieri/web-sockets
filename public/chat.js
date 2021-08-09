import { getTime } from "./getTime.js";
const sound = new Audio("sound.mp3");

//  Make Connection
const HOST = location.origin.replace(/^http/, "ws");
let socket = io.connect(HOST);
const name = prompt("შეიყვანე შენი სახელი...");

// Query DOM
// let handle = document.getElementById("handle"),
let btn = document.getElementById("send"),
  output = document.getElementById("output"),
  feedback = document.getElementById("feedback");

// Emit event
btn.addEventListener("click", () =>
  socket.emit("chat", {
    name: name,
  })
);

clear.addEventListener("click", () => socket.emit("clear"));

let first = {};

socket.on("chat", function (data, time) {
  sound.play();
  showResult(data.name, time || getTime());
});

socket.on("clear", function () {
  output.innerHTML = " ";
  feedback.innerHTML = " ";
});

const showResult = (name, time) => {
  output.innerHTML += "<p><strong>" + name + ":</strong> " + time + "</p>";
  feedback.innerHTML = " ";
};

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
