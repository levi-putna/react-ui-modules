<h2>Description</h2>
Specialized SelectorField which only supports two values true or false.

Note: A empty or null value will display as false.
  
 <h2>Usage</h2>
~~~js

import {ToggleField} from 'react-ui-modules';

<ToggleField
  type={ToggleField.TYPE.TRUE_FALSE} 
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
/>
~~~

## Props

<dl>
<dt><a href="#event_onChange">type</a></dt>
<dd><p>Style type, one of (ToggleField.TYPE.ON_OFF, ToggleField.TYPE.TRUE_FALSE, ToggleField.TYPE.YES_NO, ToggleField.TYPE.GREEN_RED)</p>
</dd>
</dl>

## Functions

## Events

