<template>
        <nav>
            <a href="#/">
                <img class="logo" src="../../assets/logo.png">
                <span>餐厅综合管理系统</span>
            </a>
            <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link el-icon-s-custom">
                    {{name}}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="a">退出登录</el-dropdown-item>
                    <el-dropdown-item command="b">修改密码</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </nav>
</template>
<script>
import {logout} from '@/api/login'
  export default {
      data() {
          return {
              name:null,
          }
      },
      created() {
          this.getName();
      },
    methods: {
        getName(){
            const userObj = localStorage.getItem('rmms-user')
            this.name = JSON.parse(userObj).name;
        },
      handleCommand(command) {
          switch (command) {
                case 'a':
                    logout(localStorage.getItem('rmms-user-token')).then(res => {
                        if(res.data.flag){
                             localStorage.removeItem('rmms-user');
                            localStorage.removeItem('rmms-user-token');
                            this.$router.push('/login');
                               this.$message({
                                showClose: true,
                                message: res.data.message,
                                type: "success",
                            });
                        }else{
                            this.$message({
                                showClose: true,
                                message: res.data.message,
                                type: "error",
                            });
                        }
                    })
                  break;
                case 'b':
                  this.$message('修改密码');
                  break;
              default:
                  break;
          }
      }
    }
  }
</script>
<style scoped>
    .logo{
        vertical-align: middle;
        width: 30px;
        margin: 0 10px 0 20px;
    }
    nav>a{
        line-height: 50px;
        text-decoration: none;
        color:white;
    }
    .el-dropdown{
        line-height: 50px;
        float: right;
        padding-right:30px ;
    }
    .el-dropdown-link {
        cursor: pointer;
        color: #E4D04B;
    }
    .el-icon-arrow-down {
        font-size: 12px;
    }
    nav{
        position: absolute;
        left: 0;
        right: 0;
        height: 50px;
        background:#2D3A4B ;
    }
</style>