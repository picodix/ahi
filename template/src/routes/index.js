export default [
    {
        path: '/home',
        name: 'home',
        component: function (resolve) {
            require(['@/sections/Home.vue'], resolve)
        }
    },
    {
        path: '/about',
        name: 'about',
        component: function (resolve) {
            require(['@/sections/About.vue'], resolve)
        }
    },
    {
        path: '*',
        redirect: '/home'
    }
]
