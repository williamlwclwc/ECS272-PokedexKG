import './App.css';
import 'antd/dist/reset.css';
import * as d3 from "d3";
import React, { useState, createContext } from 'react';
import {
  CompassOutlined,
  DeploymentUnitOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';

import { Layout, Menu, Image, Divider, Input, Modal, Tour } from 'antd';
import pokeball from './assets/pokeball.png';
import MainBoard from './components/MainBoard';
import Container from './components/Container';
const { Content, Footer, Sider } = Layout;
const { Search } = Input;

function getItem(label, key, icon) {
  return {
    key,
    icon,
    label,
  };
};

export const configContext = createContext();

function App() {
  const [config, setConfig] = useState({'search': '', 'config': {}});

  const [open, setOpen] = useState(false);

  const [collapsed, setCollapsed] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState(['1']);
  const items = [
    getItem('Explore Stories', '1', <DeploymentUnitOutlined />),
    getItem('Storytelling', '2', <CompassOutlined />),
    getItem('Help', '3', <QuestionCircleOutlined />),
  ];
  const colorNode = d3.scaleOrdinal(d3.schemeCategory10.slice(0, 5));
  const colorLink = d3.scaleOrdinal(d3.schemeCategory10.slice(5, 10));
  const arrayNode = ['Pokemon', 'Moves', 'Type', 'Ability', 'Egg Group'];
  const arrayLink = [
    '(Pokemon)Master(move)', 
    '(Pokemon)Has(type)',
    '(Move)Has(type)',
    '(Pokemon)Has(Ability)',
    '(Pokemon)-(Egg Group)'
  ];
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [startPage, setStartPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);


  function onClickMenu(item) {
    const key = item.key;
    if (key === '1') {
      setSelectedKeys(['1']);
    } else if (key === '2') {

      if (isFirstTime){
        showModal()
        setIsFirstTime(false);
      }
      else{
        setSelectedKeys(['2']);
      }
    } else if (key === '3') {
      setOpen(true)
    }
  };


  function showModal(){
    setIsModalOpen(true);
  }

  function handleOk(){
    setStartPage(5);
    setIsModalOpen(false);
    setSelectedKeys(['2']);
  }

  function handleCancel(){
    setIsModalOpen(false);
    setSelectedKeys(['2']);
  }

  function onSearch() {
    
  }

  function updateStartPage(page) {
    setStartPage(page)
  }

  const steps = [
    {
      title: 'Menu',
      description: 'You can choose to either freely explore in \'Explore Stories\' or watch stories narrated by us in \'Storytelling\'.',
      target: null,
    },
    {
      title: 'Left Panel',
      description: 'Nodes are separeted in 5 groups (more information in Legend). You can customize different parameters on the left side.',
      target: null,
    },
    {
      title: 'Node-link Interactions',
      description: 'Scroll to zoom. Click, hold and move to pan. Click a node to see details on the right side. Double click a node to expand all the relative nodes and links.',
      target: null,
    },
    {
      title: 'Search',
      description: 'You can search a certain node with its name. For example, search \'pikachu\'.',
      target: null,
    },
  ];
  
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
          <Menu theme="light" defaultSelectedKeys={['1']} selectedKeys={selectedKeys} mode="inline" items={items} onClick={onClickMenu}/>
          {
            collapsed ? null : <div>
              <Divider plain style={{margin: 'auto', minWidth: '80%', width: '80%'}}>Legend</Divider>
              &nbsp;
              <div className="Legend">
                {arrayNode.map((v, i) => (
                  <div key={v} className="Legend-item">
                    <span className="Legend-colorBox" style={{backgroundColor: colorNode(i)}}></span>
                    <span className="Legend-label">{v}</span>
                  </div>
                ))}
                {arrayLink.map((v, i) => (
                  <div key={v} className="Legend-item">
                    <span className="Legend-colorLine" style={{backgroundColor: colorLink(i)}}></span>
                    <span className="Legend-label">{v}</span>
                  </div>
                ))}
              </div>
              &nbsp;
              <Divider plain style={{margin: 'auto', minWidth: '80%', width: '80%'}}>Search</Divider>
              <Search id='search' placeholder="Search node" onSearch={onSearch} enterButton style={{width: '90%'}}/>
              <Divider plain style={{margin: 'auto', minWidth: '80%', width: '80%'}}>Customization</Divider>
              &nbsp;
              <div>
                <div>Charge</div>
                <div>
                  <input id="slider-charge" type="range" min="-100" max="0" defaultValue="-30" />
                </div>
                <div>Link Distance</div>
                <div>
                  <input id="slider-dis" type="range" min="0" max="100" defaultValue="30" />
                </div>
                &nbsp;
                <div style={{fontSize: 'small'}}>Node Size(Pokemon) based on:</div>
                <select id="nsize-p" defaultValue="1">
                <option value="0">Degree</option>
                <option value="1">Uniformed</option> 
                <option value="2">Total Stats</option>
                <option value="3">Attack Stats</option>
                <option value="4">Tank Stats</option>
                </select>
                <div style={{fontSize: 'small'}}>Node Size(Other) based on:</div>
                <select id="nsize-o" defaultValue="1">
                <option value="0">Degree</option>
                <option value="1">Uniformed</option> 
                </select>
              </div>
            </div>
          }
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

              {
              selectedKeys[0] === '1'?
              <configContext.Provider value={{config, setConfig}}>
                <MainBoard/>
              </configContext.Provider>
              : null
              }
              {selectedKeys[0] === '2'? <Container startPage={startPage} updateStartPage={updateStartPage}/> : null}
            </div>
            <Modal title="Skip the part for Newbees?" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText='Yes' cancelText='No'/>
            <Tour open={open} onClose={() => setOpen(false)} steps={steps} />
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
