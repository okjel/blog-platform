import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Button } from 'antd';
import { useForm } from 'react-hook-form';
import { Redirect } from 'react-router-dom';
import * as actions from '../../actions/auth';
import styles from './Profile.module.scss';

const Profile = ({ edit, isLogIn, isLoading, error, user }) => {
  const { register, handleSubmit, errors } = useForm();
  const [username, setUsername] = useState(user.username || '');
  const [email, setEmail] = useState(user.email || '');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState(user.image || '');

  if (!isLogIn) {
    return <Redirect to="/sign-in" />;
  }

  const onSubmit = (data) => {
    if (isLoading) return;
    const sendData = Object.entries(data)
      .filter((el) => el[1])
      .reduce((acc, item) => ({ ...acc, [item[0]]: item[1] }), {});
    edit(sendData);
  };

  const inputStyle = (errorType) => {
    return cx(styles.input, { [styles.error]: errorType });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={styles.title}>Edit Profile</h2>
      <label>
        <div>Username</div>
        <input
          className={inputStyle(errors.username)}
          placeholder="Username"
          type="text"
          name="username"
          value={username}
          onChange={(evt) => setUsername(evt.target.value)}
          ref={register({
            required: 'Field is required',
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
          value={email}
          onChange={(evt) => setEmail(evt.target.value)}
          ref={register({
            required: 'Field is required',
            pattern: { value: /^\S+@\S+$/i, message: 'Enter correct email' },
          })}
        />
        {errors.email && <div className={styles.error}>{errors.email.message}</div>}
      </label>
      <label>
        <div>New password</div>
        <input
          className={inputStyle(errors.password)}
          placeholder="New password"
          type="password"
          name="password"
          value={password}
          onChange={(evt) => setPassword(evt.target.value)}
          ref={register({
            minLength: { value: 6, message: 'Min length is 6' },
            maxLength: { value: 40, message: 'Max length is 40' },
          })}
        />
        {errors.password && <div className={styles.error}>{errors.password.message}</div>}
      </label>
      <label>
        <div>Avatar image (url)</div>
        <input
          className={inputStyle(errors.username)}
          placeholder="Avatar image"
          type="text"
          name="image"
          onChange={(evt) => setImage(evt.target.value)}
          value={image}
          ref={register({
            validate: (value) => /^[a-z]+:\/\//i.test(value) || value.length === 0 || 'Enter correct url',
          })}
        />
        {errors.avatar && <div className={styles.error}>{errors.username.message}</div>}
      </label>
      <Button className={styles.submit} htmlType="submit" loading={isLoading}>
        Save
      </Button>
      {Object.keys(error).length > 0 &&
        Object.entries(error).map((err) => <div className={styles.error}>{`${err[0]} ${err[1][0]}`}</div>)}
    </form>
  );
};

Profile.propTypes = {
  edit: PropTypes.func.isRequired,
  isLogIn: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.objectOf(Object).isRequired,
  user: PropTypes.objectOf(Object).isRequired,
};

const mapStateToProps = (state) => {
  return {
    isLogIn: state.auth.isLogIn,
    isLoading: state.auth.isLoading,
    error: state.auth.error,
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, actions)(Profile);
