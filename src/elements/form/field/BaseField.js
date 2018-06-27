import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {Component} from 'elements/base';
import {FieldSet} from 'elements/form/field';

import style from './Field.scss';

/**
 * Field is the base class for all form fields. It provides a lot of shared functionality to all field subclasses
 * (for example labels, simple validation, clearing and tab index management), but is rarely used directly.
 * Instead, it is much more common to use one of the field subclasses.
 *
 * If you wish to create your own Field subclasses you can extend this class, though it is sometimes more useful
 * to extend one of the other base subclasses as they provides additional base functionality.
 */
export default class BaseField extends Component {

    static propTypes = {
        name: PropTypes.string.isRequired,
        disabled: PropTypes.bool,
        className: PropTypes.string,
        hint: PropTypes.string,
        label: PropTypes.string,
        placeholder: PropTypes.string,
        type: PropTypes.string,
    };

    static defaultProps = {
        ...Component.defaultProps,
        label: null,
        disabled: false,
        placeholder: '',
        type: 'text'
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
     * Make a change to the components value if the field is not disabled.
     * @param value
     */
    onChange(value) {
        const {name, onChange, disabled} = this.props;

        if (!disabled) {
            onChange(name, value);
        }

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
     * @returns {XML}
     */
    renderLabel() {
        const {label, name, error} = this.props;
        const {focus} = this.state;

        if (!label) {
            return;
        }

        const classes = classNames(style.label, {
            [style.labelFocus]: focus,
            [style.labelError]: error
        });

        return <label className={classes} htmlFor={name}>{label}</label>;
    }

    /**
     * Render the components input field. The part of the component that is used to set and display the
     * components value
     * @returns {XML}
     */
    renderInput() {
        const {input, name, value, placeholder, type, disabled, autoFocus, testId} = this.props;

        return (
            <input
                   data-test-id={'input-' + testId}
                   name={name}
                   className={style.input}
                   autoFocus={autoFocus}
                   value={(value) ? value : ''}
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
        );
    }

    /**
     * Render component hint message
     * @returns {*}
     */
    renderHint() {
        const {hint, testId} = this.props;
        return (hint) ? <small data-test-id={"hint-" + testId} className={style.hint}>{hint}</small> : '';
    }

    /**
     * Render the components error states.
     * @returns {XML}
     */
    renderError() {
        const {error, testId} = this.props;
        return <span data-test-id={"error-" + testId} className={style.error}>{error}</span>;
    }

    /**
     * Render the component.
     *
     * Note: it is encouraged that components extending this Field component avoid overriding the render method
     * if possible. Instead the extending component should focus on overriding the other render methods like
     * `renderInput()` and `renderLabel()`.
     *
     * If you do end up overriding the render method, you will need to make sure you set the root dom node by
     * setting `ref={this.setNode}` on the root dom node element.
     *
     * @returns {XML}
     */
    render() {

        const {className, testId} = this.props;

        const classes = classNames(style.wrapper, className);

        return (
            <div data-test-id={'input-' + testId} className={style.wrapper} ref={this.setNode}>
                {this.renderInput()}
            </div>
        );
    }
}
