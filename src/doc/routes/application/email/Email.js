import React, {Component} from 'react';
import SyntaxHighlighter from "react-syntax-highlighter";
import {Icon, IconType, EmailBuilder} from 'react-ui-modules';

import {IconExample, FormExample} from './example';

import style from './Email.scss';

export default class Components extends Component {
  render() {
    return (
      <div>
        <div className={style.toolbar}>
          <span className={style.toolbarItem}><Icon type={IconType.home}/></span>
          <span className={style.toolbarItem}>Email</span>
        </div>
        <div className={style.body}>
          <h1>Email Builder</h1>

          <p className={style.intro}>
            Form overrides a base React component and provide some additional utility required to use the input components provided by this library.
          </p>

          <p>
          The form component initiates with two empty objects on its internal state 'data' and 'errors'. These two states are used to hold 
          the information collected by the form, and the validation errors. 
          </p>

          <div className={style.builder}>
          <EmailBuilder />
          </div>
          

        </div>
      </div>
    );
  }
}