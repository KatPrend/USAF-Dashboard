import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Main from './pages/Main';
import Clin from './pages/Clin';
import GetExample from './pages/GetExample';
import PostExample from './pages/PostExample';
import PreAwardProject from './pages/PreAwardProject'
import AwardedProject from './pages/AwardedProject'

function Routes() {
    return (
        <Switch>
            <Route exact path="/">
                <Main />
            </Route>
            <Route exact path="/clin">
                <Clin />
            </Route>
            <Route exact path="/preawardproject">
                <PreAwardProject />
            </Route>
            <Route exact path="/awardedproject">
                <AwardedProject />
            </Route>

        </Switch>
    );
}

export default Routes;