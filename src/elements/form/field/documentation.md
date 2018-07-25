<h2>Description</h2>
Field is the base class for all form fields. It provides a lot of shared functionality to all field subclasses (for example labels, simple validation, clearing and tab index management), but is rarely used directly. Instead, it is much more common and recommended to use one of the field subclasses like InputField.

If you wish to create your own Field subclasses you can extend this class, though it is sometimes more useful to extend one of the other base subclasses as they provides additional base functionality.
  
 <h2>Usage</h2>
~~~js
<InputField 
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

| Param         | Type          | Default  | Required  |
| ------------- |:-------------:| :-------------:| -----:|
| onClick       | function      |                | yes |
| block         | bool          | false    | no |
| disables | bool      |    false | no |
| loading | bool      |    false | no |
| size | int      | defULT | no |
| type | (primary, secondary)      | primary | no |
