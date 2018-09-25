import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Modal from '../Modal';

import style from '../Modal.scss';
import slide from 'transitions/slide_left.scss';

/**
 * This class provides a convenient way to display a "popup" component to interact with
 */
export default class SideModal extends Modal {

    static propTypes = {
        ...SideModal.propTypes,
        // A title to place in the modal
        title: PropTypes.string,
    };


    renderWindow() {
        const {children, className, role, title} = this.props;
        const classes = classNames(style.modal, style.side, className);

        return (
            <ReactCSSTransitionGroup
                transitionName={slide}
                transitionEnter={true}
                transitionLeave={true}
                transitionEnterTimeout={1000}
                transitionLeaveTimeout={1000}>

                <div onClick={this.modalClick} key="modal" role={role} className={classes}>

                    <div onClick={this.handleClose} className={style.close}>
                        <span className={style.closeButton}>+</span>
                    </div>

                    <div className={style.content}>
                        <div className={style.contentHeader}>{(title) ? <h2 className={style.title}>{title}</h2> : ''}</div>
                        <div className={style.contentBody}>{children}</div>
                    </div>

                </div>

            </ReactCSSTransitionGroup>
        );
    }

}
