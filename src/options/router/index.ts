import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HeadList from '~/options/layout/ListLayout.vue'
import ModuleLayout from '~/options/layout/ModuleLayout.vue'

const routes: Array<RouteRecordRaw> = [
  {
    name: 'HeadList',
    path: '/',
    component: HeadList,
    children: [
      {
        name: 'Card',
        path: '/',
        component: () => import('~/options/views/Card.vue'),
      },
      {
        name: 'List',
        path: '/list',
        component: () => import('~/options/views/List.vue'),
      },
      {
        name: 'Setting',
        path: '/setting',
        component: () => import('~/options/views/Setting.vue'),
      },
    ],
  },
  {
    name: 'Module',
    path: '/',
    component: ModuleLayout,
    children: [
      {
        name: 'V2EX',
        path: '/v2ex',
        component: () => import('~/options/views/v2ex/Index.vue'),
      },
    ],
  },
]

export default createRouter({
  history: createWebHashHistory(),
  routes,
  strict: true,
})
