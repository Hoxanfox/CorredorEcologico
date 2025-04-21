import React from 'react';
import Layout from './layouts/LayoutHome';
import './index.css';
import 'leaflet/dist/leaflet.css';
import MainContent from './navigation/MainContent';

function App() {
  return (
    <Layout>
      <MainContent />
    </Layout>
  );
}

export default App;
