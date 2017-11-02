import React from 'react';
import PropTypes from 'prop-types';
import {Field} from 'elements/form/field';
import classNames from 'classnames';

import {Icon, IconType} from 'elements/icon';
import style from './DropdownField.scss';

/**
 * An abstract class for fields that have a single trigger which opens a "picker" below the field. It provides a
 * base implementation for toggling the picker's visibility when the trigger is tapped.
 *
 * You would not normally use this class directly, but instead use it as the parent class for a specific picker
 * field implementation.
 *
 * TODO: Change to picker
 */
export default class DropdownField extends Field {

    static propTypes = {
        ...Field.propTypes,
        typeahead: PropTypes.bool,
        panelClassNames: PropTypes.string,
        inputClassNames: PropTypes.string
    };

    static defaultProps = {
        ...Field.defaultProps,
        typeahead: false,
        panelClassNames: '',
        inputClassNames: ''
    };

    constructor(props) {
        super(props);

        this.handleToggle = this.handleToggle.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleDocumentClick = this.handleDocumentClick.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.onInputBlur = this.onInputBlur.bind(this);
        this.onInputChange = this.onInputChange.bind(this);

        this.state = {
            ...super.state,
            left: 0,
            top: 0,
            width: 100,
            open: false,
            search: '',
        };

    }

    componentDidMount() {
        this.manageDocumentClickEvent();
    }

    componentWillUnmount() {
        this.removeDocumentEvents();
    }

    componentDidUpdate(prevProps) {
        const {open} = this.state;

        if (open !== prevProps.open) {
            this.manageDocumentClickEvent();
        }
    }

    /**
     * Decide weather or not to add or remove the click event from the document.
     */
    manageDocumentClickEvent() {
        const {open} = this.state;

        if (open) {
            this.addDocumentEvents();
        } else {
            this.removeDocumentEvents();
        }
    }

    /**
     * Add the document click event to the dom
     */
    addDocumentEvents() {
        document.addEventListener('click', this.handleDocumentClick, true);
    }

    /**
     * Remove the document click event from the dom.
     */
    removeDocumentEvents() {
        document.removeEventListener('click', this.handleDocumentClick, true);
    }

    /**
     * Handle clicks on the document outside the component.
     *
     * This event is only added to the document when the state is open.
     * @param event
     */
    handleDocumentClick(event) {

        // If clicked inside the component we will ignore it as we want to be able to hand internal clicks events.
        if (this.node && this.node.contains(event.target)) {
            return;
        }

        this.handleClose();
    }

    getDisplayString() {
        return this.props.value;
    }

    /**
     * Fires whenever the typehead input looses focus
     * @param event
     */
    onInputBlur(event) {
    }

    /**
     * Fires whenever the typeahead input changes
     */
    onInputChange(event) {
    }

    /**
     * Toggle the panel state of the component.
     */
    handleToggle() {
        const {open} = this.state;

        this.setState(
            {
                open: !open,
                focus: !open
            }
        );
    }

    /**
     * Toggle the panel to open
     */
    handleOpen() {
        this.setState(
            {
                open: true,
                focus: true
            }
        );
    }

    /**
     * Toggle the panel to closed
     */
    handleClose() {
        this.setState(
            {
                filter: null,
                open: false,
                focus: false
            }
        );
    }

    /**
     * Handle key press events.
     * @param event
     */
    handleKeyPress(event) {
    }

    renderIcon(){

    }

    /**
     * Render the content of the drop down panel used to select the field value.
     * @returns {null}
     */
    renderPanel() {
        return null;
    }

    /**
     * Render the dropdown trigger.
     * @returns {XML}
     */
    renderTrigger() {
        const {open} = this.state;
        return <div className={style.trigger} onClick={this.handleToggle}>
            <Icon type={(open)?  IconType.angleUp : IconType.angleDown}/>
        </div>;
    }

    /**
     * Render the display value for this component.
     *
     * Note: topically when building field components we override the `renderInput()`to change hoe the actual input
     * part of the component looks. As dropdown fields have more complexity in regards to how the input functions
     * with the dropdown panle, it is recommended that you override this method as opposed to the `renderInput()`
     * when trying to change the input appearance.
     *
     * @returns {XML}
     */
    renderInputValue() {
        const {input, typeahead, name, placeholder} = this.props;
        const value = this.getDisplayString();

        if (typeahead) {
            return (
                <input
                    {...input}
                    name={name}
                    onBlur={this.onInputBlur}
                    onFocus={this.handleOpen}
                    value={value}
                    onKeyUp={this.handleKeyPress}
                    onChange={this.onInputChange}
                    placeholder={placeholder}
                    type="text"
                    autoComplete="off"
                    className={style.input}/>
            );
        }

        return (
            <div className={style.input} tabIndex="1" onClick={this.handleToggle} onKeyUp={this.handleKeyPress}>
                { (value) ? value : '\u00A0' }
            </div>
        );
    }

    renderInput() {

        const {open, focus, loading} = this.state;

        const inputClasses = classNames(style.wrapper, {
            [style.wrapperFocus]: focus
        });

        const panelClasses = classNames(style.panel, {
            [style.panelFocus]: focus
        });

        return (

            <div className={style.dropdown}>

                <div className={inputClasses}>
                    {this.renderInputValue()}
                    {this.renderTrigger()}
                </div>

                {(open || loading) ? <div className={panelClasses}>{this.renderPanel()}</div> : ''}

            </div>
        );
    }

}
