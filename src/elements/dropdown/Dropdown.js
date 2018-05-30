import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {Tooltip} from 'elements/tooltip';

import style from './Dropdown.scss';

/**
 * This component provides a push button with many presentation options.
 * There are various styles of Button you can create
 */
export default class Dropdown extends Tooltip {

    static propTypes = {
        className: PropTypes.string,
        isOpen: PropTypes.bool,
        disabled: PropTypes.bool,
        children: PropTypes.oneOfType(
            [
                PropTypes.arrayOf(PropTypes.node),
                PropTypes.node
            ]
        ),
        target: PropTypes.oneOfType(
            [
                PropTypes.string,
                PropTypes.object
            ]
        ).isRequired,
    };

    static defaultProps = {
        isOpen: false
    };

    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.handleDocumentClick = this.handleDocumentClick.bind(this);
      }

    handleClick(event) {
        const {isOpen} = this.state;
        event.stopPropagation();
        event.preventDefault();
        this.setState({isOpen: !isOpen});
    }

    handleDocumentClick(){
      const {isOpen} = this.state;
      if(isOpen){
      this.hideTimeout = setTimeout(this.hide, 100);
    }

    }

    addTargetEvents() {
        this.target.addEventListener('click', this.handleClick, true);
        document.addEventListener('click', this.handleDocumentClick, true);
    }

    removeTargetEvents() {
        this.target.removeEventListener('click', this.handleClick, true);
        document.addEventListener('click', this.handleDocumentClick, true);
    }

    show() {
      this.clearHideTimeout();
        this.setState({isOpen: true});
    }

    hide() {
      this.clearHideTimeout();
        this.setState({isOpen: false});
    }

    getTarget() {
        const {target} = this.props;

        if (typeof target === 'object') {
            return target;
        }

        return document.getElementById(target);
    }

    calculatePosition(element) {
        if (!element) {
            return null;
        }
        const position = element.getBoundingClientRect();

        return {
            top: position.bottom + 5,
            left: position.right
        };
    }

    render() {
        const {className, children, textId} = this.props;
        const {isOpen} = this.state;

        if (!isOpen) {
            return null;
        }

        const position = this.calculatePosition(this.target);
        const classes = classNames(style.container, className, {
            [style.containerOpen]: true
        });

        return (
            <div data-test-id={textId} ref={this.setHeight} style={position} className={classes}>
                <div className={style.content}>
                    {children}
                </div>
            </div>
        );
    }
}
