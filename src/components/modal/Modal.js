import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {Component} from 'elements/base';
import ModalOverlay from './ModalOverlay';

import style from './Modal.scss';
import bounce from 'transitions/bounce.scss';

/**
 * This class provides a convenient way to display a "popup" component to interact with
 */
export default class Modal extends Component {

    static propTypes = {
        // Boolean describing if the modal should be shown or not.
        isOpen: PropTypes.bool,

        // Function that will be run after the modal has opened.
        onAfterOpen: PropTypes.func,

        // Function that will be run when the modal is requested to be closed, prior to actually closing.
        onClose: PropTypes.func,

        // On modal click
        onModalClick: PropTypes.func,

        label: PropTypes.string,

        role: PropTypes.string
    };

    static defaultProps = {
        isOpen: false,
        role: "dialog"
    };


    constructor(props) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
        this.modalClick = this.modalClick.bind(this);
    }

    handleClose(e) {
        let {onClose} = this.props;

        if (typeof onClose === "function") {
            onClose(e, this);
        }
    }

    modalClick(e) {
        console.log('click', e);
        let {onModalClick} = this.props;

        if (typeof onModalClick === "function") {
            onModalClick(e, this);
        }
    }

    renderWindow() {

        const {children, className, role} = this.props;
        const classes = classNames(style.modal, className);

        return (
            <div className={style.container}>
                <div onClick={this.modalClick} key="modal" role={role} className={classes}>
                    {children}
                </div>
            </div>
        );
    }

    render() {
        const {isOpen} = this.props;

        if(!isOpen){return null;}

        return (
            <div className={style.wrapper}>
                <ModalOverlay isOpen={isOpen} onClick={this.handleClose}/>
                {(isOpen) ? this.renderWindow() : ''}
            </div>
        )
    }
}
