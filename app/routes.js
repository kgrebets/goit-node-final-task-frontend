import { index, route, layout } from '@react-router/dev/routes';

export default [
  // Home page uses its own layout with a special header position
  layout('./layouts/default-layout.jsx', [
    index('./pages/home/home.jsx')
  ]),


  // All other pages share the base layout with the standard header position
  layout('./layouts/base-layout.jsx', [
    route('style-guide', './pages/style-guide/style-guide.jsx'),
    route('user/:id?', './pages/user/user.jsx'),
  ]),

];
