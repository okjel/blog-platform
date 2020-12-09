import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import styles from './Main.module.scss';
import Articles from '../Articles';
import ArticleSingle from '../ArticleSingle';
import SignUp from '../sign-up';
import SignIn from '../sign-in';

const Main = () => {
  return (
    <div className={styles.container}>
      <Route path="/" exact component={Articles} />
      <Route path="/list" component={Articles} />
      <Route
        path="/article/:id"
        render={({ match }) => {
          // console.log(match);
          const { id } = match.params;
          return <ArticleSingle id={id} />;
        }}
      />
      <Route path="/sign-up" component={SignUp} />
      <Route path="/sign-in" component={SignIn} />
    </div>
  );
};
Main.propTypes = {
  //
};

export default Main;
