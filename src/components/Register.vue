<template>
    <div class="Login">
        <heads :username="username" :isLogin="isLogin" :ReSession="ReSession"></heads>
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-offset-3 col-md-6">
				<div class="form-horizontal">
					<span class="heading">用户注册</span>
					<div class="form-group">
						<input type="txt" class="form-control" id="username" placeholder="用户名" v-model="UserName">
						<i class="fa fa-user"></i>
					</div>
					<div class="form-group help">
						<input type="password" class="form-control" id="password" placeholder="密　码" v-model="PassWord">
						<i class="fa fa-lock"></i>
						<a href="#" class="fa fa-question-circle"></a>
					</div>
					<div class="form-group">
						
                        <button type="button" class="btn btn-default" @click="UserResister">注册</button>
					</div>
				</div>
			</div>
		</div>
	</div>


</div>
    
</template>

<script>
import heads from './Head'
import global from './Global.vue'

export default {
	name:'Login',
	components:{heads},
	data(){
		return{
			UserName:'',
			PassWord:'',
			username:'',
			isLogin:''
		}
	},
	methods:{
		UserResister:function(){
			if(this.UserName==""||this.PassWord=="")
			{
				alert("用户名与密码不能为空!");
				return;
			}
			this.$axios.post(global.url+"/UserInfoes",{uUserName:this.UserName,uPassWord:this.PassWord})
			.then(res=>{
				if(res.data.success==true)
				{
                    alert("注册成功!");
                    this.$router.go('Login');
                }
                else
                {
                    alert("注册成功!");
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
      }
	}
}
</script>

<style scoped>

</style>
