
import React, { useContext, useState } from 'react';

import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

import { AuthContext } from '../auth/authContext';

export const RegisterPage = () => {

    const { register } =  useContext( AuthContext );

    const [ form, setForm ] = useState( {
        nombre: "",
        apellido: "",
        email: "",
        usuario: "",
        password: "",
    } );

    function onChangeNombre( evt ) {
        setForm( {
            ...form,
            nombre: evt.target.value,
        } );
    };
    function onChangeApellido( evt ) {
        setForm( {
            ...form,
            apellido: evt.target.value,
        } );
    };
    function onChangeEmail( evt ) {
        setForm( {
            ...form,
            email: evt.target.value,
        } );
    };
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

    async function onSubmit( evt ) {
        evt.preventDefault();

        const { nombre, apellido, email, usuario, password } = form;
        const resp = await register( nombre, apellido, email, usuario, password );
        if ( resp.response !== 1 ) {
            Swal.fire( "Error", resp.message, "error" );
        }
    };

    function todoOk() {
        const { nombre, apellido, email, usuario, password } = form;
        return ( nombre.length > 0 && apellido.length > 0 && email.length > 0 && usuario.length > 0 && password.length > 0 );
    }

    return (
        <>
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-5">
                    <div className="login-wrap p-4 p-md-5">
                        <h3 className="text-center mb-4">
                            Nueva cuenta
                        </h3>
                        <form onSubmit={ onSubmit } className="login-form">
                            <div className="form-group">
                                <input 
                                    type="text" 
                                    className="form-control rounded-left" 
                                    placeholder="Nombre" required 
                                    value={form.nombre}
                                    onChange={ onChangeNombre }
                                />
                            </div>
                            <div className="form-group">
                                <input 
                                    type="text" 
                                    className="form-control rounded-left" 
                                    placeholder="Apellido" required 
                                    value={form.apellido}
                                    onChange={ onChangeApellido }
                                />
                            </div>
                            <div className="form-group">
                                <input 
                                    type="text" 
                                    className="form-control rounded-left" 
                                    placeholder="Email" required 
                                    value={form.email}
                                    onChange={ onChangeEmail }
                                />
                            </div>
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
                                    
                                </div>
                                <div className="w-50 text-md-right">
                                    <Link to="/auth/login">Iniciar sesion</Link>
                                </div>
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary rounded submit p-3 px-5"
                                    disabled={ !todoOk() }
                                >
                                    Registrarme
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};
