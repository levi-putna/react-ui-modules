import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {withNotes} from '@storybook/addon-notes';

import {withKnobs, text, boolean, object} from '@storybook/addon-knobs';

import documentation from './documentation.md';

import DateTime from './DateTime';

const stories = storiesOf('Date', module);
stories.addDecorator(withKnobs);

stories.add('Date', withNotes(documentation)(() => (
  <DateTime date={text('date', '2013-01-02')} fromFormat={text('fromFormat', 'YYYY-MM-DD')} toFormat={text('toFormat', 'Do MMMM YYYY')} />
)))