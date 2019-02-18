// tournament namespace
const tournament = {
    name: '',
    numOfPlayers: 0,
    round: 0,
    players: []
}

tournament.setup = () => {
    // set number of players in tournament
    tournament.numOfPlayers = tournament.numOfPlayers + $('[name=num-of-players] option:selected').val();

    // update tournament name
    tournament.name = $('#tournament-name').val();
    // update page header w/ tournament name
    if (tournament.name !== '') {
        $('h1').text(tournament.name);
    }
    
    // remove name and number of players fields to avoid adding too many players
    $('.tournament-name-form').remove();

    // add player name fields for each player
    for (i = 0; i < tournament.numOfPlayers; i++) {
        let playerNum = i + 1;
        $('.players').append(`
                <div>
                <label for="player${playerNum}">Player ${playerNum}:</label>
                <input type="text" name="player${playerNum}" id="player${playerNum}" placeholder="Player Name">
            </div>
        `);
    }

    // add submit button and event handler
    $('.players-form').append(`<button type="submit" value="Add Players" id="addPlayers" class="addPlayers">Let the games begin</button>`);

    tournament.addPlayersEventHandler();
}

tournament.addPlayers = () => {
    // add player names to array
    for (i = 0; i < tournament.numOfPlayers; i++) {
        let playerName = $(`#player${i + 1}`).val();
        if (playerName !== '') {
            tournament.players.push(playerName);
        } else {
            tournament.players.push(`Player ${i + 1}`);
        }
    }
    // remove setup section from page after setup is complete
    $('.setup').remove();

    // add the right amount of placeholders to even out tournament, split up fairly between players in the array
    if (tournament.numOfPlayers == '05' || tournament.numOfPlayers == '013') {
        tournament.players.splice(1, 0, "COM 1");
        tournament.players.splice(3, 0, "COM 2");
        tournament.players.splice(5, 0, "COM 3")
    } else if (tournament.numOfPlayers == '06' || tournament.numOfPlayers == '014') {
        tournament.players.splice(1, 0, "COM 1");
        tournament.players.splice(3, 0, "COM 2");
    } else if (tournament.numOfPlayers == '07' || tournament.numOfPlayers == '015') {
        tournament.players.push('COM');
    } else if (tournament.numOfPlayers == '09') {
        tournament.players.splice(1, 0, "COM 1");
        tournament.players.splice(3, 0, "COM 2");
        tournament.players.splice(5, 0, "COM 3");
        tournament.players.splice(7, 0, "COM 4");
        tournament.players.splice(9, 0, "COM 5");
        tournament.players.splice(11, 0, "COM 6");
        tournament.players.splice(13, 0, "COM 7");
    } else if (tournament.numOfPlayers == '010') {
        tournament.players.splice(1, 0, "COM 1");
        tournament.players.splice(3, 0, "COM 2");
        tournament.players.splice(5, 0, "COM 3");
        tournament.players.splice(7, 0, "COM 4");
        tournament.players.splice(9, 0, "COM 5");
        tournament.players.splice(11, 0, "COM 6");
    } else if (tournament.numOfPlayers == '011') {
        tournament.players.splice(1, 0, "COM 1");
        tournament.players.splice(3, 0, "COM 2");
        tournament.players.splice(5, 0, "COM 3");
        tournament.players.splice(7, 0, "COM 4");
        tournament.players.splice(9, 0, "COM 5");
    } else if (tournament.numOfPlayers == '012') {
        tournament.players.splice(1, 0, "COM 1");
        tournament.players.splice(3, 0, "COM 2");
        tournament.players.splice(5, 0, "COM 3");
        tournament.players.splice(7, 0, "COM 4");
    }

    // call the function to start the first round of the tournament
    tournament.newRound();
}

tournament.addPlayersEventHandler = () => {
    // event handler for button created in tournament.setup method
    $('.addPlayers').on('click', function(e) {
        e.preventDefault();
        tournament.addPlayers();
    })
}

tournament.newRound = () => {
    // get rid of button so round is not submitted twice
    $(`button.winnerRound${tournament.round}`).remove();

    // add a new round to html
    tournament.round++

    $('.matchups').append(`<div><h2>Round ${tournament.round}</h2></div>
    <div class="round${tournament.round} round"></div>`);

    // Generate new series of matches
    let match = 0;

    for (let i = 0; i < tournament.players.length; i += 2) {
        match = match + 1

        $(`.round${tournament.round}`).append(`
            <div class="round${tournament.round}Match${match} match">
                <div class="pair">
                    <div class="option">
                        <input type="radio" name="round${tournament.round}Match${match}" id="${tournament.round}${tournament.players[i]}"
                        value="${tournament.players[i]}">
                        <label for="${tournament.round}${tournament.players[i]}">${tournament.players[i]}</label>
                    </div>
                    <div class="option">
                        <input type="radio" name="round${tournament.round}Match${match}" id="${tournament.round}${tournament.players[i + 1]}"
                        value="${tournament.players[i + 1]}">
                        <label for="${tournament.round}${tournament.players[i + 1]}">${tournament.players[i + 1]}</label>
                    </div>
                </div>
            </div>
            `);
    }

    // add button and event handler to submit winners
    $('.matchups').append(`<button class="winnerRound${tournament.round}">Confirm Winners</button>`);

    tournament.roundWinner();
}

tournament.roundWinner = () => {
    $(`.winnerRound${tournament.round}`).on('click', function(e) {
        e.preventDefault();

        // check if this round results in a winner or consecutive round
        if (tournament.players.length > 2) {
            let match = 0;
            let eliminatedArray = [];
    
            // evaluate the winner of each match
            for (let i = 0; i < tournament.players.length; i += 2) {
                match = match + 1;
                // get the value of the loser and return their name from the object
                let elim = $(`input[name=round${tournament.round}Match${match}]:not(:checked)`);
                let elimValue = elim[0].value;
                // add loser to temporary eliminatedArray
                eliminatedArray.push(elimValue);
            }
            
            //loop through eliminated array and pull those people from the main players array
            eliminatedArray.forEach((loser) => {
                let elimIndex = tournament.players.indexOf(loser);
                tournament.players.splice(elimIndex, 1);
            })
    
            // start a new round with the remaining players
            tournament.newRound();
        } else if (tournament.players.length == 2) {
            // get rid of confirm button so winner isn't submitted multiples times
            $(`button.winnerRound${tournament.round}`).remove();

            // evaluate winner
            let match = 1;
            let winner = $(`input[name=round${tournament.round}Match${match}]:checked`);
            let winnerName = winner[0].value;

            // add congratluations message and button for new game + event handler
            $('.results').append(`
                <p><span>${winnerName}</span> is the winner! Congratulations!</p>
                <div><button type="submit" class="newTournament">New Tournament</button></div>
                `);

            newTournamentEventHandler();
        }  else {
            // I don't know how this error message would occur, but just in case
            $('.results').append(`Something has gone wrong! Please refresh the page and start the tournament over. The current non-eliminated players are: ${tournament.players}.`);
        } 
    })
}

const newTournamentEventHandler = () => {
    $('.newTournament').on('click', function(e) {
        e.preventDefault();
        location.reload(); 
    });
}

// document ready
$(function () {
    $('.tournament-name-form').on('submit', function (e) {
        e.preventDefault();
        tournament.setup();
    });
});