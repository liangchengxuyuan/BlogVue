<template>
    <div class="home">
      <heads :username="username" :isLogin="isLogin" :ReSession="ReSession"></heads>
        <article>
  <aside class="l_box">
      <div class="search">
          <input name="keyboard" id="keyboard" class="input_text" placeholder="请输入关键字词" type="text" v-model="searchString">
          <input name="show" value="title" type="hidden">
          <input name="tempid" value="1" type="hidden">
          <input name="tbname" value="news" type="hidden">
          <input name="Submit" class="input_submit" value="搜索" type="button" @click="Paging(1,0,true,searchString)">
        
      </div>
      <div class="fenlei" >
        <h2>文章分类</h2>
        <ul>
          <li v-for="item in Category"><a href="javascript:void(0);" @click="Paging(1,item.cID,true,searchString)">{{item.cName}}</a></li>
        </ul>
      </div>
      <div class="tuijian">
        <h2>阅读排行</h2>
        <ul>
          <li v-for="item in BlogRank"><a href="javascript:void(0);" @click="getBlogID(item.bID)">{{item.title}} <span class="postDesc">阅读（{{item.readNum}}）</span></a></li>
        </ul>
      </div>
      <div class="links">
        <h2>友情链接</h2>
        <ul>
          <li><a>博客园</a><a href="https://www.cnblogs.com/lyps/">https://www.cnblogs.com/lyps/</a></li>
          <li><a>GitHub</a><a href="https://github.com/liangchengxuyuan">https://github.com/liangchengxuyuan</a></li>
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
    <li v-for="items in Contents"><i><a href="/"><img v-bind:src="items.img"/></a></i>
      <h3><a href="javascript:void(0);" @click="getBlogID(items.bID)">{{items.title}}</a></h3>
      <p>{{items.content}}</p>
      <div class="postDesc">
        @{{items.createTime  }} &nbsp;{{items.author}} &nbsp;阅读({{items.readNum}}) &nbsp; 点赞({{items.commentNum}})
      </div>
    </li>


    <div class="pagination">
    <button @click="Paging(1,1,false,searchString)" id="btn_first" title="首页">首页</button>
    <button @click="Paging(pageIndex-1,1,false,searchString)" id="btn_pre" title="上一页">上一页</button>
    <span>共{{pageCount}}页/当前页{{pageIndex}}</span>
    <button @click="Paging(pageIndex+1,1,false,searchString)" id="btn_next">下一页</button>
    <button @click="Paging(pageCount,1,false,searchString)" id="btn_last">尾页</button>
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
import global from './Global.vue'
import heads from './Head'

export default {
    name:"home",
    components:{heads},
    data(){
        return{
            Contents:[
              
            ],
            BlogRank:[],
            pageIndex:'',//当前页
            pageCount:'',//页数
            searchString:'',//搜索关键字
            Category:'',
            isLogin:'',
            username:''
        }
    },
    mounted(){
      this.Paging(1,0,false);
      this.getCategory();
      this.getRank();
      this.isLogins();
    },
    methods:{
      //网络请求分页方法
      Paging:function(page=1,bcategory=1,isAsc=false,searchString=null){
          let  self=this;
          this.$axios.get(global.url+"/BlogArticle",{params:{page:page,bcategory:bcategory,isAsc:isAsc,searchString:searchString,pageIndex:7}})
          .then(res=>{
           self.pageIndex=res.data.page;
           self.pageCount=res.data.pageCount;
           //首页、上一页禁用
           if(res.data.page==1)
           {
                $('#btn_first').attr("class","disabled");
                //$("#btn_first").attr({"disabled":"disabled"});
                $('#btn_pre').attr("class","disabled");
                //$("#btn_first").attr({"disabled":"disabled"});
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

            let contentArr=res.data.data;
            let  initArr= contentArr.map((v,i)=>{
             let entris={
              title:v.bTitle,
              content:v.bContent.replace(/<\/?[^>]*>/g, '').substring(0,100),
              //content:v.bContent.replace(/(\n)/g, "").replace(/(\t)/g, "").replace(/(\r)/g, "").replace(/<\/?[^>]*>/g, "").replace(/\s*/g, ""),
              //content:v.bContent.replace(/<\/?(img|a)[^>]*>/gi, ''),
              bID:v.bID,
              createTime:v.bCreateTime,
              readNum:v.bReadNum,
              commentNum:v.bCommentNum,
              author:v.bAuthor
              //img:require('../assets/images/1.jpg')
           }
           return  entris
         })
         self.Contents=initArr;
      })
      },
      getBlogID:function(bID){
        this.$router.push({
          name:'Info',
          query:{
            bID:bID
          }
        })
      },
      getCategory:function(){
        this.$axios.get(global.url+"/Categories")
        .then(res=>{
         this.Category=res.data.data;
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


