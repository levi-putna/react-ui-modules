import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import {Icon, IconType} from 'elements/icon';
import {Component} from 'elements/base';
import Month from './Month';

import style from './Calendar.scss';

export default class Calendar extends Component {

    static propTypes = {
        ...Calendar.propTypes,
        dateFormat: PropTypes.string,
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

    static defaultProps = {
        ...Calendar.defaultProps,
        dateFormat: 'YYYY-MM-DD',
    };

    constructor(props) {
        super(props);

        this.increaseMonth = this.increaseMonth.bind(this);
        this.decreaseMonth = this.decreaseMonth.bind(this);

        const today = this.localizeMoment(moment());
        const date = (props.value) ? this.stringToDate(props.value) : today;

        Object.assign(this.state, super.state, {
            today,
            date,
        });

    }

    increaseMonth() {

    }

    decreaseMonth() {

    }

    /**
     * localize into current local
     * @param date
     * @returns {Duration|string|Moment}
     */
    localizeMoment(date) {
        return date.clone()
        .locale(this.props.locale || moment.locale());
    }

    stringToDate(date) {
        const {dateFormat} = this.props;
        return moment(date, dateFormat);
    }

    renderMonths() {
        const {date} = this.state;
        const monthDate = date.clone();

        return this.renderCurrentMonth(monthDate);
    }

    renderCurrentMonth(date = this.state.date) {
        const {today} = this.state;
        const {dateFormat, events, onEventClick} = this.props;

        return (<Month date={date} today={today} dateFormat={dateFormat} events={events} onEventClick={onEventClick}/>)
    }


    render() {
        const {date} = this.state;

        const year = date.format('YYYY');
        const month = date.format('MMMM');

        return <div className={style.container}>
            <div className={style.header}>
                <div className={style.navigation}>
                    <Icon onClick={this.decreaseMonth} className={style.navigationBack} type={IconType.angleLeft}/>
                    <Icon onClick={this.increaseMonth} className={style.navigationForward} type={IconType.angleRight}/>
                </div>
                <div className={style.headerYear}>{year}</div>
                <div className={style.headerMonth}>{month}</div>
            </div>
            <div className={style.calendar}>
                <ul className={style.weekdays}>
                    <li className={style.weekdaysDay}>Sun</li>
                    <li className={style.weekdaysDay}>Mon</li>
                    <li className={style.weekdaysDay}>Tue</li>
                    <li className={style.weekdaysDay}>Wed</li>
                    <li className={style.weekdaysDay}>Thu</li>
                    <li className={style.weekdaysDay}>Fri</li>
                    <li className={style.weekdaysDay}>Sat</li>
                </ul>
                <div className={style.calendarDays}>
                    {this.renderMonths()}
                </div>
            </div>
        </div>
    }

}
