
import { types } from '../../types/types';

export const SalaReducer = ( state, action ) => {

    switch ( action.type ) {

        case types.getSala:
            return {
                ...state,
                array_sala: [ ...action.payload ],
            };

        case types.limpiarSala:
            return {
                ...state,
                array_sala: [],
            };

        default:
            return state;
    }
};
