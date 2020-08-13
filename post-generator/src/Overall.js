import React from "react";
import PropTypes from 'prop-types';
import styles from './Overall.module.css';
import classnames from 'classnames';

export class Overall extends React.Component {
    getRatingClass(overall) {
        if (parseInt(overall) < 61) {
            return styles.lowerThen61
        }

        if (parseInt(overall) < 71) {
            return styles.lowerThen71
        }

        if (parseInt(overall) < 81) {
            return styles.lowerThen81
        }
        return styles.lowerThen99
    }

    render() {
        return (
            <div className={classnames(this.getRatingClass(this.props.value), styles.overall, this.props.className)}>
                {this.props.value}
            </div>
        )
    }
}

Overall.propTypes = {
    value: PropTypes.string.isRequired,
    className: PropTypes.string
}