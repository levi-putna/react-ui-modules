import React from 'react';
import {Route, Switch} from 'react-router-dom';

// Root Application container.
import {AppContainer} from './routes/application';

const NotFound = () => <div>NotFound</div>;

export default (
    <Switch>
        <Route path="/" component={AppContainer}/>
        <Route component={NotFound}/>
    </Switch>
);
