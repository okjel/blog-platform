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
import routes from '../../shared/routes';

const Main = () => {
  return (
    <div className={styles.container}>
      <Route path={routes.root} exact component={Articles} />
      <Route path={routes.articles} exact component={Articles} />
      <Route
        path={routes.article()}
        exact
        render={({ match }) => {
          const { slug } = match.params;
          return <ArticleSingle id={slug} />;
        }}
      />
      <Route path={routes.signUp} component={SignUp} />
      <Route path={routes.signIn} component={SignIn} />
      <Route path={routes.profile} component={Profile} />
      <Route path={routes.newArticle} component={NewArticle} />
      <Route
        path={routes.articleEdit()}
        render={({ match }) => {
          return <EditArticle slug={match.params.slug} />;
        }}
      />
    </div>
  );
};

export default Main;
