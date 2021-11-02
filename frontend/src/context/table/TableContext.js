
import React, { createContext, useReducer } from 'react';
import { TableReducer } from './TableReducers';

export const TableContext = createContext();

const initialState = {
    array_table: [],
};

export const TableProvider = ( { children } ) => {

    const [ tableState, dispatchTable ] = useReducer( TableReducer, initialState );

    return (
        <TableContext.Provider value={ { tableState, dispatchTable } }>
            { children }
        </TableContext.Provider>
    );
};
