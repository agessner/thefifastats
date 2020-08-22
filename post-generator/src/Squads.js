import React from 'react';
import {ConfigPanel} from "./components/ConfigPanel";
import {Container, Grid} from "@material-ui/core";
import Select from "react-select";
import gateways from "./gateways";
import {Color} from "./components/Color";
import Squad from "./components/Squad";

const titlesByPostType = {
    'teams' : {
        'best': 'BEST OVERALL STARTING XI',
        'worst': 'WORST OVERALL STARTING XI'
    },
    'national-teams': {
        'best': 'BEST OVERALL XI FROM FIFA 07-20'
    },
    'potential-teams': {
        'best': 'BEST POTENTIAL XI FROM FIFA 20'
    }
}

export default class Squads extends React.Component {
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
            players: []
        }
        this.changePostType = this.changePostType.bind(this)
        this.changeTeam = this.changeTeam.bind(this)
        this.changeWorstOrBest = this.changeWorstOrBest.bind(this)
        this.changeColor = this.changeColor.bind(this)
    }

    getPostTypes() {
        return [
            {value: 'teams', label: 'Team'},
            {value: 'national-teams', label: 'National Team'},
            {value: 'potential-teams', label: 'Potential Team'}
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
            players: players.map(player => { return {...player, ...{selected: true}}})
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
                <Squad
                    selectedColor={this.state.selectedColor}
                    selectedColorAlpha={this.state.selectedColorAlpha}
                    title={this.state.title}
                    postDescription={this.getPostDescription()}
                    players={this.state.players}
                    showTeamLogo={true}
                />
            </Container>

        )
    }
}