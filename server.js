// express
const express = require('express');
const app = express();
// http server
const http = require('http').Server(app);
//socket.io
const io = require('socket.io')(http);


// 静的ファイルはpublicフォルダに入れる
app.use(express.static('public'));

// '/'でアクセスするとviewsフォルダのindex.htmlが開く
app.get('/', function(request, response) {
    response.sendFile(__dirname + '/views/index.html');
});
app.get('/rc', function(request, response) {
    response.sendFile(__dirname + '/views/receive.html');
});


//複数のデータを受け取る配列
var ballsArr = [];

//socket通信開始
io.on('connection', function(socket) {
    console.log('通信中' + socket.id);

    //最初に送るidと色相
    var clientData = {
        id: socket.id,
        hue: Math.floor(Math.random() * 360),
        x: 0,
        y: 0,
        width: 0,
        height: 0
    }

    ballsArr.push(clientData);

    //送信
    socket.emit('sendSocketId', clientData);
    console.log(ballsArr);
});