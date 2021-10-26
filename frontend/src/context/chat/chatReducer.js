
import { types } from '../../types/types';

export const ChatReducer = ( state, action ) => {

    switch ( action.type ) {

        case types.getUsuario:
            return {
                ...state,
                array_usuario: [ ...action.payload ],
            };

        case types.activarChat:
            return {
                ...state,
                chatActivo: action.payload,
            };

        default:
            return state;
    }
};
