import React, {Component} from 'react'
import ReactDom from 'react-dom';
import classNames from 'classnames';

import style from './ListView.scss';

export default class ListView extends Component {

    constructor() {
        super();
        this.handleScroll = this.handleScroll.bind(this);
        this.initialize = this.initialize.bind(this)
    }

    componentDidMount() {
        this.initialize();
        window.addEventListener('resize', this.initialize)

    }

    componentDidUpdate() {
        this.initialize()
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.initialize);
    }

    initialize() {
        this.scroll_container = ReactDom.findDOMNode(this);
        this.findAllGroupHeaders();
        this.findCursor();
        this.updateActiveHeader()
    }

    /**
     * Find all the group header elements on the page.
     */
    findAllGroupHeaders() {
        const node = this.scroll_container;
        this.group_headings = node.querySelectorAll('[data-role="list-group"]');
    }

    /**
     * Update the cursor that controles what group heading is currently the
     * active group.
     */
    findCursor() {
        const node = this.scroll_container;
        const group_headings = this.group_headings;

        if (group_headings.length === 0) {
            return;
        }

        //find the current group_header and next sticky elements
        if (group_headings[0].offsetTop > node.scrollTop) {
            this.group_heading_cursor = -1
        } else {
            let i = 0;
            while (true) {
                let next = group_headings[i + 1];

                if (next.offsetTop > node.scrollTop) {
                    this.group_heading_cursor = i;
                    break;
                } else {
                    i++;
                    if (i + 1 === group_headings.length) {
                        break
                    }

                }
            }
        }
        this.setNodes()
    }

    /**
     * Set the group header nodes used for calculation what node to desplay
     */
    setNodes() {
        this.current_heading = this.group_headings[this.group_heading_cursor];
        this.next_heading = this.group_headings[this.group_heading_cursor + 1] || null
    }

    /**
     * Update the active header depending upon the current scroll position
     * of the component.
     */
    updateActiveHeader() {
        //remove last group_header and placeholder
        this.unset();
        this.setNodes();

        if (this.current_heading) {
            //insert placeholder
            this.insertPlaceholder(this.current_heading);
            this.makeActiveGroupHeader(this.current_heading);
        }
    }

    unset() {
        if (this.current_heading) {
            this.current_heading.style.position = 'inherit';
            this.current_heading.style.top = null;
            this.current_heading.classList.remove('group_header');
            if (this.placeholder) {
                this.placeholder.parentNode.removeChild(this.placeholder);
            }

            this.placeholder = null;
            this.current_heading = null;
        }
        this.next_heading = null;
    }

    /**
     * Create a placeholder for the new active group header.
     */
    insertPlaceholder(group_header) {
        this.placeholder = document.createElement("div")
        this.placeholder.style.width = group_header.clientWidth + 'px'
        this.placeholder.style.height = group_header.offsetHeight + 'px'
        group_header.parentNode.insertBefore(this.placeholder, group_header)
    }

    /**
     * Set the active group group header
     */
    makeActiveGroupHeader(group_header) {
        let bounds = this.scroll_container.getBoundingClientRect();
        group_header.style.width = bounds.width + 'px';
        group_header.style.height = group_header.offsetHeight + 'px';
        group_header.style.top = this.scroll_container.offsetTop + 'px';
        group_header.style.position = 'fixed';
        group_header.style.clip = "rect(0px," + bounds.width + "px," + bounds.height + "px,0px)";
    }

    handleRefresh(resolve, reject) {

        // do some async code here
        if (true) {
            resolve();
        } else {
            reject();
        }

    }

    /**
     * This handler does as little work as possible, checking if
     * a) the scrollTop has hit our up or down boundaries -> Change cursor and update sticky state
     * b) if nothing is "set" and we are scrolling down -> Update boundaries
     */
    handleScroll() {
        let node = this.scroll_container;
        let down_boundary = this.next_heading && this.next_heading.offsetTop;
        let up_boundary = this.placeholder && this.placeholder.offsetTop;
        let set = (this.group_heading_cursor === -1 || up_boundary)
            ? true
            : false;
        let real_scroll_top = node.offsetTop + node.scrollTop;

        //If we are not set, reset cursor on next downward scroll.
        //This will get called once to set this new up/down boundaries
        if (!set && this.last_scroll_top < real_scroll_top) {
            this.findCursor();

            //If we have crossed our downward boundary, make sticky
            if (down_boundary && down_boundary < node.scrollTop) {
                ;
            }
            this.updateActiveHeader();
            return;
        }

        this.last_scroll_top = real_scroll_top;

        //Check if we have hit our boundaries and change the cursor and group_header state accordingly
        if (down_boundary && real_scroll_top >= down_boundary) {
            this.findCursor();
            this.group_heading_cursor++;
            this.updateActiveHeader();
            return
        }

        if (up_boundary && real_scroll_top <= up_boundary) {
            this.group_heading_cursor--;
            this.unset();
            this.updateActiveHeader();
            return
        }

        //Check for Sticky collision and adjust top position accordingly
        //TODO: Need to workout how to hide group under parent when scrolling,
        // if (set && this.current_heading && real_scroll_top >= down_boundary - this.current_heading.offsetHeight) {
        //     // For now we will simplet swap headdings whenever the new title is at the top.
        //     var top = Math.min(node.offsetTop, this.next_heading.offsetTop - node.scrollTop - this.current_heading.offsetHeight)
        //     this.current_heading.style.top = top + 'px'
        //     return
        // }

        //If none of the above conditions triggered, check if we are out of bounds, and if so reset cursor
        if (real_scroll_top > down_boundary || real_scroll_top < up_boundary) {
            this.findCursor();
            return
        }

    }

    /**
     * Get List
     * Generate the list of members. This can be done in two ways depending on
     * the state of the search. If the customer is currently searching, then the
     * list will return a list of search results. If the state has no search, then
     * the complete list of global state contacts is returned.
     */
    getList() {
        return null
    }

    /**
     * Render the core list element. If you wish to extend this component and wrap it in additional functionality, make
     * sure to call this method from the render method.
     *
     * @returns {XML}
     */
    renderList() {
        const {className} = this.props;

        const classes = classNames(style.container, className);

        return (
            <div onScroll={this.handleScroll} className={classes}>
                {this.getList()}
            </div>
        )
    }

    /**
     * Render the list, if you override make sure to call renderList()
     * @returns {XML}
     */
    render() {
        return this.renderList();
    }
}
