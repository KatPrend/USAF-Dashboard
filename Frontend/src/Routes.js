import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Main from './pages/Main';
import Clin from './pages/Clin'

function Routes() {
    return (
        <Switch>
            <Route exact path="/">
                <Main />
            </Route>
            <Route exact path="/clin">
                <Clin />
            </Route>
            
        </Switch>
    );
}

export default Routes;