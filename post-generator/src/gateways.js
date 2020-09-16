const loadPlayers = (version, team) => get(`players/?version=${version}&team=${team}`)
const getPlayer = playerId => get(`player/${playerId}`)
const loadVersions = () => get(`versions/`)
const loadPositions = () => get(`player-positions/`)
const getTopPlayersAtVersionAndPosition = (version, playerPosition, field) => get(`comparasion/${version}/${playerPosition}/${field}`)
const getTopPlayersAtVersionByAttribute = (version, attribute) => get(`comparasion/${version}/${attribute}`)
const loadTeams = url => get(`${url}/`)
const loadTeamPlayers = (worstOrBest, postType, team) => get(`${worstOrBest}/${postType}/${team}/`)
const loadCombinedTeamPlayers = (team1, team2) => get(`combined-teams/${team1}/${team2}`)
const loadBestVersionTeam = version => get(`version-team/${version}/`)

function get(url) {
    return fetch(`http://127.0.0.1:5000/${url}`).then(res => res.json()).then(result => result['result'])
}

export default {
    loadPlayers,
    getPlayer,
    loadVersions,
    loadPositions,
    getTopPlayersAtVersionAndPosition,
    getTopPlayersAtVersionByAttribute,
    loadTeams,
    loadTeamPlayers,
    loadCombinedTeamPlayers,
    loadBestVersionTeam
}