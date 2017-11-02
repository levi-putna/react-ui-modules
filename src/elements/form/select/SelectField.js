import React from 'react';
import PropTypes from 'prop-types';
import Option from './Option';

import {DropdownField} from 'elements/form/dropdown';

const ENTER = 'Enter';
const DOWN = 'ArrowDown';
const UP = 'ArrowUp';

export default class SelectField extends DropdownField {

    static propTypes = {
        ...DropdownField.propTypes,
        options: PropTypes.arrayOf(
            PropTypes.shape(
                {
                    value: PropTypes.oneOfType(
                        [
                            PropTypes.string,
                            PropTypes.number
                        ]
                    ).isRequired,
                    label: PropTypes.oneOfType(
                        [
                            PropTypes.string,
                            PropTypes.number
                        ]
                    ).isRequired,
                    selected: PropTypes.bool,
                    icon: PropTypes.string
                }
            )
        ).isRequired
    };

    static defaultProps = {
        ...DropdownField.defaultProps,
        options: []
    };

    constructor(props) {
        super(props);

        this.onSelect = this.onSelect.bind(this);

        this.state = {
            ...DropdownField.state,
            filter: null,
        };

    }

    handleKeyPress(event) {
        const key = event.key;

        switch (key) {
            case ENTER:
                this.setState({open: false, filter: null});
                break;

            case UP:
                event.stopPropagation();
                this.setState({open: true});
                this.navigateSelected(UP, event);
                break;

            case DOWN:
                event.stopPropagation();
                this.setState({open: true});
                this.navigateSelected(DOWN, event);
                break;

            default:
            // this.setState({search: value, open: true});
            // this.onSearch(value);
        }
    }

    /**
     * Update the selection based on the up and down arrow clicks
     * @param direction
     * @param event
     */
    navigateSelected(direction, event) {
        const {name, onChange} = this.props;
        const options = this.getOptions();

        const size = options.length;
        const maxIndex = size - 1;
        let selected = this.getSelectedOption();

        // if the options has one or less items, we don't need to do anything
        if (size <= 0) {
            return;
        }

        // If no option is currently selected, set the first option as selected;
        if (!selected) {
            selected = options[0];
            onChange(name, selected.value);
            return;
        }

        const index = this.getSelectedIndex();

        switch (direction) {
            case UP:
                // if we are at the start of the list, move to the end
                if (index <= 0) {
                    selected = options[maxIndex];
                } else {
                    selected = options[index - 1];
                }
                break;

            case DOWN:
                // if we are at the end of the list, move to the start
                if (index >= maxIndex) {
                    selected = options[0];
                } else {
                    selected = options[index + 1];
                }
                break;
            default:
        }

        onChange(name, selected.value);
    }

    getDisplayString() {
        const {value} = this.props;
        const {filter} = this.state;
        const hasFilter = (filter !== undefined) && (filter !== null) && (filter !== '');

        if (!value && !hasFilter) {
            return '';
        }

        if (hasFilter) {
            return filter;
        }

        // Find the new selected item, we should never have more than one.
        const option = this.getSelectedOption();

        if (!option) {
            return '';
        }

        return option.label;
    }

    /**
     * Return the selected item, or null if none is selected.
     * @returns {T|*}
     */
    getSelectedOption() {
        const {value} = this.props;
        const options = this.getOptions();

        return options.find((option) => {
            return (!(typeof option.value === 'undefined') && option.value === value);
        });
    }

    /**
     * Return the index
     * @returns {*|number}
     */
    getSelectedIndex() {
        const {value} = this.props;
        const options = this.getOptions();

        return options.findIndex((option) => {
            return (!(typeof option.value === 'undefined') && option.value === value);
        });
    }

    onSelect(value, event) {
        const {onChange, name} = this.props;

        onChange(name, value);
        this.handleClose();
    }

    onInputBlur(event) {
        const {options} = this.props;
        const value = event.target.value;

        // const option = options.find((option) => {
        //     consoel.log(option.label.toLowerCase(), value.toLowerCase());
        //     return (option.label.toLowerCase() === value.toLowerCase());
        // });
        //
        // if (option) {
        //     this.onSelect(option.value, event);
        // }
    }

    onInputChange(event) {
        const {onChange, name} = this.props;
        const value = event.target.value;

        if(value && !value == ''){
            onChange(name, null);
        }

        this.setState(
            {
                open: true,
                filter: (value && !value == '')? value : null
            }
        );
    }

    getOptions() {
        const {options} = this.props;
        const {filter} = this.state;

        if (filter === null || filter == '') {
            return options;
        }

        const regex = new RegExp(filter, 'gi');

        return options.filter((option) => {
            return !!option.label.match(regex);
        });
    }

    renderOptions() {
        const {value} = this.props;
        const options = this.getOptions();

        return options.map((option) => {

            if (!option) {
                return null;
            }

            const key = option.value.toString();

            return (<Option
                key={key}
                label={option.label}
                value={option.value}
                icon={(option.icon)? option.icon : null}
                selected={(option.value === value)}
                onClick={this.onSelect}
            />);
        });
    }

    renderPanel() {
        return (this.renderOptions());
    }
}
