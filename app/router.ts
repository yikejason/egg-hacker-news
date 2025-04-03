import { Application } from 'egg';

export default (app: Application) => {
  const { router, controller } = app;

  router.redirect('/', '/news');
  router.get('/news', controller.news.index);
  router.get('/news/item/:id', controller.news.detail);
  router.get('/news/user/:id', controller.news.user);
};
