
import React, { useContext, useState } from 'react';

import { Alert, Avatar, Col, List, Row, Input, Card, Button, Divider, Badge } from 'antd';
import { LeftOutlined, UserOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

import { ChatContext } from '../context/chat/chatContext';
import { AuthContext } from '../auth/authContext';
import { SocketContet } from '../context/socketContext';

import { types } from '../types/types';
import { fetchConToken } from '../helpers/fetch';
import { scrollToBottom } from '../helpers/scroll';
import { SalaContext } from '../context/sala/salaContext';

export const HomePage = ( props ) => {

    const [ mensaje, setMensaje ] = useState('');
    const history = useHistory();

    const [ nombreSala, setNombreSala ] = useState('');

    const { chatState, dispatch } = useContext( ChatContext );
    const { auth } = useContext( AuthContext );
    const { socket } = useContext( SocketContet );
    const { salaState } = useContext( SalaContext );

    async function onActiveChat( chatActivo ) {
        dispatch( {
            type: types.activarChat,
            payload: chatActivo,
        } );
        const resp = await fetchConToken("/mensaje/show/" + chatActivo.uid );
        if ( resp.response === 1 ) {
            dispatch( {
                type: types.cargarMensaje,
                payload: resp.messages,
            } );

            scrollToBottom('messageID');
        }
    };
    function onChangeMensaje(evt) {
        setMensaje( evt.target.value );
    };
    function onKeyPressEnter(evt) {
        if ( evt.key === "Enter" ) {
            if ( mensaje.length === 0 ) return;
            socket.emit( 'mensaje-personal', {
                de: auth.uid,
                para: chatState.chatActivo.uid,
                mensaje,
            } );
            setMensaje('');
        }
    };
    
    function onSubmitSala() {
        if ( nombreSala.trim().length === 0 ) return;
        socket.emit( 'store-sala', {
            nombreSala, uid: auth.uid,
        } );
        props.setKeyMenu('1');
        setNombreSala('');
    };

    return (
        <>
            <Row gutter={ [ 12, 8 ] }>
                { chatState.chatActivo  ?
                    <Col xs={ { span: 24, } } sm={{ span: 12, }} md={{ span: 8, }} style={{ position: 'relative', }}>
                        <List.Item style={{ border: '1px solid rgba(140, 140, 140, 0.35)', }}>
                            <List.Item.Meta
                                avatar={ <Avatar style={{ marginLeft: 5, }} icon={<UserOutlined style={{ position: 'relative', top: -5, }} />} /> }
                                title={ 
                                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingRight: 5, }}>
                                        <a href="/home" onClick={ (evt) => evt.preventDefault() } style={{ position: 'relative', top: 4, }}>
                                            {`${chatState.chatActivo.nombre} ${chatState.chatActivo.apellido}`}
                                        </a>
                                        <LeftOutlined 
                                            style={{ 
                                                padding: 6, borderRadius: 20, position: 'relative', top: 4,
                                                backgroundColor: '#1890ff', color: 'white', cursor: 'pointer',
                                            }} 
                                            onClick={ () => {
                                                setMensaje('');
                                                dispatch( {
                                                    type: types.activarChat,
                                                    payload: null,
                                                } )
                                            } }
                                        />
                                    </div>
                                }
                            />
                        </List.Item>
                        <div
                            id="messageID"
                            style={ {
                                height: 300,
                                overflowY: 'auto',
                                padding: '2px 16px',
                                border: '1px solid rgba(140, 140, 140, 0.35)',
                            } }
                        >
                            { chatState.array_mensaje.map( ( item, key ) => {

                                return (
                                    <div key={key} style={{ width: '100%', marginTop: 6, }}>
                                        { item.para === auth.uid ? 
                                            <Alert message={item.mensaje} type="success" style={{ width: 250, float: 'right', marginBottom: 6, }} />:
                                            <Alert message={item.mensaje} type="info" style={{ width: 250, }} />
                                        }
                                    </div>
                                );
                            } ) }
                        </div>
                        <Input 
                            style={{ width: '100%', minWidth: '100%', }} 
                            placeholder="Escribir mensaje..."
                            value={mensaje}
                            onChange={onChangeMensaje}
                            onKeyPress={onKeyPressEnter}
                        />
                    </Col> :
                    <Col xs={ { span: 24, } } sm={{ span: 12, }} md={{ span: 8, }}>
                        <div
                            id="scrollableDiv"
                            style={ {
                                height: 400,
                                overflowY: 'auto',
                                padding: '0 16px',
                                border: '1px solid rgba(140, 140, 140, 0.35)',
                            } }
                        >
                            <List
                                dataSource={ chatState.array_usuario.filter( (item) => (item.uid !== auth.uid) ) }
                                renderItem={ (item, key) => (
                                    <List.Item key={key} style={{ cursor: 'pointer', }} onClick={ () => onActiveChat( item ) }>
                                        <List.Item.Meta
                                            avatar={ <Avatar icon={<UserOutlined style={{ position: 'relative', top: -5, }} />} /> }
                                            title={ 
                                                <a href="/home" onClick={ (evt) => evt.preventDefault() }>
                                                    {`${item.nombre} ${item.apellido}`}
                                                </a>
                                            }
                                            description={item.email}
                                        />
                                        { item.online ? 
                                            <Avatar shape="circle" size="small" style={{ backgroundColor: '#52c41a' }} /> : 
                                            <Avatar shape="circle" size="small" style={{ backgroundColor: 'red' }} />
                                        }
                                    </List.Item>
                                )}
                            />
                        </div>
                    </Col>
                }
                { props.keyMenu === '1'  ?
                    <Col xs={ { span: 24, } } sm={{ span: 12, }} md={{ span: 16, }}>
                        <Divider orientation="left" style={{ padding: 0, margin: 0, marginBottom: 5, marginTop: -5, }}>Listado de Sala</Divider>
                        <div
                            id="scrollableDiv"
                            style={ {
                                height: 400,
                                overflowY: 'auto',
                                padding: '0 16px',
                                border: '1px solid rgba(140, 140, 140, 0.35)',
                            } }
                        >
                            <List
                                dataSource={ salaState.array_sala }
                                renderItem={ ( item, key ) => (
                                    <Badge.Ribbon key={key} text={ item.iniciar ? "Iniciado": "No iniciado" } color={ item.iniciar ? "green": "red" }>
                                        <List.Item >
                                            <List.Item.Meta
                                                title={ 
                                                    <span>
                                                        <strong>Código: </strong>{`${item.uid}`}
                                                    </span>
                                                }
                                                description={
                                                    <>
                                                        <div style={{ width: '100%', }}>
                                                            <span>
                                                                <strong>Nombre: </strong>{`${item.nombre}`}
                                                            </span>
                                                        </div>
                                                        <div style={{ width: '100%', }}>
                                                            <span>
                                                                <strong>Usuario: </strong>{`${item.user.nombre} ${item.user.apellido}`}
                                                            </span>
                                                        </div>
                                                    </>
                                                }
                                            />
                                            <div>
                                                <Button type="primary" style={{ backgroundColor: '#00ba8b', }}
                                                    onClick={ () => {
                                                        if ( item.fkidusers === auth.uid ) {
                                                            socket.emit( 'iniciar-sala', {
                                                                uid: item.uid,
                                                            } );
                                                        }
                                                        history.push( `/pizarra_virtual/${item.uid}` );
                                                    } }
                                                >
                                                    { item.user._id === auth.uid ? "Iniciar" : "Ingresar" }
                                                </Button>
                                            </div>
                                        </List.Item>
                                    </Badge.Ribbon>
                                )}
                            />
                        </div>
                    </Col> :
                    
                    <Col xs={ { span: 24, } } sm={{ span: 12, }} md={{ span: 16, }}>
                        <Card title="Nueva Sala" style={{ width: '100%' }}>
                            <Row gutter={ [ 12, 8 ] }>
                                <Col xs={ { span: 24, } } sm={{ span: 24, }}>
                                    <Input 
                                        placeholder="iIngresar nombre de sala" 
                                        value={nombreSala} style={{ width: '100%', minWidth: '100%', }}
                                        onChange={(evt) => setNombreSala(evt.target.value) } 
                                    />
                                </Col>
                            </Row>
                            <Row gutter={ [ 12, 8 ] } justify="start" style={{ marginTop: 10, }}>
                                <Button type="primary" style={{ backgroundColor: '#00ba8b', }}
                                    onClick={onSubmitSala}
                                >
                                    Guardar
                                </Button>
                            </Row>
                        </Card>
                    </Col>
                }
            </Row>
        </>
    );
};
