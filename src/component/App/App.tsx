import React from 'react';
import './App.css';
import { Layout } from 'antd';
import { Header } from '../Header/Header';
import { List } from '../List/List';


function App() {
  return (
    <Layout className='layout-container'
    >
      <Header />
      <List />
    </Layout>
  );
}

export default App;





