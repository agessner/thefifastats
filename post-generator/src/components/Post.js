import {Grid} from "@material-ui/core";
import Tags from "./Tags";
import React from "react";
import PropTypes from 'prop-types';
import styles from './Post.module.css';
import { TextareaAutosize } from '@material-ui/core';

export default class Post extends React.Component {
    constructor(props) {
        super(props)
        this.state = {...props}
    }


    componentWillReceiveProps({postDescription}, nextContent) {
        this.setState({...this.state, postDescription})
    }

    render() {
        return (
            <Grid container spacing={3}>
                <Grid item xs={5}>
                    <div id="imgPost" className={styles.post}>
                        {this.props.children}
                    </div>
                </Grid>
                <Grid item xs={4}>
                    {this.props.options}
                </Grid>
                <Grid item xs={3}>
                    <Grid item xs={12}><Tags/></Grid>
                    <Grid item xs={12}>
                        <TextareaAutosize rows={20} cols={33} defaultValue={this.state.postDescription}>
                        </TextareaAutosize>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

Post.propTypes = {
    postDescription: PropTypes.string.isRequired,
    options: PropTypes.element
}