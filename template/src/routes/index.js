export default [
    {
        path: '/home',
        name: 'home',
        component: resolve => require(['@/sections/Home.vue'], resolve)
    },
    {
        path: '/about',
        name: 'about',
        component: resolve => require(['@/sections/About.vue'], resolve)
    },
    {
        path: '*',
        redirect: '/home'
    }
]
