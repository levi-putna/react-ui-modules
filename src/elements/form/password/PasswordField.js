import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import zxcvbn from 'zxcvbn';

import {Field} from 'elements/form/field';

import style from './PasswordField.scss';

/**
 *
 */
export default class PasswordField extends Field {

    static propTypes = {
        ...Field.propTypes,
        warning: PropTypes.string
    };

    static defaultProps = {
        ...Field.defaultProps,
        type: 'password',
        error: null,
    };

    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);

        this.state = {
            warning: null,
            strength: null
        };

    }

    /**
     * Score the password and give a human readable strength level.
     * @param {*} score 
     */
    getScore(score){
        switch (score) {
            case 1:
                return 'weak';
                break;
            case 2:
                return 'so-so';
                break;
            case 3:
                return 'good';
                break;
            case 4:
                return 'great';
                break;
            default:
                return null;
                break;
        }
    }

    onChange(value) {

        super.onChange(value);

        let review = zxcvbn(value);
        let strength = this.getScore(review.score);

        this.setState({strength: strength, warning: review.feedback.warning});
    }

    renderInput() {
        const {testId} = this.props;
        const {strength, warning} = this.state;
        const input = super.renderInput();

        const classes = classNames(style.meter, {
            [style.scaleGreat]:(strength === 'great'),
            [style.scaleGood]: (strength === 'good'),
            [style.scaleSo]: (strength === 'so-so'),
            [style.scaleWeak]: (strength === 'weak'),
        });

        return (
            <div>
                {input}
                <div className={style.container}>
                    <div className={classes} />
                    <div className={style.part} style={{left: '25%'}} />
                    <div className={style.part} style={{left: '50%'}} />
                    <div className={style.part} style={{left: '75%'}} />
                    <div data-test-id={'strength-' + testId} className={style.label}>{strength}</div>
                    {(warning && <small className={style.warning}>{warning}</small>)}
                </div>
            </div>
        );
    }

}
