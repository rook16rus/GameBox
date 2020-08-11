var $start = document.querySelector('#start');
var $game = document.querySelector('#game');
var $time = document.querySelector('#time');
var $result = document.querySelector('#result');
var $timeHeader = document.querySelector('#time-header');
var $resultHeader = document.querySelector('#result-header');
var $gameTime = document.querySelector('#game-time');

var score = 0;
var isGameStarted = false;
var colors = ['red', 'blue', 'pink', 'green', 'yellow', 'purple', 'khaki', 'orange'];

$game.addEventListener('click', handleBoxClick);
$start.addEventListener('click', startGame);
$gameTime.addEventListener('input', setGameTime);

function startGame()
{
    score = 0;
    isGameStarted = true;
    setGameTime();
    $gameTime.setAttribute('disabled', true);
    $game.style.backgroundColor = 'white';
    hide($start);

    var interval = setInterval(function ()
    {
        var time = parseFloat($time.textContent);
       if (time <= 0)
       {
           clearInterval(interval);
           endGame();
       }else
       {
           $time.textContent = (time - 0.1).toFixed(1);
       }
    }, 100);

    renderBox();
}

function endGame()
{
    isGameStarted = false;
    $start.classList.remove('hide');
    $gameTime.removeAttribute('disabled');
    $game.innerHTML = '';
    $game.style.backgroundColor = '#ccc';
    hide($timeHeader);
    show($resultHeader);
    setGameScore();
}

function setGameScore()
{
    $result.textContent = score.toString();
}

function setGameTime() {
    var time = +$gameTime.value;
    $time.textContent = time.toFixed(1);
    show($timeHeader);
    hide($resultHeader);
}

function hide($el)
{
    $el.classList.add('hide');
}

function show($el)
{
    $el.classList.remove('hide');
}

function handleBoxClick(event)
{
    if (!isGameStarted)
    {
        return;
    }

    if (event.target.dataset.box)
    {
        score++;
        renderBox();
    }
}

function renderBox()
{
    $game.innerHTML = '';
    var box = document.createElement('div');
    var boxSize = getRandom(20, 100);
    var gameSize = $game.getBoundingClientRect();
    var maxTop = gameSize.height - boxSize;
    var maxLeft = gameSize.width - boxSize;
    var randomColorIndex = getRandom(0, colors.length);

    box.style.width = box.style.height = boxSize + 'px';
    box.style.backgroundColor = colors[randomColorIndex];
    box.style.position = 'absolute';
    box.style.top = getRandom(0, maxTop) + 'px';
    box.style.left = getRandom(0, maxLeft) + 'px';
    box.style.cursor = 'pointer';
    box.setAttribute('data-box', 'true');

    $game.insertAdjacentElement('afterbegin', box);
}

function getRandom(min, max)
{
        return Math.floor(Math.random() * (max - min) + min);
}