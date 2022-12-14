import { createRouter, createWebHistory } from 'vue-router'
<<<<<<< HEAD
=======
import HomeView from '../views/HomeView.vue'
>>>>>>> a8be6cb9f1b168b43afdfb85e8afe08457a26350

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
>>>>>>> a8be6cb9f1b168b43afdfb85e8afe08457a26350
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
>>>>>>> a8be6cb9f1b168b43afdfb85e8afe08457a26350
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
>>>>>>> a8be6cb9f1b168b43afdfb85e8afe08457a26350
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
