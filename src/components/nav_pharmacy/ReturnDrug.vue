<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0;">
      <el-form :inline="true" :model="filters">
        <el-form-item label="病历号：">
          <el-input v-model="filters.medicalRecord_id" placeholder="请输入病历号"></el-input>
        </el-form-item>
        <el-form-item label="时间">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            style="width: 100%;"
            v-model="filters.date"
            value-format="yyyy-MM-dd"
            format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" v-on:click="getDrug()">查询</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <template>
      <el-tag style="padding: 0; width: 100%;height: 40px">
        <el-button
          type="primary"
          icon="el-icon-success"
          style="float: left"
          @click="handleMultiDel()"
        >批量退药</el-button>
      </el-tag>
      <el-table
        ref="multipleTable"
        :data="drugItem"
        highlight-current-row
        v-loading="loading"
        tooltip-effect="dark"
        style="width: 100%;"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>

        <el-table-column prop="drug_name" label="药品名称" width="400"></el-table-column>

        <el-table-column prop="number" label="数量" width="120"></el-table-column>

        <el-table-column prop="status" label="药品状态" min-width="120"></el-table-column>

        <el-table-column prop="prescription_name" label="处方名称" min-width="120"></el-table-column>

        <el-table-column label="开立时间" min-width="120">{{this.filters.date}}</el-table-column>

        <el-table-column label="操作" width="120">
          <template scope="scope">
            <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">退药</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </section>
</template>
<script>
import axios from "axios";
import qs from "qs";

export default {
  data() {
    return {
      filters: {
        medicalRecord_id: "",
        date: ""
      },
      loading: false,
      drugItem: [],
      multipleSelection: null
    };
  },
  methods: {
    getDrug() {
      this.loading = true;

      setTimeout(() => {
        this.drugItem = [
          {
            drug_name: "蒲地蓝消炎口服液",
            number: 1,
            status: "已发放",
            prescription_name: "感冒处方"
          },
          {
            drug_name: "奥美拉唑胶囊",
            number: 2,
            status: "已发放",
            prescription_name: "感冒处方"
          },
          {
            drug_name: "头孢拉定胶囊",
            number: 1,
            status: "已发放",
            prescription_name: "感冒处方"
          }
        ];
        this.$message({
          message: "已获取药品信息",
          type: "success"
        });
        this.loading = false;
      }, 1500);
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    dispenseDrug() {
      this.multipleSelection.forEach(item => {
        item.status = "已发放";
      });
      this.$message({
        message: "已发放药品",
        type: "success"
      });
    },

    handleDel: function(index, row) {
      if (row.status != "退药") {
        this.$confirm("请确认是否退药?", "提示", {
          type: "warning"
        }).then(() => {
          row.status = "退药";
          this.$message({
            message: "退药成功",
            type: "success"
          });
        });
      }else{
          this.$message({
              message: "该药品已退",
              type: "warning"
          })
      }
    },
    
    handleMultiDel: function () {
      var flag = 1;//确定当前的药品状态
      if (this.multipleSelection == null){
        this.$message({
          message: "请选择要退的药品",
          type: "warning"
        });
      }else{//如果选中了药品
        this.$confirm("请确认是否退药?", "提示", {
          type: "warning"
        }).then(() => {
            this.multipleSelection.forEach(item => {
              if(item.status != "退药" && flag != 0){
                item.status = "退药";
                flag = 1;
              }else{
                this.$message({
                  message: "该药品已退",
                  type: "warning"
                });
                flag = 0;
              }
            });
          if(flag != 0){
            this.$message({
              message: "退药成功",
              type: "success"
            });
          }

        });
      }

    }
  }
};
</script>
