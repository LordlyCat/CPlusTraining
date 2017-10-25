var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    crypto = require('crypto'),
    md5 = crypto.createHash('md5');
    app = express(),
    mysql = require('mysql'),
    connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '88068806',
        database: 'RPGgame'
    });

//连接数据库
connection.connect();

//托管静态资源
app.use(express.static(path.join(__dirname, '/')));

app.use(bodyParser.raw());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.post('/', function(req, res, nest) {
    var data = req.body;

    //注册
    if (data.method === 'register') {
        var date = new Date(),
            registerTime = date.toUTCString();
            
        //判断用户名是否存在
        connection.query("SELECT username FROM user WHERE username=" +"\"" +data.username + "\"", function(err, result) {
            if (result.length !== 0) {
                res.send('failed');
            } else {
                //将用户信息插入数据库

                connection.query("INSERT INTO user SET username=?, password=?, progress=?, registerTime=?",
                 [data.username, data.password, 0, registerTime], function(err, result) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.sendStatus(200);
                    }
                });
            }
        });

    }

    //登录
    else if (data.method === 'login') {
        connection.query('SELECT password FROM user WHERE username=' + data.username, function(err, result) {
            if (err) {
                console.log(err);
            } else if (result.length === 0) {
                res.send('failed');
            } else {
                if (data.password === JSON.parse(JSON.stringify(result))[0].password) {
                    res.sendStatus(200);
                } else {
                    res.send('failed');
                }
            }
        });
    }

});



//设置监听端口
app.listen(4999, function() {
    console.log('Running on port 4999');
})