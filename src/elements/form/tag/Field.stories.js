// file: src/stories/index.js

import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {withNotes} from '@storybook/addon-notes';

import {withKnobs, text, boolean, select} from '@storybook/addon-knobs';

import documentation from './documentation.md';

import Form from '../Form';
import TagField from './TagField';

const stories = storiesOf('Form', module);

// Add the `withKnobs` decorator to add knobs support to your stories. You can
// also configure `withKnobs` as a global decorator.
stories.addDecorator(withKnobs);

class StatefulForm extends Form {
  
  render() {
    return (
        <TagField 
          name={text('name', 'test-field')}
          type={text('type', 'email')}
          value={this.state.value}
          hint={text('hint', 'start typing tag, hit "Enter" to finish')}
          error={text('error', '')}
          placeholder={text('placeholder', 'Start adding tag')}
          label={text('label', 'Tag Example')}
          onChange={(name, value, touched) => {
              action('onChange');
              this.setState({value});
          }}
          data-test-id={text('data-test-id', 'example-test-id')}
          loading={boolean('loading', false)} 
          disabled={boolean('disabled', false)}
      />
    );
  }
}

stories.add('TagField', withNotes(documentation)(() => (
  <StatefulForm />
)))