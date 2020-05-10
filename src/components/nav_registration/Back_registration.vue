<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-row>
        <el-col :span="16">
          <h1 class="el-icon-paperclip" style="font-weight: bold;"> 门诊退号</h1>
        </el-col>
        <el-col :span="8" style="padding-top: 10px;">
          <el-button type="primary" v-on:click="getPatient()" style="float: right;">查询</el-button>
          <el-input v-model="filters.registrationFormId" placeholder="请输入挂号单号" style="float: right;width: 50%;margin-right: 10px;"></el-input>
        </el-col>
      </el-row>
    </div>
    <template>
      <el-table :data="data" highlight-current-row v-loading="loading" style="width: 100%;">
        <el-table-column prop="registrationFormId" label="挂号单号" width="100"></el-table-column>

        <el-table-column prop="name" label="姓名" width="150" sortable></el-table-column>

        <el-table-column prop="idNumber" label="身份证号" width="150" sortable></el-table-column>

        <el-table-column prop="date" label="挂号日期" width="150" sortable></el-table-column>

        <el-table-column prop="department" label="看诊科室" width="150" sortable></el-table-column>

        <el-table-column prop="status" label="看诊状态" min-width="100" sortable></el-table-column>

        <el-table-column min-width="50">
          <el-button type="primary" v-if="patient.status === '未就诊'" @click="backRegistrate">退号</el-button>
        </el-table-column>
      </el-table>
    </template>
  </el-card>
</template>
<script>
  import axios from "axios";
  import qs from "qs";
  export default {
    data() {
      return {
        filters: {
          registrationFormId: ""
        },
        loading: false,
        data: [],
        patient: {
          registrationFormId: "",
          name: "",
          idNumber: "",
          date: "",
          department: "",
          status: ""
        }
      };
    },
    methods: {
      //获取用户列表
      getPatient() {
        if(this.filters.registrationFormId == 1){
          this.$message.error("查无此挂号信息！");
          return;
        }
        this.loading = true;
        this.data = [];

        setTimeout(() => {
          this.patient.registrationFormId = this.filters.registrationFormId;
          this.patient.name = "小明";
          this.patient.idNumber = "1";
          this.patient.date = "2020-5-1";
          this.patient.department = "心血管内科";
          this.patient.status = "未就诊";
          this.data.push(this.patient);
          this.loading = false;
          this.$message({
            message: "已获取挂号单信息！",
            type: "success"
          });
        }, 1500);
      },

      backRegistrate() {
        this.$confirm("确认是否退号?", "提示", {
          type: "warning"
        }).then(() => {
          this.data = [];
          this.$message({
            message: "退号成功",
            type: "success"
          });
        });
      }
    }
  };
</script>
