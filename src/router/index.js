import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'index',
    redirect: '/home',
    component: () => import('../views/IndexView.vue'),
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('../views/HomeView.vue')
      },
      {
        path: 'about',
        name: 'about',
        component: () => import('../views/AboutView.vue')
      },
      {
        path: 'movie/info/:id',
        name: 'movieInfo',
        component: () => import('../views/MovieInfoView.vue')
      },
      {
        path: 'classification',
        name: 'classification',
        component: () => import('../views/ClassificationView.vue'),
      },
      {
        path: 'personal/info',
        name: 'personalInfo',
        component: () => import('../views/PersonalView.vue')
      },
      {
        path: 'personal/edit',
        name: 'personalEdit',
        component: () => import('../views/PersonalInfoEditingView.vue')
      },
      {
        path: 'personal/planet',
        name: 'personalPlanet',
        component: () => import('../views/MoviePlanetView.vue')
      },
      {
        path: 'setting',
        name: 'setting',
        redirect: '/setting/personal/info',
        component: () => import('../views/PersonalSettingView.vue'),
        children: [
          {
            path: 'personal/info',
            name: 'settingPersonalInfo',
            component: () => import('../views/PersonalInfoEditingView.vue'),
          },
          {
            path: 'account',
            name: 'settingAccount',
            component: () => import('../views/AccountSettingView.vue')
          }
        ]
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/RegisterView.vue')
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

/**
 * 全局后置守卫：
 * 1. 每次路由跳转后，页面回到顶部。
 */
router.afterEach((to, from, next) => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;

  // 兼容IE
  window.scrollTo(0, 0);
  // next();
})

export default router
