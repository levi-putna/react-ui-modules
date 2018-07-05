import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import {Box} from "react-ui-modules";

import {Menu} from '../menu';
import style from './AppContainer.scss';

const Dash = () => <div>React App</div>;
import {Components} from "../";
import {Email} from "../";

export default class AppContainer extends Component {
    render() {
        return (
            <Box className={style.container} fill={true} direction={Box.DIRECTION.ROW}>
                <Menu />
                <Box height="100%" minWidth="400px" className={style.content}>
                    <div className={style.body}>
                        <Switch>
                            <Route exact path="/" component={Dash}/>
                            <Route exact path="/components" component={Components}/>
                            <Route exact path="/email" component={Email}/>
                        </Switch>
                    </div>
                </Box>
            </Box>
        );
    }
}