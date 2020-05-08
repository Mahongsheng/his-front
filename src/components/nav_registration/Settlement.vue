<template>
  <div>
    <el-row class="settlement_block">
      <el-row>
        <h1>查询条件</h1>
      </el-row>
      <el-row>
        <el-form ref="querySettlementForm" :model="querySettlementForm" label-width="70px" label-position="left">
          <el-row :gutter="10">
            <el-col :span="6">
              <el-form-item label="起始时间">
                <el-date-picker type="date" placeholder="选择起始时间" v-model="querySettlementForm.startTime" style="width: 100%;"
                  value-format="yyyy-MM-dd" format="yyyy-MM-dd"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="终止时间">
                <el-date-picker type="date" placeholder="选择终止时间" v-model="querySettlementForm.endTime" style="width: 100%;"
                  value-format="yyyy-MM-dd" format="yyyy-MM-dd"></el-date-picker>
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
      </el-row>
    </el-row>

    <el-row class="settlement_block" style="height: 300px;">

      <el-row align="bottom">
        <el-col :span="16">
          <h1>查询结果</h1>
        </el-col>
        <el-col :span="3">
          <h1>{{wholeMoney}}</h1>
        </el-col>
        <el-col :span="4" style="height: 61.84px;">
          <el-button type="primary" icon="el-icon-s-order" @click="handleSettlement" style="margin-block-start: 0.83em;
    margin-block-end: 0.83em;margin-left: 34px;">结算报账</el-button>
          <!-- <h1>合计100元</h1> -->
        </el-col>
      </el-row>

      <el-row>
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
      </el-row>
    </el-row>
  </div>


</template>

<script>
  export default {
    data() {
      return {
        loading: false,
        wholeMoney:'',
        querySettlementForm: {
          startTime: '',
          endTime: '',
          operator: '',
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
          this.wholeMoney = "合计：100元";
          this.$message({
            message: "已获取日结信息",
            type: "success"
          });
          this.loading = false;
        }, 1500);
      },
      handleSettlement(){
        this.loading = true;
        setTimeout(()=>{
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

<style>
  .settlement_block {
    border: 3px solid #364766;
    border-radius: 10px;
    padding: 10px 0px 0 40px;
    margin-top: 20px;
  }
</style>
