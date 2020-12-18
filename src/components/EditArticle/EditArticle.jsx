import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NewArticle from '../NewArticle';
import * as actions from '../../actions/apiArticles';

const EditArticle = ({ slug, getArticleSingle, items }) => {
  const memoGetArticleSingle = useCallback(() => getArticleSingle(slug), [getArticleSingle, slug]);

  useEffect(() => {
    memoGetArticleSingle();
  }, [memoGetArticleSingle]);
  return <NewArticle article={items[0]} />;
};

EditArticle.propTypes = {
  slug: PropTypes.string.isRequired,
  getArticleSingle: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(Object).isRequired,
};

const mapStateToProps = (state) => {
  return {
    items: state.articles.items,
    isLoading: state.articles.isLoading,
  };
};

export default connect(mapStateToProps, actions)(EditArticle);
