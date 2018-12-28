<template>
    <div class="Editors">
        <heads :username="username" :isLogin="isLogin" :ReSession="ReSession"></heads>
        <article>
  <aside class="l_box">
      
      <div class="fenlei">
        <h2>文章分类</h2>
        <ul>
          <li><a href="/">学无止境（33）</a></li>
          <li><a href="/">日记（19）</a></li>
          <li><a href="/">慢生活（520）</a></li>
          <li><a href="/">美文欣赏（40）</a></li>
        </ul>
      </div>
      <div class="tuijian">
        <h2>阅读排行</h2>
        <ul>
          <li v-for="item in Recommend"><a href="/">{{item}}</a></li>
        </ul>
      </div>
      <div class="links">
        <h2>友情链接</h2>
        <ul>
          <a href="https://www.cnblogs.com/lyps/">LYP博客园</a>
        </ul>
      </div>
      <div class="guanzhu">
        <h2>关注我</h2>
        <ul>
          <img src="../assets/images/wx.jpg">
        </ul>
      </div>
  </aside>
  <main class="r_box">
    <div>
      <input type="txt" class="form-control" id="title" placeholder="请输入标题"/> 
      <input type="txt" class="form-control" id="author" placeholder="请输入作者"/> 
      <select class="form-control" id="select">
        <option value="">请选择分类</option>
        <option v-for="item in Category" v-bind:value="item.cID">{{item.cName}}</option>
      </select>
    </div>

    <div ref="editor"></div>
    
    <button @click="getContent()" class="btn btn-primary commit">保存</button>
    
  </main>
</article>
<footer>
  <p>Design by <a href="https://www.cnblogs.com/lyps/" target="_blank">Design by Copyright ©2018 一只小菜鸟都被占了</a></p>
</footer>
<a href="#" class="cd-top">Top</a>

    </div>
</template>


<script>
import E from 'wangeditor'
import heads from './Head'
import global from './Global.vue'
    export default {
      name: 'Editors',
      components:{heads},
      data () {
        return {
          editorContent: '',
          Category:'',
          Recommend:[],
          username:'',
          isLogin:''
        }
      },
      methods: {
        getContent: function () {
          
            if($('#author').val()=='')
            {
              alert("作者不能为空!");
              return;
            }
            if($('#title').val()=='')
            {
              alert("标题不能为空!");
              return;
            }
            if(this.editorContent=='')
            {
              alert("内容不能为空!");
              return;
            }
            if($('#select option:selected').val()=='')
            {
              alert("请选择分类!");
              return;
            }
            var date=this.getNowFormatDate();
            this.$axios.post(global.url+"/BlogArticle",{bAuthor:$('#author').val(),bTitle:$('#title').val(),bContent:this.editorContent,bCreateTime:date,bReadNum:0,bCommentNum:0,cID:$('#select option:selected').val()})
            .then(res=>{
              if(!res.data.success)
              {
                 alert('请先登录!');
                 self.$router.push('Login');
                 return;
              }
              if(res.data.success==1)
              {
                alert('保存成功!');
              }
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
      },
        getNowFormatDate:function(){
          var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate;
        return currentdate;
        }
      },
      
      created(){
        this.isLogins();
        this.$axios.get(global.url+"/Categories")
        .then(res=>{
          let contentArr=res.data.data;
            let  initArr= contentArr.map((v,i)=>{
             let entris={
             cName:v.cName,
             cID:v.cID
           }
           return  entris
         })
         this.Category=initArr;
        })
      },
      mounted() {
        let self=this;

        var editor = new E(this.$refs.editor)
        
        editor.customConfig.onchange = (html) => {
          this.editorContent = html
        }
        editor.customConfig.fontNames = [
        '宋体',
        '微软雅黑',
        'Arial',
        '楷体',
        '华文彩云',
        '华文琥珀'
        ]
        //editor.customConfig.uploadImgShowBase64 = true   // 使用 base64 保存图片
        //editor.customConfig.uploadImgServer = '/api/Upload'
        editor.customConfig.customUploadImg = function (files, insert) {
            // files 是 input 中选中的文件列表
            // insert 是获取图片 url 后，插入到编辑器的方法
            var uploadData = new FormData();
            for (var i = 0; i < files.length; i++) {
                uploadData.append(files[i].name, files[i]);
            }
            var imgUrl="http://123.207.50.125";//http://192.168.112.128:8080
            
            self.$axios({
              method:"post",
              url: global.url+"/Upload",
              headers:{"Content-type": "multipart/form-data"},
              data:uploadData
            }).then(res=>{
              if(res.data.code==0)
              {
                alert('请先登录!');
                self.$router.push('Login');
                return;
              }
              
              for(var i=0;i<res.data.data.length;i++)
              {
                  insert(imgUrl+res.data.data[i].url);
              }
              
            })
        }
        
        editor.create()
        //editor.txt.html('<p><img src="http://192.168.112.128:8080/static/img/10.8107268.jpg" style="max-width:100%;"></p><p><img src="http://192.168.112.128:8080/static/img/3a920344-2ce8-40cb-96b5-dd71206456c5.jpg" style="max-width:100%;"></p>');
      }
    }
</script>


<style scoped>
 #title,#author,#select{
   margin-bottom: 10px;
 }
 .commit{
   margin-left: 43%;
   margin-top: 10px;
 }
</style>


