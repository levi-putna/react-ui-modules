# Description
A date picker component which shows a calender dropdown, or allows manual eatery of the date with some auto formatting.

The value will be transformed to the displayFormat when rendered in the ui, but the actual value used by the component will remain in the valueFormat. Use the 'displayFormat' & 'valueFormat' props to adjust the format.

Note: If an value is provided in a format that doesn't match the 'valueFormat', the component will attempt to transform the date using recognized RFC2822 or ISO formats.

# Example
~~~js

import {SideModal} from 'react-ui-modules';

<SideModal title="Segment Title" isOpen={true} onClose={() => {console.log('Do Close');}}>
    Some content...
</SideModal>
~~~