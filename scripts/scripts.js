// global variables
const tournament = {
    name: '',
    numOfPlayers: 8,
    round: 0,
    players: [],
    eliminated: []
}

// document ready
$(function () {

    $('form').on('submit', function (e) {
        e.preventDefault();

        // nested within if statement to add abiliy to customize the amount of players later:
        if (tournament.numOfPlayers % 2 === 0) {
            // update tournament name
            tournament.name = $('#tournamentName').val();
            // update page header w/ tournament name
            if (tournament.name !== '') {
                $('h1').text(tournament.name);
            }

            // add player names to array
            tournament.players = [];

            tournament.players.push($('#player1').val());
            tournament.players.push($('#player2').val());
            tournament.players.push($('#player3').val());
            tournament.players.push($('#player4').val());
            tournament.players.push($('#player5').val());
            tournament.players.push($('#player6').val());
            tournament.players.push($('#player7').val());
            tournament.players.push($('#player8').val());

            // add a new round to html
            tournament.round++
            $('.matchups').append(`<div class="round${tournament.round}"></div>`);
            console.log('added round');

            for (i = 0; i < tournament.players.length; i += 2) {
                console.log(i);
                $(`.round${tournament.round}`).append(`<div class="round${tournament.round}Match${i + 1}">
                    <label for="${tournament.players[i]}">${tournament.players[i]}</label>
                    <input type="radio" name="round${tournament.round}Match${i + 1}" id="${tournament.players[i]}"
                        value="${tournament.players[i]}">
                    
                    <label for="${tournament.players[i + 1]}">${tournament.players[i + 1]}</label>
                    <input type="radio" name="round${tournament.round}Match${i + 1}" id="${tournament.players[i + 1]}"
                        value="${tournament.players[i + 1]}">
                </div>`);
            }
            // remove setup section from page after setup is complete
            $('.setup').remove();
        } else {
            $('form').append(`<p>Error: You must select an even number of players. If you have an odd number of players, you can add a placeholder and have them lose the first round.<p>`)
        }
    });













});