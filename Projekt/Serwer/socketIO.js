const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);


server.listen(4001, () => {
    console.log("socket działa");
});

module.exports = io;