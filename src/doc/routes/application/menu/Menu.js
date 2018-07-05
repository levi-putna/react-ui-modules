import React from 'react';
import classNames from 'classnames';
import {IconType}  from 'react-ui-modules';

import MenuItem from './MenuItem';

import style from './Menu.scss';
import logo from './logo.svg';

/**
 * Main app container to hold
 */
const Menu = () => {
    const classes = classNames(style.group, style.groupFill);

    return (
        <div className={style.menu}>

        <nav className={style.navigation} tabIndex="0">

            <div className={style.header}>
                <img className={style.logo} alt="logo" src={logo} />
            </div>

            <ul className={classes}>
                <MenuItem name="About" icon={IconType.home} to="/" exact/>
                <MenuItem name="Components" icon={IconType.home} to="/components"/>
            </ul>

            <ul className={style.group}>
                <MenuItem name="My Account" icon={IconType.angleLeft} to="/accounts"/>
            </ul>

        </nav>

    </div>
    );
};

export default Menu;
