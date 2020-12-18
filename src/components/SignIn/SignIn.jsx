import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'antd';
import { useForm } from 'react-hook-form';
import { Link, Redirect } from 'react-router-dom';
import * as actions from '../../actions/auth';
import styles from './SignIn.module.scss';
import routes from '../../shared/routes';
import Input from '../shared/Input';

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
    if (!isLoading) signIn(email, password);
  };

  const AlreadyLink = () => (
    <div className={styles.already}>
      Don’t have an account?&ensp;
      <Link className={styles.link} to={routes.signUp}>
        Sign Up
      </Link>
      .
    </div>
  );

  const SubmitBtn = () => (
    <>
      <Button className={styles.submit} htmlType="submit" loading={isLoading}>
        Login
      </Button>

      {error['email or password'] &&
        error['email or password'].map((err) => <div className={styles.error}>{`Email or password ${err}`}</div>)}
    </>
  );

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={styles.title}>Sign In</h2>
      <Input
        errors={errors}
        register={register}
        title="Email address"
        name="email"
        validators={{
          required: 'Field is required',
          pattern: { value: /^\S+@\S+$/i, message: 'Enter correct email' },
        }}
      />
      <Input
        errors={errors}
        register={register}
        title="Password"
        name="password"
        type="password"
        validators={{
          required: 'Field is required',
        }}
      />
      <SubmitBtn />
      <AlreadyLink />
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
