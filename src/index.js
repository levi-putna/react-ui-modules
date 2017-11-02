/*
 * This is the entry strip for this libary, it exists only to export and ecposr
 * components created within this libary. 
 */

import {Button} from "./elements/button/";
import {Loading} from "./elements/indicator/";

// Form
import {Form, Field, FieldSet} from "./elements/form/";
import {InputField} from "./elements/form/input";
import {TextField} from "./elements/form/text";
import {ToggleField} from "./elements/form/toggle";
import {TagField} from "./elements/form/tag";
import {DropdownField} from "./elements/form/dropdown";
import {DateField} from "./elements/form/date";
import {SelectField} from "./elements/form/select";

// Grid
import {Grid, Row, Col} from "./elements/grid";

// Icon
import {Icon, IconType} from './elements/icon';

// Tooltip
import {Tooltip} from './elements/tooltip';

// Tags
import {Tag, TagGroup} from './elements/tag';

// Typology
import {Title, Alert} from './elements/typology';

// Breadcrumb
import {Breadcrumb, BreadcrumbItem} from './elements/breadcrumb';

// View Components
import {ViewComponent} from './components/view';
import {ListView, ListItem} from './components/list';

/**
 * All components that will be published as part of this module must be exposed
 * via module.exports. They can then be access as part of the mocule using es5
 * include. Example `include {Button} from 'react-component-lib'`
 * @type {Object}
 */
module.exports = {
    Button,
    Loading,
    Form,
    Field,
    FieldSet,
    InputField,
    TextField,
    ToggleField,
    TagField,
    DropdownField,
    DateField,
    SelectField,

    Grid,
    Row,
    Col,

    Icon,
    IconType,

    Tooltip,

    Tag,
    TagGroup,

    ViewComponent,
    ListView,
    ListItem,

    Breadcrumb,
    BreadcrumbItem,

    Title,
    Alert
};
