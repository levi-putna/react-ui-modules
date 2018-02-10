import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import style from './ListItem.scss';

export default class ListItem extends Component {

    static propTypes = {
        to: PropTypes.string.isRequired,
        key: PropTypes.string.isRequired,
    };

    render() {

        const {className, children, to, key} = this.props;
        const classes = classNames(style.container, className);

        return (
            <NavLink key={key} to={to} className={classes} activeClassName={style.containerActive}>
                {children}
            </NavLink>
        );
    }
}
