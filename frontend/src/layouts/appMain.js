
import React, { useContext } from 'react';

import { Layout, Menu, Dropdown } from 'antd';
import { CaretDownFilled, UserOutlined } from '@ant-design/icons';

import { AuthContext } from '../auth/authContext';
const { Header, Footer, Content } = Layout;

export const AppMain = ( props ) => {
    const { auth, logout } = useContext( AuthContext );

    function menu() {
        return (
            <Menu>
                <Menu.Item key="0">
                    Perfil
                </Menu.Item>
                <Menu.Item key="1">
                    Ajuste
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="3" onClick={ logout }>
                    Logout
                </Menu.Item>
            </Menu>
        );
    };

    return (
        <>
            <Layout style={{ position: 'relative', minHeight: '100vh', }}>
                <Header style={{ backgroundColor: '#00ba8b', color: 'white', display: 'flex', justifyContent: 'space-between', }} >
                    <div>
                        Bienvenido
                    </div>
                    <div>
                        <Dropdown overlay={ menu() } trigger={['click']}>
                            <div style={{ cursor: 'pointer', }}>
                                <UserOutlined style={{ position: 'relative', top: -3, marginRight: 2, }} /> 
                                    { auth.nombre } 
                                <CaretDownFilled style={{ position: 'relative', top: -3, marginLeft: 1, }} />
                            </div>
                        </Dropdown>
                    </div>
                </Header>
                <div style={{ backgroundColor: '#FFF', padding: 0, }}>
                    <Menu theme="light" mode="horizontal" activeKey={props.keyMenu}>
                        <Menu.Item key="1" onClick={ () => props.setKeyMenu('1') }>
                            Inicio
                        </Menu.Item>
                        <Menu.Item key="2" onClick={ () => props.setKeyMenu('2') }>
                            Nueva Sala
                        </Menu.Item>
                    </Menu>
                </div>
                <Content style={{ margin: '24px 16px 0', }}>
                    <div style={{ padding: 24, minHeight: 450, height: 470, backgroundColor: '#FFF', }}>
                        { props.children }
                    </div>
                </Content>
                <Footer style={{ backgroundColor: '#FFF', }} >
                    Footer
                </Footer>
            </Layout>
        </>
    );
};
