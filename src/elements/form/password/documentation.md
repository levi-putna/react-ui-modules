<h2>Description</h2>
A password input field that shown the strength of a password as it is entered.

Note: this Field is still in developement, and the API may change before initial release. If you wish to have a secure password imput, use `<InputField type="password">` for now.
  
 <h2>Usage</h2>
~~~js

import {PasswordField} from 'react-ui-modules';

<PasswordField 
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

## Functions


## Events

