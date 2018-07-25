import { configure } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';
import './style.scss';

// automatically import all files ending in *.stories.js
const req = require.context('../src/', true, /\.stories\.js$/)

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

setOptions({
  showDownPanel: false,
  name: 'react-ui-modules',
  sidebarAnimations: true,
  showAddonPanel: true,
  showSearchBox: false,
  addonPanelInRight: true,
});

configure(loadStories, module);