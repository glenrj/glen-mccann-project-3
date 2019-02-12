// global variables
const tournament = {
    name: '',
    numOfPlayers: 8,
    // playerlist: {}


}

// document ready
$(function () {

    $('form').on('submit', function (e) {
        e.preventDefault();

        // update tournament name
        tournament.name = $('#tournamentName').val();
        
        // update page header w/ tournament name
        if (tournament.name !== '') {
            $('h1').text(tournament.name);
        }

        // add player names to array
        tournament.players = [];

        players.push($('#player1').val());
        players.push($('#player2').val());
        players.push($('#player3').val());
        players.push($('#player4').val());
        players.push($('#player5').val());
        players.push($('#player6').val());
        players.push($('#player7').val());
        players.push($('#player8').val());
        
        // for (i = 1; i < players.length + 1; i++) {
        //     let playerNum = i;
        //     tournament.playerlist[playerNum] = players[i];
        // }
    });













});