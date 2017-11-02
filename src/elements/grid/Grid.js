import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './Grid.scss';

// Report the row and column
export {default as Row} from './Row';
export {default as Col} from './Col';

export default class Grid extends Component {

    static propTypes = {
        fluid: PropTypes.bool,
        style: PropTypes.object,
        children: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.node),
            PropTypes.node
        ]),
        className: PropTypes.string
    };

    static defaultProps = {
        fluid: false
    };

    render() {
        const {children, fluid, style, className} = this.props;

        const classes = classNames(css.grid, className, {
            [css.gridFluid]: fluid
        });

        return (
            <div style={style} className={classes}>{children}</div>
        );
    }
}
