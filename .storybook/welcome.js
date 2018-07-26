import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {withNotes} from '@storybook/addon-notes';



const stories = storiesOf('Welcome', module);

stories.add('About', () => (
    <div class="doc">
        <h1>Welcome</h1>

        <p>React UI Modules is designed to provide a common set of components that can used n almost any app, and can be extended on to build more new and different components.</p>
    </div>
))

stories.add('Introduction', () => (
    <h1>Introduction</h1>
))

stories.add('Core Concepts', () => (
    <h1>Core Concepts</h1>
))