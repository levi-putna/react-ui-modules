import React, {Component} from 'react';
import classNames from 'classnames';
import {Field} from 'elements/form/field';

import style from './TextField.scss';

/**
 * Field is the base class for all form fields. It provides a lot of shared functionality to all field subclasses
 * (for example labels, simple validation, clearing and tab index management), but is rarely used directly.
 * Instead, it is much more common to use one of the field subclasses.
 *
 * If you wish to create your own Field subclasses you can extend this class, though it is sometimes more useful
 * to extend one of the other base subclasses as they provides additional base functionality.
 */
export default class TextField extends Field {

    renderInput() {
        const {input, name, value, placeholder, inputClassName} = this.props;
        const classes = classNames(style.input, inputClassName);

        return (
            <textarea
                {...input}
                value={ (value) ? value : '' }
                name={name}
                className={classes}
                placeholder={placeholder}
                onBlur={this.onBlur}
                onFocus={this.onFocus}
                onChange={(event) => {
                    const target = event.target;
                    const value = target.value;

                    this.onChange(value);
                }}/>
        );
    }
}
