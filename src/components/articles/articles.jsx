import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'antd';
import ArticleItem from '../article-item';

import styles from './articles.module.scss';

const Articles = () => {
  return (
    <div className={styles.container}>
      <List
        dataSource={['name', 'tail']}
        renderItem={(item) => (
          <List.Item>
            <ArticleItem data={item} />
          </List.Item>
        )}
        split={false}
        pagination={{
          hideOnSinglePage: true,
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 3,
        }}
      />
    </div>
  );
};

Articles.propTypes = {
  //
};

export default Articles;
