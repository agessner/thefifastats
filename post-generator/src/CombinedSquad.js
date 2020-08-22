import React from 'react';
import {ConfigPanel} from "./components/ConfigPanel";
import {Container, Grid} from "@material-ui/core";
import Select from "react-select";
import gateways from "./gateways";
import {Color} from "./components/Color";
import Squad from "./components/Squad";

export default class CombinedSquad extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            teams: [],
            selectedTeam1: '',
            selectedTeam2: '',
            teamPlayers: [],
            isLoadingTeams: true,
            selectedColor: 'rgb(81,51,62)',
            selectedColorAlpha: 'rgba(81,51,62,0.25)',
        }
        this.changeTeam1 = this.changeTeam1.bind(this)
        this.changeTeam2 = this.changeTeam2.bind(this)
        this.changeColor = this.changeColor.bind(this)
        this.loadTeams()
    }

    loadTeams() {
        gateways.loadTeams('teams').then(
            teams => this.setState({
                teams: teams.map(team => { return {'value': team.team_name, 'label': team.team_name}}),
                isLoadingTeams: false
            })
        )
    }

    changeTeam1(selectedOption) {
        this.setState({selectedTeam1: selectedOption.value}, this.changeTeam)
    }

    changeTeam2(selectedOption) {
        this.setState({selectedTeam2: selectedOption.value}, this.changeTeam)

    }

    changeTeam() {
        if (!this.state.selectedTeam1 || !this.state.selectedTeam2) {
            return
        }

        gateways.loadCombinedTeamPlayers(
            this.state.selectedTeam1,
            this.state.selectedTeam2
        ).then(players => this.setState({
            teamPlayers: players.map(player => { return {...player, ...{selected: true}}})
        }))
    }

    changeColor(color) {
        this.setState({selectedColor: Color.getRgbaText(color.rgb)})
        const colorAlpha = {...color.rgb, a: 0.25}
        this.setState({selectedColorAlpha: Color.getRgbaText(colorAlpha)})
    }

    getPostDescription() {
        return `${this.state.selectedTeam1} X ${this.state.selectedTeam2} Best Combined Starting XI FIFA Team from 07-20
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
        return (
            <Container fixed>
                <ConfigPanel title={"Combined Squad"}>
                    <Grid item xs={3}>
                        <Select
                            options={this.state.teams}
                            isLoading={this.state.isLoadingTeams}
                            onChange={this.changeTeam1}
                            placeholder='Teams'
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <Select
                            options={this.state.teams}
                            isLoading={this.state.isLoadingTeams}
                            onChange={this.changeTeam2}
                            placeholder='Teams'
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <Color defaultColor={this.state.selectedColor} handleColorChange={this.changeColor}/>
                    </Grid>
                </ConfigPanel>
                <Squad
                    selectedColor={this.state.selectedColor}
                    selectedColorAlpha={this.state.selectedColorAlpha}
                    title='BEST COMBINED XI FROM FIFA 07-20'
                    postDescription={this.getPostDescription()}
                    players={this.state.teamPlayers}
                    showTeamLogo={false}
                />

            </Container>

        )
    }
}