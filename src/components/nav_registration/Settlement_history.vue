<template>
  <div>
    <el-row class="settlement_block">
      <el-row>
        <h1>查询条件</h1>
      </el-row>
      <el-row>
        <el-form ref="querySettleHistForm" :model="querySettleHistForm" label-width="70px" label-position="left">
          <el-row :gutter="10">
            <el-col :span="6">
              <el-form-item label="起始时间">
                <el-date-picker type="date" placeholder="选择起始时间" v-model="querySettleHistForm.startTime" style="width: 100%;"
                  value-format="yyyy-MM-dd" format="yyyy-MM-dd"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="终止时间">
                <el-date-picker type="date" placeholder="选择终止时间" v-model="querySettleHistForm.endTime" style="width: 100%;"
                  value-format="yyyy-MM-dd" format="yyyy-MM-dd"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="收费员 ">
                <el-input placeholder="扁鹊" v-model="querySettleHistForm.operator" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item>
                <el-button type="primary" icon="el-icon-search" @click="querySettleHist">查询历史</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-row>
    </el-row>

    <el-row>
      <el-col :span="8" class="settlement_block" style="padding-left: 0px; height: 300px;">
        <el-row>
          <h1 style="padding-left: 40px;">日结历史</h1>
        </el-row>
        <el-row>
          <template>
            <el-table :data="settlementHistItem" highlight-current-row v-loading="hist_loading" style="width: 100%;"
              @current-change="querySettlement">
              <el-table-column prop="histCount" label="#" align="center" width="80"></el-table-column>
              <el-table-column prop="chargeOperator" label="收费员" width="115" sortable></el-table-column>
              <el-table-column prop="histDate" label="日期" width="115" sortable></el-table-column>
            </el-table>
          </template>
        </el-row>
      </el-col>
      <el-col :span="15" class="settlement_block" style="margin-left: 40px; padding-left: 0px;height: 300px;">
        <el-row>
          <el-col :span="18">
            <h1 style="padding-left: 40px;">日结明细</h1>
          </el-col>
          <el-col :span="6">
            <el-tag  style="margin: 20px 10px 0px 4px;font-size: 14px;">合计：{{wholeMoney}}</el-tag>
          </el-col>
        </el-row>
        <el-row>
          <template>
            <el-table :data="settlementItem" highlight-current-row v-loading="settlement_loading" style="width: 100%;">
              <el-table-column prop="count" label="#" align="center" width="50"></el-table-column>

              <el-table-column prop="invoiceID" label="发票号" width="110" sortable></el-table-column>

              <el-table-column prop="medicalRecordID" label="病历号" width="110" sortable></el-table-column>

              <el-table-column prop="invoiceMoney" label="发票总额" width="110" sortable></el-table-column>

              <el-table-column prop="patientName" label="患者姓名" width="110" sortable></el-table-column>

              <el-table-column prop="payType" label="结算类别" min-width="100" sortable></el-table-column>

            </el-table>
          </template>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        hist_loading: false,
        settlement_loading: false,
        querySettleHistForm: {
          startTime: '',
          endTime: '',
          operator: ''
        },
        settlementHistItem: [],
        settlementHistInfo: {
          histCount: '',
          chargeOperator: '',
          histDate: ''
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
      querySettleHist() {
        this.hist_loading = true;
        setTimeout(() => {
          this.settlementHistItem = [{
              histCount: '1',
              chargeOperator: '扁鹊',
              histDate: '2020-5-5'
            },
            {
              histCount: '2',
              chargeOperator: '扁鹊',
              histDate: '2020-5-6'
            },
            {
              histCount: '3',
              chargeOperator: '扁鹊',
              histDate: '2020-5-7'
            }
          ];
          this.hist_loading = false;
        }, 1500);
      },
      querySettlement() {
        this.settlement_loading = true;

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
          this.settlement_loading = false;
        }, 1500);
      }
    }
  }
</script>

<style>
  .settlement_block {
    border: 3px solid #364766;
    border-radius: 10px;
    padding: 10px 0 0 40px;
    margin-top: 20px;
  }
</style>
