import { index, route } from '@react-router/dev/routes';

export default [
  index('./pages/home/home.jsx'),
  route('style-guide', './pages/style-guide/style-guide.jsx'),
  route('user/:id', './pages/user/UserPage.jsx')
];
