
import React, { createContext, useCallback, useState } from 'react';
import { fetchConToken, fetchSinToken } from '../helpers/fetch';

export const AuthContext = createContext();

const initialState = {
    uid: null,
    checking: true,
    logged: false,
    nombre: null,
    apellido: null,
    usuario: null,
    email: null,
};

export const AuthProvider = ( { children } ) => {

    const [ auth, setAuth ] = useState( initialState );

    const login = async ( usuario, password ) => {
        const resp = await fetchSinToken( "/auth/login", { usuario, password }, 'POST' );
        console.log(resp)
        if ( resp.response === 1 ) {
            localStorage.setItem( "token", resp.token );
            const { usuario } = resp;
            setAuth( {
                uid: usuario.uid,
                checking: false,
                logged: true,
                nombre: usuario.nombre,
                apellido: usuario.apellido,
                usuario: usuario.usuario,
                email: usuario.email,
            } );
            return true;
        }
        return false;
    };

    const register = async ( nombre, apellido, email, usuario, password ) => {
        const resp = await fetchSinToken( "/auth/register", { nombre, apellido, email, usuario, password }, 'POST' );
        console.log(resp)
        if ( resp.response === 1 ) {
            localStorage.setItem( "token", resp.token );
            const { usuario } = resp;
            setAuth( {
                uid: usuario.uid,
                checking: false,
                logged: true,
                nombre: usuario.nombre,
                apellido: usuario.apellido,
                usuario: usuario.usuario,
                email: usuario.email,
            } );
            return resp;
        }
        return resp;
    };

    const verificaToken = useCallback( async () => {
        const token = localStorage.getItem('token');
        if ( !token ) {
            setAuth( {
                uid: null,
                checking: false,
                logged: false,
                nombre: null,
                apellido: null,
                usuario: null,
                email: null,
            } );
            return false;
        }

        const resp = await fetchConToken( "/auth/newToken");

        console.log(resp)
        if ( resp.response === 1 ) {
            localStorage.setItem( "token", resp.token );
            const { usuario } = resp;
            setAuth( {
                uid: usuario.uid,
                checking: false,
                logged: true,
                nombre: usuario.nombre,
                apellido: usuario.apellido,
                usuario: usuario.usuario,
                email: usuario.email,
            } );
            return true;
        }
        setAuth( {
            uid: null,
            checking: false,
            logged: false,
            nombre: null,
            apellido: null,
            usuario: null,
            email: null,
        } );

        return false;

    }, [] );

    const logout = ( ) => {
        localStorage.removeItem("token");
        setAuth( {
            uid: null,
            checking: false,
            logged: false,
            nombre: null,
            apellido: null,
            usuario: null,
            email: null,
        } );
    };

    return (
        <AuthContext.Provider value={ {
            auth,
            login,
            register,
            verificaToken,
            logout,
        } }>
            { children }
        </AuthContext.Provider>
    );
};

