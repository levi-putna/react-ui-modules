import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {Component} from 'elements/base';
import {Icon, IconType} from 'elements/icon';
import accepts from 'attr-accept';

import style from './Dropzone.scss';

/**
 * Field is the base class for all form fields. It provides a lot of shared functionality to all field subclasses
 * (for example labels, simple validation, clearing and tab index management), but is rarely used directly.
 * Instead, it is much more common to use one of the field subclasses.
 *
 * If you wish to create your own Field subclasses you can extend this class, though it is sometimes more useful
 * to extend one of the other base subclasses as they provides additional base functionality.
 */
export default class Dropzone extends Component {

    static propTypes = {
        ...Component.propTypes,
        onClick: PropTypes.func,
        onDrop: PropTypes.func,
        onDropAccepted: PropTypes.func,
        onDropRejected: PropTypes.func,
        onDragStart: PropTypes.func,
        onDragEnter: PropTypes.func,
        onDragOver: PropTypes.func,
        onDragLeave: PropTypes.func,

        inputProps: PropTypes.object, // Pass additional attributes to the <input type="file"/> tag
        accept: PropTypes.string, // Allow specific types of files. See https://github.com/okonet/attr-accept for more information
        name: PropTypes.string // name attribute for the input tag
    };

    static defaultProps = {
        ...Component.defaultProps,
        disablePreview: false,
        disableClick: false,
        multiple: false,
        maxSize: Infinity,
        minSize: 0
    };

    constructor(props, context) {
        super(props, context);

        this.onClick = this.onClick.bind(this);
        this.onDragStart = this.onDragStart.bind(this);
        this.onDragEnter = this.onDragEnter.bind(this);
        this.onDragLeave = this.onDragLeave.bind(this);
        this.onDragOver = this.onDragOver.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.onFileDialogCancel = this.onFileDialogCancel.bind(this);
        this.fileAccepted = this.fileAccepted.bind(this);

        this.isFileDialogActive = false;

        this.state = {
            isDragActive: false
        };
    }

    static renderChildren(children, isDragActive, isDragReject) {
        if (typeof children === 'function') {
            return children({isDragActive, isDragReject});
        }
        return children;
    }

    static getDataTransferItems(event, isMultipleAllowed = true) {
        let dataTransferItemsList = [];
        if (event.dataTransfer) {
            const dt = event.dataTransfer;
            if (dt.files && dt.files.length) {
                dataTransferItemsList = dt.files;
            } else if (dt.items && dt.items.length) {
                // During the drag even the dataTransfer.files is null
                // but Chrome implements some drag store, which is accesible via dataTransfer.items
                dataTransferItemsList = dt.items;
            }
        } else if (event.target && event.target.files) {
            dataTransferItemsList = event.target.files;
        }

        if (dataTransferItemsList.length > 0) {
            dataTransferItemsList = isMultipleAllowed ? dataTransferItemsList : [dataTransferItemsList[0]];
        }

        // Convert from DataTransferItemsList to the native Array
        return Array.prototype.slice.call(dataTransferItemsList);
    }

    componentDidMount() {
        this.enterCounter = 0;

        // Tried implementing addEventListener, but didn't work out
        document.body.onfocus = this.onFileDialogCancel;
    }

    static componentWillUnmount() {
        // Can be replaced with removeEventListener, if addEventListener works
        document.body.onfocus = null;
    }

    onDragStart(e) {
        if (this.props.onDragStart) {
            this.props.onDragStart.call(this, e);
        }
    }

    onDragEnter(e) {
        e.preventDefault();

        // Count the dropzone and any children that are entered.
        ++this.enterCounter;

        const allFilesAccepted = this.allFilesAccepted(Dropzone.getDataTransferItems(e, this.props.multiple));

        this.setState(
            {
                isDragActive: allFilesAccepted,
                isDragReject: !allFilesAccepted
            }
        );

        if (this.props.onDragEnter) {
            this.props.onDragEnter.call(this, e);
        }
    }

    onDragOver(e) {
        e.preventDefault();
        e.stopPropagation();
        try {
            e.dataTransfer.dropEffect = 'copy'; // eslint-disable-line no-param-reassign
        } catch (err) {
            // continue regardless of error
        }

        if (this.props.onDragOver) {
            this.props.onDragOver.call(this, e);
        }
        return false;
    }

    onDragLeave(e) {
        e.preventDefault();

        // Only deactivate once the dropzone and all children was left.
        if (--this.enterCounter > 0) {
            return;
        }

        this.setState(
            {
                isDragActive: false,
                isDragReject: false
            }
        );

        if (this.props.onDragLeave) {
            this.props.onDragLeave.call(this, e);
        }
    }

    onDrop(e) {
        const {onDrop, onDropAccepted, onDropRejected, multiple, disablePreview} = this.props;
        const fileList = Dropzone.getDataTransferItems(e, multiple);
        const acceptedFiles = [];
        const rejectedFiles = [];

        // Stop default browser behavior
        e.preventDefault();

        // Reset the counter along with the drag on a drop.
        this.enterCounter = 0;
        this.isFileDialogActive = false;

        fileList.forEach((file) => {
            if (!disablePreview) {
                file.preview = window.URL.createObjectURL(file);
            }

            if (this.fileAccepted(file) && this.fileMatchSize(file)) {
                acceptedFiles.push(file);
            } else {
                rejectedFiles.push(file);
            }
        });

        if (onDrop) {
            onDrop.call(this, acceptedFiles, rejectedFiles, e);
        }

        if (rejectedFiles.length > 0 && onDropRejected) {
            onDropRejected.call(this, rejectedFiles, e);
        }

        if (acceptedFiles.length > 0 && onDropAccepted) {
            onDropAccepted.call(this, acceptedFiles, e);
        }

        // Reset drag state
        this.setState(
            {
                isDragActive: false,
                isDragReject: false
            }
        );
    }

    onClick(e) {
        const {onClick, disableClick} = this.props;
        if (!disableClick) {
            e.stopPropagation();
            this.open();
            if (onClick) {
                onClick.call(this, e);
            }
        }
    }

    onFileDialogCancel() {
        // timeout will not recognize context of this method
        const {onFileDialogCancel} = this.props;
        const {fileInputEl} = this;
        let {isFileDialogActive} = this;
        // execute the timeout only if the onFileDialogCancel is defined and FileDialog
        // is opened in the browser
        if (onFileDialogCancel && isFileDialogActive) {
            setTimeout(() => {
                // Returns an object as FileList
                const FileList = fileInputEl.files;
                if (!FileList.length) {
                    isFileDialogActive = false;
                    onFileDialogCancel();
                }
            }, 300);
        }
    }

    fileAccepted(file) {
        return accepts(file, this.props.accept);
    }

    fileMatchSize(file) {
        return file.size <= this.props.maxSize && file.size >= this.props.minSize;
    }

    allFilesAccepted(files) {
        return files.every(this.fileAccepted);
    }

    open() {
        this.isFileDialogActive = true;
        this.fileInputEl.value = null;
        this.fileInputEl.click();
    }

    render() {

        const {testId, className, accept, inputProps, name, children, ...rest} = this.props;

        let {...props} = rest;

        const {isDragActive, isDragReject} = this.state;

        const classes = classNames(style.container, {
            [style.active]: (isDragActive),
            [style.reject]: (isDragReject),
        }, className);

        const inputAttributes = {
            accept,
            type: 'file',
            style: {display: 'none'},
            ref: el => this.fileInputEl = el, // eslint-disable-line
            onChange: this.onDrop
        };

        if (name && name.length) {
            inputAttributes.name = name;
        }

        // Remove custom properties before passing them to the wrapper div element
        const customProps = [
            'acceptedFiles',
            'disablePreview',
            'disableClick',
            'onDropAccepted',
            'onDropRejected',
            'onFileDialogCancel',
            'maxSize',
            'minSize'
        ];
        const divProps = {};
        customProps.forEach(prop => delete divProps[prop]);

        return (
            <div
                className={classes}
                data-test-id={testId}
                {...divProps}
                onClick={this.onClick}
                onDragStart={this.onDragStart}
                onDragEnter={this.onDragEnter}
                onDragOver={this.onDragOver}
                onDragLeave={this.onDragLeave}
                onDrop={this.onDrop}
            >
                {Dropzone.renderChildren(children, isDragActive, isDragReject)}
                <input
                    {...inputProps}
                    {...inputAttributes}
                />
                <div className={style.overlay}>
                    <div>
                        <Icon className={style.icon} type={IconType.upload} />
                        <p className={style.title}>Drop file or click to upload</p>
                        <p className={style.message}>JPG, GIF or PND greater than 400 x 400 pixels</p>
                    </div>
                </div>
            </div>
        );

    }
}
