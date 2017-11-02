import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './Tag.scss';

const propTypes = {
    label: PropTypes.string.isRequired,
    className: PropTypes.string,
    style: PropTypes.object
};

const Tag = ({label, className, style}) => {

    const classes = classNames(css.tag, className);

    return (
        <li className={classes} style={style}>{label}</li>
    )
};

Tag.propTypes = propTypes;

export default Tag