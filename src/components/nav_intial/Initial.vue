<template>
      <el-container class="container" style="width:100%">
          <div class="whole">
            <h1 style="color: #364766; font-size: 30px">本系统模块介绍：</h1>

            <el-row :span="24" :gutter="20" >
              <el-col :span="8" class="block">
                <strong>门诊挂号收费模块</strong> <br> <br>
                该模块包含挂号业务、收费业务以及相关的收费员日结、费用管理等。<br>
                其包含的子功能如下：
                <ul>
                  <li>门诊挂号</li>
                  <li>门诊退号</li>
                  <li>收费</li>
                  <li>退费</li>
                  <li>收费员日结</li>
                  <li>日结历史查询</li>
                  <li>费用查询</li>
                </ul>

              </el-col>
              <el-col :span="8" class="block">
                <strong>门诊医生工作站模块</strong> <br> <br>
                该模块负责门诊医生看诊所需要的相关功能。包含了为病患录入相关信息以及给出初步诊断的病历首页、
                发放检查功能、发放检验功能、做出处置功能和开药功能。为使用该模块，您可浏览改工作站下的门诊类，
                该类内部的导航栏会引导您的进一步使用以下功能：
                <ul>
                  <li>病历首页</li>
                  <li>检查申请</li>
                  <li>检验申请</li>
                  <li>处置申请</li>
                  <li>成药处方</li>
                </ul>
              </el-col>

              <el-col :span="8" class="block">
                <strong>门诊医技工作站模块</strong> <br> <br>
                该模块负责挂号业务以及收费业务，且涉及相关的费用管理。<br>
                其包含的子功能如下：
                <ul>
                  <li>门诊挂号</li>
                  <li>门诊退号</li>
                  <li>收费</li>
                  <li>退费</li>
                  <li>收费员日结</li>
                  <li>日结历史查询</li>
                  <li>费用查询</li>
                </ul>
              </el-col>
            </el-row>

            <el-row :span="24" :gutter="20" justify="center">
              <el-col :span="12" class="block">
                <strong>门诊药房工作站模块</strong> <br> <br>
                该模块第一部分主要功能是对患者提供开药和退药服务。药房医生输入病患的信息(病历号)
                查询患者的药品清单，满足患者的开药退药需求。<br>
                该模块第二部分主要功能是针对药房医生展开。药房医生对医院内系统的药品清单进行查询、
                导入和删除操作。其中删除操作分为单个删除和批量删除。
                <ul>
                  <li>发药</li>
                  <li>退药</li>
                  <li>药品管理</li>
                </ul>

              </el-col>
              <el-col :span="12" class="block">
                <strong>门诊财务管理模块</strong> <br> <br>
                该模块负责财务管理员管理门诊财务所需相关功能。<br>
                其包含的子功能如下：
                <ul>
                  <li>费用科目管理</li>
                  <li>门诊日结核对</li>
                  <li>门诊科室工作量统计</li>
                  <li>门诊医生工作量统计</li>
                </ul>
              </el-col>
            </el-row>
          </div>
          <router-view/>
      </el-container>
</template>

<script>

    export default {
      name: "initial",
    }
</script>

<style scoped>
  .main {
    width: 100%;
  }

  .whole {
    /*margin: 30px;*/
    margin-left: 70px;
  }

  .block {
    color: #364766;


    -webkit-border-radius: 15px;
    border-radius: 20px;
    width: 400px;
    height: 250px;
    padding: 15px 15px 15px;
    background: #99a9bf;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 20px #cac6c6;
    background-image: linear-gradient(to right, #99a9bf, #d3dce6);



    margin: 20px;

  }
</style>
