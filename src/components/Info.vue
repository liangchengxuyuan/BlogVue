<template>
    <div class="info">
      <heads :username="username" :isLogin="isLogin" :ReSession="ReSession"></heads>
        <article>
  <aside class="l_box">
    
     <div class="fenlei" >
        <h2>文章分类</h2>
        <ul>
          <li v-for="item in Category"><a href="javascript:void(0);">{{item.cName}}</a></li>
        </ul>
      </div>
    
    <div class="tuijian">
        <h2>阅读排行</h2>
        <ul>
          <li v-for="item in BlogRank"><a href="javascript:void(0);" @click="getBlogID(item.bID)">{{item.title}} <span class="postDesc">阅读（{{item.readNum}}）</span></a></li>
        </ul>
      </div>
    
    <div class="guanzhu">
      <h2>加我微信一起讨论，请注明来意</h2>
      <ul>
        <img src="../assets/images/wx.jpg">
      </ul>
    </div>
  </aside>
  <main>
    <div class="infosbox" v-for="item in BlogInfo">
      <div class="newsview">
        <h3 class="news_title">{{item.title}}</h3>
        <div class="bloginfo">
          <ul>
            <li class="author">作者：<a href="/">{{item.author}}</a></li>
            <li class="lmname">类别：<a href="/">{{item.Category}}</a></li>
            <li class="timer">时间：{{item.createTime}}</li>
            <li class="view">浏览量：{{readNums}}</li>
          </ul>
        </div>
        <div class="tags"><a href="/" target="_blank">内容</a></div>
       
        <div class="news_con" v-html="item.content"></div>
      </div>
      <div class="share">
        <p class="diggit" ><a @click="Diggit()" href="javascript:void(0);"> 很赞哦！ </a>(<b id="diggnum">{{commentNums}}</b>)</p>
      </div>
      <div class="nextinfo">       
        <p><a href="javascript:void(0);" @click="$router.push('/')">返回列表</a></p>
      </div>
      <div class="news_pl">
        <h2>文章评论</h2>
        <div class="gbko"> 
         
          <div class="fb" v-for="item in Comments">
            <ul>
              <p class="fbtime"><span>{{item.CreateTime}}</span>{{item.Commentator}}</p>
              <p class="fbinfo">{{item.CommentBody}}</p>
            </ul>
          </div>
         
          <div name="saypl" id="saypl">
            <div id="plpost">
              <p class="saying"><span><a href="">共有{{commentCount}}条评论</a></span>来说两句吧...</p>
              <textarea name="saytext" rows="6" id="saytext" v-model="userComment"></textarea>
              <input name="imageField" type="submit" value="提交" @click="UserComment()">
            </div>
          </div>
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
    name:'info',
    components:{heads},
    data(){
      return{
        bID:this.$route.query.bID,
        BlogInfo:'',
        BlogRank:[],
        Category:'',
        Comments:'',
        readNums:0,//阅读量
        commentNums:0,//点赞量
        commentCount:0,//评论数
        userComment:'',//用户评论
        username:'',
        isLogin:''
      }
    },
    mounted(){
      this.getCategory();
      this.getRank();
      this.GetBlogDetail();
    },
    created(){
      this.isLogins();
      this.$axios.put(global.url+"/BlogArticle/"+this.bID,{bID:this.bID,bReadNum:999})
      .then(res=>{
        if(res.data.success==false)
        {
          alert("数据错误!");
        }
      })
    },
    methods:{
      Diggit:function(){
        
        this.$axios.get(global.url+"/UserInfoes")
        .then(res=>{
          this.username=res.data.username;
        
          if(res.data.username==null)
          {
             alert("请先登录!");
             this.$router.push('Login');
             return;
          }
          else
          {
            this.$axios.put(global.url+"/BlogArticle/"+this.bID,{bID:this.bID,bCommentNum:999})
            .then(res=>{
            if(res.data.success==false)
            {
              alert("数据错误!");
              return;
            }
            if(res.data.code==0)
            {
              alert("已点赞!");
              return;
            }
            this.commentNums+=1;
            })
          }
        })        
      },
      GetBlogDetail:function(){
        this.$axios.get(global.url+"/BlogArticle/"+this.bID)
        .then(res=>{
        let contentArr=res.data.data; 
             let initArr= contentArr.map((v,i)=>{
             let entris={
             title:v.bTitle,
             author:v.bAuthor,
             content:v.bContent,
             createTime:v.bCreateTime,
             readNum:v.bReadNum,
             commentNum:v.bCommentNum,
             Category:v.category
           }
           return  entris
         })
         this.commentNums=initArr[0].commentNum;
         this.readNums=initArr[0].readNum;
         this.BlogInfo=initArr;
      })


      this.$axios.get(global.url+"/Comments/"+this.bID)
      .then(res=>{
        let contentArr=res.data.data; 
             let initArr= contentArr.map((v,i)=>{
             let entris={
             ID:v.cmID,
             Commentator:v.cmCommentator,
             CommentBody:v.cmCommentBody,
             CreateTime:v.cmCreateTime,
             bID:v.bID
           }
           return  entris
         })
         this.commentCount=initArr.length;
         this.Comments=initArr;
      })
      },
      UserComment:function(){

        if(this.userComment=='')
        {
          alert("请填写评论内容!");
          return;
        }
        this.$axios.get(global.url+"/UserInfoes")
        .then(res=>{
          this.username+=res.data.username;
        
          if(res.data.username==null)
          {
             alert("请先登录!");
             this.$router.push('Login');
          }
          else
          {
             this.$axios.post(global.url+"/Comments",{bID:this.bID,cmCommentBody:this.userComment})
            .then(res=>{
            if(res.data.success)
            {
              alert("评论成功");
              this.userComment='';
              this.GetBlogDetail();
            }
            })
          }
        })

        
      },
      getRank:function(){
        this.$axios.get(global.url+"/BlogArticle/Rank")
        .then(res=>{
          let contentArr=res.data.data;
            let  initArr= contentArr.map((v,i)=>{
            let entris={
            title:v.bTitle,
            content:v.bContent,
            readNum:v.bReadNum,
            bID:v.bID
           }
           return  entris
          })
          this.BlogRank=initArr;
        })
      },
      getCategory:function(){
        this.$axios.get(global.url+"/Categories")
        .then(res=>{
         this.Category=res.data.data;
        })
      },
      getBlogID:function(bID){
        this.$router.push({
          name:'Info',
          query:{
            bID:bID
          }
        });
        this.$router.go(0);
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

<style>

</style>

