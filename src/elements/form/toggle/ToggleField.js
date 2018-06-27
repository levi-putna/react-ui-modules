import React from 'react';
import classNames from 'classnames';
import {Field, FieldSet} from 'elements/form/field';
import style from './ToggleField.scss';

/**
 * Specialized SelectorField which only supports two values true or false.
 *
 * Note: A empty or null value will display as false.
 */
export default class ToggleField extends Field {

    /**
     * The toggle options presented to the user.
     * Note: default to ON_OFF
     *
     * @type {{ON_OFF: string, TRUE_FALSE: string, YES_NO: string, GREEN_RED: string}}
     */
    static TYPE = {
        ON_OFF: 'on_off',
        TRUE_FALSE: 'true_false',
        YES_NO: 'yes_no',
        GREEN_RED: 'green_red',
    }

    renderInput() {
        const {input, name, value, type, disabled, testId} = this.props;

        const classes = classNames(style.toggle, {
            [style.toggleDisabled]: disabled,
            [style.toggleChecked]: value
        });

        const sliderClasses = classNames(style.slider, {
            [style.sliderChecked]: value,
            [style.trueFalse]: (type == ToggleField.TYPE.TRUE_FALSE),
            [style.yesNo]: (type == ToggleField.TYPE.YES_NO),
            [style.greenRed]: (type == ToggleField.TYPE.GREEN_RED)
        });

        return (
            <label className={classes}>
                <input {...input}
                       checked={!!(value)}
                       data-test-id={'input-' + testId} 
                       name={name}
                       type="checkbox"
                       onChange={(event) => {
                           const target = event.target;
                           const value = target.checked;

                           this.onChange(value);
                       }}/>
                <span className={sliderClasses}/>
            </label>
        );
    }
}