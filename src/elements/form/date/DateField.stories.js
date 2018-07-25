// file: src/stories/index.js

import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {withNotes} from '@storybook/addon-notes';

import {withKnobs, text, boolean, object} from '@storybook/addon-knobs';

import documentation from './documentation.md';

import Form from '../Form';
import DateField from './DateField';

class StatefulForm extends Form {

  onChange = value => {
    action('onChange');
    this.setState({value});
  };

  render() {
    return (
      <DateField
        name={text('name', 'test-field')}
        type={text('type', 'date')}
        value={this.state.value}
        error={text('error', '')}
        placeholder={text('placeholder', 'This is an example placeholder')}
        label={text('label', 'Example Label')}
        onChange={(name, value, touched) => {
            action('onChange');
            this.setState({value});
        }}
        data-test-id={text('data-test-id', 'example-test-id')}
        displayFormat={text('displayFormat', 'YYYY-MM-DD')}
        valueFormat={text('valueFormat', 'YYYY-MM-DD')}
        typeahead={boolean('typeahead', false)} 
        loading={boolean('loading', false)} 
        disabled={boolean('disabled', false)}
        />
    );
  }
}

const stories = storiesOf('Form', module);
stories.addDecorator(withKnobs);

stories.add('DateField', withNotes(documentation)(() => (
    <StatefulForm/>
)))