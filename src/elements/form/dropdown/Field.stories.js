// file: src/stories/index.js

import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {withNotes} from '@storybook/addon-notes';

import {withKnobs, text, boolean, select} from '@storybook/addon-knobs';

import documentation from './documentation.md';

import DropdownField from './DropdownField';

const stories = storiesOf('Form', module);

// Add the `withKnobs` decorator to add knobs support to your stories. You can
// also configure `withKnobs` as a global decorator.
stories.addDecorator(withKnobs);

class MyDropdown extends DropdownField {
  
  renderPanel() {
    return (
      <div>Add your own content</div>
    );
  }

}

stories.add('DropdownField', withNotes(documentation)(() => (
  <MyDropdown />
)))