import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Modal from '../Modal';

import modalStyle from '../Modal.scss';
import style from './WindowModal.scss';
import bounce from 'transitions/bounce.scss';

/**
 * This class provides a convenient way to display a "popup" component to interact with
 */
export default class WindowModal extends Modal {

    static propTypes = {
        ...WindowModal.propTypes,

        // A title to place in the modal
        title: PropTypes.string,
    };

    renderWindow() {
        const {children, className, role, title} = this.props;
        const classes = classNames(modalStyle.modal, style.window, className);

        return (
            <ReactCSSTransitionGroup 
                className={modalStyle.container}
                transitionEnterTimeout={300}
                transitionLeaveTimeout={0}
                transitionName={bounce}
                transitionAppear={true}
                transitionAppearTimeout={300}
            >
                <div onClick={this.modalClick} key="modal" role={role} className={classes}>
                
                    <div className={style.header}>
                        {(title) ? <div className={style.title}>{title}</div> : <div className={style.title} />}

                        <div onClick={this.handleClose} className={style.close}>
                            <span className={style.closeButton}>+</span>
                        </div>
                    </div>

                    <div className={style.content}>
                        {children}
                    </div>

                </div>

            </ReactCSSTransitionGroup>
        );
    }

}
