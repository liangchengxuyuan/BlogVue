<template>
<div class="box">
  <heads :username="username" :isLogin="isLogin" :ReSession="ReSession"></heads>
    <article>
  <aside class="l_box">
    <div class="about_me">
      <h2>关于我</h2>
      <ul>
        <i><img src="../assets/images/3.jpg"></i>
        <p><b>LYP</b>，一个菜鸟码农，写这个博客是为了记录下自己的学习笔记。</p>
      </ul>
    </div>
    <div class="wdxc">
      <h2>我的相册</h2>
      <ul>
        <li><img src="../assets/images/4.jpg"></li>
        <li><img src="../assets/images/5.jpg"></li>
        <li><img src="../assets/images/6.jpg"></li>
        <li><img src="../assets/images/7.jpg"></li>
        <li><img src="../assets/images/8.jpg"></li>
        <li><img src="../assets/images/9.jpg"></li>
        <li><img src="../assets/images/10.jpg"></li>
        <li><img src="../assets/images/11.jpg"></li>
        <li><img src="../assets/images/12.jpg"></li>
      </ul>
    </div>
     
    <div class="fenlei">
      <h2>最新评论</h2>
      <ul v-for="item in NewMessage">
        <li>{{item.content}}</br><span class="postDesc">--{{item.name}}</span></li>
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
<div class="gbook">
      <div  v-for="items in Message">
      <div class="fb">
        <ul>
          <p class="fbtime"><span> {{items.date}} </span> {{items.name}}</p>
          <p class="fbinfo">{{items.content}}</p>
        </ul>
      </div>
      
      </div>

      <div class="pagination">
        <button @click="GetGuestBooks(1,7,false)" id="btn_first" title="首页">首页</button>
        <button @click="GetGuestBooks(pageIndex-1,7,false)" id="btn_pre" title="上一页">上一页</button>
        <span>共{{pageCount}}页/当前页{{pageIndex}}</span>
        <button @click="GetGuestBooks(pageIndex+1,7,false)" id="btn_next">下一页</button>
        <button @click="GetGuestBooks(pageCount,7,false)" id="btn_last">尾页</button>
      </div>

      <div class="gbox">
        <div action="" method="" name="form1" id="form1">
          <p> <strong>来说点儿什么吧...</strong></p>
          
          <p><span class="tnr">留言内容:</span>
            <textarea name="lytext" cols="60" rows="12" id="lytext" v-model="gBody"></textarea>
          </p>
          <p>
            <input type="submit" name="Submit3" value="提交" @click="AddGuestBook()">
            <input name="enews" type="hidden" id="enews" value="AddGbook">
          </p>
        </div>
      </div>

      

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
    name:'gbook',
    components:{heads},
    data(){
      return{
        Message:[
          
        ],
        NewMessage:[],
        gBody:'',
        pageCount:'',
        pageIndex:'',
        username:'',
        isLogin:''
      }
    },
    mounted(){
      this.isLogins();
      this.GetGuestBooks();
      this.getNewestGuest();
    },
    methods:{
      AddGuestBook:function(){
        if(this.gBody==""||this.gBody==null)
        {
          return alert("留言内容不能为空!");
        }
        this.$axios.post(global.url+"/GuestBooks",{gBody:this.gBody})
        .then(res=>{
          if(res.data.code==0)
          {
            alert("请先登录");
            this.$router.push({name:'Login'});
            return;
          }
          alert("留言成功");
          this.gBody='';
          this.GetGuestBooks();
        })
      },
      GetGuestBooks:function(pageIndex=1,pageSize=8,isAsc=false){
        this.$axios.get(global.url+"/GuestBooks",{params:{pageIndex:pageIndex,pageSize:pageSize,isAsc:isAsc}})
        .then(res=>{
          this.pageIndex=res.data.page;
          this.pageCount=res.data.pageCount;

          //首页、上一页禁用
           if(res.data.page==1)
           {
                $('#btn_first').attr("class","disabled");
                $('#btn_pre').attr("class","disabled");
           }
           else
           {
                $('#btn_first').attr("class","");
                $('#btn_pre').attr("class","");
           }
           //下一页、尾页禁用
           if(res.data.page==res.data.pageCount)
           {
                $('#btn_last').attr("class","disabled");
                $('#btn_next').attr("class","disabled");
           }
           else
           {
                $('#btn_last').attr("class","");
                $('#btn_next').attr("class","");
           }
          let messageArr=res.data.data;
          let initArr=messageArr.map((v,i)=>{
          let entris={
             name:v.gUserName,
             date:v.gCreateTime,
             content:v.gBody
           }
           return  entris
        })
        this.Message=initArr;
      })
      },
      getNewestGuest:function(){
        this.$axios.get(global.url+"/GuestBooks",{params:{pageIndex:1,pageSize:5,isAsc:false}})
        .then(res=>{
          let messageArr=res.data.data;
          let initArr=messageArr.map((v,i)=>{
          let entris={
             name:v.gUserName,
             date:v.gCreateTime,
             content:v.gBody
           }
           return  entris
        })
        this.NewMessage=initArr;
        })
      },
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


