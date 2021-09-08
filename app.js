const startBtn = document.getElementById('start');
const screens = document.querySelectorAll('.screen');
const timeList = document.getElementById('time-list');
const timeEl = document.getElementById('time');
const board = document.getElementById('board');
const colors = ['#20639b', '#3caea3', '#f6d55c', 
'#ed553b', '#d8c42c'];

let time = 0;
let points = 0;

startBtn.addEventListener('click', nextScreen);
timeList.addEventListener('click', nextScreenLi);
board.addEventListener('click', hitCircle);

function nextScreen(event) {
    event.preventDefault();
    event.target.closest('.screen').classList.add('up');
}

function nextScreenLi(event) {
    if(event.target.tagName != 'BUTTON') return;
    time = parseInt(event.target.getAttribute('data-time'));
    event.target.closest('.screen').classList.add('up');
    startGame(time);
}

function hitCircle(event) {
    if(!event.target.classList.contains('circle')) return;
    event.target.remove();
    points++;
    createRandomCircle();    
}


function startGame(time) {
    setInterval(decreaseTime, 1000);
    createRandomCircle();
    setTIme(time);
}

function decreaseTime() {
    if(time === 0){
        finishGame();
    }else{
        let current = --time;
        if(current < 10) current = `0${current}`;
        setTIme(current);
    }    
}

function setTIme(value) {
    timeEl.innerHTML = `00:${value}`
}

function finishGame() {
    timeEl.parentNode.classList.add('hide');
    board.innerHTML = `<h1>Поздравляю, Ваш счет: <span class="primary">${points}</span></h1>`
}

function createRandomCircle(params) {
    const circle = document.createElement('div');

    circle.classList.add('circle');
    board.append(circle);

    const {width, height} = board.getBoundingClientRect();
    const scale = getRandonNumber(5, 15);
    const coordX = getRandonNumber(0, width - scale);
    const coordY = getRandonNumber(0, height - scale);
    const indexColor = getRandonNumber(0, 4);

    circle.style.width = `${scale}px`;
    circle.style.height = `${scale}px`;
    circle.style.top = `${coordY}px`;
    circle.style.left = `${coordX}px`;
    circle.style.background = colors[indexColor];

}

function getRandonNumber(min, max) {
    return Math.round((Math.random() * (max - min)) + min);
}