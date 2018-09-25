import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import moment from 'moment';
import InputMask from 'inputmask-core'

import {Field} from 'elements/form/field';

import style from './TimeField.scss';

/**
 * Field is the base class for all form fields. It provides a lot of shared functionality to all field subclasses
 * (for example labels, simple validation, clearing and tab index management), but is rarely used directly.
 * Instead, it is much more common to use one of the field subclasses.
 *
 * If you wish to create your own Field subclasses you can extend this class, though it is sometimes more useful
 * to extend one of the other base subclasses as they provides additional base functionality.
 */
export default class TimeField extends Field {

    static propTypes = {
        ...Field.propTypes,
        /**
         * A Moment.js format string use as the display date format.
         */
        displayFormat: PropTypes.string,

        /**
         *  A Moment.js format string  use as the display date format.
         */
        valueFormat: PropTypes.string,

        /**
         * Strict mode requires the input to exactly match the specified format, including separators. 
         * 
         * Suppose that an API starts by sending dates in 'YYYY-MM-DD' format, and then later changes to 'MM/DD/YYYY' format. 
         * Setting strict to false will try and fix this issue automatically. Note: setting strict may introduce some additional issues
         * as the formatter makes assumptions about the input sting.
         */
        strict: PropTypes.bool
    };

    constructor(props) {
        super(props);

        //this.onInputKeyPress = this.onInputKeyPress.bind(this);

        // const today = this.localizeMoment(moment());
        // const selected = (props.value) ? this.getMoment(props.value) : null;
        // const date = (props.value) ? selected : today;

        this.mask = new InputMask({pattern: '11:11 aa'});

        // Object.assign(this.state, super.state, {
        //     today: today,
        //     selected: selected,
        //     date: date,
        //     inputValue: null
        // });

    }

    componentWillMount() {
        // let options = {
        //   pattern: this.props.mask,
        //   value: this.props.value,
        //   formatCharacters: this.props.formatCharacters
        // }
        // if (this.props.placeholderChar) {
        //   options.placeholderChar = this.props.placeholderChar
        // }
        this.mask = new InputMask({pattern: '11:11 aa'})
    }

    static defaultProps = {
        ...Field.defaultProps,
        displayFormat: 'hh:mm A',
        valueFormat: 'hh:mm A',
        strict: true
    };

    getSelection (el) {

        console.log('el', el);
        let start, end

        if (el.selectionStart !== undefined) {
          start = el.selectionStart
          end = el.selectionEnd
        } else {

          try {
            el.focus()
            let rangeEl = el.createTextRange()
            let clone = rangeEl.duplicate()
      
            rangeEl.moveToBookmark(document.selection.createRange().getBookmark())
            clone.setEndPoint('EndToStart', rangeEl)
      
            start = clone.text.length
            end = start + rangeEl.text.length
          }

          catch (e) { /* not focused or not visible */ }
        }
      
        return { start, end }
    }

    generateTime() {
        var times = [];
        Array(24).join(',').split(',').forEach(function(_, index) {
          var hour = index;
          if (hour < 10) {
            hour = '0' + hour;
          }
          times.push({
            label: moment(hour + ':00', 'HH:mm').format('hh:mm a'),
            value: moment(hour + ':00', 'HH:mm').format('hhmma')
          });
          times.push({
            label: moment(hour + ':30', 'HH:mm').format('hh:mm a'),
            value: moment(hour + ':30', 'HH:mm').format('hhmma')
          });
        });
      
        return times;
    }

    /**
     * returns a formatted string to be used as the display value of the field. Extending classes may want to override this method to provided formatted results.
     * 
     * Note: this formatting will have no effect on the actual value of the field.
     * @returns {String} A formatted string
     */
    getDisplayString() {
        const {value, displayFormat, valueFormat, strict} = this.props;

        //return this.generateTime();

        // const date = moment(value, valueFormat, strict);

        // console.log('date.isValid()', date.isValid());

        // if(date.isValid()){
        //     var formatted = date.format(displayFormat);
        //     return (formatted) ? formatted : '';
        // }

        // return value;

        console.log('value', value);

        if(!value){
            return this.mask.emptyValue;
        }

        this.mask.paste(value)
        let maskedValue = this.mask.getValue();
        //this.setSelection(this.input, this.mask.selection)

        console.log('maskedValue', maskedValue);

        return maskedValue;
    }

    onKeyPress(e) {
        // console.log('onKeyPress', JSON.stringify(getSelection(this.input)), e.key, e.target.value)
    
        // Ignore modified key presses
        // Ignore enter key to allow form submission
        if (e.metaKey || e.altKey || e.ctrlKey || e.key === 'Enter') { return }
    
        e.preventDefault()
        //this.setSelection(this.input, this.mask.selection)
        this.updateMaskSelection(e)

        // if (this.mask.input((e.key || e.data))) {
        //   e.target.value = this.mask.getValue()
        //   this._updateInputSelection()
        //   if (this.props.onChange) {
        //     this.props.onChange(e)
        //   }
        // }
      }

      updateMaskSelection(e) {
        this.mask.selection = this.getSelection(e)
      }

    /**
     * Transform the value into a display string as specified by the 'displayFormat';
     *
     * @param date the date to transform.
     * @param toMoment should we try turn this into a moment object
     */
    getTimeString(date, toMoment = false) {
        const {displayFormat, valueFormat} = this.props;

        if (toMoment) {
            date = this.getMoment(date, valueFormat);
        }

        return date.format(displayFormat);
    }

    setSelection(el, selection) {
        try {
          if (el.selectionStart !== undefined) {
            el.focus()
            el.setSelectionRange(selection.start, selection.end)
          }
          else {
            el.focus()
            let rangeEl = el.createTextRange()
            rangeEl.collapse(true)
            rangeEl.moveStart('character', selection.start)
            rangeEl.moveEnd('character', selection.end - selection.start)
            rangeEl.select()
          }
        }
        catch (e) { console.log('Error', e); }
    }      

    /**
     * Transform a date object back into a string as defined by the 'valueFormat'
     * 
     * @param date
     * @param toMoment should we try turn this into a moment object
     */
    getTimeValue(date, toMoment = false) {
        const {displayFormat, valueFormat} = this.props;

        if (toMoment) {
            date = this.getMoment(date, displayFormat);
        }

        return date.format(valueFormat);
    }

    renderInputValue() {
        const {input, value, name, placeholder, testId} = this.props;
        const {inputValue} = this.state;
        let ref = r => { this.input = r }

        const valueString = (value) ? this.getDateString(value, true) : '';
        const inputString = (inputValue) ? inputValue : valueString;

            return (
                <input
                    {...input}
                    ref
                    data-test-id={"input-" + testId}
                    name={name}
                    onBlur={this.onInputBlur}
                    onFocus={this.handleOpen}
                    value={this.getDisplayString()}
                    onKeyDown={this.onKeyPress}
                    onKeyUp={this.onInputKeyPress}
                    onChange={this.onInputChange}
                    placeholder={placeholder}
                    type="text"
                    autoComplete="off"
                    className={dropdownStyle.input}/>
            );

    }
}
