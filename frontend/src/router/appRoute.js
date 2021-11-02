
import { Button } from 'antd';
import React, { useContext, useEffect } from 'react';

import { BrowserRouter, Redirect, Switch } from 'react-router-dom';
import { AuthContext } from '../auth/authContext';

import { LoadingPage } from '../pages/loadingPage';
// import { PizarraVirtualPage } from '../pages/pizarraVirtualPage';

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

    if ( auth.onOffLine ) {
        // return (
        //     <PizarraVirtualPage />
        // );

        return (
            <div style={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                <div style={ { width: '40%', display: 'block' }}>
                    <div>Sin Conexión a internet</div>
                    <div style={{ marginTop: 10, }}>
                        <Button type="primary" style={{ backgroundColor: '#00ba8b', }}
                            onClick={ () => document.getElementById('reiniciarUri').click() }
                        >
                            Reintentar
                        </Button>
                        <a href="/home" id="reiniciarUri" style={{ display: 'none' }}></a>
                    </div>
                </div>
            </div>
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
