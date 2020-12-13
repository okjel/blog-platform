import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Space, Typography, Tag, Popconfirm } from 'antd';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { Link, withRouter } from 'react-router-dom';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import cx from 'classnames';

import * as actions from '../../actions/apiArticles';
import styles from './ArticleItem.module.scss';
import avatarImg from '../../images/avatar.png';
import toUrl from '../shared/urlConverter';

const { Title } = Typography;

const ArticleItem = ({ data, isSingle, deleteArticle, history, user, toggleFavorite, isLogIn }) => {
  const title = data.title.length > 50 ? `${data.title.slice(0, 50)}...` : data.title;

  const tagsNodes = data.tagList.map((tag, idx) => {
    return <Tag key={Number(idx)}>{tag}</Tag>;
  });
  const avatarSrc = toUrl(data.author.image) || avatarImg;

  const confirm = () => {
    deleteArticle(data.slug);
    history.push('/');
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.row}>
          {isSingle ? (
            <Title className={styles.title} level={4}>
              {title}
            </Title>
          ) : (
            <Link to={`/articles/${data.slug}/`}>
              <Title className={styles.title} level={4}>
                {title}
              </Title>
            </Link>
          )}
          <div className={styles.likes}>
            <button
              disabled={!isLogIn}
              type="button"
              className={styles.btnLike}
              onClick={() => toggleFavorite(data.slug, data.favorited)}
            >
              {data.favorited ? (
                <HeartFilled className={styles.iconFavorite} />
              ) : (
                <HeartOutlined className={styles.icon} />
              )}
            </button>
            <div className="count">{data.favoritesCount}</div>
          </div>
        </div>
        <div className={styles.tags}>{tagsNodes}</div>
        <p className={styles.description}>{data.description}</p>
      </div>
      <div className={styles.extra}>
        <Space>
          <div className="user-info">
            <Title className={styles['full-name']} level={5}>
              {data.author.username}
            </Title>
            <div className={styles.date}>{format(new Date(data.createdAt), 'MMMM d, u')}</div>
          </div>
          <img src={avatarSrc} height={46} width={46} alt="User avatar" />
        </Space>
        {isSingle && data.author.username === user.username ? (
          <div className={styles.buttons}>
            <Popconfirm placement="rightTop" title="Are you sure?" onConfirm={confirm} okText="Yes" cancelText="No">
              <button type="button" className={cx(styles.btn, styles.btnDanger)}>
                Delete
              </button>
            </Popconfirm>

            <button type="button" className={cx(styles.btn, styles.btnEdit)} onClick={() => history.push('edit')}>
              Edit
            </button>
          </div>
        ) : null}
      </div>
      {isSingle ? <ReactMarkdown className={styles['content-body']}>{data.body}</ReactMarkdown> : null}
    </div>
  );
};

ArticleItem.propTypes = {
  data: PropTypes.objectOf(Object).isRequired,
  history: PropTypes.objectOf(Object).isRequired,
  user: PropTypes.objectOf(Object).isRequired,
  isSingle: PropTypes.bool,
  isLogIn: PropTypes.bool.isRequired,
  deleteArticle: PropTypes.func.isRequired,
  toggleFavorite: PropTypes.func.isRequired,
};

ArticleItem.defaultProps = {
  isSingle: false,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  isLogIn: state.auth.isLogIn,
});

export default withRouter(connect(mapStateToProps, actions)(ArticleItem));
