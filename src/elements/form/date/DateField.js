import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classNames from 'classnames';

import {Icon, IconType} from 'elements/icon';
import {DropdownField} from 'elements/form/dropdown';
import Month from './Month';

import dropdownStyle from '../dropdown/DropdownField.scss';
import style from './DateField.scss';

const ENTER = 'Enter';

/**
 * A date picker component which shows a Date Picker dropdown, or allows manual eatery of the date.
 *
 * The value will be transformed to the displayFormat when rendered in the ui, but the actual value used by the
 * component will remain in the valueFormat. Use the 'displayFormat' & 'valueFormat' props to adjust the format.
 *
 * Note: If an value is provided in a format that doesn't match the 'valueFormat', the component will attempt to
 * transform the date using recognized RFC2822 or ISO formats.
 */
export default class DateField extends DropdownField {

    static propTypes = {
        ...DropdownField.propTypes,
        /**
         * A Moment.js format string use as the display date format.
         */
        displayFormat: PropTypes.string,

        /**
         *  A Moment.js format string  use as the display date format.
         */
        valueFormat: PropTypes.string
    };

    static defaultProps = {
        ...DropdownField.defaultProps,
        displayFormat: 'YYYY-MM-DD',
        valueFormat: 'YYYY-MM-DD',
    };

    constructor(props) {
        super(props);

        this.onSelect = this.onSelect.bind(this);
        this.increaseMonth = this.increaseMonth.bind(this);
        this.decreaseMonth = this.decreaseMonth.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.onInputBlur = this.onInputBlur.bind(this);
        this.onInputKeyPress = this.onInputKeyPress.bind(this);

        const today = this.localizeMoment(moment());
        const selected = (props.value) ? this.getMoment(props.value) : null;
        const date = (props.value) ? selected : today;

        Object.assign(this.state, super.state, {
            today: today,
            selected: selected,
            date: date,
            inputValue: null
        });

    }

    componentWillReceiveProps(nextProps) {
        this.setState(
            {
                selected: (nextProps.value) ? this.getMoment(nextProps.value) : null,
            }
        );
    }

    /**
     *
     * @param date
     * @returns {Duration|string|Moment}
     */
    localizeMoment(date) {
        return date.clone()
        .locale(this.props.locale || moment.locale());
    }

    /**
     * Transform the value into a display string as specified by the 'displayFormat';
     *
     * @param date the date to transform.
     * @param toMoment should we try turn this into a moment object
     */
    getDateString(date, toMoment = false) {
        const {displayFormat, valueFormat} = this.props;

        if (toMoment) {
            date = this.getMoment(date, valueFormat);
        }

        return date.format(displayFormat);
    }

    /**
     * Transform a date object back into a string in defined by the 'valueFormat'
     * @param date
     * @param toMoment should we try turn this into a moment object
     */
    getDateValue(date, toMoment = false) {
        const {displayFormat, valueFormat} = this.props;

        if (toMoment) {
            date = this.getMoment(date, displayFormat);
        }

        return date.format(valueFormat);
    }

    getMoment(date) {
        const {valueFormat} = this.props;
        return moment(date, valueFormat);
    }

    /**
     * increment the current display month by one
     */
    increaseMonth() {
        const {date} = this.state;

        this.setState(
            {
                date: date.clone()
                .add(1, 'month')
            }
        );
    }

    /**
     * decrement the current display month by one.
     */
    decreaseMonth() {
        const {date} = this.state;

        this.setState(
            {
                date: date.clone()
                .subtract(1, 'month')
            }
        );
    }

    onSelect(day, event) {
        const {onChange, name} = this.props;

        event.preventDefault();

        const value = this.getDateValue(day);
        onChange(name, value, true);

        this.handleClose();
    }

    onInputBlur(event) {
        const {displayFormat} = this.props;

        const target = event.target;
        const value = target.value;
        const day = this.getMoment(value, displayFormat, 'en', true);

        if (day.isValid()) {
            this.onSelect(day, event);
            this.setState(
                {
                    selected: day,
                    inputValue: null,
                    date: day
                }
            );
        }// Todo: set any error message.

        this.handleClose();
    }

    onInputChange(event) {
        const {displayFormat} = this.props;

        const target = event.target;
        const value = target.value;
        const today = this.localizeMoment(moment());
        const day = this.getMoment(value);

        this.setState(
            {
                selected: (day.isValid())? day : null,
                inputValue: value,
                date: (day.isValid())? day : today
            }
        );

    }

    onInputKeyPress(event) {
        const value = event.target.value;
        const key = event.key;

        switch (key) {
            case ENTER:
                this.onInputBlur(event);
                break;

            default:

        }
    }

    renderInputValue() {
        const {input, value, typeahead, name, placeholder, testId} = this.props;
        const {inputValue} = this.state;

        const valueString = (value) ? this.getDateString(value, true) : '';
        const inputString = (inputValue) ? inputValue : valueString;

        if (typeahead) {
            return (
                <input
                    {...input}
                    data-test-id={"input-" + testId}
                    name={name}
                    onBlur={this.onInputBlur}
                    onFocus={this.handleOpen}
                    value={inputString}
                    onKeyUp={this.onInputKeyPress}
                    onChange={this.onInputChange}
                    placeholder={placeholder}
                    type="text"
                    autoComplete="off"
                    className={dropdownStyle.input}/>
            );
        }

        // Should we use a placeholder text or just a space
        const placeholderText = (placeholder)? <span className={style.placeholder}>{placeholder}</span> : '\u00A0';
        
        return (
            <div data-test-id={"input-" + testId} className={dropdownStyle.input} tabIndex="1" onClick={this.handleToggle}>
                { (value) ? this.getDateString(value, true) : placeholderText }
            </div>
        );
    }

    renderTrigger() {
        const {testId} = this.props;

        const classes = classNames(style.trigger, dropdownStyle.trigger);
        return <div data-test-id={"trigger-" + testId} className={classes} onClick={this.handleToggle}>
            <Icon type={IconType.calendar} />
        </div>;
    }

    renderMonths() {
        const {date} = this.state;
        const monthDate = date.clone();

        return this.renderCurrentMonth(monthDate);
    }

    renderCurrentMonth(date = this.state.date) {
        const {today, selected} = this.state;

        return (<Month onSelect={this.onSelect} date={date} today={today} selected={selected}/>)
    }

    renderPanel() {
        const {date} = this.state;

        const year = date.format('YYYY');
        const month = date.format('MMMM');

        return <div className={style.panel}>
            <div className={style.header}>
                <div className={style.navigation}>
                    <Icon onClick={this.decreaseMonth} className={style.navigationBack} type={IconType.angleLeft} />
                    <Icon onClick={this.increaseMonth} className={style.navigationForward} type={IconType.angleRight} />
                </div>
                <div className={style.year}>{year}</div>
                <div className={style.month}>{month}</div>
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
