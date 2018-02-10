import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './Tag.scss';

const propTypes = {
    label: PropTypes.string.isRequired,
    className: PropTypes.string,
    color: PropTypes.object
};

const Tag = ({label, className, color}) => {

    const classes = classNames(css.tag, className);

    return (
        <li className={classes} style={{backgroundColor: color}}>{label}</li>
    )
};

Tag.propTypes = propTypes;

export default Tag