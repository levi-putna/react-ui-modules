import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import style from './Calendar.scss';

export default class Day extends Component {

    static propTypes = {
        day: PropTypes.object.isRequired,
        isToday: PropTypes.bool,
        isThisMonth: PropTypes.bool,
    };

    static defaultProps = {
        isToday: false,
        isThisMonth: true,
    };

    constructor(props) {
        super(props);
    }

    render() {
        const {day, isToday, isThisMonth} = this.props;
        const displayDay = day.format('D');
        const key = displayDay;

        const classes = classNames(style.weekDay, {
            [style.weekDayOther]: !isThisMonth,
            [style.weekDayToday]: isToday
        });

        return (
            <div key={key} className={classes}>
                    {displayDay}
            </div>
        );
    }
}
