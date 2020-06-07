import Vue from 'vue';
import VueRouter from 'vue-router';

const Portfolio = () => import('@/views/Portfolio.vue');
const Operations = () => import('@/views/Operations.vue');

Vue.use(VueRouter);

const routes = [
  {
    path: '/portfolio',
    name: 'Portfolio',
    component: Portfolio,
  },
  {
    path: '/operations',
    name: 'Operations',
    component: Operations,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
