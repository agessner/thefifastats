import React from 'react';
import {ConfigPanel} from "./components/ConfigPanel";
import {Container, Grid} from "@material-ui/core";
import Select from "react-select";
import gateways from "./gateways";
import {Color} from "./components/Color";
import Squad from "./components/Squad";

export default class VersionSquad extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            versions: [],
            isLoadingVersions: false,
            teamPlayers: [],
            selectedColor: 'rgb(81,51,62)',
            selectedColorAlpha: 'rgba(81,51,62,0.25)',
            postDescription: ''
        }
        this.changeColor = this.changeColor.bind(this)
        this.changeVersion = this.changeVersion.bind(this)
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
    }

    changeVersion(selectedOption) {
        gateways.loadBestVersionTeam(
            selectedOption.value
        ).then(players => this.setState({
            teamPlayers: players.map(player => { return {...player, ...{selected: true}}}),
            selectedVersion: selectedOption.value,
            postDescription: this.getPostDescription(selectedOption.value)
        }))
    }

    changeColor(color) {
        this.setState({selectedColor: Color.getRgbaText(color.rgb)})
        const colorAlpha = {...color.rgb, a: 0.25}
        this.setState({selectedColorAlpha: Color.getRgbaText(colorAlpha)})
    }

    getPostDescription(version) {
        return `${version} Best Starting XI
Would make any changes?

How we build this squad 🛠
- We get the higher overall for each position
- Game updates are NOT considered, only the last version of the main release
- SUBs are not considered
- Finally, the squad formation is decided by the one we like the most 👨‍🎨👩‍🎨

FOLLOW: @thefifastats
FOLLOW: @thefifastats
FOLLOW: @thefifastats

More teams and more stats to come!`
    }

    render() {
        return (
            <Container fixed>
                <ConfigPanel title={"Version Squad"}>
                    <Grid item xs={3}>
                        <Select
                            options={this.state.versions}
                            isLoading={this.state.isLoadingVersions}
                            onChange={this.changeVersion}
                            placeholder='Versions'
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <Color defaultColor={this.state.selectedColor} handleColorChange={this.changeColor}/>
                    </Grid>
                </ConfigPanel>
                <Squad
                    selectedColor={this.state.selectedColor}
                    selectedColorAlpha={this.state.selectedColorAlpha}
                    title={`BEST XI FROM FIFA ${this.state.selectedVersion}`}
                    postDescription={this.state.postDescription}
                    players={this.state.teamPlayers}
                    showTeamLogo={false}
                />

            </Container>

        )
    }
}