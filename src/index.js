/*
 * This is the entry strip for this libary, it exists only to export and ecposr
 * components created within this libary. 
 */

import {Button} from "./elements/button/";
import {Loading} from "./elements/indicator/";

// Form
import {Form} from "./elements/form/";
import {Field, FieldSet} from "./elements/form/field";
import {InputField} from "./elements/form/input";
import {TextField} from "./elements/form/text";
import {ToggleField} from "./elements/form/toggle";
import {TagField} from "./elements/form/tag";
import {DropdownField} from "./elements/form/dropdown";
import {DateField} from "./elements/form/date";
import {SelectField} from "./elements/form/select";
import {PasswordField} from "./elements/form/password";
import {Dropzone} from "./elements/form/dropzone";

import {EmailBuilder} from "./components/email";

// Format
import {Format} from "./elements/form/format";
import {NumberFormat} from "./elements/form/format";

// Layout Components
import {Grid, Row, Col} from "./elements/grid";
import {Box} from "./elements/box";
import {ListView, ListItem, ListGroup} from "./components/list";
import {Tab, TabPanel} from "./elements/tab";

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

import {Modal, WindowModal, SideModal} from "./components/modal";

import {Carousel} from "./components/carousel";

import {Calendar} from "./components/calendar";

// Dropdown
import {Dropdown} from './elements/dropdown';

import {DateTime} from './components/date';

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
    PasswordField,
    Dropzone,

    EmailBuilder,

    Format,
    NumberFormat,

    Dropdown,

    Grid,
    Row,
    Col,
    Box,
    Tab,
    TabPanel,

    ListView,
    ListItem,
    ListGroup,

    Icon,
    IconType,

    Tooltip,

    Tag,
    TagGroup,

    Breadcrumb,
    BreadcrumbItem,

    Title,
    Alert,

    Modal,
    WindowModal,
    SideModal,

    Carousel,

    Calendar,
    DateTime
};
