import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import style from './DateField.scss';

export default class Day extends Component {

    static propTypes = {
        day: PropTypes.object.isRequired,
        onSelect: PropTypes.func.isRequired,
        isToday: PropTypes.bool,
        isThisMonth: PropTypes.bool,
        isSelected: PropTypes.bool,
        isDisabled: PropTypes.bool,
    };

    static defaultProps = {
        isToday: false,
        isThisMonth: true,
        isSelected: false,
        isDisabled: false
    };

    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        const {isDisabled, onSelect} = this.props;
        if (!isDisabled) {
            const {day} = this.props;
            onSelect(day, event);
        }
    }

    render() {
        const {day, isToday, isThisMonth, isSelected} = this.props;
        const displayDay = day.format('D');
        const key = displayDay;

        const classes = classNames(style.weekDay,{
            [style.weekDayOther]: !isThisMonth
        });

        const activeClass = classNames(style.weekDayStatus, {
        [style.weekDayStatusToday]: isToday,
            [style.weekDayStatusSelected]: isSelected
        });

        return (
            <div onClick={this.handleClick} key={key} className={classes}>
                <div className={activeClass}>
                    {displayDay}
                </div>
            </div>
        );
    }
}
