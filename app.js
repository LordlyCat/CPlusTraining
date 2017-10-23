var express = require('express');
var path = require('path');
var url = require('body-parser');
var app = express();

//托管静态资源
app.use(express.static(path.join(__dirname, '/')));


app.post('/', function (req, res, nest) {
    
})
























//设置监听端口
app.listen(4999, function () {
    console.log('Running on port 4999');
})