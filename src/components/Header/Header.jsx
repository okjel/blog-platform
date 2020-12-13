import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Space, Typography } from 'antd';
import styles from './Header.module.scss';
import toUrl from '../shared/urlConverter';
import avatarImg from '../../images/avatar.png';
import * as actions from '../../actions/auth';

const { Title } = Typography;

const Header = ({ avatar, isLogIn, username, history, logOut }) => {
  const logOutHandler = () => {
    logOut();
    history.push('/');
  };

  const avatarSrc = toUrl(avatar) || avatarImg;

  return (
    <div className={styles.container}>
      <Link className={styles.logo} to="/">
        Realworld Blog
      </Link>
      {isLogIn ? (
        <>
          <Link className={styles['s-up']} to="/new-article">
            Create article
          </Link>
          <Link to="/profile">
            <Space>
              <div className="user-info">
                <Title className={styles['full-name']} level={5}>
                  {username}
                </Title>
              </div>
              <img src={avatarSrc} height={46} width={46} alt="User avatar" />
            </Space>
          </Link>
          <button type="button" className={styles['l-out']} onClick={logOutHandler}>
            Log Out
          </button>
        </>
      ) : (
        <>
          <Link className={styles['s-in']} to="/sign-in">
            Sign In
          </Link>
          <Link className={styles['s-up']} to="/sign-up">
            Sign Up
          </Link>
        </>
      )}
    </div>
  );
};

Header.propTypes = {
  username: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
  avatar: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
  isLogIn: PropTypes.bool.isRequired,
  history: PropTypes.objectOf(Object).isRequired,
  logOut: PropTypes.func.isRequired,
};

Header.defaultProps = {
  avatar: null,
  username: null,
};

const mapStateToProps = (state) => {
  return {
    username: state.auth.user.username,
    avatar: state.auth.user.image,
    isLogIn: state.auth.isLogIn,
  };
};

export default withRouter(connect(mapStateToProps, actions)(Header));
