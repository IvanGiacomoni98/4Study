import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import PasswordForgotten from '../views/PasswordForgotten.vue'
import Registration from '../views/Registration.vue'
import Logout from '../components/Logout.vue'
import Dashboard from '../views/Dashboard.vue'
import Avanzato from '../views/Avanzato.vue'
import CambioPw from '../views/CambioPw.vue'
import NewOperatore from '../views/NewOperatore.vue'
import Home from '../views/Home.vue'
import Announcements from '../views/Announcements.vue'
import MyAnnouncements from '../views/MyAnnouncements.vue'
import Component_404 from '../views/404.vue'
import Note from '../views/Notes.vue'
import MyNotes from '../views/MyNotes.vue'
import Profile from '../views/Profile.vue'
import BookingDetails from '../views/BookingDetails.vue'
import FindStudyRoom from '../views/FindStudyRoom.vue'
import FindStudyRoomMap from '../views/FindStudyRoomMap.vue'


Vue.use(VueRouter)

  const routes = [
    {
      path: '/notFound',
      name: 'NotFound',
      component: Component_404
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/bookingDetails',
      name: 'BookingDetails',
      component: BookingDetails
    },
    {
      path:'/mynotes',
      name:'MyNotes',
      component: MyNotes
    },
    {
        path:'/',
        name:'Home',
        component:Home
    },
    {
      path:'/notes',
      name:'Home',
      component:Note
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/pw_forgotten',
    name: 'PasswordForgotten',
    component: PasswordForgotten
  },
  {
    path: '/registration',
    name: 'Registration',
    component: Registration
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },

  {
    path:'/avanzato',
    name:'Avanzato',
    component: Avanzato
  },
  {
    path:'/cambio_pw',
    name:'CambioPw',
    component:CambioPw
  },
  {
    path:'/newoperatore',
    name:'NewOperatore',
    component:NewOperatore
  },
 
  {
    path:'/announcements',
    name:'Announcements',
    component:Announcements
  },

  {
    path:'/myannouncements',
    name:'MyAnnouncements',
    component: MyAnnouncements
  },

  {
    path:'/findStudyRoom',
    name:'FindStudyRooms',
    component: FindStudyRoom
  },

  {
    path:'/findStudyRoomMap/:city',
    name:'FindStudyRoomsMap',
    component: FindStudyRoomMap
  },

  { path: '*', redirect: '/notFound' },  
]

const router = new VueRouter({
  routes
})

export default router
