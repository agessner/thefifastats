import React from "react";
import PropTypes from "prop-types";

export class Logo extends React.Component {
    render() {
        return (<img src={require('./static/tfs-logo.png')} className={this.props.classStyleName} />)
    }
}

Logo.propTypes = {
    classStyleName: PropTypes.string.isRequired
}