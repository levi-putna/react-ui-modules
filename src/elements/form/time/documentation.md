<h2>Description</h2>
TextField represents the functionality and behavior you would expect from an standard HTML `<textarea></textarea>`
  
 <h2>Usage</h2>
~~~js

import {TextField} from 'react-ui-modules';

<TextField 
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

## Functions

## Events

