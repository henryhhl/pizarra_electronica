
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

import { types } from '../types/types';

const { Panel } = Collapse;

export const PizarraVirtualPage = ( props ) => {

    const { socket } = useContext( SocketContet );
    const { tableState, dispatchTable } = useContext( TableContext );

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
        dispatchTable( { type: types.limpiarTable } );
        history.goBack();
    }

    function onChangeNombreClass(evt) {
        setItemClass( { ...itemClass, nombre: evt.target.value } );
    }

    function onChangeSubTitleClass(evt) {
        setItemClass( { ...itemClass, subtitle: evt.target.value } );
    }

    function onChangeDescripcionClass(evt) {
        setItemClass( { ...itemClass, descripcion: evt.target.value } );
    }

    function onSubmitTableClass() {

        socket.emit( 'actualizar-table', {
            nombre: itemClass.nombre,
            subtitle: itemClass.subtitle,
            descripcion: itemClass.descripcion,
            uid: itemClass.uid,
        } );

    }

    return (
        <div className="containers">
            <div id="diagramContainer">
                { tableState.array_table.map( ( item, key ) => {
                    return (
                        
                        <Dialog 
                            header={ 
                                <>
                                    <p style={{ fontSize: 12, }}> {item.nombre} </p>
                                    <p style={{ fontSize: 8, textAlign: 'center', }}> {item.subtitle} </p>
                                </> 
                            } 
                            visible={true} modal={false} 
                            id={ "diagram" + item.uid }
                            style={{ 
                                width: item.width, height: item.height, 
                                position: 'fixed',
                                top: item.top, left: item.left,
                                border:  itemClass && itemClass.uid === item.uid && '2px solid red',
                            }} 
                            className={ `${item.type === "TP" ? "modalPrimeReact darks" : 
                                item.type === "TB" ? "modalPrimeReact" : "modalPrimeReact circular" }` 
                            } 
                            contentClassName="fgd"
                            closable={false} key={key} 
                            // footer={
                            //     <div style={{ 
                            //             padding: 4, paddingBottom: 1, backgroundColor: "rgb(97, 84, 156)", 
                            //             color: 'white', marginTop: 1, marginBottom: 1, 
                            //             borderRadius: 6, fontSize: 9,
                            //         }}
                            //     >
                            //         <p>
                            //             dd
                            //         </p>
                            //     </div>
                            // }

                            onClick={ () => {
                                item.index = key;
                                setItemClass(item);
                            } }

                            // breakpoints={{'10px': '10vw', '10px': '10vw'}}
                            
                            contentStyle={{ padding: 0, }}
                            onResizeStart={ ( evt ) => { } } 
                            onResize={ (evt) => { } }
                            onResizeEnd={ ( evt ) => {
                                let move = document.getElementById( "diagram" + item.uid ).getBoundingClientRect();

                                socket.emit( 'actualizar-table', {
                                    nombre: item.nombre,
                                    subtitle: item.subtitle,
                                    descripcion: item.descripcion,
                                    left: move.left,
                                    top: move.top,
                                    uid: item.uid,
                                    width: move.width,
                                    height: move.height,
                                } );
                            } }
                            
                            onDragStart={ (evt) => { }} 

                            onDrag={ (evt) => { } }

                            onDragEnd={ (evt) => {
                                let move = document.getElementById( "diagram" + item.uid ).getBoundingClientRect();

                                socket.emit( 'actualizar-table', {
                                    nombre: item.nombre,
                                    subtitle: item.subtitle,
                                    descripcion: item.descripcion,
                                    left: move.left,
                                    top: move.top,
                                    uid: item.uid,
                                    width: move.width,
                                    height: move.height,
                                } );
                            } }
                        >
                            <div style={{ 
                                    padding: 4, paddingBottom: 1, backgroundColor: item.background, 
                                    color: 'white', marginTop: 1, marginBottom: 1, 
                                    borderRadius: 6, fontSize: 9, height: "95%",
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                <p>
                                    { item.descripcion }
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
                                    <span style={{ color: "#dddfde", fontSize: 12, fontWeight: '700', height: 30, }}> TITLE </span> 
                                } key="1" style={{ backgroundColor: "#414548", }}
                            >
                                <div style={{ width: '100%', }}>
                                    <Input 
                                        style={{ width: '100%', minWidth: '100%', }} 
                                        placeholder="Escribir nombre..."
                                        value={itemClass.nombre}
                                        onChange={onChangeNombreClass}
                                        onKeyPress={ (evt) => {
                                            if ( evt.key === "Enter" ) {
                                                onSubmitTableClass();
                                            }
                                        } }
                                    />
                                </div>
                                <div style={{ width: '100%', textAlign: 'center', marginTop: 5, }}>
                                    <Button type="primary" style={{ backgroundColor: '#00ba8b', }}
                                        onClick={onSubmitTableClass}
                                    >
                                        Actualizar
                                    </Button>
                                </div>
                            </Panel>
                            <Panel header={ 
                                    <span style={{ color: "#dddfde", fontSize: 12, fontWeight: '700', height: 30, }}> SUB TITLE </span> 
                                } key="2" style={{ backgroundColor: "#414548", }}
                            >
                                <div style={{ width: '100%', }}>
                                    <Input 
                                        style={{ width: '100%', minWidth: '100%', }} 
                                        placeholder="Escribir sub title..."
                                        value={itemClass.subtitle}
                                        onChange={onChangeSubTitleClass}
                                        onKeyPress={ (evt) => {
                                            if ( evt.key === "Enter" ) {
                                                onSubmitTableClass();
                                            }
                                        } }
                                    />
                                </div>
                                <div style={{ width: '100%', textAlign: 'center', marginTop: 5, }}>
                                    <Button type="primary" style={{ backgroundColor: '#00ba8b', }}
                                        onClick={onSubmitTableClass}
                                    >
                                        Actualizar
                                    </Button>
                                </div>
                            </Panel>
                            <Panel header={ 
                                    <span style={{ color: "#dddfde", fontSize: 12, fontWeight: '700', height: 30, }}> DESCRIPCION </span> 
                                } key="3" style={{ backgroundColor: "#414548", }}
                            >
                                <div style={{ width: '100%', }}>
                                    <Input 
                                        style={{ width: '100%', minWidth: '100%', }} 
                                        placeholder="Escribir descripcion..."
                                        value={itemClass.descripcion}
                                        onChange={onChangeDescripcionClass}
                                        onKeyPress={ (evt) => {
                                            if ( evt.key === "Enter" ) {
                                                onSubmitTableClass();
                                            }
                                        } }
                                    />
                                </div>
                                <div style={{ width: '100%', textAlign: 'center', marginTop: 5, }}>
                                    <Button type="primary" style={{ backgroundColor: '#00ba8b', }}
                                        onClick={onSubmitTableClass}
                                    >
                                        Actualizar
                                    </Button>
                                </div>
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
                        <div 
                            style={{ 
                                width: '100%', display: 'block', border: '1px solid rgb(246, 246, 246)', 
                                color: "#dddfde", cursor: 'pointer' 
                            }}
                            draggable id="NewTableDiagramB"
                            onDragEnd={ ( evt ) => {
                                var disx = evt.pageX;
                                var disy = evt.pageY;
                                socket.emit( 'agregar-table', {
                                    uid: props.match.params.uidsala,
                                    left: disx,
                                    top: disy,
                                    background: 'rgb(97, 84, 156)',
                                    type: 'TB',
                                } );
                            } } 
                        >
                            <div style={{ height: 20, backgroundColor: 'rgb(97, 84, 156)', borderRadius: 3, marginBottom: 1, paddingLeft: 5,  }}>
                                TITLE
                            </div>
                            <div style={{ height: 40, backgroundColor: 'rgb(97, 84, 156)', borderRadius: 3, marginBottom: 1, paddingLeft: 5,  }}>
                                SUB TITLE
                            </div>
                            <div style={{ height: 20, backgroundColor: 'rgb(97, 84, 156)', borderRadius: 3, paddingLeft: 5,  }}>
                                DESCRIPTION
                            </div>
                        </div>
                        
                    </Panel>

                    <Panel header={ 
                            <span style={{ color: "#dddfde", fontSize: 12, fontWeight: '700', height: 30, }}> PIZARRA VIRTUAL </span> 
                        } key="2" style={{ backgroundColor: "#414548", }}
                    >
                        <div 
                            style={{ 
                                width: '100%', display: 'block', border: '1px solid rgb(246, 246, 246)', 
                                color: "#dddfde", cursor: 'pointer', marginTop: 20,
                            }}
                            draggable id="NewTableDiagramP"
                            onDragEnd={ ( evt ) => {
                                var disx = evt.pageX;
                                var disy = evt.pageY;
                                socket.emit( 'agregar-table', {
                                    uid: props.match.params.uidsala,
                                    left: disx,
                                    top: disy,
                                    background: '#99A3A4',
                                    type: 'TP'
                                } );
                            } } 
                        >
                            <div style={{ height: 20, backgroundColor: '#99A3A4', borderRadius: 3, marginBottom: 1, paddingLeft: 5,  }}>
                                TITLE
                            </div>
                            <div style={{ height: 40, backgroundColor: '#99A3A4', borderRadius: 3, marginBottom: 1, paddingLeft: 5,  }}>
                                SUB TITLE
                            </div>
                            <div style={{ height: 20, backgroundColor: '#99A3A4', borderRadius: 3, paddingLeft: 5,  }}>
                                DESCRIPTION
                            </div>
                        </div>
                    </Panel>
                    <Panel header={ 
                            <span style={{ color: "#dddfde", fontSize: 12, fontWeight: '700', height: 30, }}> PIZARRA VIRTUAL </span> 
                        } key="3" style={{ backgroundColor: "#414548", }}
                    >
                        <div 
                            style={{ 
                                width: '100%', display: 'block', border: '1px solid rgb(246, 246, 246)', 
                                color: "#dddfde", cursor: 'pointer', marginTop: 20,
                            }}
                            draggable id="NewTableDiagramC"
                            onDragEnd={ ( evt ) => {
                                var disx = evt.pageX;
                                var disy = evt.pageY;
                                socket.emit( 'agregar-table', {
                                    uid: props.match.params.uidsala,
                                    left: disx,
                                    top: disy,
                                    background: 'rgb(97, 84, 156)',
                                    type: 'BD',
                                } );
                            } } 
                        >
                            <div style={{ 
                                height: 30, backgroundColor: 'rgb(97, 84, 156)', 
                                borderRadius: '100px/50px', marginBottom: 1, textAlign: 'center', 
                                position: 'relative', top: 15, border: '1px solid #e8e8e8'
                            }}>
                                TITLE
                            </div>
                            <div style={{ 
                                height: 80, backgroundColor: 'rgb(97, 84, 156)', borderRadius: 3, paddingLeft: 5,
                                paddingTop: 20,  
                            }}>
                                DESCRIPTION
                            </div>
                            <div style={{ 
                                height: 20, backgroundColor: 'rgb(97, 84, 156)', 
                                borderRadius: 3, paddingLeft: 5,  
                                borderBottomLeftRadius: 20, borderBottomRightRadius: 20,
                            }}>
                                
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
