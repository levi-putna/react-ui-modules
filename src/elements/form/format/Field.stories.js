// file: src/stories/index.js

import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {withNotes} from '@storybook/addon-notes';

import {withKnobs, text, boolean, select} from '@storybook/addon-knobs';

import documentation from './documentation.md';

import Field from '../field/Field';
import Form from '../Form';

const stories = storiesOf('Form', module);

// Add the `withKnobs` decorator to add knobs support to your stories. You can
// also configure `withKnobs` as a global decorator.
stories.addDecorator(withKnobs);

class StatefulForm extends Form {
  
  render() {
    return (
        <Field 
          name={text('name', 'test-field')}
          type={text('type', 'email')}
          value={this.state.value}
          hint={text('hint', 'This is an example hint')}
          error={text('error', '')}
          placeholder={text('placeholder', 'This is an example placeholder')}
          label={text('label', 'Example Label')}
          onChange={(name, value, touched) => {
              action('onChange');
              this.setState({value});
          }}
          data-test-id={text('data-test-id', 'example-test-id')}
          prepend={text('prepend', '$')}
          append={text('append', '.00')}
          loading={boolean('loading', false)} 
          disabled={boolean('disabled', false)}
      />
    );
  }
}

stories.add('Field Formater', withNotes(documentation)(() => (
  <StatefulForm />
)))