import React, {Component} from "react";
import PropTypes from 'prop-types';

import style from './Alert.scss';

export default class Alert extends Component {

    static propTypes = {
        title: PropTypes.string
    };

    static defaultProps = {
        title: '',
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

        const {title, active, children}  = this.props;

        if (!active) {
            return null;
        }

        return (
            <aside className={style.alert}>
                <div onClick={this.handleClose} className={style.close}></div>
                { title ? <h3 className={style.title}>{ title }</h3> : null }
                { children ? <div className={style.body}>{ children }</div> : null }
            </aside>
        );
    }
}
