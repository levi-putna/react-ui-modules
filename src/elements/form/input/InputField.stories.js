// file: src/stories/index.js

import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withNotes } from '@storybook/addon-notes';

import { withKnobs, text, boolean, select } from '@storybook/addon-knobs';

import documentation from './documentation.md';

import Form from '../Form';
import InputField from './InputField';

const stories = storiesOf('Form', module);

stories.addDecorator(withKnobs);

class StatefulForm extends Form {
  
    render() {
      return (
          <InputField 
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
            prepend={text('prepend', '')}
            append={text('append', '')}
            loading={boolean('loading', false)} 
            disabled={boolean('disabled', false)}
        />
      );
    }
  }

stories.add('InputField', withNotes(documentation)(() => (
    <StatefulForm />
)))