import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import cx from 'classnames';
import { Redirect, withRouter } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as actions from '../../actions/apiArticles';
import styles from './NewArticle.module.scss';
import routes from '../../shared/routes';

const NewArticle = ({ article, error, isLogIn, isLoading, createArticle, editArticle, history }) => {
  const { register, handleSubmit, errors } = useForm();
  const [tags, setTags] = useState(article.tagList || []);
  const [newTag, setNewTag] = useState('');
  const [tagError, setTagError] = useState('');
  const [title, setTitle] = useState(article.title || '');
  const [description, setDescription] = useState(article.description || '');
  const [body, setBody] = useState(article.body || '');

  if (!isLogIn) {
    return <Redirect to="/sign-in" />;
  }

  const reset = () => {
    setTitle('');
    setDescription('');
    setBody('');
    setTags([]);
  };

  const onSubmit = (data) => {
    if (isLoading) return;
    if (article.title) {
      const sendData = { article: { ...data, tagList: tags.filter((el) => el) } };
      editArticle(sendData, article.slug);
      history.push(routes.root);
      return;
    }

    const sendData = { article: { ...data, tagList: tags.filter((el) => el) } };
    createArticle(sendData);
    history.push(routes.root);
    reset();
  };

  const onChangeNewTag = (evt) => {
    setNewTag(evt.target.value);
    if (tagError) setTagError('');
  };

  const addTag = () => {
    const tag = newTag.trim();
    if (!tag) {
      setTagError('Поле пустое');
      return;
    }
    setNewTag('');
    if (tags.some((el) => el === tag)) return;
    setTags((state) => [...state, tag]);
  };

  const deleteTag = (tag) => {
    setTags((state) => [...state.filter((item) => item !== tag)]);
  };

  const inputStyle = (errorType) => {
    return cx(styles.input, { [styles.error]: errorType });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={styles.title}>{article.title ? 'Edit Article' : 'Create new article'}</h2>
      <label>
        <div>Title</div>
        <input
          className={inputStyle(errors.title)}
          placeholder="Title"
          type="text"
          name="title"
          value={title}
          onChange={(evt) => setTitle(evt.target.value)}
          ref={register({
            required: 'Field is required',
          })}
        />
        {errors.title && <div className={styles.error}>{errors.title.message}</div>}
      </label>
      <label>
        <div>Short description</div>
        <input
          className={inputStyle(errors.description)}
          placeholder="Short description"
          type="text"
          name="description"
          value={description}
          onChange={(evt) => setDescription(evt.target.value)}
          ref={register({
            required: 'Field is required',
          })}
        />
        {errors.description && <div className={styles.error}>{errors.description.message}</div>}
      </label>
      <label>
        <div>Text</div>
        <textarea
          className={inputStyle(errors.body)}
          placeholder="Text"
          rows="5"
          name="body"
          value={body}
          onChange={(evt) => setBody(evt.target.value)}
          ref={register({
            required: 'Field is required',
          })}
        />
        {errors.body && <div className={styles.error}>{errors.body.message}</div>}
      </label>

      <div className={styles.tagsContainer}>
        <div>Tags</div>
        {tags.map((item, idx) => (
          <div className={styles.tag} key={+idx}>
            <input
              className={styles.tagInput}
              value={item}
              onChange={(evt) => {
                setTags((state) => {
                  const newState = [...state];
                  newState.splice(idx, 1, evt.target.value);
                  return newState;
                });
              }}
            />
            <Button type="primary" htmlType="button" danger onClick={() => deleteTag(item)}>
              Delete
            </Button>
          </div>
        ))}
        <div className={styles.tag}>
          <input className={styles.tagInput} value={newTag} onChange={onChangeNewTag} />
          <Button htmlType="button" onClick={() => addTag()}>
            Add tag
          </Button>
        </div>
        {tagError && <div className={styles.error}>{tagError}</div>}
      </div>

      <Button className={styles.submit} htmlType="submit" loading={isLoading}>
        {article.title ? 'Save' : 'Create'}
      </Button>
      {Object.keys(error).length > 0 &&
        Object.entries(error).map((err) => <div className={styles.error}>{`${err[0]} ${err[1][0]}`}</div>)}
    </form>
  );
};

NewArticle.propTypes = {
  error: PropTypes.objectOf(Object).isRequired,
  isLogIn: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  createArticle: PropTypes.func.isRequired,
  editArticle: PropTypes.func.isRequired,
  article: PropTypes.objectOf(Object),
  history: PropTypes.objectOf(Object).isRequired,
};

NewArticle.defaultProps = {
  article: {},
};

const mapStateToProps = (state) => {
  return {
    isLoading: state.articles.isLoading,
    isLogIn: state.auth.isLogIn,
    error: state.articles.error,
  };
};

export default withRouter(connect(mapStateToProps, actions)(NewArticle));
