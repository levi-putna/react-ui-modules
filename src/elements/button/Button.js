import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {Component} from 'elements/base';
import {Loading} from 'elements/indicator';

import style from './Button.scss';

/**
 * This component provides a push button with many presentation options.
 * There are various styles of Button you can create
 */
export default class Button extends Component {

    /**
     * Available size options for th buttons.
     *
     * @type {{tiny: string, small: string, large: string, huge: string}}
     */
    static size = {
        tiny: style.buttonTiny,
        small: style.buttonSmall,
        large: style.buttonLarge,
        huge: style.buttonHuge
    };

    /**
     * Button the different style options that can be applied to a button
     * @type {{primary: string, secondary: string, dark: string, light: string, success: string, warning: string, alert: string, plain: string, transparent: string}}
     */
    static modifier = {
        primary: style.buttonPrimary,
        secondary: style.buttonSecondary,
        dark: style.buttonDark,
        light: style.buttonLight,
        success: style.buttonSuccess,
        warning: style.buttonWarning,
        alert: style.buttonAlert,
        plain: style.buttonPlain
    };

    static propTypes = {
        ...Component.propTypes,
        loading: PropTypes.bool,
        block: PropTypes.bool,
        className: PropTypes.string,
        disabled: PropTypes.bool,
        size: PropTypes.string,
        type: PropTypes.string,
        children: PropTypes.node.isRequired,
        onClick: PropTypes.func.isRequired,
        modifier: PropTypes.string,
    };

    static defaultProps = {
        ...Component.defaultProps,
        loading: false,
        size: null,
        modifier: null,
        block: false,
        disabled: false,
        className: null
    };

    render() {
        const {className, loading, onClick, disabled, block, size, modifier, testId} = this.props;
        let {children} = this.props;

        const classes = classNames(style.button, size, modifier, {
            [style.buttonBlock]: block,
            [style.buttonLoading]: loading,
        }, className);

        return (
            <button data-test-id={testId} disabled={(disabled || loading)} className={classes} onClick={onClick}
                    type="submit">
                {(loading) ? 'Please wait...' : children}
            </button>
        )
    }
}
