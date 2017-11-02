import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './Icon.scss';

const propTypes = {
    type: PropTypes.shape(
        {
            viewBox: PropTypes.string.isRequired,
            path: PropTypes.string.isRequired,
        }
    ).isRequired,
    width: PropTypes.oneOfType(
        [
            PropTypes.string,
            PropTypes.number
        ]
    ),
    size:  PropTypes.string,
    height: PropTypes.oneOfType(
        [
            PropTypes.string,
            PropTypes.number
        ]
    ),
    style: PropTypes.object
};

const defaultProps = {
    size: '1em'
};

const Icon = ({size, style, width, height, type, className, onClick}) => {

    const classes = classNames(css.icon, className);

    return (
        <svg
            fill='currentColor'
            preserveAspectRatio='xMidYMid meet'
            height={height || size}
            width={width || size}
            className={classes}
            style={style}
            viewBox={type.viewBox}
            onClick={onClick}
        >
            <g><path d={type.path}/></g>
        </svg>
    )
};

Icon.propTypes = propTypes;
Icon.defaultProps = defaultProps;

export default Icon