import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {Component} from 'elements/base';
import {FieldSet} from 'elements/form/field';
import Format from 'elements/form/format/Format';

import style from './Field.scss';

/**
 * Field is the base class for all form fields. It provides a lot of shared functionality to all field subclasses
 * (for example labels, simple validation, clearing and tab index management), but is rarely used directly.
 * Instead, it is much more common to use one of the field subclasses.
 *
 * If you wish to create your own Field subclasses you can extend this class, though it is sometimes more useful
 * to extend one of the other base subclasses as they provides additional base functionality.
 */
export default class Field extends Component {

    /**
 * Enum for tri-state values.
 * @readonly
 * @enum {number}
 */

    static propTypes = {

        /**
         * The name used to represent this field. When used with the Form component the name will be used to sore the fields value, errors, touched and other attributes.
         * @member {String} 
         */
        name: PropTypes.string.isRequired,

        /**
         * True to disable the field for input.
         * @member {Bool} 
         */
        disabled: PropTypes.bool,

         /**
          * An additional CSS class to apply to the main element of this component. 
          * @member {Object} 
          */
        className: PropTypes.string,

         /**
          * An optional hing to display below the field input 
          * @member {String} 
          */
        hint: PropTypes.string,

        /**
         * The label of this field
         * @member {String} 
         */
        label: PropTypes.string,

        /**
         * The short hint is displayed in the Field before the user enters a value. Describes the expected value of an input field.
         * @member {String} 
         */
        placeholder: PropTypes.string,

        /**
         * The HTML `<input>` element type to display
         * @member {String} 
         */
        type: PropTypes.string,

        /**
         * Displayed before the field
         * @member {String} 
         */
        prepend: PropTypes.string,

        /**
         * Displayed after the field.
         * @member {String} 
         */
        append: PropTypes.string,


        /**
         * A function that takes the input value as a parameter, and returns a formatted string.
         * @member {Function} 
         */
        format: PropTypes.object,


        /**
         * A unique id used to target this field during testing.
         * @member {String} 
         */
        testId: PropTypes.string
    };

    static defaultProps = {
        ...Component.defaultProps,
        label: null,
        disabled: false,
        placeholder: '',
        type: 'text',
        prepend: null,
        append: null,
        format: null
    };

    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.setNode = this.setNode.bind(this);

        this.state = {
            focus: false
        };

    }

    /**
     * Fires when the Fields value changes.
     * @event
     * @param value the new Field value
     */
    onChange(value) {
        const {name, onChange, disabled} = this.props;

        if (!disabled) {
            onChange(name, value);
        }

    }

    /**
     * returns a formatted string to be used as the display value of the field. Extending classes may want to override this method to provided formatted results.
     * 
     * Note: this formatting will have no effect on the actual value of the field.
     * @returns {String} A formatted string
     */
    getDisplayString() {
        const {value, format} = this.props;

        if (!format || typeof format.formatString !== "function") {
            return (value) ? value : '';
        }

        const formatValue = format.formatString(value);

        return (formatValue) ? formatValue : '';
    }

    /**
     * Remove focus from this component
     *
     * Note: this wont remove the dom level focus, only the internal component focus. Dom focus will need to
     * be managed outside this component.
     *
     */
    onBlur() {
        this.setState(
            {
                focus: false
            }
        )
    }

    /**
     * Set focus on this component.
     *
     * Note: this wont set the dom level focus, only the internal component focus. Dom focus will need to
     * be managed outside this component.
     */
    onFocus() {
        this.setState(
            {
                focus: true
            }
        )
    }

    /**
     * Render the component label
     * @returns {JSX}
     */
    renderLabel() {
        const {label, name, error, testId} = this.props;
        const {focus} = this.state;

        if (!label) {
            return;
        }

        const classes = classNames(style.label, {
            [style.labelFocus]: focus,
            [style.labelError]: error
        });

        return <label data-test-id={"label-" + testId} className={classes} htmlFor={name}>{label}</label>;
    }

    /**
     * Render the components input field. The part of the component that is used to set and display the
     * components value. Extending classes may wish to override this to create new Field functionality.
     *  
     * @returns {JSX}
     */
    renderInput() {
        const {error, input, name, value, placeholder, type, disabled, autoFocus, inputClassName, testId, append, prepend, format} = this.props;
        const {focus} = this.state;

        const classes = classNames(style.input, inputClassName, {
            [style.inputFocus]: focus,
            [style.inputDisabled]: disabled,
        });

        return (
            <div className={classes}>
                {(prepend) ? <div className={style.inputPrepend}>{prepend}</div> : ''}
                <input
                    data-test-id={"input-" + testId}
                    name={name}
                    className={style.inputField}
                    autoFocus={autoFocus}
                    value={this.getDisplayString()}
                    placeholder={placeholder}
                    type={type}
                    onBlur={this.onBlur}
                    onFocus={this.onFocus}
                    disabled={disabled}
                    onChange={(event) => {
                        const target = event.target;
                        const value = target.value;

                        this.onChange(value);
                    }}
                />
                {(append) ? <div className={style.inputAppend}>{append}</div> : ''}
            </div>
        );
    }

    /**
     * Render component hint message.
     * @returns {JSX}
     */
    renderHint() {
        const {hint, testId} = this.props;
        return (hint) ? <small data-test-id={"hint-" + testId} className={style.hint}>{hint}</small> : '';
    }

    /**
     * Render the components error message.
     * @returns {JSX}
     */
    renderError() {
        const {error, testId} = this.props;
        return <span data-test-id={"error-" + testId} className={style.error}>{error}</span>;
    }

    /**
     * Render the component.
     *
     * Note: it is encouraged that components extending this component avoid overriding the render method
     * if possible. Instead the extending component should focus on overriding the other render methods like
     * `renderInput()` and `renderLabel()`.
     *
     * If you do end up overriding the render method, you will need to make sure you identify the root dom node by
     * setting `ref={this.setNode}` on the root dom node element.
     *
     * @returns {JSX}
     */
    render() {

        const {error, className, testId} = this.props;

        const classes = classNames(style.wrapper, className);

        return (
            <div className={classes} ref={this.setNode} data-test-id={testId}>
                {this.renderLabel()}
                {this.renderInput()}
                {(error && this.renderError())}
                {(!error && this.renderHint())}
            </div>
        );
    }
}
