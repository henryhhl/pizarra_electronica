
import React, { useContext, useEffect, useState } from 'react';
import '../css/diagrama.css';

import { Button } from 'antd';
import { useHistory } from 'react-router-dom';
import Draggable from 'react-draggable';

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import { Dialog } from 'primereact/dialog';

import { fetchConToken } from '../helpers/fetch';
import { SocketContet } from '../context/socketContext';

const array = ['titulo 1', 'titulo 2'];

export const PizarraVirtualPage = ( props ) => {

    const { socket } = useContext( SocketContet );
    const [ nombreSala, setNombreSala ] = useState('');
    const history = useHistory();

    useEffect( () => {
        get_data();
    }, [] );

    async function get_data() {
        const resp = await fetchConToken("/sala/show/" + props.match.params.uidsala );
        setNombreSala(resp.sala.nombre);
    };

    function onSubmitCerrarSala() {
        socket.emit( 'finalizar-sala', {
            uid: props.match.params.uidsala,
        } );
        history.goBack();
    }

    return (
        <div className="container">
            <div id="diagramContainer">
                { array.map( ( item, key ) => {
                    // let draggleRef = React.createRef();
                    return (
                        // <Draggable
                        //     key={key}
                        // >
                        //     <div>
                        //         <div className="itemContainer" style={{ backgroundColor: 'red' }}></div>
                        //     </div>
                        // </Draggable>
                        // <Dialog visible={true}  breakpoints={{'960px': '75vw', '640px': '100vw'}} style={{width: '50vw'}}>
                        //     Content
                        // </Dialog>
                        <Dialog header="Header" visible={true} modal={false} baseZIndex={10} style={{ zIndex: 1, width: 150, height: 180, }}
                            closable={false} key={key} breakpoints={{'10px': '10vw', '10px': '10vw'}}
                            onResizeStart={ ( evt ) => console.log(evt) } onResizeEnd={ ( evt ) => console.log(evt) }
                            onDragStart={ (evt) => console.log(evt) } onDragEnd={ (evt) => {
                                console.log(evt)
                                // const { clientWidth, clientHeight } = window?.document?.documentElement;
                                // const targetRect = draggleRef?.current?.getBoundingClientRect();
                                // let bounds = {
                                //     left: -targetRect?.left + evt?.x,
                                //     right: clientWidth - (targetRect?.right - evt?.x),
                                //     top: -targetRect?.top + evt?.y,
                                //     bottom: clientHeight - (targetRect?.bottom - evt?.y),
                                //   }
                                //   console.log(bounds)
                            } }
                            // ref={draggleRef}
                        >
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </Dialog>
                    );
                } ) }
            </div>
            <div className="footerContainer">
                { nombreSala }
                <Button type="primary" style={{ backgroundColor: '#00ba8b', }}
                    onClick={onSubmitCerrarSala}
                >
                    Cerrar Sala
                </Button>
            </div>
        </div>
    );
};
