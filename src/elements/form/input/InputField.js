import React, {Component} from 'react';
import {Field, FieldSet} from 'elements/form/field';

import style from './InputField.scss';

/**
 * InputField is used to create interactive controls in order to accept data simple user data. Is the common type of input and represents the behavior you 
 * would expect from a standard HTML <input /> with the additional framework functionality like labels and error management build on top.
 *
 * Note: at this time InputField simply extends the base Field as it requires no additional functionality, however it has been given its
 * oen class to resurvey the name space, and prevent changes to the base API in the future if the functionality was to diverge slightly.
 */
export default class InputField extends Field {

}
