import { createBrowserRouter } from 'react-router';
import Home from './pages/home';
import Service from './pages/service';
import Apply from './pages/apply';
import ChatPage from './pages/chat';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Home,
  },
  {
    path: '/service',
    Component: Service,
  },
  {
    path: '/apply',
    Component: Apply,
  },
  {
    path: '/chat',
    Component: ChatPage,
  },
]);
