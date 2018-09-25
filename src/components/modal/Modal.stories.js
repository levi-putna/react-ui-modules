// file: src/stories/index.js

import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {withNotes} from '@storybook/addon-notes';

import {withKnobs, text, boolean, object} from '@storybook/addon-knobs';

import documentation from './documentation.md';

import Modal from './Modal';

const stories = storiesOf('Modal', module);
stories.addDecorator(withKnobs);

stories.add('Modal', withNotes(documentation)(() => (
  <Modal isOpen={true}>
    Some content...
  </Modal>
)))