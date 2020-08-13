function loadPlayers() {
    return fetch(`http://127.0.0.1:5000/players/`).then(res => res.json()).then(result => result['result'])
}

function getPlayer(playerId) {
    return fetch(`http://127.0.0.1:5000/player/${playerId}`).then(res => res.json()).then(result => result['result'])
}

function loadVersions() {
    return fetch(`http://127.0.0.1:5000/versions/`).then(res => res.json()).then(result => result['result'])
}

function loadPositions() {
    return fetch(`http://127.0.0.1:5000/player-positions/`).then(res => res.json()).then(result => result['result'])
}

function getTopPlayersAtVersionAndPosition(version, playerPosition) {
    return fetch(`http://127.0.0.1:5000/comparasion/${version}/${playerPosition}`).then(res => res.json()).then(result => result['result'])
}

export default { loadPlayers, getPlayer, loadVersions, loadPositions, getTopPlayersAtVersionAndPosition }