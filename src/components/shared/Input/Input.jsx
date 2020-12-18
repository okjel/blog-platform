import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './Input.module.scss';

const inputStyle = (errorType) => {
  return cx(styles.input, { [styles.error]: errorType });
};

const Input = ({ errors, register, title, type, name, validators }) => {
  return (
    <label>
      <div>{title}</div>
      <input
        className={inputStyle(errors[name])}
        placeholder={title}
        type={type}
        name={name}
        ref={register(validators)}
      />
      {errors[name] && <div className={styles.error}>{errors[name].message}</div>}
    </label>
  );
};

Input.propTypes = {
  errors: PropTypes.objectOf(Object).isRequired,
  register: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  validators: PropTypes.objectOf(Object).isRequired,
};
Input.defaultProps = {
  type: 'text',
};

export default Input;
