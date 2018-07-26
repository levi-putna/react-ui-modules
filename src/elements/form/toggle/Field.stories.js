// file: src/stories/index.js

import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {withNotes} from '@storybook/addon-notes';

import {withKnobs, text, boolean, select} from '@storybook/addon-knobs';

import documentation from './documentation.md';

import Form from '../Form';
import ToggleField from './ToggleField';

const stories = storiesOf('Form', module);

// Add the `withKnobs` decorator to add knobs support to your stories. You can
// also configure `withKnobs` as a global decorator.
stories.addDecorator(withKnobs);

class StatefulForm extends Form {
  
  render() {
    return (
      <div>
      <ToggleField
          name={text('name', 'test-field-on-off')}
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
          loading={boolean('loading', false)} 
          disabled={boolean('disabled', false)}
      />

      <ToggleField
          name={text('name', 'test-field-true-false')}
          type={ToggleField.TYPE.TRUE_FALSE}
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
          loading={boolean('loading', false)} 
          disabled={boolean('disabled', false)}
      />

      <ToggleField
          name={text('name', 'test-field-yes-no')}
          type={ToggleField.TYPE.YES_NO}
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
          loading={boolean('loading', false)} 
          disabled={boolean('disabled', false)}
      />

      <ToggleField
          name={text('name', 'test-field-red-green')}
          type={ToggleField.TYPE.GREEN_RED}
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
          loading={boolean('loading', false)} 
          disabled={boolean('disabled', false)}
      />
      </div>
        
    );
  }
}

stories.add('Toggle', withNotes(documentation)(() => (
  <StatefulForm />
)))