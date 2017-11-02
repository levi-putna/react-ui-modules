import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {Icon} from 'elements/icon';
import style from './Title.scss';

const propTypes = {
    label: PropTypes.string.isRequired,
    className: PropTypes.string,
    icon: PropTypes.shape(
        {
            viewBox: PropTypes.string.isRequired,
            path: PropTypes.string.isRequired,
        }
    )
};

const Title = ({label, icon, className}) => {

    const classes = classNames(style.title, className);

    return (
        <h2 className={classes}>
            {(icon) ? <Icon tyle={icon}/> : ''} {label}
        </h2>
    );
};

Title.propTypes = propTypes;

export default Title;
