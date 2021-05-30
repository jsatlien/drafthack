const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const routes = require('./routes');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

//socket setup
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
//set to express for router access
app.io = io;
io.on('connection', socket => {
  console.log('a user connected');
});

//middlewares 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(cors());
app.use(routes);

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

server.listen(PORT, function() {
  mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/drafthack");
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
