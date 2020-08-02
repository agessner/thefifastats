function loadPlayers() {
    return fetch(`http://127.0.0.1:5000/players/`).then(res => res.json()).then(result => result['result'])
}

function getPlayer(playerId) {
    return fetch(`http://127.0.0.1:5000/player/${playerId}`).then(res => res.json()).then(result => result['result'])
}

export default { loadPlayers, getPlayer }