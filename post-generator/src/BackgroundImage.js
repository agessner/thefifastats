import {Grid, TextField} from "@material-ui/core"
import React from "react"
import PropTypes from 'prop-types'

export class BackgroundImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            backgroundImageUrl: '',
            backgroundImageSize: 300,
            backgroundImageWidth: 500,
            backgroundImageHeight: 500,
            backgroundImageTop: 350,
            backgroundImageLeft: 100,
        }
        this.changeBackgroundImageUrl = this.changeBackgroundImageUrl.bind(this)
        this.changeBackgroundImageSize = this.changeBackgroundImageSize.bind(this)
        this.changeBackgroundImageWidth = this.changeBackgroundImageWidth.bind(this)
        this.changeBackgroundImageHeight = this.changeBackgroundImageHeight.bind(this)
        this.changeBackgroundImageTop = this.changeBackgroundImageTop.bind(this)
        this.changeBackgroundImageLeft = this.changeBackgroundImageLeft.bind(this)
    }

    changeBackgroundImageUrl(event) {
        this.setState({backgroundImageUrl: event.target.value})
    }

    changeBackgroundImageSize(event) {
        this.setState({backgroundImageSize: parseInt(event.target.value)})
    }

    changeBackgroundImageWidth(event) {
        this.setState({backgroundImageWidth: parseInt(event.target.value)})
    }

    changeBackgroundImageHeight(event) {
        this.setState({backgroundImageHeight: parseInt(event.target.value)})
    }

    changeBackgroundImageTop(event) {
        this.setState({backgroundImageTop: parseInt(event.target.value)})
    }

    changeBackgroundImageLeft(event) {
        this.setState({backgroundImageLeft: parseInt(event.target.value)})
    }

    render() {
        return ([
            <Grid item xs={12}>
                <TextField label="Background image URL" label="Image URL" onChange={this.changeBackgroundImageUrl}/>
                <label>Size: </label><input type='range' min="0" max="2000" value={this.state.backgroundImageSize} onChange={this.changeBackgroundImageSize}/>
                <label>Width: </label><input type='range' min="0" max="2000" value={this.state.backgroundImageWidth} onChange={this.changeBackgroundImageWidth}/>
                <label>Height: </label><input type='range' min="0" max="2000" value={this.state.backgroundImageHeight} onChange={this.changeBackgroundImageHeight}/>
                <label>Top: </label><input type='range' min="0" max="2000" value={this.state.backgroundImageTop} onChange={this.changeBackgroundImageTop}/>
                <label>Left: </label><input type='range' min="0" max="2000" value={this.state.backgroundImageLeft} onChange={this.changeBackgroundImageLeft}/>
            </Grid>,
            <div
                className={this.props.className}
                style={
                    {
                        'background': `url(${this.state.backgroundImageUrl})`,
                        'background-size': this.state.backgroundImageSize,
                        'width': this.state.backgroundImageWidth,
                        'height': this.state.backgroundImageHeight,
                        'top': this.state.backgroundImageTop,
                        'left': this.state.backgroundImageLeft,
                    }
                }
            />
        ])
    }
}

BackgroundImage.propTypes = {
    className: PropTypes.string.isRequired
}