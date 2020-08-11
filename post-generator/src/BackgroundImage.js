import {Grid, Slider, TextField, Typography} from "@material-ui/core"
import React from "react"
import PropTypes from 'prop-types'

export class BackgroundImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            backgroundImageUrl: 'https://bolavip.com/__export/1586395840559/sites/bolavip/img/2020/04/08/whatsapp_image_2020-04-08_at_22_19_14_crop1586395840052.jpeg_554688468.jpeg',
            backgroundImageSize: 980,
            backgroundImageWidth: 560,
            backgroundImageHeight: 520,
            backgroundImageTop: 260,
            backgroundImageLeft: 360,
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
        return ([
            <Grid container spacing={2}>
                <Grid item xs={2}>
                    <TextField label="Background image URL" label="Image URL" onChange={this.changeBackgroundImageUrl}/>
                </Grid>
                <Grid item xs={2}>
                    <Typography id="size" gutterBottom>
                        Size
                    </Typography>
                    <Slider
                        defaultValue={980}
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
                        defaultValue={560}
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
                        defaultValue={520}
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
                        defaultValue={260}
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
                        defaultValue={360}
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