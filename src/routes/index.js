import { createRouter, createWebHistory } from 'vue-router';
import Workspace from './Workspace';
import NotFound from './NotFound';

export default createRouter({
  history: createWebHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    {
      path: '/',
      component: Workspace,
      children: [
        {
          name: 'Workspace',
          path: 'workspaces/:id',
          component: Workspace,
        },
      ],
    },
    {
      path: '/:notFound(.*)',
      component: NotFound,
    },
  ],
});

// 페이지가 바뀔 때마다 스크롤 최상단 위치
