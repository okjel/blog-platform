import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './header.module.scss';

const Header = () => {
  return (
    <div className={styles.container}>
      <Link className={styles.logo} to="/">
        Realworld Blog
      </Link>
      <Link className={styles['s-in']} to="/article">
        ARTICLE
      </Link>
      <Link className={styles['s-in']} to="/list">
        LIST
      </Link>
      <Link className={styles['s-in']} to="/sign-in">
        Sign In
      </Link>
      <Link className={styles['s-up']} to="/sign-up">
        Sign Up
      </Link>
    </div>
  );
};

Header.propTypes = {
  //
};

export default Header;
