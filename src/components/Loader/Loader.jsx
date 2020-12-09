import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import styles from './Loader.module.scss';

const Loader = () => {
  return (
    <div className={styles.spin}>
      <CircularProgress color="inherit" size={100} />
    </div>
  );
};

Loader.propTypes = {
  //
};

export default Loader;
