<h2>Description</h2>
An abstract class for fields that have a single trigger which opens a "picker" below the field. It provides a base implementation for toggling the picker's visibility when the trigger is tapped.

 You would not normally use this class directly, but instead use it as the parent class for a specific picker field implementation. If you are looking for a dropdown select field see `<SelectField>`. It is a implementation of DropdownPicker designd to select a single value.
 
<h2>Usage</h2>
~~~js

import {DropdownField} from 'react-ui-modules';

class MyDropdownField extends DropdownField {

  renderTrigger() {
    const {open, testId} = this.state;
    return <div data-test-id={'trigger-' + testId} className={style.trigger} onClick={this.handleToggle}>
        <Icon type={(open)?  IconType.angleUp : IconType.angleDown}/>
    </div>; 
  }
  
  renderPanel() {
    return (
      <div>Add your own content</div>
    );
  }

}
~~~

## Props

## Functions

## Events
