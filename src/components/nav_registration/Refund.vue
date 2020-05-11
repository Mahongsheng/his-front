<template>
  <section>
    <!--工具条-->
    <el-col style="font-size:22px; font-weight: bold; padding-bottom: 40px">门诊退费</el-col>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item label="病历号：">
          <el-input v-model="filters.medicalRecord_id" placeholder="请输入病历号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" v-on:click="getPatient()">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            icon="el-icon-goods"
            @click="pay"
            style="margin-left: 600px"
          >退费结算</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    
    <!--列表-->
    <template>
      <el-table
        ref="multipleTable"
        :data="paymentItem"
        highlight-current-row
        v-loading="loading"
        tooltip-effect="dark"
        style="width: 100%;"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>

        <el-table-column label="病历号" width="130">{{filters.medicalRecord_id}}</el-table-column>

        <el-table-column label="姓名" width="150">{{patient.name}}</el-table-column>

        <el-table-column prop="name" label="项目名称" width="250"></el-table-column>

        <el-table-column prop="price" label="单价" width="150" sortable></el-table-column>

        <el-table-column prop="number" label="数量" width="150" sortable></el-table-column>

        <el-table-column prop="total_price" label="总金额" width="150" sortable></el-table-column>

        <el-table-column prop="time" label="开立时间" min-width="250" sortable></el-table-column>

        <el-table-column prop="status" label="状态" min-width="120"></el-table-column>

        <!-- <el-table-column label="操作" width="120">
          <template scope="scope">
            <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">退费</el-button>
          </template>
        </el-table-column> -->

        <el-dialog
          title="退费信息确认"
          :visible.sync="dialogFormVisible"
          width="600px"
          :append-to-body="true"
          center
        >
          <el-form :model="paymentForm">
            <el-form-item label="病历号：" :label-width="formLabelWidth">
              <el-input v-model="filters.medicalRecord_id" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="患者姓名：" :label-width="formLabelWidth">
              <el-input v-model="patient.name" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="应退金额：" :label-width="formLabelWidth">
              <el-input v-model="paymentForm.shouldPay" style="width: 200px"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogClick">退 款</el-button>
          </div>
        </el-dialog>


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
        others_id: 1
      },
      patient: {
        patient_id: "",
        name: "",
        idNumber: ""
      },
      loading: false,
      paymentItem: [],
      multipleSelection: null,
      formLabelWidth: "100px",
      paymentForm: {
        shouldPay: 0,
        actualPay: 0,
        methodPay: "",
        change: 0
      }
    };
  },
  methods: {
    //获取用户病历信息
    getPatient() {
      if(this.filters.medicalRecord_id==''){
        this.$message.error('请输入病历号');
      }else{
        this.loading = true;

        setTimeout(() => {
          this.patient.patient_id = this.filters.medicalRecord_id;
          this.patient.name = "小明";
          this.patient.idNumber = "";
          this.getPaymentItem();

          this.$message({
            message: "已获取病历信息！",
            type: "success"
          });
        }, 1500);
      }
    },
    getPaymentItem() {
      this.paymentItem = [
        {
          name: "蒲地蓝消炎口服液",
          price: 40.2,
          number: 1,
          time: "2020-5-1 10:00:00",
          status: "已缴费",
          total_price: 40.2
        },
        {
          name: "奥美拉唑胶囊",
          price: 17,
          number: 2,
          time: "2020-5-1 10:00:00",
          status: "已缴费",
          total_price: 34
        },
        {
          name: "头孢拉定胶囊",
          price: 7.7,
          number: 1,
          time: "2020-5-1 10:00:00",
          status: "已缴费",
          total_price: 7.7
        }
      ];
      this.loading = false;
    },

   
    handleDel: function(index, row) {
      this.$confirm("请确认是否退费?", "提示", {
        type: "warning"
      }).then(() => {
        row.status = "退费";
        this.$message({
          message: "退费成功",
          type: "success"
        });
      });
    },

    dialogClick() {
      this.dialogFormVisible = false;

      this.paymentItem = [
        {
          name: "蒲地蓝消炎口服液",
          price: 40.2,
          number: 1,
          time: "2020-5-1",
          status: "已退费",
          total_price: 40.2
        },
        {
          name: "奥美拉唑胶囊",
          price: 17,
          number: 2,
          time: "2020-5-1",
          status: "已退费",
          total_price: 34
        },
        {
          name: "头孢拉定胶囊",
          price: 7.7,
          number: 1,
          time: "2020-5-1",
          status: "已退费",
          total_price: 7.7
        }
      ];
      this.$message({
        message: "缴费成功！",
        type: "success"
      });
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    pay() {
      if (this.multipleSelection == null) {
        this.$message.error("请选择退费项目！");
      } else {
        this.dialogFormVisible = true;
        this.multipleSelection.forEach(item => {
          this.paymentForm.shouldPay += item.total_price;
        });
      }
    },
  }
};
</script>
