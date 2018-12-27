<template>
   <div class="box">
<header class="header-navigation" id="header">
  <nav><div class="logo"><a href="/">LYP个人博客</a></div>
    <h2 id="mnavh"><span class="navicon"></span></h2>
    <ul id="starlist">
      <li><router-link to="/">首页</router-link></li>
      <li><router-link to="./about">关于本博客</router-link></li>
      <li><router-link to="./gbook">留言</router-link></li>
      <li v-if="username=='梁某某'"><router-link to="./Editor">写博客</router-link></li>
      <li v-if="!isLogin">
        <router-link to="./Login">登录</router-link>
      </li>
      <li v-else>
        <label>欢迎你：{{username}}</label>
      </li>
      <li v-if="isLogin"><a href="javascript:void(0);" @click="ReSession()">退出登录</a></li>
    </ul>
  </nav>
</header>

</div>
</template>

<script>
import "../assets/js/jquery.min.js"
import "../assets/js/comm.js"
import "../assets/js/Home.js"
import "../assets/js/piccontent.min.js"


export default {
  name: 'Head',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
    }
  },
  props:{
    username:String,
    isLogin:"",
    ReSession:{
      type:Function,
      default:null
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
