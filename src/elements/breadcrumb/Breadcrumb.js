import React from 'react';

import BreadcrumbItem from './BreadcrumbItem';

import style from './Breadcrumb.scss';

const Breadcrumb = ({children}) => {

    return (
        <ol className={style.breadcrumb}>
            <BreadcrumbItem path="/">
                TODO Icon
            </BreadcrumbItem>
            {children}
        </ol>);
};

export default Breadcrumb;