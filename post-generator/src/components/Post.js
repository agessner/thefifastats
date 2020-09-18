import {Grid} from "@material-ui/core";
import Tags from "./Tags";
import React from "react";
import PropTypes from 'prop-types';
import styles from './Post.module.css';
import { TextareaAutosize } from '@material-ui/core';
import classnames from "classnames";

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
                <Grid item md={5}>
                    <div id="imgPost" className={classnames(styles.post, this.props.className)}>
                        {this.props.children}
                    </div>
                </Grid>
                <Grid item md={4}>
                    {this.props.options}
                </Grid>
                <Grid item md={3} sm={6}>
                    <Grid item xs={12} sm={6}><Tags/></Grid>
                    <Grid item xs={12} sm={6}>
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
    options: PropTypes.element,
    className: PropTypes.string
}