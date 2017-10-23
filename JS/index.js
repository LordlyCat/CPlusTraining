var role = document.querySelector('#role');

//场景入口

document.addEventListener('keypress', enterSomewhere, false);
document.addEventListener('keydown', boundaryJudgment, false);

function enterSomewhere(event) {
    var e = event || window.event;

    if (e.keyCode === 13) {
        if (parseInt(getComputedStyle(role).left) >= 1110 &&
            parseInt(getComputedStyle(role).left) <= 1170 &&
            parseInt(getComputedStyle(role).top) >= 360 &&
            parseInt(getComputedStyle(role).top) <= 395) {

            window.location.href = '../HTML/market.html';

        } else if (parseInt(getComputedStyle(role).left) <= 160 &&
            parseInt(getComputedStyle(role).top) >= 404 &&
            parseInt(getComputedStyle(role).top) <= 436) {

            window.location.href = '../HTML/forge.html';
        }

    }

}

//边界检测
function boundaryJudgment(event) {
    var e = event || window.event;

    // console.log(parseInt(getComputedStyle(role).left));
    // console.log(parseInt(getComputedStyle(role).top));
    if (parseInt(role.style.left) >= 1190) {
        role.style.left = '1190px';
    }
    if (parseInt(role.style.left) <= 110) {
        role.style.left = '110px';
    }
    if (parseInt(role.style.top) <= 350) {
        role.style.top = '350px';
    }
    if (parseInt(role.style.top) <= 520 && parseInt(role.style.top) >= 515 &&
        parseInt(role.style.left) >= 1150) {
        role.style.top = '520px';
    }
    if (parseInt(role.style.top) >= 620) {
        role.style.top = '620px';
    }
    if (parseInt(role.style.left) >= 1150 &&
        parseInt(role.style.top) >= 410 &&
        parseInt(role.style.top) <= 417) {
        if (e.keyCode === 83) {
            role.style.top = '410px';
        }
    }
    if (parseInt(role.style.left) >= 1150 &&
        parseInt(role.style.top) >= 410 &&
        parseInt(role.style.top) <= 520) {

        if (e.keyCode === 68) {
            role.style.left = '1150px';
        }
    }
}

//NPC剧情对话
var npc = document.querySelector('.npc_1');
var dialog = document.querySelector('.dialog');
var dialogContent = dialog.querySelector('.content');
var dialogOrder = 1;

// localStorage.setItem('flag', true);
// if (localStorage.getItems('flag')) {
//     localStorage.setItem('dialogOrder', dialogOrder);
// }

function startDialogue() {
    if (parseInt(role.style.top) <= 380 &&
        parseInt(role.style.left) >= 750 &&
        parseInt(role.style.top) <= 960) {
        dialog.style.display = 'block';
    }
}

//对话的继续
function continueDialogue(event) {
    var e = event || window.event;

    if (dialog.style.display === 'block' && e.keyCode === 32 &&
        dialogOrder <= 8) {

        var content = '';
        //dialogOrder = localStorage.getItems('dialogOrder');

        switch (dialogOrder) {
            case 1:
                content = '是的，请问这是什么地方？';
                break;
            case 2:
                content = '这是新手村，接下来我会带领你熟悉这里的。你的左边是锻造室，' +
                    '那里可以给你打造出你想要的装备；右边是交易大厅，你任何想要的东西都可以去那儿买到。';
                break;
            case 3:
                content = '可是我现在身无分文啊，我该怎么弄点钱买东西呢？';
                break;
            case 4:
                content = '我这儿有1w金币，是给你准备的，先借给你拿去用吧，等你有钱了再还我';
                break;
            case 5:
                content = '好的，谢谢了！接下来我该干什么呢？';
                break;
            case 6:
                content = '先去交易大厅买两块锻造石，然后去锻造室升级你的装备。完成任务后再回来找我';
                break;
            case 7:
                content = '嗯，知道了';
                break;
            case 8:
                content = '嗯，不错，这么快就完成任务了！快领取你的任务奖励吧～';
                break;
            default:
                content = 'hahaha';
                break;
        }

        dialogOrder += 1;
        localStorage.setItem('dialogOrder', dialogOrder);
        dialogContent.innerHTML = content;
    }
}

document.addEventListener('click', startDialogue, false);
document.addEventListener('keypress', continueDialogue, false);


















//The end