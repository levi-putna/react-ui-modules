import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './Tag.scss';

const propTypes = {
    children: PropTypes.string,
};

const TagGroup = ({children, className, style}) => {

    const classes = classNames(css.group, className);

    return (
        <li className={classes} style={style}>{children}</li>
    )
};

TagGroup.propTypes = propTypes;

export default TagGroup