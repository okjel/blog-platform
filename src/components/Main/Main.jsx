import React from 'react';
import { Route } from 'react-router-dom';
import styles from './Main.module.scss';
import Articles from '../Articles';
import ArticleSingle from '../ArticleSingle';
import SignUp from '../SignUp';
import SignIn from '../SignIn';
import Profile from '../Profile';
import NewArticle from '../NewArticle';
import EditArticle from '../EditArticle';

const Main = () => {
  return (
    <div className={styles.container}>
      <Route path="/" exact component={Articles} />
      <Route path="/articles" exact component={Articles} />
      <Route
        path="/articles/:slug"
        exact
        render={({ match }) => {
          const { slug } = match.params;
          return <ArticleSingle id={slug} />;
        }}
      />
      <Route path="/sign-up" component={SignUp} />
      <Route path="/sign-in" component={SignIn} />
      <Route path="/profile" component={Profile} />
      <Route path="/new-article" component={NewArticle} />
      <Route
        path="/articles/:slug/edit"
        render={({ match }) => {
          return <EditArticle slug={match.params.slug} />;
        }}
      />
    </div>
  );
};

export default Main;
