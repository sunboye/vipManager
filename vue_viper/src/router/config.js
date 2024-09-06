const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../components/Login.vue')
    },
    {
        path: '/welcome',
        name: 'Welcome',
        component: () => import('../components/Welcome.vue'),
    },
    {
        path: '/users',
        name: 'Users',
        component: () => import('../components/Users/Users.vue')
    },
    {
        path: '/recycle',
        name: 'recycle',
        component: () => import('../components/Users/recycle.vue')
    }
]

export default routes
