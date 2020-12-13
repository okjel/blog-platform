import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { Divider, Button, Checkbox } from 'antd';
import { Link, Redirect } from 'react-router-dom';
import cx from 'classnames';
import styles from './SignUp.module.scss';
import * as actions from '../../actions/auth';

const SignUp = ({ isLoading, signUp, isLogIn, error }) => {
  const { register, handleSubmit, errors, getValues, control } = useForm();

  if (isLogIn) {
    return <Redirect to="/" />;
  }
  const onSubmit = ({ username, email, password }) => {
    signUp(username, email, password);
  };

  const inputStyle = (errorType) => {
    return cx(styles.input, { [styles.error]: errorType });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={styles.title}>Create new account</h2>
      <label>
        <div>Username</div>
        <input
          className={inputStyle(errors.username)}
          placeholder="Username"
          type="text"
          name="username"
          ref={register({
            required: 'Field is required',
            minLength: { value: 3, message: 'Min length is 3' },
            maxLength: { value: 20, message: 'Max length is 20' },
          })}
        />
        {errors.username && <div className={styles.error}>{errors.username.message}</div>}
      </label>
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
            minLength: { value: 6, message: 'Min length is 6' },
            maxLength: { value: 40, message: 'Max length is 40' },
          })}
        />
        {errors.password && <div className={styles.error}>{errors.password.message}</div>}
      </label>
      <label>
        <div>Repeat Password</div>
        <input
          className={inputStyle(errors['password-repeat'])}
          placeholder="Password"
          type="password"
          name="password-repeat"
          ref={register({
            required: 'Field is required',
            minLength: { value: 6, message: 'Min length is 6' },
            maxLength: { value: 40, message: 'Max length is 40' },
            validate: (value) =>
              value === getValues('password') || 'You entered two different passwords. Please try again.',
          })}
        />
        {errors['password-repeat'] && <div className={styles.error}>{errors['password-repeat'].message}</div>}
      </label>
      <Divider className={styles.divider} />
      <Controller
        control={control}
        name="term"
        defaultValue={false}
        rules={{ validate: (value) => value === true || 'Argee with term!!!' }}
        render={({ onChange, onBlur, value, ref }) => {
          return (
            <>
              <Checkbox
                onChange={(evt) => onChange(evt.target.checked)}
                className={errors.term ? null : styles.checkbox}
                checked={value}
                onBlur={onBlur}
                ref={ref}
              >
                I agree to the processing of my personal information
              </Checkbox>
              {errors.term && <div className={styles.error}>{errors.term.message}</div>}
            </>
          );
        }}
      />

      <Button className={styles.submit} htmlType="submit" loading={isLoading}>
        Create
      </Button>
      {Object.keys(error).length > 0 &&
        Object.entries(error).map((err) => <div className={styles.error}>{`${err[0]} ${err[1][0]}`}</div>)}
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
  signUp: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isLogIn: PropTypes.bool.isRequired,
  error: PropTypes.objectOf(Object).isRequired,
};

const mapStateToProps = (state) => {
  return {
    isLogIn: state.auth.isLogIn,
    isLoading: state.auth.isLoading,
    error: state.auth.error,
  };
};

export default connect(mapStateToProps, actions)(SignUp);
