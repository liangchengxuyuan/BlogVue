import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import About from '../components/About'
import Gbook from '../components/Gbook'
import Info from '../components/Info'
import Editor from '../components/EditorTest'
import Login from '../components/Login'
import Register from '../components/Register'


Vue.use(Router)
Vue.config.productionTip = false

export default new Router({
  
  routes: [
    {
      path:'/',
      name:'Home',
      component:Home
    },
    {
      path:'/About',
      name:'About',
      component:About
    },
    {
      path:'/Gbook',
      name:'Gbook',
      component:Gbook
    },
    {
      path:'/Info',
      name:'Info',
      component:Info
    },
    {
      path:'/Editor',
      name:'Editor',
      component:Editor
    },
    {
      path:'/Login',
      name:'Login',
      component:Login
    },
    {
      path:'/Register',
      name:'Register',
      component:Register
    }
  ],
  mode:'history'
})
