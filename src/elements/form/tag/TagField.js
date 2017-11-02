import React from 'react';
import classNames from 'classnames';
import {Field} from 'elements/form/field';

import style from './TagField.scss';

const ENTER = 'Enter';
const BACKSPACE = 'Backspace';

/**
 * Form tag field
 *
 * Allow multiple tag selection with type ahead support.
 */
export default class TagField extends Field {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleDelete = this.handleDelete.bind(this);

        this.state = {
            value: '',
            focus: false
        };
    }

    renderTags() {
        const {value} = this.props;

        if (!value) {
            return null;
        }

        return value.map((tag) => {
            return (
                <div key={tag} className={style.tag}>
                    {tag}
                    <button id={tag} onClick={this.handleDelete} className={style.delete}/>
                </div>
            );
        });
    }

    pushTag(tag) {
        const {name, onChange, value} = this.props;

        const new_tag = tag.trim()
        .toLowerCase();

        const tags = (value) ? value : [];

        // check that the value has not already been added
        if (tags.includes(tag) || new_tag === null || new_tag === '') {
            return;
        }

        tags.push(new_tag);
        onChange(name, tags);
    }

    popTag() {
        const {value} = this.props;
        const {name, onChange} = this.props;

        let tags = value;
        tags = (tags) ? tags : [];

        const old_tag = tags.pop();

        this.setState(
            {
                value: old_tag
            }
        );

        onChange(name, tags);
    }

    handleDelete(event) {
        const {name, value, onChange} = this.props;

        const tag = event.target.id;
        const index = value.indexOf(tag);

        if (index !== -1) {
            value.splice(index, 1);
        }

        onChange(name, value);
    }

    onBlur(event) {
        const value = event.target.value.trim();

        if (value !== '') {
            this.pushTag(value);
            this.setState({value: '', focus: false});
        } else {
            this.setState({focus: false});
        }
    }

    onChange(event) {
        this.setState({value: event.target.value});
    }

    handleKeyPress(event) {
        const value = event.target.value.trim();

        switch (event.key) {
            case ENTER:

                if (value !== '') {
                    event.preventDefault();
                    this.pushTag(value);
                    this.setState({value: ''});
                }

                break;
            case BACKSPACE:

                if (event.target.value === '') {
                    event.preventDefault();
                    this.popTag();
                }
                break;

            // no default
        }
    }

    renderInput() {
        const {placeholder} = this.props;
        const {value, focus} = this.state;

        const tags = this.renderTags();

        const inputClasses = classNames(style.wrapper, {
            [style.wrapperFocus]: focus
        });

        return (
            <div className={inputClasses}>
                {(tags && tags.length > 0) ? <div className={style.tags}>{tags}</div> : null}

                <input type="text"
                       value={value}
                       placeholder={placeholder}
                       onChange={this.onChange}
                       onKeyDown={this.handleKeyPress}
                       onFocus={this.onFocus}
                       onBlur={this.onBlur}
                       className={style.input}
                />
            </div>
        );
    }

}
