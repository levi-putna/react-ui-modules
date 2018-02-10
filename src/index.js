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
import {PasswordField} from "./elements/form/password";
import {Dropzone} from "./elements/form/dropzone";

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

    Calendar
};
