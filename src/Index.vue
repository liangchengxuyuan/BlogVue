<template>
  <div id="app">
    
    <router-view></router-view>
  </div>
</template>

<script>
import Head from "./components/Head"

import "./assets/js/jquery.min.js"
import "./assets/js/comm.js"
export default {
  name: 'App',
  components:{Head}
}
</script>


<style>
@import "./assets/css/base.css";
@import "./assets/css/index.css";
@import "./assets/css/m.css";
@import "./assets/css/info.css";
@import "./assets/css/infopic.css";
@import "./assets/css/login.css";

</style>
