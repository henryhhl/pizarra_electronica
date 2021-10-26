
import React, { useContext, useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

import { AuthContext } from '../auth/authContext';

export const LoginPage = () => {

    const { login } =  useContext( AuthContext );

    const [ form, setForm ] = useState( {
        usuario: "admin",
        password: "123456",
        rememberme: false,
    } );

    useEffect( () => {
        const remembermeUsuario = localStorage.getItem( "usuario" );
        if ( remembermeUsuario ) {
            setForm( (form) => ( {
                ...form,
                usuario: remembermeUsuario,
                rememberme: true,
            } ) );
        }
    }, [] );

    function onChangeUsuario( evt ) {
        setForm( {
            ...form,
            usuario: evt.target.value,
        } );
    };
    function onChangePassword( evt ) {
        setForm( {
            ...form,
            password: evt.target.value,
        } );
    };
    function onCheckedRememberme() {
        console.log(1)
        setForm( {
            ...form,
            rememberme: !form.rememberme,
        } );
    };

    async function onSubmit( evt ) {
        evt.preventDefault();
        if ( form.rememberme ) {
            localStorage.setItem( "usuario", form.usuario );
        } else {
            localStorage.removeItem( "usuario" );
        }
        const { usuario, password } = form;
        const ok = await login( usuario, password );
        if ( !ok ) {
            Swal.fire( "Error", "Credenciales incorrecto", "error" );
        }
    };

    function todoOk() {
        return ( form.usuario.length > 0 && form.password.length > 0 );
    };

    return (
        <>
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-5">
                    <div className="login-wrap p-4 p-md-5">
                        <div className="icon d-flex align-items-center justify-content-center">
                            <span className="fa fa-user-o"></span>
                        </div>
                        <h3 className="text-center mb-4">
                            Iniciar sesión
                        </h3>
                        <form onSubmit={ onSubmit } className="login-form">
                            <div className="form-group">
                                <input 
                                    type="text" 
                                    className="form-control rounded-left" 
                                    placeholder="Usuario" required 
                                    value={form.usuario}
                                    onChange={ onChangeUsuario }
                                />
                            </div>
                            <div className="form-group d-flex">
                                <input 
                                    type="password"
                                    className="form-control rounded-left" 
                                    placeholder="Password" required 
                                    value={form.password}
                                    onChange={ onChangePassword }
                                />
                            </div>
                            <div className="form-group d-md-flex">
                                <div className="w-50">
                                    <label className="checkbox-wrap checkbox-primary">
                                        Recordarme
                                        <input 
                                            type="checkbox" checked={form.rememberme} readOnly
                                        />
                                        <span className="checkmark" onClick={ () => onCheckedRememberme() }></span>
                                    </label>
                                </div>
                                <div className="w-50 text-md-right">
                                    <Link to="/auth/register">Registrarse</Link>
                                </div>
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary rounded submit p-3 px-5"
                                    disabled={ !todoOk() }
                                >
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};
