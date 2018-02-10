import React, {Component} from "react";
import PropTypes from 'prop-types';
import classNames from 'classnames';

import style from './Alert.scss';

export default class Alert extends Component {

    static propTypes = {
        title: PropTypes.string
    };

    static defaultProps = {
        title: '',
    };

    static modifier = {
        success: style.alertSuccess,
        warning: style.alertWarning,
        error: style.alertError,
    };

    constructor(props) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
    }

    handleClose() {
        let {onClose} = this.props;

        if (typeof onClose === "function") {
            onClose();
        }
    }

    render() {

        const {title, children, modifier, className, testId}  = this.props;
        const classes = classNames(style.container, modifier, className);

        return (
            <aside data-test-id={testId} className={classes}>
                <div data-test-id={testId + '-close'} onClick={this.handleClose} className={style.close} />
                { title ? <h3 className={style.title}>{ title }</h3> : null }
                { children ? <div className={style.body}>{ children }</div> : null }
            </aside>
        );
    }
}
