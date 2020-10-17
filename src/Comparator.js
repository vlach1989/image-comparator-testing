import React, { Component } from 'react';
import './style.css';

import machu from "./img/machu.jpg";

// TODO limits in %
// TODO position (something around from all sides) + check of position of cursor and remove rests of pictures - onMouseLeave od container - and check what direction?
// TODO dragend

const maxWidth = 800;
const maxHeight = 450;

class Comparator extends Component {
    constructor(props) {
        super(props);

        this.ref = React.createRef();

        this.state = {
            width: 320,
            height: 270,
            horizontalDragging: false,
			verticalDragging: false
        };

        this.enableHorizontal = this.enableHorizontal.bind(this);
        this.enableVertical = this.enableVertical.bind(this);
        this.enableBoth = this.enableBoth.bind(this);
        this.disableHorizontal = this.disableHorizontal.bind(this);
        this.disableVertical = this.disableVertical.bind(this);
        this.disableBoth = this.disableBoth.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
    }

	onMouseMove(e) {
		const componentX = this.ref.current.offsetLeft;
		const componentY = this.ref.current.offsetTop;

		const x = e.pageX - componentX;
		const y = e.pageY - componentY;

    	let change = {};
    	if (this.state.horizontalDragging) {
			change.height = y > maxHeight ? maxHeight : (y < 0 ? 0 : y);
		}

    	if (this.state.verticalDragging) {
			change.width = x > maxWidth ? maxWidth : (x < 0 ? 0 : x);
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

	enableBoth(e) {
    	this.setState({
			verticalDragging: true,
			horizontalDragging:  true
		})
	}

	disableBoth(e) {
		this.setState({
			verticalDragging: false,
			horizontalDragging:  false
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


		let middleHandleStyle = {};
		if (this.isNumber(s.height)) {
			middleHandleStyle.top = s.height - 6;
		}
		if (this.isNumber(s.width)) {
			middleHandleStyle.left = s.width - 6;
		}

        let topLeftStyle = this.isNumber(s.width) && this.isNumber(s.height) ? {width: s.width, height: s.height} : null;
        let topRightStyle = this.isNumber(s.width) && this.isNumber(s.height)  ? {width: 800 - s.width, height: s.height} : null;
        let bottomLeftStyle = this.isNumber(s.width) && this.isNumber(s.height) ? {width: s.width, height: 450 - s.height} : null;
        let bottomRightStyle = this.isNumber(s.width) && this.isNumber(s.height)  ? {width: 800 - s.width, height: 450 - s.height} : null;

        return (
            <div onMouseMove={this.onMouseMove} onMouseLeave={this.onMouseMove} className="ric-container" ref={this.ref}>
                <div className="ric-image-wrapper top-left" style={topLeftStyle}>
				</div>
                <div className="ric-image-wrapper top-right" style={topRightStyle}>
				</div>
                <div className="ric-image-wrapper bottom-right" style={bottomRightStyle}></div>
                <div className="ric-image-wrapper bottom-left" style={bottomLeftStyle}></div>
                <div
                    className="ric-handle ric-vertical-handle"
                    draggable={true}
					onMouseUp={this.disableVertical}
                    onMouseDown={this.enableVertical}
					onMouseOut={(e) => console.log("onMouseOut", e.pageX)}
					onDragStart={(e) => e.preventDefault()}
                    style={verticalHandleStyle}
                />
                <div
                    className="ric-handle ric-horizontal-handle"
                    draggable={true}
					onMouseUp={this.disableHorizontal}
                    onMouseDown={this.enableHorizontal}
					onDragStart={(e) => e.preventDefault()}
                    style={horizontalHandleStyle}
                />
                <div
					className="ric-handle ric-middle-handle"
					draggable={true}
					onMouseUp={this.disableBoth}
					onMouseDown={this.enableBoth}
					onDragStart={(e) => e.preventDefault()}
					style={middleHandleStyle}
				/>
            </div>
        );
    }
}

export default Comparator;
