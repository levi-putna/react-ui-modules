import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {Icon} from 'elements/icon'
import style from './SelectField.scss';

export default class Option extends Component {

    static propTypes = {
        value: PropTypes.oneOfType(
            [
                PropTypes.string,
                PropTypes.number
            ]
        ),
        label: PropTypes.oneOfType(
            [
                PropTypes.string,
                PropTypes.number
            ]
        ).isRequired,
        onClick: PropTypes.func.isRequired,
        icon: PropTypes.shape(
            {
                viewBox: PropTypes.string.isRequired,
                path: PropTypes.string.isRequired,
            }
        ),
        selected: PropTypes.bool,
        disabled: PropTypes.bool
    };

    static defaultProps = {
        selected: false,
        disabled: false,
        icon: null
    };

    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        const {disabled, onClick} = this.props;

        if (!disabled) {
            const {value} = this.props;
            onClick(value, event);
        }
    }

    render() {
        const {value, label, icon, selected} = this.props;

        const classes = classNames(style.option, {
            [style.optionSelected]: selected
        });

        const iconClasses = classNames(style.icon, {
            [style.iconSelected]: selected
        });

        return (
            <div key={value} className={classes} id={value} onClick={this.handleClick} role="button" title={label}>
                {(icon) ? <Icon className={iconClasses} type={icon}/> : ''}
                {label}
            </div>
        );
    }
}
