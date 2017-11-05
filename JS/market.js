var role = document.querySelector('#role');

document.addEventListener('keypress', boundaryJudgment, false);
document.addEventListener('kepress', boundaryJudgment, false);
document.addEventListener('keypress', backToTown, false);

//边界判断
function boundaryJudgment() {
    //console.log(parseInt(getComputedStyle(role).left));
    //console.log(parseInt(getComputedStyle(role).top));

    if (parseInt(getComputedStyle(role).left) >= 970) {
        role.style.left = '970px';
    }
    if (parseInt(getComputedStyle(role).left) <= 240) {
        role.style.left = '240px';
    }
    if (parseInt(getComputedStyle(role).top) <= 330) {
        role.style.top = '330px';
    }
    if (parseInt(getComputedStyle(role).top) >= 610) {
        role.style.top = '610px';
    }
}

//返回城镇
function backToTown(event) {
    var e = event || window.event;
    if (e.keyCode === 13) {
        if (parseInt(getComputedStyle(role).left) >= 220 &&
            parseInt(getComputedStyle(role).left) <= 300 &&
            parseInt(getComputedStyle(role).top) <= 510 &&
            parseInt(getComputedStyle(role).top) >= 470) {

            window.location.href = 'http://127.0.0.1:4999/HTML/index.html' + '?username=' + username;
        }
    }
}

//角色信息
var username = window.location.search.substring(10);
var usernameBox = document.querySelector('.username');
usernameBox.innerHTML = username;

//与商人交互
var businessman = document.querySelector('.businessman');
var store = document.querySelector('.storeWrapper');
var back = document.querySelector('.back');

businessman.addEventListener('click', openStore, false);
role.addEventListener('click', openStore, false);
back.addEventListener('click', goBack, false);

function openStore() {
    if (parseInt(getComputedStyle(role).left) >= 670 &&
        parseInt(getComputedStyle(role).top) <= 370) {
        store.style.display = 'block';
    }
}

function goBack () {
    store.style.display = 'none';
}

//购买商品
var goods = document.querySelectorAll('.good');

function buySomething(event) {
    var e = event || window.event;
    e = e.target;
    if (e.className === 'buy') {
        var num = parseInt(e.parentNode.children[3].value),
            tradeName = e.parentNode.children[0].innerHTML,
            price = parseInt(e.parentNode.children[1].innerHTML),
            total = num * price;

        if (num > 0) {
            ajax({
                url: '/',
                method: 'POST',
                data: {
                    method: 'money',
                    username: window.location.search.substring(10),
                    number: -total
                },
                success: function(data) {
                    if (data === 'notEnough') {
                        alert("金钱不足！")
                    }
                    else if (data === 'OK') {
                        alert('购买成功，此次共花费' + total + '金币。');
                    }
                },
                error: function(data) {
                    console.log(data);
                }
            });
        } else {
            alert('购买数量至少为 1');
        }
    }
}

for (var i = 0; i < goods.length; i++) {
    goods[i].addEventListener('click', buySomething, false);
}





//The end