 A basic button component. Supports a minimal level of customization.
  
  ## Example Usage
  ~~~js

  import {Button} from 'react-ui-modules';

  <div>
    hello world!
    <Button onClick={action('clicked')}>Hello Button</Button>
  </div>
  ~~~

| Param         | Type          | Default  | Required  |
| ------------- |:-------------:| :-------------:| -----:|
| onClick       | function      |                | yes |
| block         | bool          | false    | no |
| disables | bool      |    false | no |
| loading | bool      |    false | no |
| size | int      | defULT | no |
| type | (primary, secondary)      | primary | no |
