import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Main from './pages/Main';

function Routes() {
    return (
        <Switch>
            <Route exact path="/">
                <Main />
            </Route>
        </Switch>
    );
}

export default Routes;