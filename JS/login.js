var inputs = document.querySelectorAll('input');
var registerBtn = document.querySelector('.register');
var loginBtn = document.querySelector('.login');
var registerInput = document.querySelector('.registerInput');
var loginInput = document.querySelector('.loginInput');
var goToRegister = document.querySelector('.go');

function goRegister(event) {
    var e = event.target || window.event.target;

    registerInput.style.display = 'block';
    loginInput.style.display = 'none';
}

function login() {
    var username = inputs[3].value;
    var password = inputs[4].value;
}

function register() {
    var username = inputs[0].value,
        password = inputs[1].value,
        checkPassword = inputs[2].value;
    if (password !== checkPassword) {
        alert('确认密码与密码不一致，请重新输入');
        inputs[1].value = '';
        inputs[2].value = '';
    }

}

goToRegister.addEventListener('click', goRegister, false);
registerBtn.addEventListener('click', register, false);
loginBtn.addEventListener('click', login, false);