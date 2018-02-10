import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import style from './Calendar.scss';

export default class Event extends Component {

    static propTypes = {
        event: PropTypes.arrayOf(
            PropTypes.shape(
                {
                    start: PropTypes.string.isRequired,
                    stop: PropTypes.string.isRequired,
                    label: PropTypes.string.isRequired
                }
            )
        ),
        onClick: PropTypes.func,
        days: PropTypes.number,
        offset: PropTypes.number,
        isStart: PropTypes.bool,
        isEnd: PropTypes.bool,
    };

    static defaultProps = {
        days: 1,
        offset: 0,
        isStart: true,
        isEnd: true,
    };

    constructor(props) {
        super(props);

        this.unitSize = (100 / 7);

        this.onClick = this.onClick.bind(this);
    }

    onClick(e){
        const {onClick, event} = this.props;

        if(onClick){
            onClick(e, event);
        }
    }

    render(){
        let {event, days, offset, isStart, isEnd} = this.props;

        // Represent the event days with a width
        let width = (this.unitSize * days) - 0.2 + "%";

        // represent the offset from the last event by left margin
        let marginLeft = (this.unitSize * offset) + "%";

        const inlineStyle = {
            marginLeft,
            marginRight: '0.2%',
            width,
            backgroundColor: event.color
        };

        const classes = classNames(style.event, {
            [style.eventStart]: isStart,
            [style.eventEnd]: isEnd
        });


        return (
            <div onClick={this.onClick} style={inlineStyle} className={classes}>
                <div className={style.eventLabel}>{(event.label) ? event.label : '\u00A0'}</div>
            </div>
        );
    }
}