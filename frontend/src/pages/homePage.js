
import React, { useContext } from 'react';

import { Avatar, Col, List, Row, Input } from 'antd';
import { LeftOutlined, UserOutlined } from '@ant-design/icons';

import { ChatContext } from '../context/chat/chatContext';
import { AuthContext } from '../auth/authContext';

import { types } from '../types/types';
const { TextArea } = Input;

export const HomePage = () => {

    const { chatState, dispatch } = useContext( ChatContext );
    const { auth } = useContext( AuthContext );

    function onActiveChat( uid ) {
        console.log(uid)
        dispatch( {
            type: types.activarChat,
            payload: uid,
        } );
    };

    return (
        <>
            <Row gutter={ [ 12, 8 ] }>
                { chatState.chatActivo  ?
                    <Col xs={ { span: 24, } } md={{ span: 8, }} style={{ position: 'relative', }}>
                        <List.Item style={{ border: '1px solid rgba(140, 140, 140, 0.35)', }}>
                            <List.Item.Meta
                                avatar={ <Avatar style={{ marginLeft: 5, }} icon={<UserOutlined style={{ position: 'relative', top: -5, }} />} /> }
                                title={ 
                                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingRight: 5, }}>
                                        <a href="#" onClick={ (evt) => evt.preventDefault() } style={{ position: 'relative', top: 4, }}>
                                            {`${chatState.chatActivo.nombre} ${chatState.chatActivo.apellido}`}
                                        </a>
                                        <LeftOutlined 
                                            style={{ 
                                                padding: 6, borderRadius: 20, position: 'relative', top: 4,
                                                backgroundColor: '#1890ff', color: 'white', cursor: 'pointer',
                                            }} 
                                            onClick={ () => onActiveChat( null ) }
                                        />
                                    </div>
                                }
                            />
                        </List.Item>
                        <div
                            id="scrollableDiv"
                            style={ {
                                height: 300,
                                overflowY: 'auto',
                                padding: '0 16px',
                                border: '1px solid rgba(140, 140, 140, 0.35)',
                            } }
                        ></div>
                        <TextArea 
                            autoSize={{ minRows: 2, maxRows: 3, }} style={{ width: '100%', minWidth: '100%', }} 
                            placeholder="Escribir mensaje..."
                        />
                    </Col> :
                    <Col xs={ { span: 24, } } md={{ span: 8, }}>
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
                                                <a href="#" onClick={ (evt) => evt.preventDefault() }>
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
                <Col xs={ { span: 24, } } md={{ span: 16, }}>d</Col>
            </Row>
        </>
    );
};
