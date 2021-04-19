import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SignUp from '../components/User/signUp.vue'
import SignIn from '../components/User/SignIn.vue'
import profile from '../components/User/Profile.vue'
import createMeets from '../components/Meet-Ups/createMeets.vue'
import meetups from '../components/Meet-Ups/meetUps.vue'
import meetUpSingle from '../components/Meet-Ups/meetUpSingle'
import restmsg from '../components/User/restmsg'
import AuthGuard from './auth-guard'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: SignIn
  },
  {
    path: '/profile',
    name: 'profile',
    component: profile,
    beforeEnter: AuthGuard
  },
  {
    path: '/meetup/new',
    name: 'createMeets',
    component: createMeets,
    beforeEnter: AuthGuard
  },
  {
    path: '/meetup/:id',
    name: 'meetUpSingle',
    props: true,
    component: meetUpSingle
  },
  {
    path: '/meetups',
    name: 'meetups',
    component: meetups
  },
  {
    path: '/resetMsg',
    name: 'restmsg',
    component: restmsg
  },


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
