import React from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import css from './Modal.scss';
import fade from 'transitions/fade.scss';

const propTypes = {
    onClick: PropTypes.func.isRequired,
};

const ModalOverlay = ({children, isOpen, onClick}) => {

    const content = <div  key="modal-overlay" className={css.overlay} onClick={onClick}>
        {children}
    </div>;

    return (
        <ReactCSSTransitionGroup
            transitionName={fade}
            transitionAppear={true}
            transitionLeave={true}
            transitionEnterTimeout={200}
            transitionAppearTimeout={200}
            transitionLeaveTimeout={200}
        >

            {(isOpen)? content : ''}

        </ReactCSSTransitionGroup>
    )
};

ModalOverlay.propTypes = propTypes;

export default ModalOverlay