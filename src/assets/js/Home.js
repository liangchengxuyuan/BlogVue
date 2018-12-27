

export default {
    name:"home",
    data(){
        return{
            Recommend:[
            '你是什么人便会遇上什么人',
            '帝国cms 列表页调用子栏目，没有则不显示栏目名称',
            '第二届 优秀个人博客模板比赛参选活动',
            '个人博客模板《绅士》后台管理',
            '帝国cms 列表页调用子栏目，没有则不显示栏目名称',
            '第二届 优秀个人博客模板比赛参选活动',
            '哈哈哈，测试一下'
            ],
            Contents:[
              
            ],
            pageIndex:'',
            pageCount:''
        }
    },
    created(){
      this.Paging(1,1,true);
    },
    methods:{
      //网络请求分页方法
      Paging:function(page=1,bcategory=1,isAsc=true){
          
          let  self=this;
          this.$axios.get("/api/BlogArticle",{params:{page:page,bcategory:bcategory,isAsc:isAsc}})
          .then(res=>{
           self.pageIndex=res.data.page;
           self.pageCount=res.data.pageCount;
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

            let contentArr=res.data.data;
            let  initArr= contentArr.map((v,i)=>{
             let entris={
             title:v.bTitle,
              content:v.bContent,
              //img:require('../assets/images/1.jpg')
           }
           return  entris
         })
         self.Contents=initArr
      })
      }
    }
}