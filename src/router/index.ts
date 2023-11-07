import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Registration from '../views/Registration.vue'
import Login from '../views/Login.vue'
import Game from '../views/Game.vue'
import Verification from '../views/Verification.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/registration',
      name: 'Registration',
      component: Registration
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/game',
      name: 'Game',
      component: Game
    },
    {
      path: '/verification',
      name: 'Verification',
      component: Verification
    }
  
  ]
})

export default router
