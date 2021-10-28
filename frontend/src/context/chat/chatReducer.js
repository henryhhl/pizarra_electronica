
import { types } from '../../types/types';

export const ChatReducer = ( state, action ) => {

    switch ( action.type ) {

        case types.getUsuario:
            return {
                ...state,
                array_usuario: [ ...action.payload ],
            };

        case types.activarChat:
            if ( state.chatActivo?.uid === action.payload?.uid ) return state;
            return {
                ...state,
                chatActivo: action.payload,
                array_mensaje: [],
            };

        case types.limpiarChat:
            return {
                ...state,
                uid: '',
                chatActivo: null,
                array_usuario: [],
                array_mensaje: [],
            };

        case types.nuevoMensaje:
            if ( state.chatActivo?.uid === action.payload.de || state.chatActivo?.uid === action.payload.para ) {
                return {
                    ...state,
                    array_mensaje: [ ...state.array_mensaje ,action.payload ],
                };
            }
            return state;

        case types.cargarMensaje:
            return {
                ...state,
                array_mensaje: [ ...action.payload ],
            };

        default:
            return state;
    }
};
