var role = document.querySelector('#role');

//场景入口

document.addEventListener('keypress', enterSomewhere, false);
document.addEventListener('keydown', boundaryJudgment, false);

function enterSomewhere(event) {
    var e = event || window.event;

    if (e.keyCode === 13) {
        if (parseInt(getComputedStyle(role).left) >= 1110 &&
            parseInt(getComputedStyle(role).left) <= 1170 &&
            parseInt(getComputedStyle(role).top) >= 326 &&
            parseInt(getComputedStyle(role).top) <= 370) {

            window.location.href = 'http://127.0.0.1:4999/HTML/market.html' + '?username=' + username;

        } else if (parseInt(getComputedStyle(role).left) <= 160 &&
            parseInt(getComputedStyle(role).top) >= 368 &&
            parseInt(getComputedStyle(role).top) <= 408) {

            window.location.href = 'http://127.0.0.1:4999/HTML/forge.html' + '?username=' + username;
        }

    }

}

//边界检测
function boundaryJudgment(event) {
    var e = event || window.event;

    // console.log(parseInt(getComputedStyle(role).left));
    //console.log(parseInt(getComputedStyle(role).top));
    if (parseInt(role.style.left) >= 1190) {
        role.style.left = '1190px';
    }
    if (parseInt(role.style.left) <= 110) {
        role.style.left = '110px';
    }
    if (parseInt(role.style.top) <= 330) {
        role.style.top = '330px';
    }
    if (parseInt(role.style.top) <= 520 && parseInt(role.style.top) >= 515 &&
        parseInt(role.style.left) >= 1140) {
        role.style.top = '520px';
    }
    if (parseInt(role.style.top) >= 620) {
        role.style.top = '620px';
    }
    if (parseInt(role.style.left) >= 1140 &&
        parseInt(role.style.top) >= 388 &&
        parseInt(role.style.top) <= 407) {
        if (e.keyCode === 83) {
            role.style.top = '390px';
        }
    }
    if (parseInt(role.style.left) >= 1140 &&
        parseInt(role.style.top) >= 410 &&
        parseInt(role.style.top) <= 520) {

        if (e.keyCode === 68) {
            role.style.left = '1140px';
        }
    }
}

//角色信息
var username = decodeURIComponent(window.location.search.substring(10));
var usernameBox = document.querySelector('.username');
usernameBox.innerHTML = username;

//NPC剧情对话
var npc = document.querySelector('.npc_1');
var dialog = document.querySelector('.dialog');
var dialogContent = dialog.querySelector('.content');
var speakerBox = document.querySelector('.speaker');
var dialogOrder = 0;
var startFlag = false;

// localStorage.setItem('flag', true);
// if (localStorage.getItems('flag')) {
//     localStorage.setItem('dialogOrder', dialogOrder);
// }

function startDialogue() {
    // if (parseInt(role.style.top) <= 380 &&
    //     parseInt(role.style.left) >= 750 &&
    //     parseInt(role.style.top) <= 960) {
    startFlag = true;

    ajax({
        url: 'http://127.0.0.1:4999/',
        method: 'POST',
        data: {
            method: 'progress',
            username: username
        },
        success: function(data) {
            console.log(data);
            if (data == 0) {
                dialog.style.display = 'block';
                continueDialogue();
            } else if (data == 2) {
                dialogOrder = 8;
                dialog.style.display = 'block';
                //localStorage.setItem('dialogOrder', dialogOrder);
                continueDialogue();
            }
        },
        error: function(data) {
            console.log(data);
        }
    })
    //}
}

//对话的继续
function continueDialogue(event) {
    var e = event || window.event;

    if (dialog.style.display === 'block' && e.keyCode === 32 &&
        dialogOrder <= 8 || startFlag) {

        var content;
        var speaker;
        //dialogOrder = localStorage.getItems('dialogOrder');
        console.log(dialogOrder);
        switch (dialogOrder) {
            case 0:
                content = '嗨！你是新来的吧，小伙子';
                speaker = 'NPC :';
                break;
            case 1:
                content = '是的，请问这是什么地方？';
                speaker = username + ' :';
                break;
            case 2:
                content = '这是新手村，接下来我会带领你熟悉这里的。你的左边是锻造室，' +
                    '那里可以给你打造出你想要的装备；右边是交易大厅，你任何想要的东西都可以去那儿买到。';
                speaker = 'NPC :';
                break;
            case 3:
                content = '可是我现在身无分文啊，我该怎么弄点钱买东西呢？';
                speaker = username + ' :';
                break;
            case 4:
                content = '我这儿有1w金币，是给你准备的，先借给你拿去用吧，等你有钱了再还我';
                speaker = 'NPC :';
                ajax({
                    url: 'http://127.0.0.1:4999/',
                    method: 'POST',
                    data: {
                        method: 'money',
                        username: username,
                        number: 10000
                    },
                    success: function(data) {
                        if (data === 'notEnough') {
                            alert("金钱不足！")
                        } else if (data === 'OK') {
                            getBalance();
                        }
                    },
                    error: function(data) {
                        console.log(data);
                    }
                });
                break;
            case 5:
                content = '好的，谢谢了！接下来我该干什么呢？';
                speaker = username + ' :';
                break;
            case 6:
                content = '先去交易大厅买两块锻造石，然后去锻造室升级你的装备。完成任务后再回来找我领取奖励';
                speaker = 'NPC :';
                break;
            case 7:
                content = '嗯，知道了';
                speaker = username + ' :';
                addProgress();
                break;
            case 8:
                content = '嗯，不错，这么快就完成任务了！快领取你的任务奖励吧～';
                speaker = 'NPC :';

                ajax({
                    url: 'http://127.0.0.1:4999/',
                    method: 'POST',
                    data: {
                        method: 'progress',
                        username: username
                    },
                    success: function(data) {
                        console.log(data);
                        if (data == 2) {
                            ajax({
                                url: 'http://127.0.0.1:4999/',
                                method: 'POST',
                                data: {
                                    method: 'money',
                                    username: username,
                                    number: 10000
                                },
                                success: function(data) {
                                    if (data === 'notEnough') {
                                        alert("金钱不足！")
                                    } else if (data === 'OK') {
                                        getBalance();
                                        addProgress();
                                        alert("获得任务奖励1W金币");
                                    }
                                },
                                error: function(data) {
                                    console.log(data);
                                }
                            });
                        }
                    },
                    error: function(data) {
                        console.log(data);
                    }
                });


                break;
            default:
                content = 'hahaha';
                speaker = 'NPC :';
                dialog.style.display = 'none';
                break;
        }


        if (dialogOrder === 8 || dialogOrder === 9) {
            dialog.style.display = 'none';
        }
        dialogOrder += 1;
        //localStorage.setItem('dialogOrder', dialogOrder);
        dialogContent.innerHTML = content;
        speakerBox.innerHTML = speaker;
        startFlag = false;
        console.log(content);
    }
}

function getBalance() {
    var balance = document.querySelector('#balance');
    ajax({
        url: 'http://127.0.0.1:4999/',
        method: 'POST',
        data: {
            method: 'balance',
            username: username
        },
        success: function(data) {
            balance.innerHTML = data;
        },
        error: function(data) {
            console.log(data);
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

getBalance();

//背包
var backpack = document.querySelector('.backpack');
var backpackBoard = document.querySelector('.goods');
var showBackpack = document.querySelector('.showGoods');
var quitBackpack = document.querySelector('.quit');

backpack.addEventListener('click', function() {
    backpackBoard.style.display = 'block';
    ajax({
        url: 'http://127.0.0.1:4999/',
        method: 'POST',
        data: {
            method: 'backpack',
            username: username
        },
        success: function(data) {
            var goods = data.split(",");
            //console.log(goods);
            for (var i = 0; i < goods.length; i++) {
                var li = document.createElement('li');
                li.innerHTML = goods[i];
                showBackpack.appendChild(li);
            }

        }
    })
}, false);

quitBackpack.addEventListener('click', function() {
    backpackBoard.style.display = 'none';
    showBackpack.innerHTML = null;
}, false);

//聊天
var ws = new WebSocket('ws:localhost:5000');
var talk = document.querySelector('.talk');
var showMessage = document.querySelector('.showMessage');
var messageInput = document.querySelector('#input');
var sendBtn = document.querySelector('.send');
var closeBtn = document.querySelector('.close');
var openBtn = document.querySelector('.open');


ws.onopen = function() {
    console.log('Connection to server opened');
}

function sendMessage() {
    var data = {}
    var message = messageInput.value;
    data.username = username;
    data.message = message;
    data = JSON.stringify(data);
    if (message.replace(/(^\s*)|(\s*$)/g, '').length === 0) {
        alert('发送内容不能为空！')
    } else {
        ws.send(data);
        messageInput.value = '';
    }

}

function enterSend(event) {
    var event = event || window.event;
    if (event.keyCode === 13 && closeBtn.style.display === 'block') {
        sendMessage();
    }
}


ws.onmessage = function(message) {
    data = JSON.parse(message.data)
    console.log(data.message);
    var li = document.createElement('li');
    var user = document.createElement('span');
    var messageBox = document.createElement('p');

    user.className = 'user';
    messageBox.className = 'message';
    user.innerHTML = data.username + " :";
    messageBox.innerHTML = data.message;

    showMessage.appendChild(li);
    li.appendChild(user);
    li.appendChild(messageBox);

    showMessage.scrollTop = showMessage.scrollHeight;
}

function openTalk() {
    openBtn.style.display = 'none';
    closeBtn.style.display = 'block';
    talk.className = 'onTalk';
}

function closeTalk() {
    openBtn.style.display = 'block';
    closeBtn.style.display = 'none';
    talk.className = 'talk';
    showMessage.innerHTML = '';
}


sendBtn.addEventListener('click', sendMessage, false);
document.addEventListener('keypress', enterSend, false);
openBtn.addEventListener('click', openTalk, false);
closeBtn.addEventListener('click', closeTalk, false);
npc.addEventListener('click', startDialogue, false);
document.addEventListener('keypress', continueDialogue, false);

//The end