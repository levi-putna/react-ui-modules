import React from 'react';
import SyntaxHighlighter from "react-syntax-highlighter";

import {IconExample, FormExample} from './example';

import style from './Components.scss';
import SelectField from '../../../../elements/form/select/SelectField';
import Form from '../../../../elements/form/Form';
import {Icon, IconType} from '../../../../elements/icon';

export default class Components extends Form {

  render() {
    const {data, error} = this.state;

    console.log('data', data);

    return (
      <div>
        <div className={style.toolbar}>
          <span className={style.toolbarItem}><Icon type={IconType.default}/></span>
          <span className={style.toolbarItem}>Components</span>
        </div>
        <div className={style.body}>
          <h1>Forms</h1>

          <p className={style.intro}>
            Form overrides a base React component and provide some additional utility
            required to use the input components provided by this library.
          </p>

          <p>
            The form component initiates with two empty objects on its internal state 'data'
            and 'errors'. These two states are used to hold the information collected by the
            form, and the validation errors.
          </p>

          <SyntaxHighlighter>{FormExample.login}</SyntaxHighlighter>

          <h2>Input</h2>

          <h3>Select</h3>

          <SelectField
            name="example"
            value={data['example']}
            error={error['example']}
            placeholder="Some placeholder text"
            label="Example"
            onChange={this.setValue}
            autoFocus="true"
            options={[
              {
                  value: '',
                  label: 'Empty String Value'
              }, {
                  value: null,
                  label: 'Null Value'
              }, {
                  value: 1,
                  label: 'Int Value'
              }, {
                value: 'string-value',
                label: 'String Value'
            }
          ]}
            data-test-id="test-target-id-example" />

          <h2>Icon</h2>
          <SyntaxHighlighter>{IconExample.base}</SyntaxHighlighter>
        </div>
      </div>
    );
  }
}