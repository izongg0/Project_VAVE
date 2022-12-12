import { createRouter, createWebHistory } from 'vue-router'
<<<<<<< HEAD
=======
import HomeView from '../views/HomeView.vue'
>>>>>>> 5c586cb8e57a3838b48e31fa158b4c076452da6b

const routes = [
  {
    path: '/',
<<<<<<< HEAD
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/LoginView.vue')
  },
  {
    path: '/main',
    name: 'main',
=======
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
>>>>>>> 5c586cb8e57a3838b48e31fa158b4c076452da6b
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
<<<<<<< HEAD
      import(/* webpackChunkName: "about" */ '../views/HomeView.vue')
  },
  {
    path: '/signup',
    name: 'signup',
=======
      import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/frame',
    name: 'frame',
>>>>>>> 5c586cb8e57a3838b48e31fa158b4c076452da6b
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
<<<<<<< HEAD
      import(/* webpackChunkName: "about" */ '../views/SignupView.vue')
  },
  {
    path: '/mypage',
    name: 'mypage',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Mypage.vue')
=======
      import(/* webpackChunkName: "about" */ '../views/Frame.vue')
>>>>>>> 5c586cb8e57a3838b48e31fa158b4c076452da6b
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
