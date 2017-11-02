import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Week from './Week';

export default class Month extends Component {

    static propTypes = {
        date: PropTypes.object.isRequired,
        today: PropTypes.object.isRequired,
        onSelect: PropTypes.func.isRequired,
        selected: PropTypes.object,
    };

    isWeekInMonth(startOfWeek) {
        const {date} = this.props;
        const endOfWeek = startOfWeek.clone().add(6, 'days');
        return startOfWeek.isSame(date, 'month') || endOfWeek.isSame(date, 'month');
    }

    renderWeeks() {
        const {onSelect, today, date, selected} = this.props;

        const weeks = [];

        let currentWeekStart = date.clone().startOf('month').startOf('week');
        let i = 0;
        let breakAfterNextPush = false;

        while (true) {
            weeks.push(<Week onSelect={onSelect} today={today} key={i} date={date} week={currentWeekStart} selected={selected}/>);

            if (breakAfterNextPush) {
                break;
            }

            i++;

            currentWeekStart = currentWeekStart.clone()
            .add(1, 'weeks');

            // Check to see if the next week is still in the current month, if not exit.
            const isWeekInMonth = !this.isWeekInMonth(currentWeekStart);

            if (isWeekInMonth) {
                if (this.props.peekNextMonth) {
                    breakAfterNextPush = true
                } else {
                    break
                }
            }
        }

        return weeks
    }

    render() {
        return <div>
            {this.renderWeeks()}
        </div>;
    }
}
