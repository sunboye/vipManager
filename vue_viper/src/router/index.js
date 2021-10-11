import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './config'
Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
   VueRouter.prototype.push = function push (location) {
   return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
    if (to.path === '/login') return next();
    else {
        const tokenStr = window.sessionStorage.getItem('token');
        if (!tokenStr) {
            return next('/login');
        } else {
            next()
        }
        next()
    }
});
// router.
export default router
