var role = document.querySelector('#role');
// var role_x = parseInt(getComputedStyle(role).left);
// var role_y = parseInt(getComputedStyle(role).top);

//人物移动
document.addEventListener('keydown', roleMoving, false);
document.addEventListener('keyup', function() {
    if (flag) {
        role.style.background = 'url("../img/00.png") no-repeat';
    }else {
        role.style.background = 'url("../img/000.png") no-repeat';
    }
}, false);

var right = 1;
var flag = true;

//人物移动函数
function roleMoving(event) {
    var e = event || window.event;

    //go right
    if (e.keyCode === 68) {
        flag = true;
        if (parseInt(role.style.left) >= 1190) {
            role.style.left = '1190px';
        }
        if (parseInt(getComputedStyle(role).top) >= 426 &&
            parseInt(getComputedStyle(role).top) <= 514) {
            if (parseInt(role.style.left) >= 1100) {
                role.style.left = '1100px';
            }
        }
        role.style.left = parseInt(getComputedStyle(role).left) + 10 + 'px';
        changeRoleImg(right);
        if (right < 8) {
            right++;
        } else if (right === 8) {
            right = 1;
        }

    }

    //go left
    if (e.keyCode === 65) {
        flag = false;
        if (parseInt(role.style.left) <= 110) {
            role.style.left = '110px';
        }
        
        role.style.left = parseInt(getComputedStyle(role).left) - 10 + 'px';
        changeRoleImg(right);
        if (right < 8) {
            right++;
        } else if (right === 8) {
            right = 1;
        }

    }

    //go up
    if (e.keyCode === 87) {
        if (parseInt(role.style.top) <= 350) {
            role.style.top = '350px';
        }
        if (parseInt(role.style.top) <= 520 && parseInt(role.style.top) >= 515 &&
            parseInt(role.style.left) >= 1100) {
            role.style.top = '520px';
        }
        role.style.top = parseInt(getComputedStyle(role).top) - 4 + 'px';

        changeRoleImg(right);

        if (right < 8) {
            right++;
        } else if (right === 8) {
            right = 1;
        }
        //console.log(role.style.top);
    }

    //go down
    if (e.keyCode === 83) {
        if (parseInt(role.style.top) >= 620) {
            role.style.top = '620px';
        }
        if (parseInt(role.style.top) <= 425 && parseInt(role.style.top) >= 415 &&
            parseInt(role.style.left) >= 1100) {
            role.style.top = '420px';
        }

        role.style.top = parseInt(getComputedStyle(role).top) + 4 + 'px';
        changeRoleImg(right);

        if (right < 8) {
            right++;
        } else if (right === 8) {
            right = 1;
        }
        //console.log(role.style.top);
    }

}


//change role`s image
function changeRoleImg(index) {
    if (flag) {
        switch (index) {
            case 1:
                role.style.background = 'url("../img/1.png") no-repeat';
                break;
            case 2:
                role.style.background = 'url("../img/2.png") no-repeat';
                break;
            case 3:
                role.style.background = 'url("../img/3.png") no-repeat';
                break;
            case 4:
                role.style.background = 'url("../img/4.png") no-repeat';
                break;
            case 5:
                role.style.background = 'url("../img/5.png") no-repeat';
                break;
            case 6:
                role.style.background = 'url("../img/6.png") no-repeat';
                break;
            case 7:
                role.style.background = 'url("../img/7.png") no-repeat';
                break;
            case 8:
                role.style.background = 'url("../img/8.png") no-repeat';
                break;
            default:
                role.style.background = 'url("../img/00.png") no-repeat';
                break;
        }
    } else {
        switch (index) {
            case 1:
                role.style.background = 'url("../img/01.png") no-repeat';
                break;
            case 2:
                role.style.background = 'url("../img/02.png") no-repeat';
                break;
            case 3:
                role.style.background = 'url("../img/03.png") no-repeat';
                break;
            case 4:
                role.style.background = 'url("../img/04.png") no-repeat';
                break;
            case 5:
                role.style.background = 'url("../img/05.png") no-repeat';
                break;
            case 6:
                role.style.background = 'url("../img/06.png") no-repeat';
                break;
            case 7:
                role.style.background = 'url("../img/07.png") no-repeat';
                break;
            case 8:
                role.style.background = 'url("../img/08.png") no-repeat';
                break;
            default:
                role.style.background = 'url("../img/000.png") no-repeat';
                break;
        }
    }
}