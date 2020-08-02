import React from "react";
import PropTypes from 'prop-types';
import './Overall.css'

export class Overall extends React.Component {
    getRatingClass(overall) {
        if (parseInt(overall) < 61) {
            return 'lower-than-61'
        }

        if (parseInt(overall) < 71) {
            return 'lower-than-71'
        }

        if (parseInt(overall) < 81) {
            return 'lower-than-81'
        }
        return 'lower-than-99'
    }

    render() {
        return (
            <div className={this.getRatingClass(this.props.value)}>
                {this.props.value}
            </div>
        )
    }
}

Overall.propTypes = {
    value: PropTypes.string.isRequired
}