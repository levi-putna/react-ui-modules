import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Day from './Day';

import style from './DateField.scss';

export default class Week extends Component {

    static propTypes = {
        today: PropTypes.object.isRequired,
        date: PropTypes.object.isRequired,
        week: PropTypes.object.isRequired,
        selected: PropTypes.object,
        onSelect: PropTypes.func.isRequired
    };

    renderDays() {
        const {onSelect, today, date, week, selected} =  this.props;
        const startOfWeek = week.clone();
        const days = [];

        return days.concat([0, 1, 2, 3, 4, 5, 6].map((offset) => {
            const day = startOfWeek.clone().add(offset, 'days');
            const isSelected = (selected && day.isSame(selected, 'day'));
            const isToday = (day.isSame(today, 'day'));
            const isThisMonth = (day.isSame(date, 'month'));
            const key = "weekday-" + offset;

            return <Day key={key} onSelect={onSelect} day={day} isToday={isToday} isThisMonth={isThisMonth} isSelected={isSelected} />
        }))
    }

    render() {
        return <div className={style.week}>
            {this.renderDays()}
        </div>;
    }
}
