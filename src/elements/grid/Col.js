import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './Grid.scss';

export default class Col extends Component {

    static propTypes = {

        // Col widths
        xs: PropTypes.number,
        sm: PropTypes.number,
        md: PropTypes.number,
        lg: PropTypes.number,
        xl: PropTypes.number,

        // Col Hidden
        xsHide: PropTypes.bool,
        smHide: PropTypes.bool,
        mdHide: PropTypes.bool,
        lgHide: PropTypes.bool,
        xlHide: PropTypes.bool,

        // Col Offset
        xsOffset: PropTypes.number,

        children: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.node),
            PropTypes.node
        ]),
        style: PropTypes.object,
    };

    render() {
        let {children, style, ...props} = this.props;

        const classes = classNames([css.col],
            {
                [css.xs0]: props.xs == 0,
                [css.sm0]: props.sm == 0,
                [css.md0]: props.md == 0,
                [css.lg0]: props.lg == 0,
                [css.xl0]: props.xl == 0,

                [css.xs1]: props.xs == 1,
                [css.sm1]: props.sm == 1,
                [css.md1]: props.md == 1,
                [css.lg1]: props.lg == 1,
                [css.xl1]: props.xl == 1,

                [css.xs2]: props.xs == 2,
                [css.sm2]: props.sm == 2,
                [css.md2]: props.md == 2,
                [css.lg2]: props.lg == 2,
                [css.xl2]: props.xl == 2,

                [css.xs3]: props.xs == 3,
                [css.sm3]: props.sm == 3,
                [css.md3]: props.md == 3,
                [css.lg3]: props.lg == 3,
                [css.xl3]: props.xl == 3,

                [css.xs4]: props.xs == 4,
                [css.sm4]: props.sm == 4,
                [css.md4]: props.md == 4,
                [css.lg4]: props.lg == 4,
                [css.xl4]: props.xl == 4,

                [css.xs5]: props.xs == 5,
                [css.sm5]: props.sm == 5,
                [css.md5]: props.md == 5,
                [css.lg5]: props.lg == 5,
                [css.xl5]: props.xl == 5,

                [css.xs6]: props.xs == 6,
                [css.sm6]: props.sm == 6,
                [css.md6]: props.md == 6,
                [css.lg6]: props.lg == 6,
                [css.xl6]: props.xl == 6,

                [css.xs7]: props.xs == 7,
                [css.sm7]: props.sm == 7,
                [css.md7]: props.md == 7,
                [css.lg7]: props.lg == 7,
                [css.xl7]: props.xl == 7,

                [css.xs8]: props.xs == 8,
                [css.sm8]: props.sm == 8,
                [css.md8]: props.md == 8,
                [css.lg8]: props.lg == 8,
                [css.xl8]: props.xl == 8,

                [css.xs9]: props.xs == 9,
                [css.sm9]: props.sm == 9,
                [css.md9]: props.md == 9,
                [css.lg9]: props.lg == 9,
                [css.xl9]: props.xl == 9,

                [css.xs10]: props.xs == 10,
                [css.sm10]: props.sm == 10,
                [css.md10]: props.md == 10,
                [css.lg10]: props.lg == 10,
                [css.xl10]: props.xl == 10,

                [css.xs11]: props.xs == 11,
                [css.sm11]: props.sm == 11,
                [css.md11]: props.md == 11,
                [css.lg11]: props.lg == 11,
                [css.xl11]: props.xl == 11,

                [css.xs12]: props.xs == 12,
                [css.sm12]: props.sm == 12,
                [css.md12]: props.md == 12,
                [css.lg12]: props.lg == 12,
                [css.xl12]: props.xl == 12

            },
            props.className);

        return (
            <div style={style} className={classes}>{children}</div>
        );
    }
}
