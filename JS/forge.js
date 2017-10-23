var role = document.querySelector('#role');

document.addEventListener('keypress', boundaryJudgment, false);
document.addEventListener('kepress', boundaryJudgment, false);
document.addEventListener('keypress', backToTown, false);

function boundaryJudgment() {
    console.log(parseInt(getComputedStyle(role).left));
    //console.log(parseInt(getComputedStyle(role).top));

    if (parseInt(getComputedStyle(role).left) >= 720) {
        role.style.left = '720px';
    }
    if (parseInt(getComputedStyle(role).left) <= 270) {
        role.style.left = '270px';
    }
    if (parseInt(getComputedStyle(role).top) <= 80) {
        role.style.top = '80px';
    }
    if (parseInt(getComputedStyle(role).top) >= 300) {
        role.style.top = '300px';
    }
}

function backToTown(event) {
    var e = event || window.event;
    if (e.keyCode === 13) {
        if (parseInt(getComputedStyle(role).left) >= 280 &&
            parseInt(getComputedStyle(role).left) <= 350 &&
            parseInt(getComputedStyle(role).top) <= 135 &&
            parseInt(getComputedStyle(role).top) >= 100) {

            window.location.href = '../HTML/index.html';
        }
    }
}