var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    crypto = require('crypto'),
    md5 = crypto.createHash('md5'),
    app = express(),
    websocketServer = require('ws').Server,
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
        connection.query("SELECT username FROM user WHERE username=" + "\"" + data.username + "\"", function(err, result) {
            if (result.length !== 0) {
                res.send('failed');
            } else {
                //将用户信息插入数据库

                connection.query("INSERT INTO user SET username=?, password=?, registerTime=?", 
                    [data.username, data.password, registerTime], function(err, result) {
                    if (err) {
                        console.log(err);
                    } else {
                        connection.query("INSERT INTO gameData SET username=?, progress=?, money=?, level=?, experience=?", 
                            [data.username, 0, 0, 1, 0], function(err, result) {
                            if (err) {
                                console.log(err);
                            } else {
                                res.sendStatus(200);
                            }
                        });

                        //背包
                        var goods = ["剑x1", "锻造石x2"];
                        goods = goods.join(",");
                        connection.query("INSERT INTO backpack SET username=?, goods=?", [data.username, goods]);
                    }
                });
            }
        });

    }

    //登录
    else if (data.method === 'login') {
        connection.query("SELECT password FROM user WHERE username=" + "\"" + data.username + "\"", function(err, result) {
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
    } else if (data.method === 'money') {
        //console.log(data);
        connection.query("SELECT money FROM gameData WHERE username=" + "\"" + data.username + "\"", function(err, result) {
            var money = parseInt(JSON.parse(JSON.stringify(result))[0].money);
            money += parseInt(data.number);
            if (money < 0) {
                res.send('notEnough');
            } else {
                connection.query("UPDATE gameData SET money=" + money + " WHERE username=" + "\"" + data.username + "\"", function(err, result) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.sendStatus(200);
                    }
                });
            }
        });
    } else if (data.method === 'progress') {
        connection.query("SELECT progress FROM gameData WHERE username=" + "\"" + data.username + "\"", function(err, result) {
            var progress = parseInt(JSON.parse(JSON.stringify(result))[0].progress);
            res.send(progress.toString());
        });
    } else if (data.method === 'addProgress') {
        connection.query("SELECT progress FROM gameData WHERE username=" + "\"" + data.username + "\"", function  (err, result) {
            var progress = parseInt(JSON.parse(JSON.stringify(result))[0].progress);
            progress++;
            connection.query("UPDATE gameData SET progress=" + progress + " WHERE username=" + "\"" + data.username + "\"");
        })
    } else if (data.method === 'balance') {
        connection.query("SELECT money FROM gameData WHERE username=" + "\"" + data.username + "\"", function(err, result) {
            if (err) {
                console.log(err);
            } else {
                var balance = JSON.parse(JSON.stringify(result))[0].money;
                res.send(balance + '');
            }
        })
    }else if (data.method === 'backpack') {
        connection.query("SELECT goods FROM backpack WHERE username=" + "\"" + data.username + "\"", function (err, result) {
            var goods = JSON.parse(JSON.stringify(result))[0].goods;
            res.send(goods);
        })
    }else if (data.method === 'changeBackpack') {
        connection.query("SELECT goods FROM backpack WHERE username=" + "\"" + data.username + "\"", function (err, result) {
            var goods = JSON.parse(JSON.stringify(result))[0].goods;
            goods = goods.split(",");
            goods.pop;
            goods.join();
            connection.query("UPDATE backpack SET goods=" + "\"" + goods[0] + "\"" + " WHERE username=" + "\"" + data.username + "\"", function (err, result) {
                if (err) {
                    console.log(err);
                }else {
                    res.sendStatus(200);
                }
            });
            
        })
    }
});

//聊天
var ws = new websocketServer({
    port: 5000
});

var clients = []; //连接池

ws.on('connection', function(ws) {
    clients.push(ws);
    console.log('A user has connected');



    ws.on('message', function(message) {
        // 广播消息
        clients.forEach(function(ws) {
            ws.send(message);
        });
    });

    ws.on('close', function(message) {
        // 连接关闭时，将其移出连接池
        clients = clients.filter(function(ws1) {
            return ws1 !== ws;
        })
    });

})


//设置监听端口
app.listen(4999, function() {
    console.log('Running on port 4999');
})