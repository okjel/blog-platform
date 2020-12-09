import React from 'react';
import PropTypes from 'prop-types';
import { Button, Checkbox, Divider } from 'antd';
import { Link } from 'react-router-dom';
import styles from '../sign-up/sign-up.module.scss';

const SignIn = () => {
  return (
    <form className={styles.form} onSubmit={() => console.log('name')}>
      <h2 className={styles.title}>Sign In</h2>
      <label>
        <div>Email address</div>
        <input className={styles.input} placeholder="Email address" type="text" />
      </label>
      <label>
        <div>Password</div>
        <input className={styles.input} placeholder="Password" type="password" />
      </label>
      <Button className={styles.submit} htmlType="submit">
        Login
      </Button>
      <div className={styles.already}>
        Don’t have an account?&ensp;
        <Link className={styles.link} to="/sign-up">
          Sign Up
        </Link>
        .
      </div>
    </form>
  );
};

SignIn.propTypes = {
  //
};

export default SignIn;
