import React from 'react';
import PropTypes from 'prop-types';

import {Box} from "elements/box";

import style from './List.scss';

/**
 * List is a custom styled DataView which allows Grouping
 */
export default class List extends Box {

    static propTypes = {
        ...Box.propTypes,

        /**
         * An array of data representing each list item.
         */
        records: PropTypes.array
    };

    static defaultProps = {
        ...Box.defaultProps,
        records: []
    };

    constructor(props) {
        super(props);

        // This is an abstract class and cannot be darcey creates
        if (this.constructor === List) {
            throw new TypeError('Abstract class "List" cannot be instantiated directly.');
        }

        this.state = {
            ...this.state,
            records: []
        }
    }

    renderItem(record) {
        return (
            <div>
                <b>Default list item</b>
                <p>Override the `renderItem(record)` method the provide your own ite.</p>
            </div>
        );
    }

    renderList() {
        let {records} = this.props;

        if (!records) {
            return null;
        }

        const list = records.map((record) => {
            return this.renderItem(record);
        });

        return (
            <div className={style.container}>
                {list}
            </div>
        )
    }

    render() {
        const content = this.renderList();
        return this.renderBox(content);
    }
}