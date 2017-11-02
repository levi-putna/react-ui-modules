import {Component as ReactComponent} from 'react';

/**
 * The root of all components created.
 * Component is the building block of all visual components in this liberty. All all other visual components
 * interact from this class, which means they all prototype, methods and static members of this class are inherited
 * by all other Components. As such great consideration should be taken when adding anything to this class, it
 * may be a better option to create a new subclass for functionality that is only required by a small
 * number of other components.
 *
 * Component extends on top of the base React component to add common methods unique to this liberty.
 *
 * Component is typically not instantiated directly, and should be used as the base of other components.
 */
export default class Component extends ReactComponent {

    constructor(props) {
        super(props);

        /**
         * Root DOM node of this component. This is set by calling setNode when rendering the component.
         * @type {null}
         */
        this.node = null;
    }

    /**
     * Set the root node of this field.
     * @param node
     */
    setNode(node) {
        this.node = node;
    }

}

