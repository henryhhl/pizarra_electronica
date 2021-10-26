
import React, { createContext, useContext, useEffect } from 'react';

import { AuthContext } from '../auth/authContext';
import { ChatContext } from './chat/chatContext';

import { useSocket } from '../hooks/useSocket';

import { types } from '../types/types';

export const SocketContet = createContext();

export const SocketProvider = ( { children } ) => {

    const { conectarSocket, desconectarSocket, online, socket } = useSocket( "http://localhost:5000" );
    const { auth } = useContext( AuthContext );
    const { dispatch } = useContext( ChatContext );

    useEffect( () => {
        if ( auth.logged ) {
            conectarSocket();
        }
    }, [ auth, conectarSocket ] );

    useEffect( () => {
        if ( !auth.logged ) {
            desconectarSocket();
        }
    }, [ auth, desconectarSocket ] );

    useEffect( () => {
        socket?.on( 'getUsuario', ( users ) => {
            dispatch( { type: types.getUsuario, payload: users, } );
        } );
    }, [ socket, dispatch ] );

    return (
        <SocketContet.Provider value={ { socket, online } }>
            { children }
        </SocketContet.Provider>
    );
};
