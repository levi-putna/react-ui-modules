import React, {Component} from 'react';
import PropTypes from 'prop-types';

import css from './Grid.scss';

export default class Row extends Component {

    static propTypes = {
        children: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.node),
            PropTypes.node
        ]),
        style: PropTypes.object
    };

    render() {
        let {children, style} = this.props;
        return (
            <div style={style} className={css.row}>{children}</div>
        );
    }
}
