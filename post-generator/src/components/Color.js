import React from 'react'
import PropTypes from 'prop-types'

import {ChromePicker} from 'react-color'
import {Button} from "@material-ui/core";

export class Color extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pickerVisible: false,
            color: this.props.defaultColor
        }
        this.handleColorChange = this.handleColorChange.bind(this)
    }

    handleColorChange(color) {
        this.setState({color: color.hex})
        this.props.handleColorChange(color)
        this.setState({pickerVisible: false})
    }

    render() {
        const onTogglePicker = () => this.setState({pickerVisible: !this.state.pickerVisible})

        return (
            <div>
                <Button
                    onClick={onTogglePicker}
                    style={{
                        'background-color': this.state.color,
                        'height': '38px'
                    }}
                />
                {this.state.pickerVisible && (
                    <div style={{position: 'absolute', zIndex: 1}}>
                        <ChromePicker
                            color={this.state.color}
                            onChangeComplete={this.handleColorChange}
                        />
                    </div>
                )}
            </div>
        )
    }
}

Color.propTypes = {
    defaultColor: PropTypes.string.isRequired,
    handleColorChange: PropTypes.func.isRequired
}