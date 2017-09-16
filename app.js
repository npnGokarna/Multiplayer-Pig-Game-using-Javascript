/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, dice, isPlay, p1, p2, diceDOM, winningNumber, atStart;


p1 = "Player 1";
p2 = "Player 2";

function changeName() {

    p1 = prompt('Enter name of First Player');
    p2 = prompt('Enter name of Second Player');
    if(!p1){
        p1 = "Player 1";
    }
    if(!p2){
        p2 = "Player 2";
    }
    setPlayerNames();
}

function setPlayerNames() {
    document.getElementById('name-0').textContent = p1;
    document.getElementById('name-1').textContent = p2;
}

function setWinningNumber() {
    winningNumber = prompt("Please Enter Winning Number:");
}


function init() {


    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    isPlay = true;
    atStart = true;

    document.querySelector('.dice').style.display = 'none';

    setPlayerNames();
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');


    //getElementById faster than querySelector
    //getElementById doesnot require #' in front of name of ID
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    //display the result
    diceDOM = document.querySelector('.dice');
}

init();

//console.log(dice);

//Method 1, like setter in java spring
//document.querySelector('#current-' + activePlayer).textContent = dice;

//Method 2
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

//example of getter in java spring
//var x = document.querySelector('#score-0').textContent;
//console.log(x);

//change css file from javascript file.


function changePlayer() {
    document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');

    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

    document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');

    diceDOM.style.display = 'none';
}

function btn() {
    //do something after clicking the button
    //generate randomnumber
    if (isPlay) {

        atStart = false;

        dice = Math.floor(Math.random() * 6) + 1;

        diceDOM.style.display = 'block';

        diceDOM.src = 'dice-roll.gif';

        // diceDOM.src = 'dice-' + dice + '.png';

        // update the round score if the rolled number was not a 1
        // !== is different than operator
        function driver() {
            diceDOM.src = 'dice-' + dice + '.png';
            if (dice !== 1) {
                //Add to score
                roundScore += dice;
                document.querySelector('#current-' + activePlayer).textContent = roundScore;

            } else {
                //it's next player's turn
                roundScore = 0;
                document.querySelector('#current-' + activePlayer).textContent = roundScore;
                changePlayer();

                /*
                if (activePlayer === 0) {
                    activePlayer = 1;
                } else {
                    activePlayer = 0;
                }
                */
                document.querySelector('.dice').src = 'ghost-icon.png';
            }
        }
        setTimeout(driver, 1000);
    }
}


//anonymous function: function that has no name and directly declare actions inside. like inline function. and can not be used outside the context
//document.querySelector('.btn-roll').addEventListener('click', function(){ //example of anonymous function });

//callback function: the function which we provide as parameter to another function 
document.querySelector('.btn-roll').addEventListener('click', btn);
document.querySelector('.btn-hold').addEventListener('click', function () {
    //add current score to global score
    if (isPlay) {
        scores[activePlayer] += roundScore;
        roundScore = 0;

        //update the UI
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

        //reset the current round score
        document.getElementById('current-' + activePlayer).textContent = '0';

        //check if the player won the game
        if (scores[activePlayer] >= 20) {
            isPlay = false;
            document.getElementById('name-' + activePlayer).textContent = document.getElementById('name-' + activePlayer).textContent + ' Wins!';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            diceDOM.src = 'winner.gif';
        } else {
            changePlayer();
        }

        //change turn of the player
    }

});


document.querySelector('.btn-new').addEventListener('click', init);
document.querySelector('.btn-chp').addEventListener('click', function () {
    if (isPlay && atStart) {
        changeName();
    }
});
