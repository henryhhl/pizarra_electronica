
import { types } from '../../types/types';

export const SalaReducer = ( state, action ) => {

    switch ( action.type ) {

        case types.getSala:
            return {
                ...state,
                array_sala: [ ...action.payload ],
            };

        case types.getSalaUsuario:
            return {
                ...state,
                array_usuario: [ ...action.payload ],
            };

        case types.limpiarSalaUsuario:
            return {
                ...state,
                array_usuario: [],
            };

        case types.limpiarSala:
            return {
                ...state,
                array_sala: [],
                array_usuario: [],
            };

        default:
            return state;
    }
};
