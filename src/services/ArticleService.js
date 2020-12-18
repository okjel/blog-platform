import ConduitApiService, { optionsCreator, reqType } from './ConduitApiService';

class ArticleService {
  getArticles = (offset = 0, limit = 20) => {
    const path = 'articles';
    const query = `?limit=${limit}&offset=${offset}`;
    return ConduitApiService.request(`${path}${query}`);
  };

  getArticleSingle = (slug) => {
    const path = `articles/${slug}`;
    return ConduitApiService.request(path);
  };

  createArticle = (data) => {
    const path = 'articles';
    return ConduitApiService.request(path, optionsCreator(reqType.post, data));
  };

  editArticle = (data, slug) => {
    const path = `articles/${slug}`;
    return ConduitApiService.request(path, optionsCreator(reqType.put, data));
  };

  deleteArticle = (slug) => {
    const path = `articles/${slug}`;
    return ConduitApiService.request(path, optionsCreator(reqType.delete));
  };

  favoriteArticle = (slug) => {
    const path = `articles/${slug}/favorite`;
    return ConduitApiService.request(path, optionsCreator(reqType.post));
  };

  unFavoriteArticle = (slug) => {
    const path = `articles/${slug}/favorite`;
    return ConduitApiService.request(path, optionsCreator(reqType.delete));
  };
}

export default new ArticleService();
