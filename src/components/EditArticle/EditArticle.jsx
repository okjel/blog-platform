import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NewArticle from '../NewArticle';
import * as actions from '../../actions/apiArticles';

const EditArticle = ({ slug, getArticleSingle, single }) => {
  const memoGetArticleSingle = useCallback(() => getArticleSingle(slug), [getArticleSingle, slug]);

  useEffect(() => {
    memoGetArticleSingle();
  }, [memoGetArticleSingle]);
  return <NewArticle article={single} />;
};

EditArticle.propTypes = {
  slug: PropTypes.string.isRequired,
  getArticleSingle: PropTypes.func.isRequired,
  single: PropTypes.objectOf(Object).isRequired,
};

const mapStateToProps = (state) => {
  return {
    single: state.articles.single,
    isLoading: state.articles.isLoading,
  };
};

export default connect(mapStateToProps, actions)(EditArticle);
