import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {Component} from 'elements/base';

import style from './ComponentTemplate.scss';

/**
 * This component provides a push button with many presentation options.
 * There are various styles of Button you can create
 */
export default class ComponentTemplate extends Component {

    static propTypes = {
        isExample: PropTypes.bool,
    };

    static defaultProps = {
        isExample: false,
    };

    render() {

        return (
            <div>...</div>
        )
    }
}
