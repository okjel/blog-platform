import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from './ArticleSingle.module.scss';
import * as actions from '../../actions/apiArticles';
import Loader from '../Loader';
import ArticleItem from '../ArticleItem';

const ArticleSingle = ({ id, items, isLoading, getArticleSingle }) => {
  const memoGetArticleSingle = useCallback(() => getArticleSingle(id), [getArticleSingle, id]);

  useEffect(() => {
    memoGetArticleSingle();
  }, [memoGetArticleSingle]);

  if (isLoading) {
    return (
      <div className={styles['error-container']}>
        <Loader />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <ArticleItem data={items[0]} isSingle />
    </div>
  );
};

ArticleSingle.propTypes = {
  id: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(Object).isRequired,
  isLoading: PropTypes.bool.isRequired,
  getArticleSingle: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    items: state.articles.items,
    isLoading: state.articles.isLoading,
  };
};

export default connect(mapStateToProps, actions)(ArticleSingle);
