// file: src/stories/index.js

import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {withNotes} from '@storybook/addon-notes';

import {withKnobs, text, boolean, object} from '@storybook/addon-knobs';

import documentation from './documentation.md';

import SideModal from './SideModal';

const stories = storiesOf('Modal', module);
stories.addDecorator(withKnobs);

stories.add('SideModal', withNotes(documentation)(() => (
  <SideModal title="Side Modal" isOpen={true}>
    <div style={{backgroundColor: '#f6f7f8', height: '100%'}}>Some content...</div>
  </SideModal>
)))