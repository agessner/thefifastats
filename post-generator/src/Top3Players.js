import React from 'react';
import {Container, Grid} from "@material-ui/core";
import gateways from "./gateways";
import Select from 'react-select';
import {Logo} from "./components/Logo";
import styles from './Top3Players.module.css';
import {Overall} from './components/Overall'
import {Color} from './components/Color'
import {BackgroundImage} from "./components/BackgroundImage";
import {logos} from "./fifa-logos/complete";
import {ConfigPanel} from "./components/ConfigPanel";
import Post from "./components/Post";


const fields = [
    'overall_rating',
    'potential_overall_rating'
]

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
            selectedField: '',
            topPlayers: [],
            selectedColor: 'rgb(51,66,81)',
            selectedColorAlpha: 'rgba(51,66,81,0.25)',
            postDescription: ''
        };

        this.changeVersion = this.changeVersion.bind(this);
        this.changePosition = this.changePosition.bind(this);
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
        this.updateTopPlayers(selectedOption.value, this.state.selectedPosition, this.state.selectedField);
    }

    changePosition(selectedOption) {
        this.setState({selectedPosition: selectedOption.value})
        this.updateTopPlayers(this.state.selectedVersion, selectedOption.value, this.state.selectedField);
    }

    changeField(selectedOption) {
        this.setState({selectedField: selectedOption.value})
        this.updateTopPlayers(this.state.selectedVersion, this.state.selectedPosition, selectedOption.value);
    }

    updateTopPlayers(version, position, field) {
        if (!version || !position) {
            return
        }
        gateways.getTopPlayersAtVersionAndPosition(version, position, field).then(playerVersions => {
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
                    <Overall value={player.field} className={styles.overall} />
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
                        />
                    </Grid>
                    <Grid item xs={3} >
                        <Select
                            options={this.state.positions}
                            isLoading={this.state.isLoadingPositions}
                            onChange={this.changePosition}
                            placeholder='Select a position'
                        />
                    </Grid>
                    <Grid item xs={3} >
                        <Select
                            options={fields.map(field => { return {'label': field, 'value': field} })}
                            onChange={this.changeField}
                            placeholder='Select field'
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <Color defaultColor={this.state.selectedColor} handleColorChange={this.changeColor}/>
                    </Grid>
                    <Grid item xs={12}>
                        <BackgroundImage
                            defaultImageUrl={'https://unity-img.tbxapis.com/v0/images/07fbc223325610b5a5ebdab08c34ff45/content/5f5268e19e282010f8af096f/5fb80d21388e2dac6940c06878e2bf59/img.jpg'}
                            defaultWidth={300}
                            defaultHeight={152}
                            defaultTop={448}
                            defaultLeft={260}
                            defaultSize={360}
                            useLinear={true}
                        />
                        <BackgroundImage
                            defaultImageUrl={'https://www.hojeemdia.com.br/polopoly_fs/1.617928!/image/image.png_gen/derivatives/landscape_653/image.png'}
                            defaultWidth={300}
                            defaultHeight={150}
                            defaultTop={600}
                            defaultLeft={260}
                            defaultSize={400}
                            useLinear={true}
                        />
                        <BackgroundImage
                            defaultImageUrl={'https://s.yimg.com/ny/api/res/1.2/EfJByB.DYbvLXAEa2QodQg--~A/YXBwaWQ9aGlnaGxhbmRlcjtzbT0xO3c9ODAw/https://media.zenfs.com/en/uk.goal.com/007ebeb94d150eb5d0a37b6b5ab6dd0e\n'}
                            defaultWidth={300}
                            defaultHeight={154}
                            defaultTop={750}
                            defaultLeft={260}
                            defaultSize={440}
                            useLinear={true}
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