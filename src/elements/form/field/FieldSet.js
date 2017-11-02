import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import style from './FieldSet.scss';

const propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
};

const FieldSet = ({className, children,}) => {

    const classes = classNames(style.fieldset, className);

    return (
        <fieldset className={classes}>
            {children}
        </fieldset>
    );
};

FieldSet.propTypes = propTypes;

export default FieldSet;
