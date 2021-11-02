
import { types } from '../../types/types';

export const TableReducer = ( state, action ) => {

    switch ( action.type ) {

        case types.getTable:
            return {
                ...state,
                array_table: [ ...action.payload ],
            };

        case types.limpiarTable:
            return {
                ...state,
                array_table: [],
            };

        default:
            return state;
    }
};
