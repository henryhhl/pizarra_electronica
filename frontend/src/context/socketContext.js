
import React, { createContext, useContext, useEffect } from 'react';

import { AuthContext } from '../auth/authContext';
import { ChatContext } from './chat/chatContext';
import { SalaContext } from './sala/salaContext';

import { useSocket } from '../hooks/useSocket';

import { types } from '../types/types';
import { scrollToBottom } from '../helpers/scroll';

export const SocketContet = createContext();

export const SocketProvider = ( { children } ) => {

    const { conectarSocket, desconectarSocket, online, socket } = useSocket( "http://localhost:5000" );

    const { auth } = useContext( AuthContext );
    const { dispatch } = useContext( ChatContext );
    const { dispatchSala } = useContext( SalaContext );

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
            console.log(users)
            dispatch( { type: types.getUsuario, payload: users, } );
        } );
    }, [ socket, dispatch ] );

    useEffect( () => {
        socket?.on( 'sala-actualizada', ( sala ) => {
            console.log(sala);

            socket?.emit( 'getSala', auth.uid );

        } );
    }, [ socket, dispatch ] );

    useEffect( () => {
        socket?.on( 'getSala', ( salas ) => {
            console.log(salas)
            dispatchSala( { type: types.getSala, payload: salas, } );
        } );
    }, [ socket, dispatchSala ] );


    useEffect( () => {
        socket?.on( 'mensaje-personal', ( mensaje ) => {
            dispatch( { type: types.nuevoMensaje, payload: mensaje, } );

            scrollToBottom('messageID');
        } );
    }, [ socket, dispatch ] );


    return (
        <SocketContet.Provider value={ { socket, online } }>
            { children }
        </SocketContet.Provider>
    );
};
