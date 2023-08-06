import { createRouter, createWebHistory } from 'vue-router';
import Home from './Home';

export default createRouter({
  history: createWebHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    {
      path: '/',
      component: Home,
    },
  ],
});

// 페이지가 바뀔 때마다 스크롤 최상단 위치
