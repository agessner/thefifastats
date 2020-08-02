import React from "react";

export class Logo extends React.Component {
    render() {
        return (<img src={require('./static/tfs-logo.png')} className='tfs-logo' />)
    }
}