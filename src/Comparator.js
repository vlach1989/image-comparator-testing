import React, { Component } from 'react';
import './style.css';

const maxWidth = 800;
const maxHeight = 450;

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
                width: (width + step) > maxWidth ? maxWidth : (width + step),
                height: (height + stepp) > maxHeight ? maxHeight : (height + stepp)
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

    // TODO move to utils
	isNumber(number) {
    	return typeof(number) === "number";
	}

    render() {
    	const s = this.state;

        let verticalHandleStyle = this.isNumber(s.width) ? {left: s.width} : null;
        let horizontalHandleStyle = this.isNumber(s.height) ? {top: s.height} : null;
        let topLeftStyle = this.isNumber(s.width) && this.isNumber(s.height) ? {width: s.width, height: s.height} : null;
        let topRightStyle = this.isNumber(s.width) && this.isNumber(s.height)  ? {width: 800 - s.width, height: s.height} : null;
        let bottomLeftStyle = this.isNumber(s.width) && this.isNumber(s.height) ? {width: s.width, height: 450 - s.height} : null;
        let bottomRightStyle = this.isNumber(s.width) && this.isNumber(s.height)  ? {width: 800 - s.width, height: 450 - s.height} : null;

        console.log("verticalHandleStyle", verticalHandleStyle);
        console.log("horizontalHandleStyle", horizontalHandleStyle);
        console.log("topLeftStyle", topLeftStyle);
        console.log("topRightStyle", topRightStyle);
        console.log("bottomLeftStyle", bottomLeftStyle);
        console.log("bottomRightStyle", bottomRightStyle);
        console.log("width", s.width);
        console.log("height", s.height);
		console.log("-------------------");

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
