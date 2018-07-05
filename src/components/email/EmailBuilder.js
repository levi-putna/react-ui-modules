import React, {Component} from "react";
import classNames from 'classnames';
import {Icon, IconType} from 'elements/icon';
import {Tab, TabPanel} from 'elements/tab';

import style from './EmailBuilder.scss';

export default class EmailBuilder extends Component {

  static defaultProps = {
    active: 0,
    speed: 5000
  };

  state = {
    active: this.props.active
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={style.container}>
        <div className={style.preview}>
          ...preview
        </div>
        <Tab className={style.preferences} align={Tab.align.top}>
          <TabPanel label="Components">
            Components
          </TabPanel>

          <TabPanel label="Components">
            Components
          </TabPanel>

          <TabPanel label="Body">
            Body
          </TabPanel>
        </Tab>
      </div>
    );
  }
}
