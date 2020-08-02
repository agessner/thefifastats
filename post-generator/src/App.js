import React from 'react';
import PropTypes from 'prop-types';
import './App.css';
import {BrowserRouter as Router, Link as RouterLink, Route, Switch} from "react-router-dom"
import {Player} from "./Player";
import {Home} from "./Home";
import ListItemText from '@material-ui/core/ListItemText';
import {List, ListItem, ListItemIcon} from "@material-ui/core";

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

function App() {
    return (
        <div className="App">
            <Router>
                <List aria-label="main mailbox folders">
                    <ListItemLink to="/home" primary="Home" />
                    <ListItemLink to="/players" primary="Players" />
                </List>
                <Switch>
                    <Route path="/players">
                        <Player/>
                    </Route>
                    <Route path="/">
                        <Home/>
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
