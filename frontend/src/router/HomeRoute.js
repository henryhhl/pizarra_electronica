
import React, { useState } from 'react';

import { Redirect, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from "history";
import 'antd/dist/antd.css';

import { HomePage } from '../pages/homePage';
import { AppMain } from '../layouts/appMain';
import { PizarraVirtualPage } from '../pages/pizarraVirtualPage';

const history = createBrowserHistory();
export const HomeRoute = () => {

    const [ keyMenu, setKeyMenu ] = useState('1');

    return (
        <Switch>
            
            <Route exact path="/pizarra_virtual/:uidsala" render={ 
                ( props ) => <PizarraVirtualPage { ...props } /> } 
            />
            <Route history={history}>
                <AppMain keyMenu={keyMenu} setKeyMenu={ (key) => setKeyMenu(key) }>

                    <Switch>
                        <Route exact path="/home" render={ 
                            ( props ) => <HomePage keyMenu={keyMenu} setKeyMenu={ (key) => setKeyMenu(key) } { ...props } /> } 
                        />

                        <Redirect exact to="/home" />
                    </Switch>
                    
                </AppMain>
            </Route>

        </Switch>
    );
};
