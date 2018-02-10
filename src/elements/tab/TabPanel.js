import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './Tab.scss';

const propTypes = {
    label: PropTypes.string.isRequired,
    children: PropTypes.string,
};

const TabPanel = ({children, label, icon, className}) => {

    return (
        <div className={className}>
            {children}
        </div>
    )
};

TabPanel.propTypes = propTypes;

export default TabPanel