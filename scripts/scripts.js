// global variables
const tournament = {
    name: '',
    numOfPlayers: 8,
    round: 0,
    players: [],
    eliminated: []
}

tournament.setup = () => {
    if (tournament.numOfPlayers % 2 === 0) {
        // update tournament name
        tournament.name = $('#tournamentName').val();
        // update page header w/ tournament name
        if (tournament.name !== '') {
            $('h1').text(tournament.name);
        }

        // add player names to array
        tournament.players = [];

        for (i = 0; i < tournament.numOfPlayers; i++) {
            tournament.players.push($(`#player${i + 1}`).val());
        }
        // remove setup section from page after setup is complete
        $('.setup').remove();
    } else {
        $('form').append(`<p>Error: You must select an even number of players. If you have an odd number of players, you can add a placeholder and have them lose the first round.<p>`)
    }
}

tournament.newRound = () => {
    // add a new round to html
    tournament.round++
    $('.matchups').append(`<h3>Round ${tournament.round}</h3>
    <div class="round${tournament.round} round"></div>`);
    console.log('added round');
    
    for (i = 0; i < tournament.players.length; i += 2) {
        console.log(i);
        let round = tournament.round;
        $(`.round${tournament.round}`).append(`<div class="round${tournament.round}Match${i + 1} match">
        <div class="pair">
        <label for="${tournament.players[i]}">${tournament.players[i]}</label>
        <input type="radio" name="round${tournament.round}Match${i + 1}" id="${tournament.players[i]}"
        value="${tournament.players[i]}">
        
        <label for="${tournament.players[i + 1]}">${tournament.players[i + 1]}</label>
        <input type="radio" name="round${tournament.round}Match${i + 1}" id="${tournament.players[i + 1]}"
        value="${tournament.players[i + 1]}">
        </div>
        
        <button class="winnerRound${tournament.round}Match${i + 1}">Confirm Winner</buttom>
        </div>`);
    }
    
        tournament.roundWinner = () => {
            $(`.winnerRound${tournament.round}Match${i + 1}`).on('submit', function(e) {
                e.preventDefault();
        
                
            })
    }
}


// document ready
$(function () {
    
    $('form').on('submit', function (e) {
        e.preventDefault();
        tournament.setup();
        tournament.newRound();        
    });
    
    
    
    
    








});