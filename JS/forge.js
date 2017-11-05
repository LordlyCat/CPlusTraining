var role = document.querySelector('#role');
var blacksmith = document.querySelector('.blacksmith');

document.addEventListener('keypress', boundaryJudgment, false);
document.addEventListener('kepress', boundaryJudgment, false);
document.addEventListener('keypress', backToTown, false);
document.addEventListener('click', forging, false);

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
function forging () {
    
}

//角色信息
var username = window.location.search.substring(10);
var usernameBox = document.querySelector('.username');
usernameBox.innerHTML = username;