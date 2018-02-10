import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {Component} from 'elements/base';
import {Icon} from 'elements/icon';

import style from './Tab.scss';

/**
 * This component provides a push button with many presentation options.
 * There are various styles of Button you can create
 */
export default class Tab extends Component {

    static propTypes = {
        loading: PropTypes.bool,
        children: PropTypes.oneOfType(
            [
                PropTypes.array,
                PropTypes.element
            ]
        ).isRequired
    };

    static defaultProps = {
        loading: false,
        className: null
    };

    static propTypes = {
        selected: PropTypes.number,
        children: PropTypes.oneOfType(
            [
                PropTypes.array,
                PropTypes.element
            ]
        ).isRequired
    };

    static defaultProps = {
        active: 0
    };

    state = {
        active: this.props.active
    };

    renderLabels() {
        let {children} = this.props;
        let {active} = this.state;

        if (!children) {
            throw new Error('Tabs must contain at least one Tabs.Panel');
        }

        if (!Array.isArray(children)) {
            children = [children];
        }

        return children.map((child, index) => {

            let classes = classNames(style.label, {
                [style.labelActive]: (active === index)
            });

            let icon = child.props.icon;

            return (
                <li key={index} className={classes} onClick={this.handleClick.bind(this, index)}>
                    <a className={style.labelLink} href="/">
                        {(icon)? <Icon className={style.icon} type={icon} /> : null}
                        {child.props.label}
                    </a>
                </li>
            );
        });

    }

    renderTabs() {

        let {className, children} = this.props;
        let {active} = this.state;

        const classes = classNames(style.panel, className);

        return (
            <div className={classes} key={this.state.active}>
                {children[active]}
            </div>
        );
    }

    handleClick(index, event) {
        event.preventDefault();
        this.setState({active: index});
    }

    render() {

        let {children} = this.props;

        return (
            <div className={style.container}>
                {this.renderTabs()}

                <ul className={style.labels}>
                    {this.renderLabels()}
                </ul>

            </div>
        );
    }
}
