
import React, { createContext, useReducer } from 'react';
import { ChatReducer } from './chatReducer';

export const ChatContext = createContext();

const initialState = {
    uid: '',
    chatActivo: null,
    array_usuario: [],
    array_mensaje: [],
};

export const ChatProvider = ( { children } ) => {

    const [ chatState, dispatch ] = useReducer( ChatReducer, initialState );

    return (
        <ChatContext.Provider value={ { chatState, dispatch } }>
            { children }
        </ChatContext.Provider>
    );
};
