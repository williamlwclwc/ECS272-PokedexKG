import './App.css';
import 'antd/dist/reset.css';
import React, { useState } from 'react';
import {
  CompassOutlined,
  DeploymentUnitOutlined,
  QuestionCircleOutlined,
  SettingOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Image, Modal } from 'antd';
import pokeball from './assets/pokeball.png';
import MainBoard from './components/MainBoard';
const { Content, Footer, Sider } = Layout;

function getItem(label, key, icon) {
  return {
    key,
    icon,
    label,
  };
};

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [openCustomization, setOpenCustomization] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState(['1']);
  const items = [
    getItem('Explore Stories', '1', <DeploymentUnitOutlined />),
    getItem('Storytelling', '2', <CompassOutlined />),
    getItem('Customization', '3', <SettingOutlined />),
    getItem('Help', '4', <QuestionCircleOutlined />),
    getItem('About', '5', <TeamOutlined />)
  ];

  function onClickMenu(item) {
    const key = item.key;
    if (key === '1') {
      setSelectedKeys(['1']);
    } else if (key === '2') {
      setSelectedKeys(['2']);
    } else if (key === '3') {
      console.log(key);
      setOpenCustomization(true);
    } else if (key === '4') {
  
    } else if (key === '5') {
  
    }
  };

  function onCustomizationOK() {
    setOpenCustomization(false);
    setSelectedKeys(['1']);
  };

  function onCustomizationCancel() {
    setOpenCustomization(false);
    setSelectedKeys(['1']);
  };

  return (
    <div className="App">
      <Layout
        style={{
          minHeight: '100vh',
        }}
      >
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} theme="light">
          <div className="logo">
            <Image
              width={30}
              src={pokeball}
              preview={false}
              style={{display: 'inline-block'}}
            />
            &nbsp;
            {
              collapsed ? null : <div style={{display: 'inline-block'}}>Pokedex-KG</div>
            }
          </div>
          <Menu theme="light" defaultSelectedKeys={['1']} selectedKeys={selectedKeys} mode="inline" items={items} onClick={onClickMenu} />
        </Sider>
        <Layout className="site-layout">
          <Content
            style={{
              margin: '0 16px',
            }}
          >
            <div
              className="site-layout-background"
              style={{
                padding: 24,
                minHeight: 360,
              }}
            >
              <MainBoard />
            </div>
            <Modal
              title="Customization Panel"
              centered
              open={openCustomization}
              onOk={() => onCustomizationOK()}
              onCancel={() => onCustomizationCancel()}
              width={1000}
              height={800}
            >
              <p>Customization</p>
            </Modal>
          </Content>
          <Footer
            style={{
              textAlign: 'center',
            }}
          >
            ECS272 Final Project ©2022 Created by Wenchang Liu, Qifan Ren
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;
