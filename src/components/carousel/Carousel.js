import React from "react";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import classNames from 'classnames'
import {Icon, IconType} from 'elements/icon';

import {Component} from 'elements/base';
import style from './Carousel.scss';
//import 'style/transition.scss'

export default class Carousel extends Component {

    static defaultProps = {
        active: 0,
        speed: 5000
    };

    state = {
        active: this.props.active
    };

    constructor(props) {
        super(props);

        this.slideBack = this.slideBack.bind(this);
        this.slideForward = this.slideForward.bind(this);
        this.onMouseEnterHandler = this.onMouseEnterHandler.bind(this);
        this.onMouseLeaveHandler = this.onMouseLeaveHandler.bind(this);

        this.rotate_interval = null;
        this.timeout = null;
        this.direction = 'forward';
    }

    slideBack() {
        this.tick('back');
    }

    slideForward() {
        this.tick('forward');
    }

    /**
     * Restart rotation when the mouse leaves a slide
     */
    onMouseLeaveHandler() {
        this.setRotateInterval();
    }

    /**
     * Cancel rotation when the mouse is over the slide
     */
    onMouseEnterHandler() {
        if (this.rotate_interval) {
            clearInterval(this.rotate_interval);
            this.rotate_interval = null;
        }
    }

    /**
     * Transition the slide in a some defection
     * @param direction The direction to transition. Options 'forward' or 'back'. def 'forward'
     */
    tick(direction = 'forward') {
        let {children} = this.props;

        //check timeout, to avoid multiple transitions at one time

        if (this.timeout) {
            return;
        }
        this.setTimeout();

        //set transition defection
        this.direction = direction;

        //Clear the rotate interval
        if (this.rotate_interval) {
            clearInterval(this.rotate_interval);
            this.rotate_interval = null;
        }

        //Transition slide
        if (direction === 'forward') {
            //Move Forward
            let new_active = this.state.active + 1;

            if (children.length > new_active) {
                this.setState(
                    {
                        active: new_active
                    }
                );
            } else {
                this.setState({active: 0});
            }
        } else {
            //Move Backward
            let new_active = this.state.active - 1;

            if (new_active < 0) {
                this.setState({active: children.length - 1});
            } else {
                this.setState(
                    {
                        active: new_active
                    }
                );
            }
        }

        //restart the rotate interval.
        this.setRotateInterval();
    }

    componentDidMount() {
        this.setRotateInterval();
    }

    /**
     * Set the automation transition interval. This is reset during manual transition.
     *
     * TODO: reset on hover
     */
    setRotateInterval() {
        this.rotate_interval = setInterval(() => {
            this.tick('forward')
        }, 10000);
    }

    /**
     * Set transition timeout. This prevents the slide form being transitioned whe ot is already in progress.
     */
    setTimeout() {
        this.timeout = setTimeout(() => {
            this.timeout = null;
        }, 500);
    }

    /**
     * Create the nav dod slide count indicators.
     *
     * @param slides
     * @param active
     */
    generateIndicator(slides, active) {
        let active_slide = slides[active];
        let count = 0;

        return slides.map(function (slide) {
            const classes = classNames(style.indicatorDot, {
                [style.indicatorDotActive]: (slide === active_slide),
            });

            return <li key={count++} className={classes}/>
        });
    }

    getTab() {
        let {children} = this.props;
        let {active} = this.state;
        return children[active];
    }

    render() {

        let {children, className} = this.props;
        let {active} = this.state;

        const classes = classNames(style.container, className);

        const transition = (this.direction === 'forward') ? style.transitionForward : style.transitionBack;

        return (
            <div className={classes} onMouseEnter={this.onMouseEnterHandler} onMouseLeave={this.onMouseLeaveHandler}>

                <button className={classNames(style.control, style.controlBack)} onClick={this.slideBack}>
                    <Icon type={IconType.angleLeft}/>
                </button>

                <div className={style.slide}>

                    <ReactCSSTransitionGroup
                        transitionName={transition}
                        transitionEnter={true}
                        transitionLeave={true}
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={500}>
                        {this.getTab()}
                    </ReactCSSTransitionGroup>

                </div>

                <button className={classNames(style.control, style.controlForward)} onClick={this.slideForward}>
                    <Icon type={IconType.angleRight}/>
                </button>

                <ol className={style.indicator}>
                    {this.generateIndicator(children, active)}
                </ol>
            </div>
        );
    }
}
