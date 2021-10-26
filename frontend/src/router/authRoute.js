
import React from 'react';

import { Redirect, Route, Switch } from 'react-router-dom';

import { LoginPage } from '../pages/loginPage';
import { RegisterPage } from '../pages/registerPage';
import '../css/auth.css';

export const AuthRoute = () => {

    return (
        <section className="ftco-section">
            <div className="container">
                <Switch>
                    <Route exact path="/auth/login" render={ ( props ) => <LoginPage { ...props } /> } />
                    <Route exact path="/auth/register" render={ ( props ) => <RegisterPage { ...props } /> } />

                    <Redirect exact to="/auth/login" />
                </Switch>
            </div>
        </section>
    );
};
