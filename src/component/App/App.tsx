import React from 'react';
import './App.css';
import { Layout } from 'antd';
import { Header } from '../Header/Header';
import { List } from '../List/List';


function App() {
  return (
    <div className="App">
      <Layout style={layoutStyle}>
        <Header />
        <List />
      </Layout>
    </div>
  );
}

export default App;


const layoutStyle = {
  borderRadius: 8,
  overflow: 'hidden',
  width: 'calc(50% - 8px)',
  maxWidth: 'calc(50% - 8px)',
};



