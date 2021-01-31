<template>
        <nav>
            <a href="#/">
                <img class="logo" src="../../assets/logo.png">
                <span>餐厅综合管理系统</span>
            </a>
            <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                    下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="a">退出</el-dropdown-item>
                    <el-dropdown-item command="b">切换账号</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </nav>
</template>
<script>
  export default {
    methods: {
      handleCommand(command) {
        this.$message('click on item ' + command);
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
        background:#545C64 ;
    }
</style>