var role = document.querySelector('#role');
var blacksmith = document.querySelector('.blacksmith');

document.addEventListener('keypress', boundaryJudgment, false);
document.addEventListener('kepress', boundaryJudgment, false);
document.addEventListener('keypress', backToTown, false);
//document.addEventListener('click', forging, false);

//边界判断
function boundaryJudgment() {

    if (parseInt(getComputedStyle(role).left) >= 720) {
        role.style.left = '720px';
    }
    if (parseInt(getComputedStyle(role).left) <= 270) {
        role.style.left = '270px';
    }
    if (parseInt(getComputedStyle(role).top) <= 80) {
        role.style.top = '77px';
    }
    if (parseInt(getComputedStyle(role).top) >= 300) {
        role.style.top = '300px';
    }
}

//返回城镇
function backToTown(event) {
    var e = event || window.event;
    if (e.keyCode === 13) {
        if (parseInt(getComputedStyle(role).left) >= 280 &&
            parseInt(getComputedStyle(role).left) <= 340 &&
            parseInt(getComputedStyle(role).top) <= 106 &&
            parseInt(getComputedStyle(role).top) >= 75) {

            window.location.href = 'http://127.0.0.1:4999/HTML/index.html' + '?username=' + username;
        }
    }
}

//锻造
var forge = document.querySelector('.forge');
var quit = document.querySelector('.quit');
var upgrade = document.querySelector('.upgrade');
var consume = document.querySelector('.consume');
var sure = document.querySelector('.sure');
var cancel = document.querySelector('.cancel');

blacksmith.addEventListener('click', function() {
    forge.style.display = 'block';
}, false);

quit.addEventListener('click', function() {
    forge.style.display = 'none';
}, false);

upgrade.addEventListener('click', function() {
    consume.style.display = 'block';
    this.style.display = 'none';
}, false);

cancel.addEventListener('click', function() {
    consume.style.display = 'none';
    upgrade.style.display = 'block';
}, false)

sure.addEventListener('click', function() {
    consume.style.display = 'none';
    upgrade.style.display = 'block';


    ajax({
        url: 'http://127.0.0.1:4999/',
        method: 'POST',
        data: {
            method: 'progress',
            username: username
        },
        success: function(data) {
            console.log(data);
            if (data == 1) {
                upgradeEquipment();
            }else {
                alert("此任务已完成，不能再次升级");
            }
        },
        error: function(data) {
            console.log(data);
        }
    })



}, false);

function upgradeEquipment() {
    ajax({
        url: 'http://127.0.0.1:4999/',
        method: 'POST',
        data: {
            method: 'money',
            username: username,
            number: -500
        },
        success: function(data) {
            console.log(data);
            ajax({
                url: 'http://127.0.0.1:4999/',
                method: 'POST',
                data: {
                    username: username,
                    method: 'changeBackpack'
                    //which: '锻造石x2'
                },
                success: function(data) {
                    console.log(data);
                    addProgress();
                    alert("升级成功！");
                }
            });
        }
    });
}

function addProgress() {
    ajax({
        url: 'http://127.0.0.1:4999/',
        method: 'POST',
        data: {
            method: 'addProgress',
            username: username
        }
    })
}

//角色信息
var username = decodeURIComponent(window.location.search.substring(10));
var usernameBox = document.querySelector('.username');
usernameBox.innerHTML = username;