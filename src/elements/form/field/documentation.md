**Note:** It is not recommended to use this component directly. Instead, it is much more common and recommended to use one of the field subclasses like InputField.

## Description

Field is the base class for all form fields. It provides a lot of shared functionality to all field subclasses (for example labels, simple validation, clearing and tab index management), but is rarely used directly. Instead, it is much more common and recommended to use one of the field subclasses like InputField.

If you wish to create your own Field subclasses you can extend this class, though it is sometimes more useful to extend one of the other base subclasses as they provides additional or better baseline functionality.

Field or one of its subclasses components are normally used within the context of a Form. See the Form component docs for examples on how to put those together.

See `<InputField />` for a application ready input field. It has the same API as Field but has has been setup as a user ready component.
  
## Usage

~~~js

import {Field} from 'react-ui-modules';

<Field 
  name="test-field"
  type="email"
  value={this.props.value}
  error={this.props.error}
  placeholder="This is an example placeholder"
  label="Example Label"
  onChange={(name, value, touched) => {
    this.setState({value});
  }}
  data-test-id="example-test-id"
  prepend="$"
  append=".00"
/>
~~~

## Props

<dl>
<dt><a href="#name">name</a> : <code>String</code></dt>
<dd><p>The name used to represent this field. When used with the Form component the name will be used to sore the fields value, errors, touched and other attributes.</p>
</dd>
<dt><a href="#disabled">disabled</a> : <code>Bool</code></dt>
<dd><p>True to disable the field for input.</p>
</dd>
<dt><a href="#className">className</a> : <code>Object</code></dt>
<dd><p>An additional CSS class to apply to the main element of this component.</p>
</dd>
<dt><a href="#hint">hint</a> : <code>String</code></dt>
<dd><p>An optional hing to display below the field input</p>
</dd>
<dt><a href="#label">label</a> : <code>String</code></dt>
<dd><p>The label of this field</p>
</dd>
<dt><a href="#placeholder">placeholder</a> : <code>String</code></dt>
<dd><p>The short hint is displayed in the Field before the user enters a value. Describes the expected value of an input field.</p>
</dd>
<dt><a href="#type">type</a> : <code>String</code></dt>
<dd><p>The HTML <code>&lt;input&gt;</code> element type to display</p>
</dd>
<dt><a href="#prepend">prepend</a> : <code>String</code></dt>
<dd><p>Displayed before the field</p>
</dd>
<dt><a href="#append">append</a> : <code>String</code></dt>
<dd><p>Displayed after the field.</p>
</dd>
<dt><a href="#format">format</a> : <code>function</code></dt>
<dd><p>A function that takes the input value as a parameter, and returns a formatted string.</p>
</dd>
<dt><a href="#testId">testId</a> : <code>String</code></dt>
<dd><p>A unique id used to target this field during testing.</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#getDisplayString">getDisplayString()</a> ⇒ <code>String</code></dt>
<dd><p>returns a formatted string to be used as the display value of the field. Extending classes may want to override this method to provided formatted results.</p>
<p>Note: this formatting will have no effect on the actual value of the field.</p>
</dd>
<dt><a href="#onBlur">onBlur()</a></dt>
<dd><p>Remove focus from this component</p>
<p>Note: this wont remove the dom level focus, only the internal component focus. Dom focus will need to
be managed outside this component.</p>
</dd>
<dt><a href="#onFocus">onFocus()</a></dt>
<dd><p>Set focus on this component.</p>
<p>Note: this wont set the dom level focus, only the internal component focus. Dom focus will need to
be managed outside this component.</p>
</dd>
<dt><a href="#renderLabel">renderLabel()</a> ⇒ <code>XML</code></dt>
<dd><p>Render the component label</p>
</dd>
<dt><a href="#renderInput">renderInput()</a> ⇒ <code>XML</code></dt>
<dd><p>Render the components input field. The part of the component that is used to set and display the
components value. Extending classes may wish to override this to create new Field functionality.</p>
</dd>
<dt><a href="#renderHint">renderHint()</a> ⇒ <code>XML</code></dt>
<dd><p>Render component hint message.</p>
</dd>
<dt><a href="#renderError">renderError()</a> ⇒ <code>XML</code></dt>
<dd><p>Render the components error message.</p>
</dd>
<dt><a href="#render">render()</a> ⇒ <code>XML</code></dt>
<dd><p>Render the component.</p>
<p>Note: it is encouraged that components extending this component avoid overriding the render method
if possible. Instead the extending component should focus on overriding the other render methods like
<code>renderInput()</code> and <code>renderLabel()</code>.</p>
<p>If you do end up overriding the render method, you will need to make sure you identify the root dom node by
setting <code>ref={this.setNode}</code> on the root dom node element.</p>
</dd>
</dl>

## Events

<dl>
<dt><a href="#event_onChange">"onChange" (value)</a></dt>
<dd><p>Fires when the Fields value changes.</p>
</dd>
</dl>
