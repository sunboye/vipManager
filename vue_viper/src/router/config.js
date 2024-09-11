const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../components/Login.vue')
    },
    {
        path: '/welcome',
        name: 'welcome',
        component: () => import('../components/Welcome.vue'),
    },
    {
        path: '/users',
        name: 'users',
        component: () => import('../components/Users/Users.vue')
    },
    {
        path: '/recycle',
        name: 'recycle',
        component: () => import('../components/Users/recycle.vue')
    }
]

export default routes
