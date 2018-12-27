<template>
    <div class="about">
        <heads :username="username" :isLogin="isLogin" :ReSession="ReSession"></heads>
<article>
  <aside class="l_box">
    <div class="about_me">
      <h2>关于本博客</h2>
      <ul>
        <i><img src="../assets/images/4.jpg"></i>
        <p><b>LYP</b>，一个菜鸟码农，写这个博客是为了记录下自己的学习笔记。</p>
      </ul>
    </div>
    <div class="wdxc">
      <h2>我的相册</h2>
      <ul>
        <li><a href="/"><img src="../assets/images/7.jpg"></a></li>
        <li><a href="/"><img src="../assets/images/8.jpg"></a></li>
        <li><a href="/"><img src="../assets/images/9.jpg"></a></li>
        <li><a href="/"><img src="../assets/images/10.jpg"></a></li>
        <li><a href="/"><img src="../assets/images/11.jpg"></a></li>
        <li><a href="/"><img src="../assets/images/12.jpg"></a></li>
      </ul>
    </div>
   
    <div class="guanzhu">
      <h2>加我微信一起讨论，请注明来意</h2>
      <ul>
        <img src="../assets/images/wx.jpg">
      </ul>
    </div>
  </aside>
  <main class="r_box">
     <div class="about">
      <p>其实像我们做这种码农呢，相关的技术论坛、博客，网上都还挺多的。像我比较喜欢逛博客园，那既然有了这些写博客的平台，为什么还要自己花时间搭一个呢？<br />
      
      <p>我也知道像自己搭的这种博客，基本上也不会有多少人来浏览。所以最大的初衷只是因为学些新东西用不上场，所以就想着自己用这些东西搭个博客玩玩。其次，自己做的东西想放什么都可以，比较自由。</p><br />
      <img src="../assets/images/1.jpg">     
      <p>然后呢，大概说下搭建该博客用到的一些东西。因为我是一直写C#的，所以最近闲暇时间一直在学习.NET Core，该博客的后端使用的就是.NET Core WebApi然后加前端vue。</p>
      <p>首先后端.NET Core搭的框架是一个仓储层+服务层+API，然后数据库访问是EF Core+Mysql数据库。具体接口都使用的异步，使用第三方IOC容器解耦。</p>
      <p>然后前端页面是网上找的模板https://www.yangqq.com/link.html，博主有各种风格的博客，可以去看下。然后接口请求是axios，vue用来处理数据。</p>
      <p>然后环境的话，我这边是部署在centos服务器上，nginx代理，顺便解决了跨域问题。</p>
      <p>如果有刚学习.NET Core的小伙伴需要的话，可以留言或者其他方式联系，我可以稍微写个博客介绍一下。</p>
          <br />
      <p>最后，本博客的源码已经上传GitHub，欢迎随时下载。觉得还可以的别忘了点个星星，如果有大佬看过觉得哪里不好的也希望能给我些建议，GitHub地址在首页有。</p>
     </div>
  </main>
</article>
<footer>
  <p>Design by <a href="https://www.cnblogs.com/lyps/" target="_blank">Design by Copyright ©2018 一只小菜鸟都被占了</a></p>
</footer>
<a href="#" class="cd-top">Top</a>
    </div>
</template>

<script>
import heads from './Head'
import global from './Global.vue'

export default {
    components:{heads},
    data(){
      return{
        username:'',
        isLogin:''
      }
    },
    created(){
      this.isLogins();
    },
    methods:{
      isLogins:function(){
        this.$axios.get(global.url+"/UserInfoes")
        .then(res=>{
        this.username=res.data.username;
        
        if(res.data.username==null)
        {
          this.isLogin=false;
        }
        else
        {
          this.isLogin=true;
        }
      })
      },
      ReSession:function(){
        this.$axios.get(global.url+"/UserInfoes/ReSession")
        .then(res=>{
          if(!res.data.success)
          {
              alert("服务器繁忙!");
          }
          this.$router.go(0);
        })
      }
    }
}
</script>

<style scoped>

</style>