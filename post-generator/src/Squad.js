import React from 'react';
import Post from "./components/Post";
import {ConfigPanel} from "./components/ConfigPanel";
import {Container, Grid, Input} from "@material-ui/core";
import MenuItem from '@material-ui/core/MenuItem';
import styles from "./Squad.module.css";
import classnames from 'classnames';
import Select from "react-select";
import gateways from "./gateways";
import {Color} from "./components/Color";
import {Overall} from "./components/Overall";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Draggable from 'react-draggable';

const titlesByPostType = {
    'teams' : {
        'best': 'BEST OVERALL STARTING XI',
        'worst': 'WORST OVERALL STARTING XI'
    },
    'national-teams': {
        'best': 'BEST OVERALL XI FROM FIFA 07-20'
    }
}

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
        this.state = {
            selectedPostType: '',
            teams: [],
            selectedTeam: '',
            isLoadingTeams: false,
            selectedColor: 'rgb(81,51,62)',
            selectedColorAlpha: 'rgba(81,51,62,0.25)',
            selectedBestOrWorst: '',
            title: '',
            players: [],
            selectedPlayers: []
        }
        this.changePostType = this.changePostType.bind(this)
        this.changeTeam = this.changeTeam.bind(this)
        this.changeWorstOrBest = this.changeWorstOrBest.bind(this)
        this.changeColor = this.changeColor.bind(this)
        this.togglePlayer = this.togglePlayer.bind(this)
    }

    getPostTypes() {
        return [
            {value: 'teams', label: 'Team'},
            {value: 'national-teams', label: 'National Team'}
        ]
    }

    changePostType(selectedOption) {
        this.setState({
            isLoadingTeams: true,
            selectedPostType: selectedOption.value
        }, this.updateTitle)
        gateways.loadTeams(selectedOption.value).then(teams => {
            this.setState({
                isLoadingTeams: false,
                teams: teams.map(team => {
                    return {
                        value: team.team_name,
                        label: team.team_name
                    }
                })
            })
        })
    }

    changeTeam(selectedOption) {
        this.setState({selectedTeam: selectedOption.value})
        gateways.loadTeamPlayers(
            this.state.selectedWorstOrBest,
            this.state.selectedPostType,
            selectedOption.value
        ).then(players => this.setState({
            players: players.map(player => { return {...player, ...{selected: true}}}),
            selectedPlayers: players
        }))
    }

    getWorstOrBest() {
        return [
            {value: 'worst', label: 'Worst'},
            {value: 'best', label: 'Best'}
        ]
    }

    changeWorstOrBest(selectedOption) {
        this.setState({selectedWorstOrBest: selectedOption.value}, this.updateTitle)
    }

    updateTitle() {
        if (!this.state.selectedPostType || !this.state.selectedWorstOrBest) {
            return
        }

        this.setState({
            title: titlesByPostType[this.state.selectedPostType][this.state.selectedWorstOrBest]
        })
    }

    changeColor(color) {
        this.setState({selectedColor: Color.getRgbaText(color.rgb)})
        const colorAlpha = {...color.rgb, a: 0.25}
        this.setState({selectedColorAlpha: Color.getRgbaText(colorAlpha)})
    }

    togglePlayer(player) {
        const globalThis = this
        return function (event) {
            player.selected = event.target.checked
            globalThis.setState({selectedPlayers: globalThis.state.players.filter(player => player.selected)})
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
                    <div className={styles.label} style={{backgroundColor: this.state.selectedColor}}>
                        <div className={styles.name}>{player.name}</div>
                        <div className={styles.fifaVersion}>
                            <div className={styles.fifaVersion}>
                                <img
                                    referrerPolicy={'no-referrer'}
                                    src={require(`./fifa-logos/fifa-${player.version_name}.jpg`)}
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

                <div className={styles.label} style={{backgroundColor: this.state.selectedColor}}>
                    <div className={styles.nameLabel}>{player.name} ({player.player_position})</div>
                    <div className={styles.fifaVersionLabel}>
                        <div className={styles.fifaVersionLabel}>
                            <img
                                referrerPolicy={'no-referrer'}
                                src={require(`./fifa-logos/fifa-${player.version_name}.jpg`)}
                            />
                        </div>
                        <Overall value={player.overall_rating} className={styles.overall}/>
                    </div>
                </div>
            </div>
        )
    }

    getPostDescription() {
        return `${this.state.selectedTeam} Worst X Best Starting XI FIFA Team from 07-20
Do you agree?

How we build this squad 🛠
- We get the lower and higher overall for each position
- Game updates are NOT considered, only the last version of the main release
- If two players have the same overall, we get the older one (we like nostalgia 👩‍🦳👨‍🦳)
- SUBs are not considered
- Finally, the squad formation is decided by the one we like the most 👨‍🎨👩‍🎨

FOLLOW: @thefifastats
FOLLOW: @thefifastats
FOLLOW: @thefifastats

More teams and more stats to come!`
    }

    render() {
        const squad = this.state.selectedPlayers.map(player => this.getPlayerDiv(player))
        return (
            <Container fixed>
                <ConfigPanel title={"Squad"}>
                    <Grid item xs={3}>
                        <Select
                            options={this.getPostTypes()}
                            onChange={this.changePostType}
                            placeholder='Post type'
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <Select
                            options={this.getWorstOrBest()}
                            onChange={this.changeWorstOrBest}
                            placeholder='Worst or Best'
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <Select
                            options={this.state.teams}
                            isLoading={this.state.isLoadingTeams}
                            onChange={this.changeTeam}
                            placeholder='Teams'
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <Color defaultColor={this.state.selectedColor} handleColorChange={this.changeColor}/>
                    </Grid>
                </ConfigPanel>
                <Post postDescription={this.getPostDescription()} options={this.getPlayersSelect()}>
                    <div className={styles.title} style={{backgroundColor: this.state.selectedColorAlpha}}>
                        {this.state.title}
                    </div>
                    <div className={styles.logo}>
                        <img
                            referrerPolicy="no-referrer"
                            src={this.state.players.length ? this.state.players[0].team_image_url : ''}
                        />
                    </div>
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

            </Container>

        )
    }

    getPlayersSelect() {
        return (
            <div style={{height: '500px', overflow: 'scroll', display: 'flex', flexFlow: 'row wrap', padding: '0 15px'}}>
                {this.state.players.map(player =>
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