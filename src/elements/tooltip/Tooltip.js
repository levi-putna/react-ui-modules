import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import style from './Tooltip.scss';

const propTypes = {
    className: PropTypes.string,
    isOpen: PropTypes.bool,
    disabled: PropTypes.bool,
    children: PropTypes.oneOfType(
        [
            PropTypes.arrayOf(PropTypes.node),
            PropTypes.node
        ]
    ),
    target: PropTypes.oneOfType(
        [
            PropTypes.string,
            PropTypes.object
        ]
    ).isRequired,
    testId: PropTypes.string,
    position: PropTypes.string,
};

const defaultProps = {
    isOpen: false,
    position: 'RIGHT',
};

class Tooltip extends Component {

    static position = {
        left: 'LEFT',
        right: 'RIGHT'
    };

    constructor(props) {
        super(props);

        this.onMouseOverTooltip = this.onMouseOverTooltip.bind(this);
        this.onMouseLeaveTooltip = this.onMouseLeaveTooltip.bind(this);

        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);

        this.getTarget = this.getTarget.bind(this);
        this.addTargetEvents = this.addTargetEvents.bind(this);
        this.removeTargetEvents = this.removeTargetEvents.bind(this);

        this.calculatePosition = this.calculatePosition.bind(this);
        this.setHeight = this.setHeight.bind(this);

        this.state = {
            isOpen: props.isOpen,
            top: 0,
            left: 0,
            height: 0
        };
    }

    componentDidMount() {
        this.target = this.getTarget();
        this.addTargetEvents();
    }

    componentWillUnmount() {
        this.removeTargetEvents();
    }

    show() {
        this.setState({isOpen: true});
    }

    hide() {
        this.setState({isOpen: false});
        this.clearHideTimeout();
    }

    getTarget() {
        const {target} = this.props;

        if (typeof target === 'object') {
            return target;
        }

        return document.getElementById(target);
    }

    onMouseOverTooltip() {
        const {isOpen} = this.state;

        if (!isOpen) {
            this.show();
            this.hideTimeout = setTimeout(this.hide, 1500);
        }
    }

    onMouseLeaveTooltip() {
        const {isOpen} = this.state;

        if (isOpen) {
            this.hide();
        }
    }

    calculatePosition(element) {
        if (!element) {
            return null;
        }

        const {position} = this.props;
        const {height} = this.state;
        const positioning = element.getBoundingClientRect();

        console.log('positioning', positioning);

        // Return when rendering to the left side
        if(position === Tooltip.position.left){

            return {
                top: positioning.top + (positioning.height / 2) - (height / 2),
                right: positioning.left
            };
        }

        // Default: Returned when rendering to the right side of the element
        return {
            top: positioning.top + (positioning.height / 2) - (height / 2),
            left: positioning.right
        };
    }

    setHeight(element) {
        if (!element) {
            return;
        }

        const position = element.getBoundingClientRect();

        this.setState(
            {
                height: position.height
            }
        );
    }

    addTargetEvents() {
        this.target.addEventListener('mouseover', this.onMouseOverTooltip, true);
        this.target.addEventListener('mouseout', this.onMouseLeaveTooltip, true);
    }

    removeTargetEvents() {
        this.target.removeEventListener('mouseover', this.onMouseOverTooltip, true);
        this.target.removeEventListener('mouseout', this.onMouseLeaveTooltip, true);
    }

    clearShowTimeout() {
        clearTimeout(this._showTimeout);
        this._showTimeout = undefined;
    }

    clearHideTimeout() {
        clearTimeout(this.hideTimeout);
        this.hideTimeout = undefined;
    }

    render() {
        const {className, children, position, testId} = this.props;
        const {isOpen} = this.state;

        if (!isOpen) {
            return null;
        }

        const positioning = this.calculatePosition(this.target);
        const classes = classNames(style.tooltip, className, {
            [style.tooltipOpen]: true,
            [style.tooltipLeft]: (position === Tooltip.position.left)
        });

        return (
            <div data-test-id={testId} ref={this.setHeight} style={positioning} className={classes}>
                <div className={style.content}>
                    {children}
                </div>
            </div>
        );
    }
}

Tooltip.propTypes = propTypes;
Tooltip.defaultProps = defaultProps;

export default Tooltip;
