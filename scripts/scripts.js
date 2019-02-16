// global variables
const tournament = {
    name: '',
    numOfPlayers: 0,
    round: 0,
    players: [],
    eliminated: []
}

tournament.setup = () => {
    tournament.numOfPlayers = tournament.numOfPlayers + $('[name=numOfPlayers] option:selected').val();

    if (tournament.numOfPlayers % 2 === 0) {
        // update tournament name
        tournament.name = $('#tournamentName').val();
        // update page header w/ tournament name
        if (tournament.name !== '') {
            $('h1').text(tournament.name);
        }
        
        // remove name and number of players fields to avoid adding too many players
        $('.tournamentNameForm').remove();

        // add player name fields
        for (i = 0; i < tournament.numOfPlayers; i++) {
            let playerNum = i + 1;
            $('.players').append(`
                 <div>
                    <label for="player${playerNum}">Player ${playerNum}:</label>
                    <input type="text" name="player${playerNum}" id="player${playerNum}" placeholder="Player Name">
                </div>
            `);
        }

        $('.players').append(`<div><button type="submit" value="Add Players" id="addPlayers" class="addPlayers">Add Players</button></div>`);

        tournament.addPlayersEventHandler();

    } else {
        $('form').append(`<p>Error: You must select an even number of players. If you have an odd number of players, you can add a placeholder and have them lose the first round.<p>`)
    }
}

tournament.addPlayers = () => {
    // add player names to array
    tournament.players = [];

    for (i = 0; i < tournament.numOfPlayers; i++) {
        tournament.players.push($(`#player${i + 1}`).val());
    }
    // remove setup section from page after setup is complete
    $('.setup').remove();

    tournament.newRound();
}

tournament.addPlayersEventHandler = () => {
    $('.addPlayers').on('click', function(e) {
        e.preventDefault();
        tournament.addPlayers();
    })
}

tournament.newRound = () => {
    // add a new round to html
    tournament.round++
    $('.matchups').append(`<div><h3>Round ${tournament.round}</h3></div>
    <div class="round${tournament.round} round"></div>`);
    // console.log('added round');

    let match = 0;

    for (let i = 0; i < tournament.players.length; i += 2) {
        match = match + 1

        $(`.round${tournament.round}`).append(`
            <div class="round${tournament.round}Match${match} match">
                <div class="pair">
                    <div class="option">
                        <label for="${tournament.players[i]}">${tournament.players[i]}</label>
                        <input type="radio" name="round${tournament.round}Match${match}" id="${tournament.players[i]}"
                        value="${tournament.players[i]}">
                    </div>
                    <div>
                        <label for="${tournament.players[i + 1]}">${tournament.players[i + 1]}</label>
                        <input type="radio" name="round${tournament.round}Match${match}" id="${tournament.players[i + 1]}"
                        value="${tournament.players[i + 1]}">
                    </div>
                </div>
            </div>
       `);
    }

    $('.matchups').append(`<button class="winnerRound${tournament.round}">Confirm Winners</button>`);

    tournament.roundWinner();

}


tournament.roundWinner = () => {
    $(`.winnerRound${tournament.round}`).on('click', function (e) {
        e.preventDefault(e);

        $(`.round${tournament.round}`).addClass('completed');

        if (tournament.players.length > 2) {
            // tracking which match is being evaluated
            let match = 0;
            let eliminatedArray = [];
    
            for (let i = 0; i < tournament.players.length; i += 2) {
                match = match + 1;
    
                // get name of the loser and add a value of eliminated to their object in the namespace object
                let elim = $(`input[name=round${tournament.round}Match${match}]:not(:checked)`);
                let elimValue = elim[0].value;
                eliminatedArray.push(elimValue);
            }
            
            //loops through eliminated array and pull those people from the main one.
            eliminatedArray.forEach((loser) => {
                let elimIndex = tournament.players.indexOf(loser);
                tournament.players.splice(elimIndex, 1);
            })
    
            // start a new round with the remaining players
            tournament.newRound();
        } else if (tournament.players.length == 2) {
            let match = 1;
            let winner = $(`input[name=round${tournament.round}Match${match}]:checked`);
            let winnerName = winner[0].value;

            $('.results').append(`
                <p><span>${winnerName}</span> is the winner! Congratulations!</p>
                <div><button type="submit" class="newTournament">New Tournament</button></div>
                `);

            newTournamentEventHandler();
        }  else {
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

    $('.tournamentNameForm').on('submit', function (e) {
        e.preventDefault();
        tournament.setup();
    });
});