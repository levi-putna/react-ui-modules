<h2>Description</h2>
Allow the input of multiple tags.
  
 <h2>Usage</h2>
~~~js

import {TagField} from 'react-ui-modules';

<TagField 
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

