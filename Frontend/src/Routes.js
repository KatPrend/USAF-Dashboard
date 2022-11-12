import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Main from './pages/Main';
import Clin from './pages/Clin';
import GetExample from './pages/GetExample';
import NewProject from './pages/NewProject';
import PreAwardProject from './pages/PreAwardProject';
import AwardedProject from './pages/AwardedProject';
import Dependency from './pages/Dependency';
import WBS from './pages/WBS'
import Admin from './pages/Admin';
import { Chart } from "react-google-charts";


function Routes() {
    return (
        <Switch>
            <Route exact path="/redirect">
                <Dependency firstLoad='1' />
            </Route>
            <Route exact path="/dependency">
                <Dependency firstLoad='0'/>
            </Route>
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
            <Route exact path="/projects">
                <GetExample />
            </Route>
            <Route exact path="/newProject">
                <NewProject />
            </Route>
            <Route exact path="/wbs">
                <WBS />
            </Route>
            <Route exact path="/admin">
                <Admin />
            </Route>
            <Route exact path="/*">
                <p>Invalid Page</p>
            </Route>
        </Switch>
    );
}

export default Routes;