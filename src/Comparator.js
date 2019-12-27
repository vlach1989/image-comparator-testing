import React, { Component } from 'react';
import './style.css';

class Comparator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: null,
            height: null,
            enableDragging: false
        };
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
    }

    onMouseMove(e) {
        if (this.state.enableDragging) {
            const width = e.clientX;
            const height = e.clientY;
            const step = e.movementX;
            const stepp = e.movementY;

            this.setState({
                width: width + step,
                height: height + stepp
            });
        }
    }

    onMouseDown(e) {
        this.setState({
            enableDragging: true
        })
    }

    onMouseUp(e) {
        this.setState({
            enableDragging: false
        })
    }

    render() {
        let verticalHandleStyle = this.state.width ? {left: this.state.width} : null;
        let horizontalHandleStyle = this.state.height ? {top: this.state.height} : null;
        let topLeftStyle = this.state.width && this.state.height ? {width: this.state.width, height: this.state.height} : null;
        let topRightStyle = this.state.width && this.state.height  ? {width: 800 - this.state.width, height: this.state.height} : null;
        let bottomLeftStyle = this.state.width && this.state.height ? {width: this.state.width, height: 450 - this.state.height} : null;
        let bottomRightStyle = this.state.width && this.state.height  ? {width: 800 - this.state.width, height: 450 - this.state.height} : null;

        return (
            <div onMouseMove={this.onMouseMove} onMouseUp={this.onMouseUp} className="ric-container">
                <div className="ric-image-wrapper top-left" style={topLeftStyle}></div>
                <div className="ric-image-wrapper top-right" style={topRightStyle}></div>
                <div className="ric-image-wrapper bottom-right" style={bottomRightStyle}></div>
                <div className="ric-image-wrapper bottom-left" style={bottomLeftStyle}></div>
                <div
                    className="ric-handle ric-vertical-handle"
                    draggable={true}
                    onMouseDown={this.onMouseDown}
                    style={verticalHandleStyle}
                >
                </div>
                <div
                    className="ric-handle ric-horizontal-handle"
                    draggable={true}
                    onMouseDown={this.onMouseDown}
                    style={horizontalHandleStyle}
                >
                </div>
            </div>
        );
    }
}

export default Comparator;
