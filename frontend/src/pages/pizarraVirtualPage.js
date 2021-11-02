
import React, { useContext, useEffect, useState } from 'react';
import '../css/diagrama.css';

import { Button, Collapse, Input } from 'antd';
import { useHistory } from 'react-router-dom';

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import { Dialog } from 'primereact/dialog';

import { fetchConToken } from '../helpers/fetch';
import { SocketContet } from '../context/socketContext';
import { CloseOutlined } from '@ant-design/icons';
import { TableContext } from '../context/table/TableContext';

const { Panel } = Collapse;

export const PizarraVirtualPage = ( props ) => {

    const { socket } = useContext( SocketContet );
    const { tableState } = useContext( TableContext );

    const [ nombreSala, setNombreSala ] = useState('');
    const [ itemClass, setItemClass ] = useState(null);

    const history = useHistory();

    useEffect( () => {
        get_data();
        socket?.emit( 'ingresar-sala', {
            uid: props.match?.params.uidsala,
        } );
    }, [] );

    useEffect( () => {
        socket?.on( 'table-actualizado', ( table ) => {
            // console.log( "table insertado: ", table )
            socket?.emit( 'ingresar-sala', {
                uid: props.match?.params.uidsala,
            } );
        } );
    }, [ socket ] );

    async function get_data() {
        try {
            const resp = await fetchConToken("/sala/show/" + props.match?.params.uidsala );
            setNombreSala(resp.sala.nombre);
        } catch (error) {
            console.log(error)
        }
    };

    function onSubmitCerrarSala() {
        socket.emit( 'finalizar-sala', {
            uid: props.match.params.uidsala,
        } );
        history.goBack();
    }

    function onChangeNombreClass(evt) {
        setItemClass( { ...itemClass, nombre: evt.target.value } );
        
        socket.emit( 'actualizar-table', {
            nombre: evt.target.value,
            left: itemClass.left,
            top: itemClass.top,
            uid: itemClass.uid,
        } );
    }

    return (
        <div className="containers">
            <div id="diagramContainer">
                { tableState.array_table.map( ( item, key ) => {
                    return (
                        
                        <Dialog header={ <span style={{ fontSize: 12, }}> {item.nombre} </span> } visible={true} modal={false} 
                            id={ "diagram" + item.uid }
                            style={{ 
                                width: 150, height: 180, 
                                position: 'fixed',
                                top: item.top, left: item.left,
                            }} 
                            className="modalPrimeReact" contentClassName="fgd"
                            closable={false} key={key} 
                            footer={
                                <div style={{ 
                                        padding: 4, paddingBottom: 1, backgroundColor: "rgb(97, 84, 156)", 
                                        color: 'white', marginTop: 1, marginBottom: 1, 
                                        borderRadius: 6, fontSize: 9,
                                    }}
                                >
                                    <p>
                                        dd
                                    </p>
                                </div>
                            }

                            onClick={ () => {
                                item.index = key;
                                setItemClass(item);
                            } }

                            // breakpoints={{'10px': '10vw', '10px': '10vw'}}
                            
                            contentStyle={{ padding: 0, }}
                            onResizeStart={ ( evt ) => console.log(evt) } 
                            onResize={ (evt) => {
                                console.log(evt)
                            } }
                            onResizeEnd={ ( evt ) => console.log(evt) }
                            
                            onDragStart={ (evt) => {
                                // console.log( "ONDRAGStart", evt) 
                            }} 

                            onDrag={ (evt) => {
                                var disx=evt.pageX-item.left;
                                var disy=evt.pageY-item.top;

                                // console.log( document.getElementById( "diagram" + key ).getBoundingClientRect() )
                                let move = document.getElementById( "diagram" + item.uid ).getBoundingClientRect();

                                socket.emit( 'actualizar-table', {
                                    nombre: item.nombre,
                                    left: move.left,
                                    top: move.top,
                                    uid: item.uid,
                                } );

                            } }

                            onDragEnd={ (evt) => {
                            } }
                        >
                            <div style={{ 
                                    padding: 4, paddingBottom: 1, backgroundColor: "rgb(97, 84, 156)", 
                                    color: 'white', marginTop: 1, marginBottom: 1, 
                                    borderRadius: 6, fontSize: 9,
                                }}
                            >
                                <p>
                                    Nombre
                                </p>
                            </div>
                        </Dialog>
                    );
                } ) }

                <div className="inspectorDiagram">
                    { itemClass && 
                        <div style={{ width: '100%', textAlign: 'right', }}>
                            <CloseOutlined
                                style={{ padding: 3, color: '#dddfde', cursor: 'pointer', }}
                                onClick={ () => {
                                    setItemClass(null)
                                } }
                            />
                        </div>
                    }
                    { itemClass && 
                        <Collapse accordion defaultActiveKey={['1']}>
                            <Panel header={ 
                                    <span style={{ color: "#dddfde", fontSize: 12, fontWeight: '700', height: 30, }}> CLASS NAME </span> 
                                } key="1" style={{ backgroundColor: "#414548", }}
                            >
                                <div style={{ width: '100%', }}>
                                    <Input 
                                        style={{ width: '100%', minWidth: '100%', }} 
                                        placeholder="Escribir nombre..."
                                        value={itemClass.nombre}
                                        onChange={onChangeNombreClass}
                                    />
                                </div>
                            </Panel>
                            <Panel header={ 
                                    <span style={{ color: "#dddfde", fontSize: 12, fontWeight: '700', height: 30, }}> ATTRIBUTES </span> 
                                } key="2" style={{ backgroundColor: "#414548", }}
                            >
                                <p>{'  Known for its loyalty and faithfulness,'}</p>
                            </Panel>
                            <Panel header={ 
                                    <span style={{ color: "#dddfde", fontSize: 12, fontWeight: '700', height: 30, }}> METHODS </span> 
                                } key="3" style={{ backgroundColor: "#414548", }}
                            >
                                <p>{'  it can be found as a welcome guest in many households across the world.'}</p>
                            </Panel>
                        </Collapse>
                    }
                </div>
            </div>
            <div className="pizarraDiagram">
                <Collapse accordion defaultActiveKey={['1']}>
                    <Panel header={ 
                            <span style={{ color: "#dddfde", fontSize: 12, fontWeight: '700', height: 30, }}> PIZARRA VIRTUAL </span> 
                        } key="1" style={{ backgroundColor: "#414548", }}
                    >
                        <div style={{ width: '100%', display: 'block', border: '1px solid rgb(246, 246, 246)', color: "#dddfde", cursor: 'pointer' }}
                            draggable id="NewTableDiagram"
                            onDragEnd={ ( evt ) => {
                                var disx = evt.pageX;
                                var disy = evt.pageY;
                                socket.emit( 'agregar-table', {
                                    uid: props.match.params.uidsala,
                                    left: disx,
                                    top: disy,
                                } );
                            } } 
                        >
                            <div style={{ height: 20, backgroundColor: 'rgb(97, 84, 156)', borderRadius: 3, marginBottom: 1, paddingLeft: 5,  }}>
                                CLASS NAME
                            </div>
                            <div style={{ height: 40, backgroundColor: 'rgb(97, 84, 156)', borderRadius: 3, marginBottom: 1, paddingLeft: 5,  }}>
                                ATTRIBUTES
                            </div>
                            <div style={{ height: 20, backgroundColor: 'rgb(97, 84, 156)', borderRadius: 3, paddingLeft: 5,  }}>
                                METHODS
                            </div>
                        </div>
                    </Panel>
                </Collapse>
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
