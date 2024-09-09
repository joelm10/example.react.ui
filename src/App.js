import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// layout
import Layout from './components/layout';

// TODO: implement react-dom routing
const App = () => {
    const appWrapper = (
        <Layout />
    );
    return appWrapper;
};

export default App;
