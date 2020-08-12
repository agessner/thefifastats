import React from 'react';
import {Container, Grid} from "@material-ui/core";
import gateways from "./gateways";
import Select from 'react-select';
import {Logo} from "./Logo";
import styles from './PlayerEvolution.module.css';
import {Overall} from './Overall'
import {Color} from './Color'
import {BackgroundImage} from "./BackgroundImage";
import Tags from "./Tags";
import {ConfigPanel} from "./ConfigPanel";


export class PlayerEvolution extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            players: [],
            isLoading: true,
            selectedPlayer: {},
            postDescription: '',
            selectedPlayerVersions: [],
            selectedColor: 'rgb(51,66,81)',
            selectedColorAlpha: 'rgba(51,66,81,0.25)'
        };

        this.changePlayer = this.changePlayer.bind(this);
        this.changeColor = this.changeColor.bind(this);
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

    getPostDescription(selectedPlayer) {
        return `This is ${selectedPlayer.name}'s overall evolution from FIFA 07-20
What is the best version of him?

How we build this graph 🛠
- We get the player overall for each FIFA
- Game updates are NOT considered, only the last version of the main release

FOLLOW: @thefifastats
FOLLOW: @thefifastats
FOLLOW: @thefifastats

More players and more stats to come!`
    }

    changePlayer(selectedOption) {
        gateways.getPlayer(selectedOption.value).then(playerVersions => {
            this.setState({
                selectedPlayer: playerVersions[0],
                selectedPlayerVersions: playerVersions,
                postDescription: this.getPostDescription(playerVersions[0])
            })
        })
    }

    changeColor(color) {
        this.setState({selectedColor: this.getRgbaText(color.rgb)})
        const colorAlpha = {...color.rgb, a: 0.25}
        this.setState({selectedColorAlpha: this.getRgbaText(colorAlpha)})
    }

    getRgbaText(rgba) { return `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})` }

    render() {
        const playerVersions = []
        this.state.selectedPlayerVersions.forEach((version, index) => {
            const id = `bar-${index}`
            const style = {
                'height': version.overall_rating * version.overall_rating / 25,
                'background-color': this.state.selectedColor
            }
            const fifaLogoSrc = require(`./fifa-logos/fifa-${version.version_name}.jpg`)
            playerVersions.push(
                <div className={styles.bar} id={id} style={style}>
                    <div className={styles.barTop}>
                        <div className={styles.teamLogo}>
                            <img referrerPolicy="no-referrer" src={version.team_image_url} alt='' />
                        </div>
                        <div className={styles.overall}>
                            <Overall value={version.overall_rating} />
                        </div>
                    </div>
                    <div className={styles.fifaVersion}>
                        <img src={fifaLogoSrc}/>
                    </div>
                </div>
            )
        })
        return (
            <Container fixed >
                <ConfigPanel title={"Player Evolution"}>
                    <Grid item xs={3} >
                        <Select
                            options={this.state.players}
                            isLoading={this.state.isLoading}
                            onChange={this.changePlayer}
                            placeholder='Select a player'
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <Color defaultColor={this.state.selectedColor} handleColorChange={this.changeColor}/>
                    </Grid>
                    <Grid item xs={12}>
                        <BackgroundImage className={styles.backgroundImage}/>
                    </Grid>
                </ConfigPanel>
                <Grid container>
                    <Grid item xs={8}>
                        <div id="imgPost" className={styles.post}>
                            <Logo classStyleName={styles.tfsLogo}/>
                            <div className={styles.title}>
                                <div className={styles.playerNameText} style={{'background-color': this.state.selectedColor}}>{this.state.selectedPlayer.name}</div>
                                <div className={styles.text}>FIFA Evolution</div>
                            </div>
                            <div className={styles.chart} style={{'background-color': this.state.selectedColorAlpha}}>
                                {playerVersions}
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={4}>
                        <Grid item xs={12}><Tags/></Grid>
                        <Grid item xs={12}><textarea value={this.state.postDescription} rows={20} cols={33}/></Grid>
                    </Grid>
                </Grid>
            </Container>

        )
    }
}