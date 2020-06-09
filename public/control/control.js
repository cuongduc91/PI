var scores, roundScore, activePlayer, gamePlaying;

init();

var lastDice;

//fuer wuerfeln funktion
document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlaying) {
        // 1. Random number
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;

        //2. Display the result
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';
        //Pfad 
        document.getElementById('dice-1').src = '/image/dice-' + dice1 + '.png';
        document.getElementById('dice-2').src = '/image/dice-' + dice2 + '.png';

        //3. Update the round score IF the rolled number was NOT a 1
        if (dice1 !== 6 && dice2 !== 6) {
            //Add score
            roundScore += dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            //Next player
            nextPlayer();
        }


    }
});


document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        // Add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;
        //scores[0] = gesamtpunkte fuer player 1

        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        //Input score 
        var input = document.querySelector('.final-score').value;
        var winningScore;


        if (input) {
            winningScore = input;
        } else {
            //default Score
            winningScore = 100;
        }

        // Check if player won the game
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            //Next player
            nextPlayer();
        }
    }
});


function nextPlayer() {
    //Next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');



    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    //total Punkte fuer jeden Spieler
    scores = [0, 0];
    //Flage = 0 spieler-1, 1 = spieler-2
    activePlayer = 0;
    //Aktuell
    roundScore = 0;
    //Flage ob spielt oder nicht
    gamePlaying = true;

    //nicht Wuerfeln zeigen - 
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';

    //Ausgangssituation
    //erster Gesamtpunkt
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    //
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    //
    document.getElementById('name-0').textContent = 'Spieler 1';
    document.getElementById('name-1').textContent = 'Spieler 2';
    //Remove class .winner, .active 
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    //Der Spieler 1 darf zuerst wuerfeln
    document.querySelector('.player-0-panel').classList.add('active');
}