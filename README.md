h1. Overview

A common set of UI elements that can be reused in any React project.

NOTE: This module is still in early stages of DEVELOPMENT, Its API's are not stable yet, and are subject to change.

h1. Usage

To add the package to your project run `yarn add react-ui-modules` in the root of you project.

All components are published at the top level of the package, you can include them via the component name like `import {Button, Form, InputField} from 'react-ui-modules'`

The project exposes a number of high level components that can be used delectably as a component `<Button onClick={() =>{}}>`. It also provides a number of base components that can be extended to build mor complex components `CheckDropdown extends DropdownField {}`

For complete documentation of the available components see 'TODO: add link when complete'

h1. Development

This library aims to provide a reusable components to use in external projects, as such we have provided two options to use when developing:

h2. Storybook development (Recommended)

We make use of Storybook https://storybook.js.org/ to provide documentation, and allow for testing and development of components. You can start Storybook by running `yarn start:storybook`. This will build and watch a changes and publish them to Storybook. Once the script finishes, it will provide the url to open Storybook. 

We are keeping stories inline with the component. Storybook will look for .story.js files in the `src` directory, and automatically build them into a story.

h2. Linking for development in an external project

First you need to create a symlink of the library locally (If you’d like to learn more about (`npm link`, `yarn link`), check out https://docs.npmjs.com/cli/link.) from the root of the library, run `npm link` or `yarn link` link. You’ll notice this will also run the prepublish script in the console, this will conduct the initial build of the module.

You can now run the `start:dev` command, this will keep an eye on any changes and update the build and symlink whenever anything changes. This allows us to develop in the local module, and see the results in our linked project.

Now we’ll tell our other app that we want to use that symlinked library. From the root of your included app run `yarn link react-ui-modules`.

You can now include the component you wish to work on in your other app `include {Button, Form} from 'react-ui-modules'`. Changes made to the module will be made available to the linked project via the symlink.

Note: You will need keep the `start:dev` job running in the console to continue watching for changes, and updating the linked package.

h2. GIT

This module makes use of the Gitflow workflow for managing its git versioning and bug fixes. Learn more at https://nvie.com/posts/a-successful-git-branching-model/ or https://danielkummer.github.io/git-flow-cheatsheet/

h2. Dev Plugins
This tool is build for React projects. This allows us to make use of some of the very useful react development tools.

I recommend installing:

 * React Developer Tools - https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en
 * Redux DevTools - https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en

h1. Publish

To publish a new version of the module to NPM push all changes to the GIT repo master branch, then use the `yarn publish` command to push the changes. This will run the prepublish script to build the module before pushing up the changes. Make sure to increment the version making use of the NPM semantic versioning or users may not be able to update to the latest version. (Learn more about about NPM semantic versioning at https://docs.npmjs.com/getting-started/semantic-versioning)

To publish the documentation run `yarn publish:storyboard`. Storyboard will do its own build of the Ui packages, so you don't need to build the package before running running the documentation build.
