import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { Divider, Button, Checkbox } from 'antd';
import { Link, Redirect } from 'react-router-dom';
import styles from './SignUp.module.scss';
import * as actions from '../../actions/auth';
import routes from '../../shared/routes';
import Input from '../shared/Input';

const SignUp = ({ isLoading, signUp, isLogIn, error }) => {
  const { register, handleSubmit, errors, getValues, control } = useForm();

  if (isLogIn) {
    return <Redirect to="/" />;
  }
  const onSubmit = ({ username, email, password }) => {
    if (!isLoading) signUp(username, email, password);
  };

  const AlreadyLink = () => (
    <div className={styles.already}>
      Already have an account?&ensp;
      <Link className={styles.link} to={routes.signIn}>
        Sign In
      </Link>
      .
    </div>
  );

  const CreateBtn = () => (
    <>
      <Button className={styles.submit} htmlType="submit" loading={isLoading}>
        Create
      </Button>
      {Object.keys(error).length > 0 &&
        Object.entries(error).map((err) => <div className={styles.error}>{`${err[0]} ${err[1][0]}`}</div>)}
    </>
  );

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={styles.title}>Create new account</h2>
      <Input
        errors={errors}
        register={register}
        title="Username"
        name="username"
        validators={{
          required: 'Field is required',
          minLength: { value: 3, message: 'Min length is 3' },
          maxLength: { value: 20, message: 'Max length is 20' },
        }}
      />

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
        type="password"
        title="Password"
        name="password"
        validators={{
          required: 'Field is required',
          minLength: { value: 6, message: 'Min length is 6' },
          maxLength: { value: 40, message: 'Max length is 40' },
        }}
      />

      <Input
        errors={errors}
        register={register}
        type="password"
        title="Repeat Password"
        name="password-repeat"
        validators={{
          required: 'Field is required',
          minLength: { value: 6, message: 'Min length is 6' },
          maxLength: { value: 40, message: 'Max length is 40' },
          validate: (value) =>
            value === getValues('password') || 'You entered two different passwords. Please try again.',
        }}
      />
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
      <CreateBtn />
      <AlreadyLink />
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
