
import React from 'react';

import { Redirect, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from "history";
import 'antd/dist/antd.css';

import { HomePage } from '../pages/homePage';
import { AppMain } from '../layouts/appMain';

const history = createBrowserHistory();
export const HomeRoute = () => {

    return (
        <Switch>
            

            <Route history={history}>
                <AppMain>

                    <Switch>
                        <Route exact path="/home" render={ ( props ) => <HomePage { ...props } /> } />

                        <Redirect exact to="/home" />
                    </Switch>
                    
                </AppMain>
            </Route>

        </Switch>
    );
};
