import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import styles from './App.module.scss';
import Header from '../Header';
import Main from '../Main';

function App() {
  return (
    <Router>
      <div className={styles.container}>
        <Header />
        <Main />
      </div>
    </Router>
  );
}

export default App;
