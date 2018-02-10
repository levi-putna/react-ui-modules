import {Component} from 'elements/base';

/**
 * Abstract form class that provides base functionality for any form component.
 *
 * Form is the building block for components that contain form fields. All form components should interact from
 * this class.
 */
export default class Form extends Component {

    constructor(props) {
        super(props);

        this.getValue = this.getValue.bind(this);
        this.setValue = this.setValue.bind(this);
        this.setErrors = this.setErrors.bind(this);
        this.clearErrors = this.clearErrors.bind(this);

        // This is an abstract class and cannot be darcey creates
        if (this.constructor === Form) {
            throw new TypeError('Abstract class "Form" cannot be instantiated directly.');
        }

        this.state = {
            data: {},
            error: {},
            touched: {},
            hasErrors: false,
            loading: false
        };
    }

    /**
     * Set the data state for this form, this will also trigger a reset of the touched fields, and error states.
     *
     * Note: any attribute that is not set will be defaulted to null.
     * @param data the data model.
     * @param isLoading is this form still loading.
     */
    setData(data, isLoading = false) {
        this.setState(
            {
                data,
                error: {},
                touched: {},
                hasErrors: false,
                loading: isLoading
            }
        );
    }

    setBulk(newData) {
        let {data} = this.state;

        Object.assign(data, newData);

        this.setState({data});
    }

    /**
     * Set or update the value of a form field.
     *
     * @param name the name of the field to set/update
     * @param value the value to set
     * @param touch should we update the touched status of this object
     */
    setValue(name, value, touch = true) {
        const {data, error, touched} = this.state;

        const newData = {};
        newData[name] = value;

        const newTouched = {};
        newTouched[name] = true;

        const newError = {};
        newError[name] = false;

        this.setState(
            {
                data: Object.assign(data, newData),
                touched: (touch) ? Object.assign(touched, newTouched) : touched,
                error: (touch) ? Object.assign(error, newError) : error,
            }
        );

        this.onChange(data, newData);
    }

    /**
     * Return the value of a form field
     *
     * @param name
     * @returns {*}
     */
    getValue(name) {
        const {data} = this.state;
        return data[name];
    }

    /**
     * Override all error messages, and replace with new error message objects
     *
     * @param error the error message object to set.
     */
    setErrors(error) {
        const hasErrors = (error.constructor === Array && Object.keys(error).length > 0 );

        console.log(hasErrors, error.constructor);

        this.setState(
            {
                error,
                hasErrors
            }
        );
    }

    /**
     * Reset the error message state for this component.
     */
    clearErrors() {
        this.setState(
            {
                error: {},
                hasErrors: false,
            }
        );
    }

    /**
     * Fired when the form data is update.
     *
     * @param oldData the old state of the data before it changes
     * @param newDate newData the new state of the data after it changes
     */
    onChange(oldData, newDate) {
    } // eslint-disable-line no-unused-vars
}
