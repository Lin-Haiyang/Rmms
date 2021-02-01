<template>
  <div class="main">
    <el-breadcrumb separator-class="el-icon-arrow-right" v-if="$route.path !== '/home'" >
      <el-breadcrumb-item :to="{ path: $route.path }" class="header">{{
        $route.meta.title
      }}</el-breadcrumb-item>
    </el-breadcrumb>
    <router-view></router-view>
  </div>
</template>
<style scoped>
.main {
  position: absolute;
  top: 50px;
  left: 150px;
  right: 0;
  bottom: 0;
  background: white;
  overflow: auto;
}
.el-breadcrumb {
  margin: 10px 20px;
  height: 30px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  line-height: 30px;
}
.header{
    margin-left: 15px;
    border-left: 3px solid #31c17b;
    padding-left: 10px;
}
</style>