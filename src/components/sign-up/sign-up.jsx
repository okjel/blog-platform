import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox, Divider, Button } from 'antd';
import { Link } from 'react-router-dom';
import styles from './sign-up.module.scss';

const SignUp = () => {
  return (
    <form className={styles.form} onSubmit={() => console.log('name up')}>
      <h2 className={styles.title}>Create new account</h2>
      <label>
        <div>Username</div>
        <input className={styles.input} placeholder="Username" type="text" />
      </label>
      <label>
        <div>Email address</div>
        <input className={styles.input} placeholder="Email address" type="text" />
      </label>
      <label>
        <div>Password</div>
        <input className={styles.input} placeholder="Password" type="password" />
      </label>
      <label>
        <div>Repeat Password</div>
        <input className={styles.input} placeholder="Password" type="password" />
      </label>
      <Divider className={styles.divider} />
      <Checkbox className={styles.checkbox} onChange={() => console.log('me')}>
        I agree to the processing of my personal information
      </Checkbox>
      <Button className={styles.submit} htmlType="submit">
        Create
      </Button>
      <div className={styles.already}>
        Already have an account?&ensp;
        <Link className={styles.link} to="/sign-in">
          Sign In
        </Link>
        .
      </div>
    </form>
  );
};

SignUp.propTypes = {
  //
};

export default SignUp;
