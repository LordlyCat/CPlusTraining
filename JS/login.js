var inputs = document.querySelectorAll('input');
var registerBtn = document.querySelector('.register');
var loginBtn = document.querySelector('.login');
var registerInput = document.querySelector('.registerInput');
var loginInput = document.querySelector('.loginInput');
var goToRegister = document.querySelector('.go');
var welcome = document.querySelector('.welcome');
var welcomeWords = document.querySelector('.welcomeWords');
var countTime = document.querySelector('.time');

//跳转到注册
function goRegister(event) {
    var e = event.target || window.event.target;

    registerInput.style.display = 'block';
    loginInput.style.display = 'none';
}

//登录
function login() {
    var username = inputs[3].value;
    var password = hex_md5(inputs[4].value);
    if (username.replace(/(^\s*)|(\s*$)/g, '').length === 0) {
        alert('请输入用户名');
        return false;
    }

    //发送请求
    ajax({
        url: 'http://127.0.0.1:4999/',
        method: 'POST',
        data: {
            'method': 'login',
            'username': username,
            'password': password
        },
        success: function(data) {
            if (data === 'OK') {
                welcomeWords.innerHTML = '登录成功';
                welcome.className = 'showWelcome';
                setTimeout(function() {
                    var restTime = 4;
                    var timer = setInterval(function() {
                        if (restTime < 1) {
                            restTime = 1;
                            clearInterval(timer);
                            window.location.href = 'http://127.0.0.1:4999/HTML/index.html' + '?username=' + username;
                        }
                        countTime.innerHTML = restTime;
                        restTime--;
                    }, 1000)
                }, 100);
            } else if (data === 'failed') {
                alert('账号或密码错误！');
            }
        },
        error: function(data) {
            console.log(data);
        }
    });
}

//注册
function register() {
    var username = inputs[0].value,
        password = inputs[1].value,
        checkPassword = inputs[2].value;

    //输入检测
    if (username.replace(/(^\s*)|(\s*$)/g, '').length === 0 &&
        username.replace(/(^\s*)|(\s*$)/g, '').length <= 10) {
        alert('用户名不能为空且不能超过十个字符');
        inputs[0].value = '';
    } else if (password.replace(/(^\s*)|(\s*$)/g, '').length === 0 &&
        password.replace(/(^\s*)|(\s*$)/g, '').length <= 20) {

        alert('密码不能为空格且不能超过20个字符');
    } else if (password !== checkPassword) {
        alert('确认密码与密码不一致，请重新输入');
        inputs[1].value = '';
        inputs[2].value = '';
    } else {
        //加密
        password = hex_md5(inputs[1].value);

        //发送请求
        ajax({
            url: '/',
            method: 'POST',
            data: {
                'method': 'register',
                'username': username,
                'password': password
            },
            success: function(data) {
                if (data === 'OK') {
                    welcomeWords.innerHTML = '注册成功';
                    welcome.className = 'showWelcome';
                    setTimeout(function() {
                        var restTime = 4;
                        var timer = setInterval(function() {
                            if (restTime < 1) {
                                restTime = 1;
                                clearInterval(timer);
                                window.location.href = 'http://127.0.0.1:4999/HTML/index.html' + '?username=' + username;
                            }
                            countTime.innerHTML = restTime;
                            restTime--;
                        }, 1000)
                    }, 100);
                } else if (data === 'failed') {
                    alert('用户名已存在');
                }
            },
            error: function(data) {
                console.log(data);
            }
        })
    }

}

goToRegister.addEventListener('click', goRegister, false);
registerBtn.addEventListener('click', register, false);
loginBtn.addEventListener('click', login, false);



//The end