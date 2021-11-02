
import React, { createContext, useCallback, useContext, useState } from 'react';

import { ChatContext } from '../context/chat/chatContext';
import { SalaContext } from '../context/sala/salaContext';
import { fetchConToken, fetchSinToken } from '../helpers/fetch';

import { types } from '../types/types';

export const AuthContext = createContext();

const initialState = {
    uid: null,
    checking: true,
    logged: false,
    nombre: null,
    apellido: null,
    usuario: null,
    email: null,
    onOffLine: false,
};

export const AuthProvider = ( { children } ) => {

    const [ auth, setAuth ] = useState( initialState );
    const { dispatch } = useContext( ChatContext );
    const { dispatchSala } = useContext( SalaContext );

    const login = async ( usuario, password ) => {
        const resp = await fetchSinToken( "/auth/login", { usuario, password }, 'POST' );
        if ( resp.response === 1 ) {

            dispatchSala( { type: types.getSala, payload: resp.array_sala, } );

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
        if ( resp.response === 1 ) {

            dispatchSala( { type: types.getSala, payload: resp.array_sala, } );
            
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
            dispatchSala( { type: types.limpiarSala } );
            dispatch( { type: types.limpiarChat } );
            setAuth( {
                uid: null,
                checking: false,
                logged: false,
                nombre: null,
                apellido: null,
                usuario: null,
                email: null,
                onOffLine: false,
            } );
            return false;
        }

        const resp = await fetchConToken( "/auth/newToken");
        console.log(resp);

        if ( !resp ) {
            setAuth( {
                onOffLine: true,
                checking: false,
            } );
            return false;
        }

        if ( resp.response === 1 ) {

            localStorage.setItem( "token", resp.token );
            const { usuario } = resp;

            dispatchSala( { type: types.getSala, payload: resp.array_sala, } );
            
            setAuth( {
                uid: usuario.uid,
                checking: false,
                logged: true,
                nombre: usuario.nombre,
                apellido: usuario.apellido,
                usuario: usuario.usuario,
                email: usuario.email,
                onOffLine: false,
            } );

            return true;
        }

        dispatchSala( { type: types.limpiarSala } );
        dispatch( { type: types.limpiarChat } );

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

        return false;

    }, [ dispatchSala, dispatch ] );

    const logout = ( ) => {
        localStorage.removeItem("token");

        dispatch( { type: types.limpiarChat } );
        dispatchSala( { type: types.limpiarSala } );

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

