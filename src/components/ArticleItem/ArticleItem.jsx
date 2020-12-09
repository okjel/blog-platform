import React from 'react';
import PropTypes from 'prop-types';
import { Space, Typography, Tag } from 'antd';
import { HeartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';

import styles from './ArticleItem.module.scss';
import avatarImg from '../../images/avatar.png';

const { Title } = Typography;

const ArticleItem = ({ data, isSingle }) => {
  const title = data.title.length > 50 ? `${data.title.slice(0, 50)}...` : data.title;

  const toUrl = (string) => {
    try {
      // eslint-disable-next-line no-new
      return new URL(string);
    } catch {
      return null;
    }
  };

  const tagsNodes = data.tagList.map((tag) => {
    return <Tag>{tag}</Tag>;
  });
  const avatarSrc = toUrl(data.author.image) || avatarImg;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.row}>
          <Link to={`/article/${data.slug}`}>
            <Title className={styles.title} level={4}>
              {title}
            </Title>
          </Link>
          <div className={styles.likes}>
            <HeartOutlined className={styles.icon} />
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
      </div>
      {isSingle ? <ReactMarkdown className={styles['content-body']}>{data.body}</ReactMarkdown> : null}
    </div>
  );
};

ArticleItem.propTypes = {
  data: PropTypes.objectOf(Object).isRequired,
  isSingle: PropTypes.bool,
};

ArticleItem.defaultProps = {
  isSingle: false,
};

export default ArticleItem;
