<template>
  <div class="sidebar">
    <el-menu :default-active="$route.path" class="el-menu-vertical-demo" unique-opened router @select="handleSelect">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-menu"></i>挂号收费</template>
        <el-menu-item index="/home-operator/registration">现场挂号</el-menu-item>
        <el-menu-item index="/home-operator/back_registration">退号</el-menu-item>
        <el-menu-item index="/home-operator/pay">收费</el-menu-item>
        <el-menu-item index="/home-operator/refund">退费</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    methods: {}
  };
</script>

<style scoped>
  .sidebar {
    display: block;
    position: absolute;
    width: 220px;
    left: 0;
    top: 70px;
    bottom: 0;
    background: #2E363F;
  }

  .sidebar > ul {
    height: 100%;
  }
</style>
