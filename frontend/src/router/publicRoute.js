
import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export const PublicRoute = ( props ) => {

    const { isAuthenticated, component: Component, ...rest } = props;

    return (
        <Route 
            { ...rest } 
            component={ ( props ) => (
                ( !isAuthenticated ) ? <Component { ...props } /> : <Redirect to="/home" />
            ) }
        />
    );
};
