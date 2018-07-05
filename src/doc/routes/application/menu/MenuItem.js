import React from 'react';
import {NavLink} from 'react-router-dom';
import {Icon, Tooltip}  from 'react-ui-modules';
import classNames from 'classnames';

import style from './Menu.scss';

/**
 * Useful widget for displaying label value metrics
 */
export const MenuItem = ({name, icon, to, notification, className, exact = false}) => {

    const id = 'tooltip-' + name + '-' + Math.random().toString(36).substr(2,16);
    const notificationComponent = (notification)? <span className={style.notification}>{notification}</span> : '';

    const classes = classNames(style.link, className);

    return (
        <li className={style.item}>

            <Tooltip data-test-id={"tooltip-" + name} target={id}>{name}</Tooltip>

            <NavLink exact data-test-id={"menu-" + name} id={id} to={to} className={classes} activeClassName={style.linkActive}>
                <Icon type={icon} />
                {notificationComponent}
            </NavLink>

        </li>
    );
};

export default MenuItem;


