import React from 'react';
import PropTypes from 'prop-types';
import { Space, Typography, Tag } from 'antd';
import { HeartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import styles from './article-item.module.scss';
import ArticleSingle from '../article-single';
import avatarImg from '../../images/avatar.png';

const { Title, Paragraph } = Typography;

const ArticleItem = ({ data }) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Space direction="vertical" size={8}>
          <div className="row">
            <Space>
              <Link to="/article" render={ArticleSingle}>
                <Title className={styles.title} level={4}>
                  Some article title
                </Title>
              </Link>
              <div className={styles.likes}>
                <HeartOutlined className={styles.icon} />
                <div className="count">12</div>
              </div>
            </Space>
          </div>
          <div className="tags">
            <Tag>Tag 1</Tag>
          </div>
          <Paragraph>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur, consequatur distinctio doloribus ea
            illo maxime quae ratione repudiandae sequi veritatis!
          </Paragraph>
        </Space>
      </div>
      <div className={styles.extra}>
        <Space>
          <div className="user-info">
            <Title className={styles['full-name']} level={5}>
              John Doe
            </Title>
            <div className={styles.date}>March 5, 2020</div>
          </div>
          <img src={avatarImg} height={46} width={46} alt="User avatar" />
        </Space>
      </div>
    </div>
  );
};

ArticleItem.propTypes = {
  data: PropTypes.objectOf(Object).isRequired,
};

export default ArticleItem;
