import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import style from './Box.scss';

import {Component} from 'elements/base';

/**
 * A Container has all of the abilities of Component, but lets you nest other Components inside it.
 * Applications are made up of lots of components, usually nested inside one another. Containers allow you to render and
 * arrange child Components inside them.
 *
 * Most apps have a single top-level Container called a Viewport, which takes up the entire screen. Inside of this are
 * child components, for example in a mail app the Viewport Container's two children might be a message List and an
 * email preview pane.
 * */
export default class Box extends Component {

    /**
     * Wrap options
     * @type {{NO_WRAP: string, WRAP: string, REVERSE: string}}
     */
    static WRAP = {
        NO_WRAP: 'nowrap',
        WRAP: 'wrap',
        REVERSE: 'reverse'
    };

    static DIRECTION = {
        ROW: 'row',
        ROW_REVERSE: 'row-reverse',
        COLUMN: 'column',
        COLUMN_REVERSE: 'column-reverse',
    };

    static propTypes = {
        ...Component.propTypes,

        /**
         * Set this component to fill all the available space within the parent component. This is the same as setting
         * both the `height` and `width` prop to `100%`.
         */
        fill: PropTypes.bool,
        center: PropTypes.bool,
        wrap: PropTypes.string,
        direction: PropTypes.string,

        /**
         * The height of this Component; must be a valid CSS length value, e.g: 100px, 30%, etc.
         * By default, if this is not explicitly set, this Component's element will simply have its own natural size.
         */
        height: PropTypes.string,

        /**
         * The maximum height of this Component; must be a valid CSS length value, e.g: 100px, 30%, etc.
         */
        maxHeight:  PropTypes.string,

        /**
         * The minimum height of this Component; must be a valid CSS length value, e.g: 100px, 30%, etc.
         */
        minHeight:  PropTypes.string,

        /**
         * The width of this Component; must be a valid CSS length value, e.g: 100px, 30%, etc. By default, if this is
         * not explicitly set, this Component's element will simply have its own natural size.
         */
        width:  PropTypes.string,

        /**
         * The maximum width of this Component; must be a valid CSS length value, e.g: 100px, 30%, etc.
         */
        maxWidth: PropTypes.string,

        /**
         * The minimum width of this Component; must be a valid CSS length value, e.g: 100px, 30%, etc.
         */
        minWidth: PropTypes.string,

        /**
         * Whether or not this Component is hidden (its CSS display property is set to none).
         *
         * Defaults to: null
         */
        hidden: PropTypes.bool,

        /**
         * Configuration options to make this Component scrollable. Acceptable values are:
         * * true - to enable auto scrolling.
         * * false - (or null) to disable scrolling - this is the default.
         * * x - or horizontal to enable horizontal scrolling only
         * * y - or vertical to enable vertical scrolling only
         */
        //scrollable

        /**
         * Specifies the length of the item, relative to the rest of the flexible Box items inside the same container.
         * Defaults to `auto`
         */
        flex: PropTypes.number
    };

    static defaultProps = {
        ...Component.defaultProps,
        fill: false,
        center: false,
        wrap: null,
        direction: null,
        height: null,
        width: null,
        flex: null
    };

    generateStyle(){
        const {height, minHeight, maxHeight, width, minWidth, maxWidth, direction, flex} = this.props;

        return {
            height,
            minHeight,
            maxHeight,
            width,
            minWidth,
            maxWidth,
            flex,

            flexDirection:direction
        }
    }

    renderBox(content){
        const {className, fill, center, wrap, direction} = this.props;

        const classes = classNames(style.container, {
            [style.fill]: fill,
            [style.center]: center,
            [style.wrap]: (wrap === Box.WRAP.WRAP),
            [style.wrapReverse]: (wrap === Box.WRAP.REVERSE),
            [style.rowReverse]: (direction === Box.DIRECTION.ROW_REVERSE),
            [style.column]: (direction === Box.DIRECTION.COLUMN),
            [style.columnReverse]: (direction === Box.DIRECTION.COLUMN_REVERSE),
        }, className);

        const inlineStyle = this.generateStyle();

        return (
            <div style={inlineStyle} className={classes}>
                {content}
            </div>
        )
    }

    render() {
        const {children} = this.props;
        return this.renderBox(children);
    }
}

