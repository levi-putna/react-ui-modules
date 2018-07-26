// file: src/stories/index.js

import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {withNotes} from '@storybook/addon-notes';

import {withKnobs, text, boolean, object} from '@storybook/addon-knobs';

import documentation from './documentation.md';

import {Form} from './';
import Button from '../button/Button';
import InputField from './input/InputField';
import DateField from './date/DateField';

class ExampleForm extends Form {

  constructor(props) {
    super(props);

    this.showErrors = this.showErrors.bind(this);
    this.hideErrors = this.hideErrors.bind(this);
    this.logData = this.logData.bind(this);
    this.noData = this.noData.bind(this);
  }

  showErrors() {
    this.setErrors({
      "input-field": "Example error message",
      "date-field": "Example error message"
    });
  };

  hideErrors() {
    this.clearErrors();
  };

  noData() {
  }

  logData() {
    const {data} = this.state;
    console.log('Form Data', data);
  };

  render() {
    const {data, error, formData} = this.state;

    return (

      <div>

        <InputField
        name="input-field"
        value={data["input-field"]}
        error={error["input-field"]}
        label="Date Example"
        onChange={this.setValue}
        />

      <DateField
        name="date-field"
        value={data["date-field"]}
        error={error["date-field"]}
        label="Date Example"
        onChange={this.setValue}
        />

        <Button onClick={this.showErrors}>Set Errors</Button>
        <Button onClick={this.hideErrors}>Clear Errors</Button>
        <Button onClick={this.logData}>Console Log Value</Button>

        <h3>Form State</h3>
        {JSON.stringify(this.state)}

      </div>
      
    );
  }
}

const stories = storiesOf('Form', module);
stories.addDecorator(withKnobs);

stories.add('Form', withNotes(documentation)(() => (
    <ExampleForm/>
)))