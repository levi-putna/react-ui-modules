import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router';

import './ListItem.scss';


export default class ListItem extends Component {

    static propTypes = {
        member : PropTypes.object.isRequired,
        query: PropTypes.string
    };

    static defaultProps = {
        query: ''
    };

    render() {

        const {member, children, to} = this.props;

        return (
            <Link to={to} className="list-item"
                  activeclassNameName="list-item--active">

                {children}

            </Link>
        );
    }

}
