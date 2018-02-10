import React, {Component} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Week from './Week';

export default class Month extends Component {

    static propTypes = {
        date: PropTypes.object.isRequired,
        today: PropTypes.object.isRequired,
        onEventClick: PropTypes.func,
        events: PropTypes.arrayOf(
            PropTypes.shape(
                {
                    start: PropTypes.string.isRequired,
                    stop: PropTypes.string.isRequired,
                    label: PropTypes.string.isRequired
                }
            )
        ),
    };

    isWeekInMonth(startOfWeek) {
        const {date} = this.props;
        const endOfWeek = startOfWeek.clone()
        .add(6, 'days');
        return startOfWeek.isSame(date, 'month') || endOfWeek.isSame(date, 'month');
    }

    processEvents(){
        // const {dateFormat, events} = this.props;
        //
        // if (!events) {
        //     return;
        // }
        //
        // let eventsObject = events.map((event) => {
        //     let startDate = moment(event.start, dateFormat);
        //     let stopDate = moment(event.stop, dateFormat);
        //
        //     const length = stopDate.diff(startDate, 'day') + 1;
        //
        //     console.log(event.start, event.stop, length);
        //
        //     return {
        //         ...event,
        //         startDate,
        //         stopDate,
        //         length
        //     }
        // });
        //
        // let sortEvents = eventsObject.sort((a, b) => {
        //     // a must be equal to b
        //     return b.startDate.isAfter(a.startDate);
        // });
    }

    renderWeeks() {
        const {today, date, events, dateFormat, onEventClick} = this.props;
        const weeks = [];

        let currentWeekStart = date.clone()
        .startOf('month')
        .startOf('week');
        let i = 0;
        let breakAfterNextPush = false;

        while (true) {
            weeks.push(<Week today={today} key={i} date={date} week={currentWeekStart} dateFormat={dateFormat} events={events} onEventClick={onEventClick}/>);

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

    //inRange
    // processEvents() {
    //     const {dateFormat, date, events} = this.props;
    //     const startOfMonth = date.clone().startOf('month');
    //     const endOfMonth = date.clone().endOf('month');
    //     const weeksInMonth = endOfMonth.diff(startOfMonth, 'week');
    //
    //     console.log('events', date.format('YYYY-MM-DD'), startOfMonth.format('YYYY-MM-DD'), endOfMonth.format('YYYY-MM-DD'), weeksInMonth);
    //
    //     if (!events) {
    //         return
    //     }
    //
    //     let monthEvents = events.filter((event) => {
    //         let start = moment(event.start, dateFormat);
    //         let stop = moment(event.stop, dateFormat);
    //
    //         const inMonth = (start.isSame(date, 'month') || stop.isSame(date, 'month'));
    //
    //         if (inMonth) {
    //             return event;
    //         }
    //     });
    //
    //     console.log('events', weeksInMonth, monthEvents);
    //
    //     //1) find all events that sered over multiple weeks
    //     //2) itterate over all rows and see if outher events will fit in the gape
    //     //3) max four rows of events.
    //
    // }

    render() {
        return <div>
            {this.renderWeeks()}
        </div>;
    }
}
