import React from 'react';
import {Container, Grid} from "@material-ui/core";
import gateways from "./gateways";
import Select from 'react-select';
import {Logo} from "./components/Logo";
import styles from './TopPlayers.module.css';
import {Overall} from './components/Overall'
import {Color} from './components/Color'
import {BackgroundImage} from "./components/BackgroundImage";
import {logos} from "./fifa-logos/complete";
import {ConfigPanel} from "./components/ConfigPanel";
import Post from "./components/Post";


const attributes = [
    'overall_rating',
    'potential_overall_rating',
    'finishing',
    'crossing',
    'strength',
    'long_shots',
    'penalties'
]

export class TopPlayers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            versions: [],
            isLoadingVersions: true,
            selectedVersion: '',
            selectedVersionNumber: '',
            selectedField: '',
            topPlayers: [],
            selectedColor: 'rgb(51,66,81)',
            selectedColorAlpha: 'rgba(51,66,81,0.25)',
            postDescription: ''
        };

        this.changeVersion = this.changeVersion.bind(this);
        this.changeColor = this.changeColor.bind(this);
        this.changeField = this.changeField.bind(this);
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
        this.updateTopPlayers('FIFA 07', 'finishing');
    }

    changeVersion(selectedOption) {
        this.setState({
            selectedVersion: selectedOption.value,
            selectedVersionNumber: selectedOption.value.split(' ')[1]
        })
        this.updateTopPlayers(selectedOption.value, this.state.selectedField);
    }

    changeField(selectedOption) {
        this.setState({selectedField: selectedOption.value})
        this.updateTopPlayers(this.state.selectedVersion, selectedOption.value);
    }

    updateTopPlayers(version, attribute) {
        if (!version || !attribute) {
            return
        }
        gateways.getTopPlayersAtVersionByAttribute(version, attribute).then(playerVersions => {
            this.setState({
                topPlayers: playerVersions
            })
        })
        this.setState({
            postDescription: `This are the ${version} TOP 10 players by ${this.titleCase(attribute)} attribute.
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

    titleCase(text) {
        const newText = []
        const splitStr = text.toLowerCase().split('_')
        splitStr.forEach((value, index) => {
           newText[index] = splitStr[index].charAt(0).toUpperCase() + splitStr[index].substring(1)
        })
        return newText.join(' ')
    }

    render() {
        const data = []
        this.state.topPlayers.forEach((player, index) => {
            data.push(
                <div
                    className={styles.player}
                    id={`player-${index}`}
                    style={{'background-image': `linear-gradient(to right, ${this.state.selectedColor}, rgba(0, 0, 0, 0.12))`}}
                >
                    <div
                        className={styles.index}
                        style={{'background': `${this.state.selectedColorAlpha}`}}
                    >
                        {index < 9 ? '0' + (index + 1) : index + 1}
                    </div>
                    <Overall value={player.attribute} className={styles.overall} />
                    <div className={styles.name}>{player.name}</div>
                    <div className={styles.teamLogo}>
                        <img referrerPolicy="no-referrer" src={player.team_image_url} alt='' />
                    </div>
                </div>
            )
        })
        return (
            <Container fixed >
                <ConfigPanel title={"Top Players"}>
                    <Grid item xs={3} >
                        <Select
                            options={this.state.versions}
                            isLoading={this.state.isLoadingVersions}
                            onChange={this.changeVersion}
                            placeholder='Select a version'
                        />
                    </Grid>
                    <Grid item xs={3} >
                        <Select
                            options={attributes.map(field => { return {
                                'label': this.titleCase(field), 'value': field
                            }})}
                            onChange={this.changeField}
                            placeholder='Select field'
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <Color defaultColor={this.state.selectedColor} handleColorChange={this.changeColor}/>
                    </Grid>
                    <Grid item xs={12}>
                        <BackgroundImage
                            defaultImageUrl={'https://www4.pictures.gi.zimbio.com/Samuel+Eto+o+Barcelona+v+Malaga+La+Liga+NLJSz1bgYUMl.jpg'}
                            defaultWidth={820}
                            defaultHeight={760}
                            defaultTop={240}
                            defaultLeft={80}
                            defaultSize={700}
                            useLinear={true}
                        />
                    </Grid>
                </ConfigPanel>
                <Post postDescription={this.state.postDescription} className={styles.post}>
                    <Logo classStyleName={styles.tfsLogo}/>
                    <div className={styles.title}>
                        <div className={styles.fifaText}>
                            FIFA <div className={styles.fifaNumber}> {this.state.selectedVersionNumber}</div>
                        </div>
                        <div className={styles.titleText}>
                            TOP 10 players by <br/><label className={styles.attribute}>{this.titleCase(this.state.selectedField)}</label>
                        </div>
                    </div>
                    <div className={styles.chart} style={{'background-color': this.state.selectedColorAlpha}}>
                        <div className={styles.ranking}>
                            {data}
                        </div>
                    </div>
                </Post>
            </Container>

        )
    }
}