document.addEventListener('keydown', roleMoving, false);
document.addEventListener('keyup', function() {
    if (flag) {
        role.style.background = 'url("../img/00.png") no-repeat';
        role.style.backgroundPosition = '20px 27px';
    } else {
        role.style.background = 'url("../img/000.png") no-repeat';
        role.style.backgroundPosition = '10px 27px';
    }
}, false);

var right = 1;
var flag = true;//是否改变行走方向

//人物移动函数
function roleMoving(event) {
    var e = event || window.event;

    //go right
    if (e.keyCode === 68) {

        flag = true;
        role.style.left = parseInt(getComputedStyle(role).left) + 10 + 'px';
        changeRoleImg(right);
        if (right < 8) {
            right++;
        } else if (right === 8) {
            right = 1;
        }
        //console.log(role.style.left);
    }

    //go left
    if (e.keyCode === 65) {
        flag = false;

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

        role.style.top = parseInt(getComputedStyle(role).top) + 4 + 'px';
        changeRoleImg(right);

        if (right < 8) {
            right++;
        } else if (right === 8) {
            right = 1;
        }
    }

}


//change role`s image
function changeRoleImg(index) {
    if (flag) {
        switch (index) {
            case 1:
                role.style.background = 'url("../img/1.png") no-repeat';
                role.style.backgroundPosition = '20px 27px';
                break;
            case 2:
                role.style.background = 'url("../img/2.png") no-repeat';
                role.style.backgroundPosition = '20px 27px';
                break;
            case 3:
                role.style.background = 'url("../img/3.png") no-repeat';
                role.style.backgroundPosition = '20px 27px';
                break;
            case 4:
                role.style.background = 'url("../img/4.png") no-repeat';
                role.style.backgroundPosition = '20px 27px';
                break;
            case 5:
                role.style.background = 'url("../img/5.png") no-repeat';
                role.style.backgroundPosition = '20px 27px';
                break;
            case 6:
                role.style.background = 'url("../img/6.png") no-repeat';
                role.style.backgroundPosition = '20px 27px';
                break;
            case 7:
                role.style.background = 'url("../img/7.png") no-repeat';
                role.style.backgroundPosition = '20px 27px';
                break;
            case 8:
                role.style.background = 'url("../img/8.png") no-repeat';
                role.style.backgroundPosition = '20px 27px';
                break;
            default:
                role.style.background = 'url("../img/00.png") no-repeat';
                role.style.backgroundPosition = '20px 27px';
                break;
        }
    } else {
        switch (index) {
            case 1:
                role.style.background = 'url("../img/01.png") no-repeat';
                role.style.backgroundPosition = '10px 27px';
                break;
            case 2:
                role.style.background = 'url("../img/02.png") no-repeat';
                role.style.backgroundPosition = '10px 27px';
                break;
            case 3:
                role.style.background = 'url("../img/03.png") no-repeat';
                role.style.backgroundPosition = '10px 27px';
                break;
            case 4:
                role.style.background = 'url("../img/04.png") no-repeat';
                role.style.backgroundPosition = '10px 27px';
                break;
            case 5:
                role.style.background = 'url("../img/05.png") no-repeat';
                role.style.backgroundPosition = '10px 27px';
                break;
            case 6:
                role.style.background = 'url("../img/06.png") no-repeat';
                role.style.backgroundPosition = '10px 27px';
                break;
            case 7:
                role.style.background = 'url("../img/07.png") no-repeat';
                role.style.backgroundPosition = '10px 27px';
                break;
            case 8:
                role.style.background = 'url("../img/08.png") no-repeat';
                role.style.backgroundPosition = '10px 27px';
                break;
            default:
                role.style.background = 'url("../img/000.png") no-repeat';
                role.style.backgroundPosition = '10px 27px';
                break;
        }
    }
}