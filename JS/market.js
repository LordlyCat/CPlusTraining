var role = document.querySelector('#role');

document.addEventListener('keypress', boundaryJudgment, false);
document.addEventListener('kepress', boundaryJudgment, false);
document.addEventListener('keypress', backToTown, false);

function boundaryJudgment() {
    // console.log(parseInt(getComputedStyle(role).left));
    // console.log(parseInt(getComputedStyle(role).top));

    if (parseInt(getComputedStyle(role).left) >= 970) {
        role.style.left = '970px';
    }
    if (parseInt(getComputedStyle(role).left) <= 240) {
        role.style.left = '240px';
    }
    if (parseInt(getComputedStyle(role).top) <= 350) {
        role.style.top = '350px';
    }
    if (parseInt(getComputedStyle(role).top) >= 610) {
        role.style.top = '610px';
    }
}

function backToTown(event) {
    var e = event || window.event;
    if (e.keyCode === 13) {
        if (parseInt(getComputedStyle(role).left) >= 220 &&
            parseInt(getComputedStyle(role).left) <= 300 &&
            parseInt(getComputedStyle(role).top) <= 535 &&
            parseInt(getComputedStyle(role).top) >= 500) {

            window.location.href = '../HTML/index.html';
        }
    }
}