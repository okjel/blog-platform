import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { List } from 'antd';
import PropTypes from 'prop-types';
import styles from './Articles.module.scss';
import ArticleItem from '../ArticleItem';
import * as actions from '../../actions/apiArticles';
import Loader from '../Loader';

const Articles = ({ articles, isLoading, articlesCount, getArticles }) => {
  const pageSize = 20;

  const [current, setCurrent] = useState(1);

  useEffect(() => {
    getArticles();
  }, [getArticles]);

  const list = (
    <List
      dataSource={articles}
      renderItem={(item) => (
        <List.Item key={item.slug} className={styles.item}>
          <ArticleItem data={item} />
        </List.Item>
      )}
      split={false}
      pagination={{
        showQuickJumper: false,
        current,
        hideOnSinglePage: true,
        onChange: (page) => {
          getArticles(page * pageSize);
          setCurrent(page);
        },
        total: articlesCount,
        defaultPageSize: pageSize,
        showSizeChanger: false,
      }}
    />
  );

  return <div className={styles.container}>{isLoading ? <Loader /> : list}</div>;
};

Articles.propTypes = {
  getArticles: PropTypes.func.isRequired,
  articles: PropTypes.arrayOf(Object).isRequired,
  articlesCount: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  return {
    articles: state.articles.items,
    articlesCount: state.articles.articlesCount,
    isLoading: state.articles.isLoading,
  };
};

export default connect(mapStateToProps, actions)(Articles);
