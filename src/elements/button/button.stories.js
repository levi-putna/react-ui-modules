// file: src/stories/index.js

import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withNotes } from '@storybook/addon-notes';

import { withKnobs, text, boolean, select } from '@storybook/addon-knobs';

import documentation from './documentation.md';

import Button from './Button';

const stories = storiesOf('Button', module);

// Add the `withKnobs` decorator to add knobs support to your stories.
// You can also configure `withKnobs` as a global decorator.
stories.addDecorator(withKnobs);

const sizeOptions = {
    'Button.size.tiny': 'Tiny',
    'Button.size.tiny': 'Small',
    'Button.size.tiny': 'Default',
    'Button.size.tiny': 'Large',
    'Button.size.tiny': 'Huge',
};

const typeOptions = {
    [Button.modifier.primary]: 'Primary',
    [Button.modifier.secondary]: 'Secondary',
    [Button.modifier.dark]: 'Dark'
};

stories.add('Default', withNotes(documentation)(() => (
        <Button 
            block={boolean('Block', false)} 
            loading={boolean('Loading', false)} 
            disabled={boolean('Disabled', false)} 
            onClick={action('clicked')}
            size={select('Size', sizeOptions)}
            type={select('Type', typeOptions)}
        >
            {text('Text', 'Example Button')}
        </Button>
)))

stories.add('Block', withNotes(documentation)(() => (
        <Button block onClick={action('clicked')}>Hello Button</Button>
)))

stories.add('Loading', withNotes(documentation)(() => (
        <Button loading={boolean('Loading', false)} onClick={action('clicked')}>Hello Button</Button>
)))