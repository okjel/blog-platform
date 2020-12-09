import React from 'react';
import PropTypes from 'prop-types';
import { Space, Typography, Tag } from 'antd';
import { HeartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

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
      {isSingle ? (
        <p className={styles['content-body']}>
          Est Ampyciden pater patent Amor saxa inpiger Lorem markdownum Stygias neque is referam fudi, breve per. Et
          Achaica tamen: nescia ista occupat, illum se ad potest humum et. Qua deos has fontibus Recens nec ferro
          responsaque dedere armenti opes momorderat pisce, vitataque et fugisse. Et iamque incipiens, qua huius suo
          omnes ne pendentia citus pedum. Quamvis pronuba Ulli labore facta. Io cervis non nosterque nullae, vides:
          aethere Delphice subit, tamen Romane ob cubilia Rhodopen calentes librata! Nihil populorum flava, inrita? Sit
          hic nunc, hoc formae Esse illo? Umeris eram similis, crudelem de est relicto ingemuit finiat Pelia uno cernunt
          Venus draconem, hic, Methymnaeae. 1. Clamoribus haesit tenentem iube Haec munera 2. Vincla venae 3. Paris
          includere etiam tamen 4. Superi te putria imagine Deianira 5. Tremore hoste Esse sed perstat capillis siqua
        </p>
      ) : null}
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
