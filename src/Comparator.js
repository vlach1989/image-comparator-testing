import React, { Component } from 'react';
import './style.css';

const maxWidth = 800;
const maxHeight = 450;

class Comparator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 320,
            height: 270,
            horizontalDragging: false,
			verticalDragging: false
        };
        this.enableHorizontal = this.enableHorizontal.bind(this);
        this.enableVertical = this.enableVertical.bind(this);
        this.disableHorizontal = this.disableHorizontal.bind(this);
        this.disableVertical = this.disableVertical.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
    }

    onMouseMove(e) {
    	let change = {};
    	if (this.state.horizontalDragging) {
			const height = e.clientY;
			const stepp = e.movementY;
			change.height = (height + stepp) > maxHeight ? maxHeight : (height + stepp);
		}

    	if (this.state.verticalDragging) {
			const width = e.clientX;
			const step = e.movementX;
			change.width = (width + step) > maxWidth ? maxWidth : (width + step);
		}

        if (!(Object.keys(change).length === 0 && change.constructor === Object)) {
        	this.setState(change);
		}
    }

    enableHorizontal(e) {
        this.setState({
            horizontalDragging: true
        })
    }

    disableHorizontal(e) {
        this.setState({
			horizontalDragging: false
        })
    }

	enableVertical(e) {
		this.setState({
			verticalDragging: true
		})
	}

	disableVertical(e) {
		this.setState({
			verticalDragging: false
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
            <div onMouseMove={this.onMouseMove} className="ric-container">
                <div className="ric-image-wrapper top-left" style={topLeftStyle}></div>
                <div className="ric-image-wrapper top-right" style={topRightStyle}></div>
                <div className="ric-image-wrapper bottom-right" style={bottomRightStyle}></div>
                <div className="ric-image-wrapper bottom-left" style={bottomLeftStyle}></div>
                <div
                    className="ric-handle ric-vertical-handle"
                    draggable={true}
					onMouseUp={this.disableVertical}
                    onMouseDown={this.enableVertical}
                    style={verticalHandleStyle}
                >
                </div>
                <div
                    className="ric-handle ric-horizontal-handle"
                    draggable={true}
					onMouseUp={this.disableHorizontal}
                    onMouseDown={this.enableHorizontal}
                    style={horizontalHandleStyle}
                >
                </div>
            </div>
        );
    }
}

export default Comparator;
