import React, {Suspense} from 'react';
import {Container, Grid} from "@material-ui/core";
import gateways from "./gateways";
import Select from 'react-select';
import {Logo} from "./Logo";
import './Player.css';
import {Overall} from './Overall'
import {Img} from 'react-image'


export class Player extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            players: [],
            isLoading: true,
            selectedPlayer: {},
            selectedPlayerVersions: []
        };

        this.changePlayer = this.changePlayer.bind(this);
    }

    componentDidMount() {
        gateways.loadPlayers().then(players => {
            this.setState({
                players: players.map(player => {
                    return {
                        value: player.id,
                        label: player.name
                    }
                }),
                isLoading: false
            })
        })
    }

    changePlayer(selectedOption) {
        gateways.getPlayer(selectedOption.value).then(playerVersions => {
            this.setState({
                selectedPlayer: playerVersions[0],
                selectedPlayerVersions: playerVersions
            })
        })
    }

    render() {
        const playerVersions = []
        this.state.selectedPlayerVersions.forEach((version, index) => {
            const id = `bar-${index}`
            const style = {
                'height': version.overall_rating * version.overall_rating / 25
            }
            const fifaLogoSrc = require(`./fifa-logos/fifa-${version.version_name}.jpg`)
            playerVersions.push(
                <div className='bar' id={id} style={style}>
                    <div className='bar-top'>
                        <div className='team-logo'>
                            <Img referrerPolicy="no-referrer" src={version.team_image_url} alt='' />
                        </div>
                        <div className='overall'>
                            <Overall value={version.overall_rating} />
                        </div>
                    </div>
                    <div className='fifa-version'>
                        <img src={fifaLogoSrc}/>
                    </div>
                </div>
            )
        })
        return (
            <Container fixed>
                <Grid container className='config'>
                    <Grid item xs={12}>
                        <h2>Configure</h2>
                    </Grid>
                    <Grid item xs={3}>
                        Player
                        <Select
                            options={this.state.players}
                            isLoading={this.state.isLoading}
                            onChange={this.changePlayer}
                        />
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12}>
                        <div className="background-image" />
                        <div id="imgPost" className="post">
                            <Logo/>
                            <div className="title">
                                <div className="player-name-text">{this.state.selectedPlayer.name}</div>
                                <div className="text">FIFA Evolution</div>
                            </div>
                            <div className="chart">
                                {playerVersions}
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </Container>

        )
    }
}