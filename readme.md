nodemonis linuxze gasashvebad sachiroa 
./node_modules/.bin/nodemon index.js



The difference between these two, is that devDependencies are modules which are only required during development, while dependencies are modules which are also required at runtime.
A nice shorthand for installing a devDependency that I like to use is npm i -D. The shorthand for saving a regular dependency is -S instead of -D.



1.1 - variables for server 

let express = require("express");
let socket = require("socket.io");

// App setup
let app = express();
let server = app.listen(1024, function() {
  console.log("listening to requests on port 1024");
});

// Static files
app.use(express.static("public"));

// Socket setup
let io = socket(server);

............................................................

1.2 - variables for client

let socket = io.connect("http://localhost:1024");

sheidzleba sachiro iyos DOM-is elementebi 
        let message = document.getElementById("message"),

............................................................
............................................................



2  create connection 

kavshiris dasamyareblad, soketebis gasaertianeblad
io.on("connection", function(socket) {




............................................................
............................................................




3 FROM BROWSER(SOCKET) TO SERVER

sachiroa eventListeneri nebismieri
da vgzavnit serverze rame saxelit events , romelsac miaqvs obieqti

window.addEventListener("click", function() {
  socket.emit("browseridanServerze", {
    sender: handle.value,
    X: event.clientX,
    Y: event.clientY
  });
});


magalitad saxelit "browseridanServerze" events, miaqvs obieqti 
{
    sender: handle.value,
    X: event.clientX,
    Y: event.clientY
}


............................................................
............................................................



4 FROM SERVER TO BROWSERS (SOCKETS)

             vv AQ JDEBA SAXELI vv
  socket.on( "browseridanServerze",   function(params) {
    socket.broadcast.emit("serveridan-browserebze", params);
   });
  


io.sockets.emit      -   am shemtxvevashi egzavneba yvelas, mat shoris gamgzavns 
socket.broadcast.emit       -   am shemtxvevashi gamgzavns ar ubrundeba 


............................................................
............................................................



5  BROWSER(SOCKET) GEBULOBS DATAS SERVERIDAN
      A  socket.on("serveridan-browserebze", function(params) {
         console.log(params);
         });
      B  socket.on("typing", function(data) {
         feedback.innerHTML = "<p><em>" + data + " is typing a message... </em></p>";
         });