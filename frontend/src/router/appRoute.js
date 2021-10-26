
import React, { useContext, useEffect } from 'react';

import { BrowserRouter, Redirect, Switch } from 'react-router-dom';
import { AuthContext } from '../auth/authContext';

import { LoadingPage } from '../pages/loadingPage';

import { AuthRoute } from './authRoute';
import { HomeRoute } from './HomeRoute';
import { PrivateRoute } from './privateRoute';
import { PublicRoute } from './publicRoute';

export const AppRoute = () => {

    const { auth, verificaToken } = useContext( AuthContext );

    useEffect( () => {
        verificaToken();
    }, [verificaToken] );

    if ( auth.checking ) {
        return (
            <LoadingPage />
        );
    }

    return (
        <BrowserRouter>
            <div>
                <Switch>
                    
                    <PublicRoute isAuthenticated={ auth.logged } path="/auth" component={ AuthRoute } />

                    <PrivateRoute isAuthenticated={ auth.logged } path="/" component={ HomeRoute } />

                    <Redirect exact to="/home" />
                </Switch>
            </div>
        </BrowserRouter>
    );
};
