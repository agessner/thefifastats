import React from 'react';
import {Container, Grid} from "@material-ui/core";
import gateways from "./gateways";
import Select from 'react-select';
import {Logo} from "./Logo";
import styles from './Top3Players.module.css';
import {Overall} from './Overall'
import {Color} from './Color'
import {BackgroundImage} from "./BackgroundImage";
import {logos} from "./fifa-logos/complete";
import {ConfigPanel} from "./ConfigPanel";
import Post from "./Post";


export class Top3Players extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            versions: [],
            isLoadingVersions: true,
            selectedVersion: '',
            positions: [],
            isLoadingPositions: true,
            selectedPosition: '',
            topPlayers: [],
            selectedColor: 'rgb(51,66,81)',
            selectedColorAlpha: 'rgba(51,66,81,0.25)',
            postDescription: ''
        };

        this.changeVersion = this.changeVersion.bind(this);
        this.changePosition = this.changePosition.bind(this);
        this.changeColor = this.changeColor.bind(this);
    }

    componentDidMount() {
        gateways.loadVersions().then(versions => {
            this.setState({
                versions: versions.map(version => {
                    return {
                        value: version.version_name,
                        label: version.version_name
                    }
                }),
                isLoadingVersions: false
            })
        })
        gateways.loadPositions().then(versions => {
            this.setState({
                positions: versions.map(position => {
                    return {
                        value: position.player_position,
                        label: position.player_position
                    }
                }),
                isLoadingPositions: false
            })
        })
    }

    changeVersion(selectedOption) {
        this.setState({selectedVersion: selectedOption.value})
        this.updateTopPlayers(selectedOption.value, this.state.selectedPosition);
    }

    changePosition(selectedOption) {
        this.setState({selectedPosition: selectedOption.value})
        this.updateTopPlayers(this.state.selectedVersion, selectedOption.value);
    }

    updateTopPlayers(version, position) {
        if (!version || !position) {
            return
        }
        gateways.getTopPlayersAtVersionAndPosition(version, position).then(playerVersions => {
            this.setState({
                topPlayers: playerVersions
            })
        })
        this.setState({
            postDescription: `This are the ${version} TOP 3 ${position}'s
What player is your favorite?

How we build this graph 🛠
- We get the to 3 players for this FIFA version
- Game updates are NOT considered, only the last version of the main release
- The position is based on the player’s best position

FOLLOW: @thefifastats
FOLLOW: @thefifastats
FOLLOW: @thefifastats

More players and more stats to come!`
        })
    }

    changeColor(color) {
        this.setState({selectedColor: this.getRgbaText(color.rgb)})
        const colorAlpha = {...color.rgb, a: 0.25}
        this.setState({selectedColorAlpha: this.getRgbaText(colorAlpha)})
    }

    getRgbaText(rgba) { return `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})` }

    render() {
        const data = []
        this.state.topPlayers.forEach((player, index) => {
            data.push(
                <div className={styles.player} id={`player-${index}`}>
                    <div className={styles.teamLogo}>
                        <img referrerPolicy="no-referrer" src={player.team_image_url} alt='' />
                    </div>
                    <Overall value={player.overall_rating} className={styles.overall} />
                    <div className={styles.name}>{player.name}</div>
                </div>
            )
        })
        const fifaLogoSrc = logos[this.state.selectedVersion] ? logos[this.state.selectedVersion].src : ''
        const fifaLogoWidth = logos[this.state.selectedVersion] ? logos[this.state.selectedVersion].width : ''
        return (
            <Container fixed >
                <ConfigPanel title={"Top 3 Players"}>
                    <Grid item xs={3} >
                        <Select
                            options={this.state.versions}
                            isLoading={this.state.isLoadingVersions}
                            onChange={this.changeVersion}
                            placeholder='Select a version'
                            style={{width: '200px'}}
                        />
                    </Grid>
                    <Grid item xs={3} >
                        <Select
                            options={this.state.positions}
                            isLoading={this.state.isLoadingPositions}
                            onChange={this.changePosition}
                            placeholder='Select a position'
                            style={{width: '200px'}}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Color defaultColor={this.state.selectedColor} handleColorChange={this.changeColor}/>
                    </Grid>
                    <Grid item xs={12}>
                        <BackgroundImage
                            defaultImageUrl={'https://i.pinimg.com/originals/cc/d8/70/ccd8703c4525ac592ac3325605916a3f.jpg'}
                            defaultWidth={540}
                            defaultHeight={150}
                            defaultTop={460}
                            defaultLeft={380}
                            defaultSize={450}
                        />
                        <BackgroundImage
                            defaultImageUrl={'https://www3.pictures.zimbio.com/gi/Luca+Toni+ACF+Fiorentina+v+AC+Siena+Serie+xcWKT3TCMj9l.jpg'}
                            defaultWidth={540}
                            defaultHeight={150}
                            defaultTop={610}
                            defaultLeft={380}
                            defaultSize={520}
                        />
                        <BackgroundImage
                            defaultImageUrl={'https://www4.pictures.gi.zimbio.com/Samuel+Eto+o+Barcelona+v+Malaga+La+Liga+NLJSz1bgYUMl.jpg'}
                            defaultWidth={540}
                            defaultHeight={154}
                            defaultTop={760}
                            defaultLeft={380}
                            defaultSize={450}
                        />
                    </Grid>
                </ConfigPanel>
                <Post postDescription={this.state.postDescription}>
                    <Logo classStyleName={styles.tfsLogo}/>
                    <div className={styles.title}>
                        <img referrerPolicy={'no-referrer'} src={fifaLogoSrc} className={styles.fifaLogo} style={{'width': fifaLogoWidth}}/>
                        <div className={styles.titleText} style={{'background': this.state.selectedColor}}>TOP 3 {this.state.selectedPosition}'s</div>
                    </div>
                    <div className={styles.chart} style={{'background-color': this.state.selectedColorAlpha}}>
                        {data}
                    </div>
                </Post>
            </Container>

        )
    }
}