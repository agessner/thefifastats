import {Grid, Slider, TextField, Typography} from "@material-ui/core"
import React from "react"
import PropTypes from 'prop-types'
import styles from './BackgroundImage.module.css'

export class BackgroundImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            backgroundImageUrl: props.defaultImageUrl,
            backgroundImageSize: props.defaultSize,
            backgroundImageWidth: props.defaultWidth,
            backgroundImageHeight: props.defaultHeight,
            backgroundImageTop: props.defaultTop,
            backgroundImageLeft: props.defaultLeft
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

    changeBackgroundImageSize(event, value) {
        this.setState({backgroundImageSize: parseInt(value)})
    }

    changeBackgroundImageWidth(event, value) {
        this.setState({backgroundImageWidth: parseInt(value)})
    }

    changeBackgroundImageHeight(event, value) {
        this.setState({backgroundImageHeight: parseInt(value)})
    }

    changeBackgroundImageTop(event, value) {
        this.setState({backgroundImageTop: parseInt(value)})
    }

    changeBackgroundImageLeft(event, value) {
        this.setState({backgroundImageLeft: parseInt(value)})
    }

    render() {
        const linearBackground = this.props.useLinear &&
            `linear-gradient(to right, rgba(59, 1, 235, 0), rgb(4, 4, 4)),`
        return ([
            <Grid container spacing={2}>
                <Grid item xs={2}>
                    <TextField label="Background image URL" onChange={this.changeBackgroundImageUrl}/>
                </Grid>
                <Grid item xs={2}>
                    <Typography id="size" gutterBottom>
                        Size
                    </Typography>
                    <Slider
                        defaultValue={this.props.defaultSize}
                        aria-labelledby="size"
                        min={0}
                        max={2000}
                        step={20}
                        valueLabelDisplay="auto"
                        onChange={this.changeBackgroundImageSize}
                    />
                </Grid>
                <Grid item xs={2}>
                    <Typography id="width" gutterBottom>
                        Width
                    </Typography>
                    <Slider
                        defaultValue={this.props.defaultWidth}
                        aria-labelledby="width"
                        min={0}
                        max={2000}
                        step={20}
                        valueLabelDisplay="auto"
                        onChange={this.changeBackgroundImageWidth}
                    />
                </Grid>
                <Grid item xs={2}>
                    <Typography id="height" gutterBottom>
                        Height
                    </Typography>
                    <Slider
                        marks
                        defaultValue={this.props.defaultHeight}
                        aria-labelledby="height"
                        min={0}
                        max={2000}
                        step={20}
                        valueLabelDisplay="auto"
                        onChange={this.changeBackgroundImageHeight}
                    />
                </Grid>
                <Grid item xs={2}>
                    <Typography id="top" gutterBottom>
                        Top
                    </Typography>
                    <Slider
                        marks
                        defaultValue={this.props.defaultTop}
                        aria-labelledby="top"
                        min={0}
                        max={2000}
                        step={20}
                        valueLabelDisplay="auto"
                        onChange={this.changeBackgroundImageTop}
                    />
                </Grid>
                <Grid item xs={2}>
                    <Typography id="left" gutterBottom>
                        Left
                    </Typography>
                    <Slider
                        marks
                        defaultValue={this.props.defaultLeft}
                        aria-labelledby="left"
                        min={0}
                        max={2000}
                        step={20}
                        valueLabelDisplay="auto"
                        onChange={this.changeBackgroundImageLeft}
                    />
                </Grid>
            </Grid>,
            <div
                className={styles.backgroundImage}
                style={
                    {
                        'background': `${linearBackground ? linearBackground : ''} url(${this.state.backgroundImageUrl})`,
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
    defaultImageUrl: PropTypes.string,
    defaultWidth: PropTypes.number,
    defaultHeight: PropTypes.number,
    defaultTop: PropTypes.number,
    defaultLeft: PropTypes.number,
    defaultSize: PropTypes.number,
    useLinear: PropTypes.bool
}