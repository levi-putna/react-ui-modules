import React, {Component} from 'react';
import {Field, FieldSet} from 'elements/form/field';

import style from './InputField.scss';

/**
 * Field is the base class for all form fields. It provides a lot of shared functionality to all field subclasses
 * (for example labels, simple validation, clearing and tab index management), but is rarely used directly.
 * Instead, it is much more common to use one of the field subclasses.
 *
 * If you wish to create your own Field subclasses you can extend this class, though it is sometimes more useful
 * to extend one of the other base subclasses as they provides additional base functionality.
 */
export default class InputField extends Field {

}
