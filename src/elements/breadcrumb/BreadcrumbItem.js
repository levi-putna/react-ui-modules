import React from 'react';
import classNames from 'classnames';

import style from './Breadcrumb.scss';

const BreadcrumbItem = ({path, children, className}) => {

    const classes = classNames(style.item, className);

    return (
        <li className={classes}>
            <Link to={path} className={style.link}>
                {children}
            </Link>
        </li>
    );
};

export default BreadcrumbItem;
