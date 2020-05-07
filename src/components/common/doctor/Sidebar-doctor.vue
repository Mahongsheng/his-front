<template>
  <div class="sidebar">
    <el-menu :default-active="$route.path" class="el-menu-vertical-demo" unique-opened router @select="handleSelect">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-user-solid"></i>门诊医生工作站</template>
        <el-menu-item index="/home-doctor/medicalRecord">门诊病历</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-s-order"></i>门诊药房工作站</template>
        <el-menu-item index="/home-doctor/dispenseDrug">发药</el-menu-item>
        <el-menu-item index="/home-admin/returnDrug">退药</el-menu-item>
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
