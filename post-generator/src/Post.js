import {Grid} from "@material-ui/core";
import Tags from "./Tags";
import React from "react";
import PropTypes from 'prop-types';
import styles from './Post.module.css';

export default class Post extends React.Component {
    render() {
        return (
            <Grid container>
                <Grid item xs={8}>
                    <div id="imgPost" className={styles.post}>
                        {this.props.children}
                    </div>
                </Grid>
                <Grid item xs={4}>
                    <Grid item xs={12}><Tags/></Grid>
                    <Grid item xs={12}><textarea value={this.props.postDescription} rows={20} cols={33}/></Grid>
                </Grid>
            </Grid>
        )
    }
}

Post.propTypes = {
    postDescription: PropTypes.string.isRequired
}