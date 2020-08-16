import {Divider, Grid} from "@material-ui/core";
import React from "react";
import PropTypes from "prop-types";
import './ConfigPanel.css'

export class ConfigPanel extends React.Component {
    render() {
        return (
            <div>
                <Grid style={{'background': 'white'}}>
                    <h2>{this.props.title}</h2>
                    <Divider />
                    <br/>
                    <Grid container className='config' spacing={2}>
                        {this.props.children}
                    </Grid>
                </Grid>
                <br/>
                <Divider />
                <br/>
            </div>
        )
    }
}

ConfigPanel.propTypes = {
    title: PropTypes.string.isRequired
}