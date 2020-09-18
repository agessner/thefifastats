import React from 'react';
import styles from './Home.module.css';
import {Container} from "@material-ui/core";
import GitHubIcon from '@material-ui/icons/GitHub';
import {Instagram} from "@material-ui/icons";
import PersonIcon from '@material-ui/icons/Person';

export class Home extends React.Component {
    render() {
        return (
            <Container fixed >
                    <div className={styles.homeContainer}>
                        <div className={styles.title}>Welcome to The Fifa Stats post generator!</div>
                        <div className={styles.description}>
                            It allows the creation of Instagram posts with few human interactions<br/><br/>

                        </div>
                        <div className={styles.about}>
                            <div className={styles.aboutInfo}>
                                <Instagram/>
                                <a href={"https://www.instagram.com/thefifastats/"} rel="noopener noreferrer" target={"_blank"}>Profile</a>
                            </div>
                            <div className={styles.aboutInfo}>
                                <GitHubIcon/>
                                <a href={"https://github.com/agessner/thefifastats/"} rel="noopener noreferrer" target={"_blank"}>Project Code</a>
                            </div>
                            <div className={styles.aboutInfo}>
                                <GitHubIcon/>
                                <a href={"https://github.com/agessner/fifaengineering/"} rel="noopener noreferrer" target={"_blank"}>Data Project Code</a>
                            </div>
                        </div>
                        <footer>
                            <div className={styles.aboutInfo}>
                                <a rel="noopener noreferrer" href={"https://agessner.github.io/"}>Made with ❤️ by Airton Gessner</a>
                            </div>
                        </footer>
                    </div>
            </Container>
        )
    }
}