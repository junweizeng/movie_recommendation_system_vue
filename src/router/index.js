import {createRouter, createWebHistory} from 'vue-router'

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
                path: 'personal/edit',
                name: 'personalEdit',
                component: () => import('../views/personal/PersonalInfoEditingView.vue')
            },
            {
                path: 'personal/planet',
                name: 'personalPlanet',
                component: () => import('../views/personal/MoviePlanetView.vue')
            },
            {
                path: 'personal',
                name: 'personal',
                redirect: '/personal/recommendation',
                component: () => import('../views/personal/PersonalView.vue'),
                children: [
                    {
                        path: 'recommendation',
                        name: 'personalRecommendation',
                        component: () => import('../views/personal/info/RecommendationView.vue')
                    },
                    {
                        path: 'moments',
                        name: 'personalMoments',
                        component: () => import('../views/personal/info/MomentsView.vue')
                    },
                    {
                        path: 'watched',
                        name: 'personalWatched',
                        component: () => import('../views/personal/info/WatchedMoviesView.vue')
                    },
                ]
            },
            {
                path: 'setting',
                name: 'setting',
                redirect: '/setting/personal/info',
                component: () => import('../views/personal/PersonalSettingView.vue'),
                children: [
                    {
                        path: 'personal/info',
                        name: 'settingPersonalInfo',
                        component: () => import('../views/personal/PersonalInfoEditingView.vue'),
                    },
                    {
                        path: 'account',
                        name: 'settingAccount',
                        component: () => import('../views/personal/AccountSettingView.vue')
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
    {
        path: '/forget',
        name: 'forget',
        component: () => import('../views/ForgetView.vue')
    }
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
