import React from 'react';
import PropTypes from 'prop-types';
import './App.css';
import {BrowserRouter as Router, Link as RouterLink, Route, Switch} from "react-router-dom"
import {PlayerEvolution} from "./PlayerEvolution";
import {Home} from "./Home";
import ListItemText from '@material-ui/core/ListItemText';
import {Hidden, List, ListItem, ListItemIcon, Drawer, AppBar, Divider} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import {Top3Players} from "./Top3Players";
import Squads from "./Squads";
import CombinedSquad from "./CombinedSquad";
import VersionSquad from "./VersionSquad";
import {TopPlayers} from "./TopPlayers";

function ListItemLink(props) {
  const { icon, primary, to } = props;

  const renderLink = React.useMemo(
    () => React.forwardRef((itemProps, ref) => <RouterLink to={to} ref={ref} {...itemProps} />),
    [to],
  );

  return (
    <li>
      <ListItem button component={renderLink}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}

ListItemLink.propTypes = {
  icon: PropTypes.element,
  primary: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

const drawerWidth = 180;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
            backgroundColor: 'unset',
            color: '#2b2b2b',
            position: 'unset'
        },
        [theme.breakpoints.down(700)]: {
            display: 'none'
        }
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    }
}));



function App() {
    const classes = useStyles();

    const drawer = (
        <div>
            <img
                src={require('./static/tfs-logo.png')}
                style={{
                    width: '50px',
                    margin: '11px auto -49px auto',
                    display: 'flex'
                }}
            />
            <div className={classes.toolbar} />
            <Divider />
            <List aria-label="main mailbox folders">
                {
                    [
                        ['home', 'Home'],
                        ['player-evolution', 'Player Evolution'],
                        ['top-3-players', 'Top 3 Players'],
                        ['top-players', 'Top Players'],
                        ['squad', 'Squad'],
                        ['combined-squad', 'Combined Squad'],
                        ['version-squad', 'Version Squad']
                    ].map((text, index) => (
                    <ListItemLink to={`/${text[0]}`} primary={text[1]} />
                ))}
            </List>
        </div>
    )

    return (
        <div className="App">
            <div className={"noavailable"}>
                Sorry! This site is still not available on screens under 700px wide.
            </div>
            <AppBar className={classes.appBar}>
                <Router>
                    <nav className={classes.drawer} aria-label="mailbox folders">
                        <Hidden implementation="css">
                            <Drawer
                                variant="permanent"
                                classes={{
                                    paper: classes.drawerPaper,
                                }}
                                open
                            >
                                {drawer}
                            </Drawer>
                        </Hidden>
                    </nav>
                    <Switch>
                            <Route path="/top-3-players"><Top3Players/></Route>
                            <Route path="/top-players"><TopPlayers/></Route>
                            <Route path="/player-evolution"><PlayerEvolution/></Route>
                            <Route path="/squad"><Squads/></Route>
                            <Route path="/combined-squad"><CombinedSquad/></Route>
                            <Route path="/version-squad"><VersionSquad/></Route>
                            <Route path="/"><Home/></Route>
                    </Switch>
                </Router>
            </AppBar>
        </div>
    );
}

export default App;
