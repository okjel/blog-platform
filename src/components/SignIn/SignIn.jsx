import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'antd';
import { useForm } from 'react-hook-form';
import cx from 'classnames';
import { Link, Redirect } from 'react-router-dom';
import * as actions from '../../actions/auth';
import styles from './SignIn.module.scss';

const SignIn = ({ signIn, setError, isLogIn, isLoading, error }) => {
  const { register, handleSubmit, errors } = useForm();
  useEffect(() => {
    return () => {
      setError({});
    };
  }, [setError]);

  if (isLogIn) {
    return <Redirect to="/" />;
  }

  const onSubmit = ({ email, password }) => {
    signIn(email, password);
  };

  const inputStyle = (errorType) => {
    return cx(styles.input, { [styles.error]: errorType });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={styles.title}>Sign In</h2>
      <label>
        <div>Email address</div>
        <input
          className={inputStyle(errors.email)}
          placeholder="Email address"
          type="text"
          name="email"
          ref={register({
            required: 'Field is required',
            pattern: { value: /^\S+@\S+$/i, message: 'Enter correct email' },
          })}
        />
        {errors.email && <div className={styles.error}>{errors.email.message}</div>}
      </label>
      <label>
        <div>Password</div>
        <input
          className={inputStyle(errors.password)}
          placeholder="Password"
          type="password"
          name="password"
          ref={register({
            required: 'Field is required',
          })}
        />
        {errors.password && <div className={styles.error}>{errors.password.message}</div>}
      </label>
      <Button className={styles.submit} htmlType="submit" loading={isLoading}>
        Login
      </Button>

      {error['email or password'] &&
        error['email or password'].map((err) => <div className={styles.error}>{`Email or password ${err}`}</div>)}
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
  signIn: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
  isLogIn: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.objectOf(Object).isRequired,
};

const mapStateToProps = (state) => {
  return {
    isLogIn: state.auth.isLogIn,
    isLoading: state.auth.isLoading,
    error: state.auth.error,
  };
};

export default connect(mapStateToProps, actions)(SignIn);
