import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import styles from './main.module.scss';
import Articles from '../articles';
import ArticleSingle from '../article-single';

const Main = () => {
  return (
    <div className={styles.container}>
      <Route path="/" exact component={Articles} />
      <Route path="/list" component={Articles} />
      <Route path="/article" component={ArticleSingle} />
    </div>
  );
};

Main.propTypes = {
  //
};

export default Main;
