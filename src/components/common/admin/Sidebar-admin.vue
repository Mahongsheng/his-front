<template>
  <div class="sidebar">
    <el-menu :default-active="$route.path" class="el-menu-vertical-demo" unique-opened router @select="handleSelect">
      <el-submenu index="1" class="submenu">
        <template slot="title"><i class="el-icon-menu"></i>门诊挂号收费</template>
        <el-menu-item index="/home-admin/registration">门诊挂号</el-menu-item>
        <el-menu-item index="/home-admin/back_registration">门诊退号</el-menu-item>
        <el-menu-item index="/home-admin/pay">收费</el-menu-item>
        <el-menu-item index="/home-admin/refund">退费</el-menu-item>
        <el-menu-item index="/home-admin/settlement">收费员日结</el-menu-item>
        <el-menu-item index="/home-admin/settlement_history">日结历史查询</el-menu-item>
        <el-menu-item index="/home-admin/fareCheck">费用查询</el-menu-item>
      </el-submenu>
      <el-submenu index="2" class="submenu">
        <template slot="title"><i class="el-icon-user-solid"></i>门诊医生工作站</template>
        <el-menu-item index="/home-admin/medicalRecord">门诊病历</el-menu-item>
      </el-submenu>
      <el-submenu index="3" class="submenu">
        <template slot="title"><i class="el-icon-s-cooperation"></i>门诊医技工作站</template>
        <el-menu-item index="/home-admin/inspection">患者检查</el-menu-item>
        <el-menu-item index="/home-admin/test">患者检验</el-menu-item>
        <el-menu-item index="/home-admin/disposal">患者处置</el-menu-item>
         <el-menu-item index="/home-admin/technician-manage">医技管理</el-menu-item>
      </el-submenu>
      <el-submenu index="4" class="submenu">
        <template slot="title"><i class="el-icon-s-order"></i>门诊药房工作站</template>
        <el-menu-item index="/home-admin/dispenseDrug">发药</el-menu-item>
        <el-menu-item index="/home-admin/returnDrug">退药</el-menu-item>
        <el-menu-item index="/home-admin/manageDrug">药品管理</el-menu-item>
      </el-submenu>
      <el-submenu index="5" class="submenu">
        <template slot="title"><i class="el-icon-s-marketing"></i>门诊财务管理</template>
        <el-menu-item index="/home-admin/expense-manage">费用科目管理</el-menu-item>
        <el-menu-item index="/home-admin/dailyCheck">日结核对</el-menu-item>
        <el-menu-item index="/home-admin/departmentCheck">门诊科室工作量统计</el-menu-item>
        <el-menu-item index="/home-admin/doctorCheck">门诊医生工作量统计</el-menu-item>
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
    /*background: #2E363F;*/


  }

  .el-menu-vertical-demo {
    background: #d3dce6;
    background: white;



    filter:alpha(Opacity=85);
    -moz-opacity:0.75;
    opacity: 0.75;
  }

  .sidebar>ul {
    height: 100%;
  }

  .submenu {

  }
</style>
