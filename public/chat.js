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

socket.on("chat", function (data) {
  sound.play();
  if (first.name) {
    showResult(data.name, timeDifference(Date.now(), first.time));
  } else {
    showResult(data.name, getTime());
    first = { name: data.name, time: Date.now() };
  }
});

socket.on("clear", function () {
  first = {};
  output.innerHTML = " ";
  feedback.innerHTML = " ";
});

const showResult = (name, time) => {
  output.innerHTML += "<p><strong>" + name + ":</strong> " + time + "</p>";
  feedback.innerHTML = " ";
};

const timeDifference = (first, second) => {
  let diff = (first - second).toString();
  console.log(diff);
  console.log(diff.length);
  if (diff.length > 3) {
    diff =
      "+" +
      diff.substring(0, diff.length - 3) +
      "." +
      diff.substring(diff.length - 3, diff.length);
  }
  console.log(diff);
  return diff;
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
