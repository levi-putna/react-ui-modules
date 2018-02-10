import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import moment from 'moment';

import Day from './Day';
import Event from './Event';

import style from './Calendar.scss';

export default class Week extends Component {

    static propTypes = {
        today: PropTypes.object.isRequired,
        date: PropTypes.object.isRequired,
        week: PropTypes.object.isRequired,
    };

    constructor(props){
        super(props);
    }

    renderDays() {
        const {today, date, week} = this.props;
        const startOfWeek = week.clone();
        const days = [];

        return days.concat([0, 1, 2, 3, 4, 5, 6].map((offset) => {
            const day = startOfWeek.clone()
            .add(offset, 'days');
            const isToday = (day.isSame(today, 'day'));
            const isThisMonth = (day.isSame(date, 'month'));
            const key = "weekday-" + offset;

            return <Day key={key} day={day} isToday={isToday} isThisMonth={isThisMonth}/>
        }));
    }

    buildEvent(label, color = null, days = 1, offset = 0, isStart = true, isEnd = true) {
        const unitSize = (100 / 7);

        let width = (unitSize * days) + "%";
        let marginLeft = (unitSize * offset) + "%";

        const inlineStyle = {
            marginLeft,
            width,
            backgroundColor: color
        };

        const classes = classNames(style.event, {
            [style.eventStart]: isStart,
            [style.eventEnd]: isEnd
        });


        return (
            <div style={inlineStyle} className={classes}>
                <div className={style.eventLabel}>{(label) ? label : '\u00A0'}</div>
            </div>
        );
    }

    /**
     * Render the events for the week.
     *
     * TODO, this needs a major rework, it is very inefficient and some of the functionality should be moved back to the
     * Calendar object so that it only needs to be passed once.
     *
     * @returns {XML}
     */
    renderEvents() {
        const {dateFormat, events, week, onEventClick} = this.props;
        let rows = [
            {
                offset: 0,
                events: []
            }
        ];
        let other = [];

        if (!events) {
            return;
        }

        // Process the events
        let eventsObject = events.map((event) => {
            let startDate = moment(event.start, dateFormat);
            let stopDate = moment(event.stop, dateFormat);

            const length = stopDate.diff(startDate, 'day') + 1;

            return {
                ...event,
                startDate,
                stopDate,
                length
            }
        });

        // Sort by start date
        let sortEvents = eventsObject.sort((a, b) => {
            return a.startDate.isAfter(b.startDate);
        });

        const startOfWeek = week.clone()
        .startOf('week');
        const endOfWeek = week.clone()
        .endOf('week');

        sortEvents.map((event) => {

            const isStart = event.startDate.isSame(week, 'week');
            const isEnd = event.stopDate.isSame(week, 'week');
            const isBetween = week.isBetween(event.startDate, event.stopDate);

            // The total number of days this event runs.
            const length = (isStart) ? event.length : event.stopDate.diff(startOfWeek, 'day') + 1;

            // The events offset based on the first day of the week.
            const offset = (!isStart) ? 0 : event.startDate.diff(startOfWeek, 'day');

            // The number of days this event should display in the week.
            const days = ((length + offset) > 7) ? 7 - offset : length;

            if (isStart || isEnd || isBetween) {

                let inRow = rows.some((row) => {
                    // The new events offset based on the last event in the row.
                    const diff = (offset - row.offset > 0) ? offset - row.offset : 0;

                    if (row.offset <= offset && (diff + days) <= 7) {
                        row.offset = offset + days;
                        row.events.push(<Event event={event} days={days} offset={diff} isStart={isStart} isEnd={isEnd} onClick={onEventClick}/> );
                        inRow = true;
                        return true;
                    }
                });

                // If we cant fit this event in an existing row, add a new row.
                if (!inRow) {
                    rows.push(
                        {
                            offset: offset + days,
                            events: [
                                <Event event={event} days={days} offset={offset} isStart={isStart} isEnd={isEnd} onClick={onEventClick}/>
                            ]
                        }
                    );
                }

            }
        });

        return rows.map((row) => {
            return (
                <div className={style.eventRow}>
                    {row.events}
                </div>
            );
        });
    }

    render() {
        return (
            <div className={style.week}>
                <div className={style.weekDays}>
                    {this.renderDays()}
                </div>
                <div className={style.events}>
                    {this.renderEvents()}
                </div>
            </div>
        );
    }
}
