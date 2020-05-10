<template>
  <div>
    <el-row>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <h1 class="el-icon-edit" style="font-weight: bold;"> 查询条件</h1>
        </div>
        <el-form :model="querySettlementForm" ref="querySettlementForm" label-width="70px" label-position="left">
          <el-row :gutter="10">
            <el-col :span="6">
              <el-form-item label="起始时间">
                <el-date-picker type="date" placeholder="选择起始时间" v-model="querySettlementForm.startTime" style="width: 100%;"
                  value-format="yyyy-MM-dd" format="yyyy-MM-dd" @change="checkQueryDate"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="终止时间">
                <el-date-picker type="date" placeholder="选择终止时间" v-model="querySettlementForm.endTime" style="width: 100%;"
                  value-format="yyyy-MM-dd" format="yyyy-MM-dd" @change="checkQueryDate"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="收费员 ">
                <el-input placeholder="扁鹊" v-model="querySettlementForm.operator" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item>
                <el-button type="primary" icon="el-icon-search" @click="querySettlement">日结查询</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
    </el-row>

    <el-row style="margin-top: 30px;">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <el-row align="bottom">
            <el-col :span="16">
              <h1 class="el-icon-paperclip" style="font-weight: bold;"> 查询结果</h1>
            </el-col>
            <el-col :span="3">
              <el-tag style="margin: 16px 5px 0px 4px;font-size: 14px;">合计：{{wholeMoney}}</el-tag>
            </el-col>
            <el-col :span="4" style="height: 61.84px;">
              <el-button type="primary" icon="el-icon-s-order" @click="handleSettlement" style="margin-block-start: 0.83em;margin-left: 33px;">结算报账</el-button>
              <!-- <h1>合计100元</h1> -->
            </el-col>
          </el-row>
        </div>
        <template>
          <el-table :data="settlementItem" highlight-current-row v-loading="loading" style="width: 100%;">
            <el-table-column prop="count" label="#" width="100"></el-table-column>

            <el-table-column prop="invoiceID" label="发票号" width="150" sortable></el-table-column>

            <el-table-column prop="medicalRecordID" label="病历号" width="150" sortable></el-table-column>

            <el-table-column prop="invoiceMoney" label="发票总额" width="150" sortable></el-table-column>

            <el-table-column prop="patientName" label="患者姓名" width="150" sortable></el-table-column>

            <el-table-column prop="payType" label="结算类别" min-width="100" sortable></el-table-column>

          </el-table>
        </template>
      </el-card>
    </el-row>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        loading: false,
        wholeMoney: '',
        querySettlementForm: {
          startTime: '',
          endTime: '',
          operator: ''
        },
        settlementItem: [],
        settlementInfo: {
          count: '',
          invoiceID: '',
          medicalRecordID: '',
          invoiceMoney: '',
          patientName: '',
          payType: ''
        }
      }
    },
    methods: {
      checkQueryDate() {
        var startStr = this.querySettlementForm.startTime.toString();
        var endStr = this.querySettlementForm.endTime.toString();
        startStr = startStr.replace('/-/g', '/');
        endStr = endStr.replace('/-/g', '/');
        var startTimeDate = new Date(startStr).getTime();
        var endTimeDate = new Date(endStr).getTime();
        if (startTimeDate > endTimeDate) {
          this.$message.error('无效查询日期！');
          this.querySettlementForm.startTime = "";
          this.querySettlementForm.endTime = "";
        }
      },
      querySettlement() {
        this.loading = true;

        setTimeout(() => {
          this.settlementItem = [{
              count: '1',
              invoiceID: '12000001',
              medicalRecordID: '6100000',
              invoiceMoney: '30',
              patientName: '刘大力',
              payType: '医保'
            },
            {
              count: '2',
              invoiceID: '12000002',
              medicalRecordID: '6100001',
              invoiceMoney: '60',
              patientName: '李晶晶',
              payType: '自费'
            },
            {
              count: '3',
              invoiceID: '12000003',
              medicalRecordID: '6100002',
              invoiceMoney: '10',
              patientName: '王花花',
              payType: '医保'
            }
          ];
          this.wholeMoney = "100元";

          this.$message({
            message: "已获取日结信息",
            type: "success"
          });
          this.loading = false;
        }, 1500);
      },
      handleSettlement() {
        this.loading = true;
        setTimeout(() => {
          this.settlementItem = [];
          this.wholeMoney = '';
          this.$message({
            message: "已完成结算报账",
            type: "success"
          });
          this.loading = false;
        }, 1500);
      }
    }
  }
</script>
