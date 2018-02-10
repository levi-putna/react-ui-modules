import React, {Component} from "react";

import style from './ListGroup.scss';

export default class ListGroup extends Component {

    render() {

        const {title}  = this.props;

        return (
            <div data-role="list-group" className={style.container}>
                { title }
            </div>
        );
    }
}
