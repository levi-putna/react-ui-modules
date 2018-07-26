<h2>Description</h2>
Formatters are a function that takes in the value of a field string, and returns a formatted version for display. The framework provides a number of formatters out of the box, however you are free to add your own by providing in a function callback.
  
 <h2>Usage</h2>
~~~js

import {InputField, NumberFormat} from 'react-ui-modules';

<InputField 
  name="test-field"
  format={new NumberFormat()}
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

