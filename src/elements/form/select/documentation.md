<h2>Description</h2>
The SelectField represents a html `<select>` control with support for autocomplete.

A SelectField is like a combination of a traditional HTML text `<input>` field and a `<select>` field, and extends on top of the DropdownField.
  
 <h2>Usage</h2>
~~~js

import {SelectField} from 'react-ui-modules';

<SelectField
      options={[
        {
          value: 1,
          label: 'QLD'
        }, {
          value: 2,
          label: 'NSW'
        }, {
          value: 3,
          label: 'NSWL'
        }, {
          value: 4,
          label: 'SA'
        }, {
          value: 5,
          label: 'WA'
        }, {
          value: 6,
          label: 'International'
        }
      ]}
  name="test-field"
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

