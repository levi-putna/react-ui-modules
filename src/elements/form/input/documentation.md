 InputField is the common type of input and represents the behavior you would expect from a standard HTML `<input />` with the additional framework functionality like labels, hints, formatting and error management build on top.

 Note: At this time InputField simply extends the base Field as it requires no additional functionality, however it has been given its
 own class to resurvey the name space, and prevent changes to the base API in the future if the functionality was to diverge slightly.
  
  ~~~js
  <div>
    hello world!
    <Button onClick={action('clicked')}>Hello Button</Button>
  </div>
  ~~~


  format

| Param         | Type          | Default  | Required  |
| ------------- |:-------------:| :-------------:| -----:|
| onClick       | function      |                | yes |
| block         | bool          | false    | no |
| disables | bool      |    false | no |
| loading | bool      |    false | no |
| size | int      | defULT | no |
| type | (primary, secondary)      | primary | no |


