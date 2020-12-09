class ConduitApiService {
  base = 'https://conduit.productionready.io/api/';

  request = async (query, options) => {
    const res = await fetch(`${this.base}${query}`, options);

    if (!res.ok) {
      throw new Error(`Could not fetch ${query}, received ${res.status}`);
    }

    return res.json();
  };

  //
  // setSearchId = () => {
  //   const path = 'search';
  //   return this.request(`${path}`);
  // };

  getArticles = (offset = 0, limit = 20) => {
    const path = 'articles';
    const query = `?limit=${limit}&offset=${offset}`;
    return this.request(`${path}${query}`);
  };

  getArticleSingle = (slug) => {
    const path = `articles/${slug}`;
    return this.request(path);
  };
}

export default new ConduitApiService();
