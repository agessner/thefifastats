import React from "react";
import Draggable from "react-draggable";
import styles from "./Squad.module.css";
import {Overall} from "./Overall";
import Post from "./Post";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import PropTypes from "prop-types";

const playerPositions = {
    'GK': { 'margin': '380px auto auto auto' },
    'SW' : { 'margin': '305px 160px auto auto' },
    'RWB' : { 'margin': '270px 160px auto 535px' },
    'RB' : { 'margin': '305px 160px auto 540px' },
    'RCB' : { 'margin': '305px 160px auto 295px' },
    'CB' : { 'margin': '305px auto auto auto' },
    'LCB' : { 'margin': '305px 160px auto 0px' },
    'LB' : { 'margin': '305px 160px auto -230px' },
    'LWB' : { 'margin': '270px 160px auto -219px' },
    'RDM' : { 'margin': '207px 140px auto 320px' },
    'CDM' : { 'margin': '207px auto auto auto' },
    'LDM' : { 'margin': '207px 140px auto -40px' },
    'RM' : { 'margin': '138px 350px auto 635px' },
    'RCM' : { 'margin': '185px 140px auto 295px' },
    'CM' : { 'margin': '185px auto auto auto' },
    'LCM' : { 'margin': '185px auto auto -165px' },
    'LM' : { 'margin': '138px 160px auto -168px' },
    'RW' : { 'margin': '66px -144px auto 110px' },
    'RAM' : { 'margin': '130px auto auto 120px' },
    'CAM' : { 'margin': '130px auto auto auto' },
    'LAM' : { 'margin': '130px auto auto -120px' },
    'LW' : { 'margin': '80px 160px auto -110px' },
    'RF' : { 'margin': '35px -88px auto 60px' },
    'RS' : { 'margin': '35px -88px auto 60px' },
    'CF' : { 'margin': '90px auto auto auto' },
    'LS' : { 'margin': '35px 160px auto 60px' },
    'LF' : { 'margin': '35px 160px auto 60px' },
    'ST' : { 'margin': '32px auto auto auto' },
}

export default class Squad extends React.Component {
    constructor(props) {
        super(props)
        this.state = {selectedPlayers: props.players}
        this.togglePlayer = this.togglePlayer.bind(this)
    }

    togglePlayer(player) {
        const self = this
        return function (event) {
            player.selected = event.target.checked
            self.setState({selectedPlayers: self.props.players.filter(player => player.selected)})
        }

    }

    getPlayerDiv(player) {
        return (
            <Draggable>
                <div className={styles.player} style={{...playerPositions[player.player_position]}}>
                    <img
                        referrerPolicy={'no-referrer'}
                        src={player.image_url}
                        onError={e => {
                            e.target.onerror = null
                            e.target.src = 'https://cdn.sofifa.com/players/notfound_0_120.png'
                        }}
                        className={styles.playerImg}
                    />
                    <div className={styles.label} style={{backgroundColor: this.props.selectedColor}}>
                        <div className={styles.name}>{player.name}</div>
                        <div className={styles.fifaVersion}>
                            <div className={styles.fifaVersion}>
                                <img
                                    referrerPolicy={'no-referrer'}
                                    src={require(`../fifa-logos/fifa-${player.version_name}.jpg`)}
                                />
                            </div>
                            <Overall value={player.overall_rating} className={styles.overall}/>
                        </div>
                    </div>
                </div>
            </Draggable>
        )
    }

    getPlayerLabel(player) {
        return (
            <div style={{display: 'flex'}}>
                <img
                    referrerPolicy={'no-referrer'}
                    src={player.image_url}
                    onError={e => {
                        e.target.onerror = null
                        e.target.src = 'https://cdn.sofifa.com/players/notfound_0_120.png'
                    }}
                    className={styles.playerImgLabel}
                />

                <div className={styles.label} style={{backgroundColor: this.props.selectedColor}}>
                    <div className={styles.nameLabel}>{player.name} ({player.player_position})</div>
                    <div className={styles.fifaVersionLabel}>
                        <div className={styles.fifaVersionLabel}>
                            <img
                                referrerPolicy={'no-referrer'}
                                src={require(`../fifa-logos/fifa-${player.version_name}.jpg`)}
                            />
                        </div>
                        <Overall value={player.overall_rating} className={styles.overall}/>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        const squad = this.state.selectedPlayers.map(player => this.getPlayerDiv(player))
        return (
            <Post postDescription={this.props.postDescription} options={this.getPlayersSelect()}>
                <div className={styles.title} style={{backgroundColor: this.props.selectedColorAlpha}}>
                    {this.props.title}
                </div>
                {this.props.showTeamLogo &&
                    (<div className={styles.logo}>
                        <img
                            referrerPolicy="no-referrer"
                            src={this.props.players.length ? this.props.players[0].team_image_url : ''}
                        />
                    </div>)
                }
                <div className={styles.stats}>
                    <div>
                        <label>Avg: </label>
                        <Overall
                            value={
                                Math.round(
                                    this.state.selectedPlayers.reduce(
                                        (sum, player) => sum + player.overall_rating,
                                        0
                                    ) / this.state.selectedPlayers.length
                                )
                            }
                            className={styles.statsValue}
                        />
                    </div>
                    <div>
                        <label>Min: </label>
                        <Overall
                            value={
                                this.state.selectedPlayers.reduce(
                                    (min, player) => min > player.overall_rating ? player.overall_rating : min,
                                    100
                                )
                            }
                            className={styles.statsValue}
                        />
                    </div>
                    <div>
                        <label>Max: </label>
                        <Overall
                            value={
                                this.state.selectedPlayers.reduce(
                                    (max, player) => max < player.overall_rating ? player.overall_rating : max,
                                    0
                                )
                            }
                            className={styles.statsValue}
                        />
                    </div>
                </div>
                <div className={styles.field}>
                    {squad}
                </div>
            </Post>
        )
    }

    getPlayersSelect() {
        return (
            <div style={{height: '500px', overflow: 'scroll', display: 'flex', flexFlow: 'row wrap', padding: '0 15px'}}>
                {this.props.players.map(player =>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={player.selected}
                                onChange={this.togglePlayer(player)}
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            />
                        }
                        label={this.getPlayerLabel(player)}
                        style={{marginBottom: '5px'}}
                        labelPlacement='bottom'
                    />
                )}
            </div>
        )
    }
}

Squad.protoTypes = {
    selectedColor: PropTypes.string.isRequired,
    selectedColorAlpha: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    postDescription: PropTypes.string.isRequired,
    players: PropTypes.array.isRequired,
    showTeamLogo: PropTypes.bool.isRequired
}