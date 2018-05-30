h1. Overview

A common set of UI elements that can be reused in any React project.

NOTE: This module is still in early stages of DEVELOPMENT, Its API's are not stable yet, and are subject to change.

h1. Development

When developing you will need to have another react app that you want to import this module into.

We’ll need an app to experiment with our components locally. You can use an existing react project, or use something simple like https://github.com/facebookincubator/create-react-app.


h2. Linking our Library

NOTE: You’ll probably want to keep your component library open in one terminal pane and your test app in another.

First you need to create a symlink of the library locally (If you’d like to learn more about `npm link`, check out https://docs.npmjs.com/cli/link.) from the root of the component library, run `yarn link` link. You’ll notice this will also run the prepublish script in the console, this will conduct the initial build of the module.

You can now run the `yarn start:client` command, this will keep an eye on any changes and update the build and symlink whenever anything changes. This allows us to develop in the local module, and see the results in our linked project.

Now we’ll tell our other app that we want to use that symlinked library. From the root of your included app run `yarn link react-ui-modules`.

You can now include the component you wish to work on in your other app `include {Button, Form} from 'react-ui-modules'`. Changes made to the module will be made available to the linked project via the symlink.

h2. GIT

This module makes use of the Gitflow workflow for managing its git versioning and bug fixes. Learn more at https://nvie.com/posts/a-successful-git-branching-model/

h1. Publish

To publish a new version of the module to NPM push all changes to the GIT repo master branch, then use the `yarn publish` command to push the changes. This will run the prepublish script to build the module before pushing up the changes. Make sure to increment the version making use of the NPM semantic versioning or users may not be able to update to the latest version. (Learn more about about NPM semantic versioning at https://docs.npmjs.com/getting-started/semantic-versioning)
