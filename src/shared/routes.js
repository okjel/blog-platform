export default {
  root: '/',
  articles: '/articles',
  article: (slug) => (slug ? `/articles/${slug}/` : '/articles/:slug/'),
  signUp: '/sign-up',
  signIn: '/sign-in',
  profile: '/profile',
  newArticle: '/new-article',
  articleEdit: (slug) => (slug ? `/articles/${slug}/edit` : '/articles/:slug/edit'),
  edit: 'edit',
};
