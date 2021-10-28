
import React, { createContext, useReducer } from 'react';
import { SalaReducer } from './salaReducers';

export const SalaContext = createContext();

const initialState = {
    array_sala: [],
};

export const SalaProvider = ( { children } ) => {

    const [ salaState, dispatchSala ] = useReducer( SalaReducer, initialState );

    return (
        <SalaContext.Provider value={ { salaState, dispatchSala } }>
            { children }
        </SalaContext.Provider>
    );
};
