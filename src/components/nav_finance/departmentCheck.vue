<template>
    <section>
        <el-form :model="form" :inline="true">
          <el-col style="font-size:24px; padding-bottom: 40px">查询条件</el-col>
          <el-row>
              <el-col :span="8">
                <el-form-item label="统计类型：">
                    <el-select v-model="value" placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                  <el-form-item label="开始日期：">
                    <el-date-picker
                    v-model="form.dateStart"
                    type="date"
                    placeholder="选择日期">
                    </el-date-picker>
                  </el-form-item>
              </el-col>
              <el-col :span="8">
                  <el-form-item label="结束日期：">
                    <el-date-picker
                    v-model="form.dateEnd"
                    type="date"
                    placeholder="选择日期">
                    </el-date-picker>
                  </el-form-item>
              </el-col>
              <el-col :offset="19" :span="2">
                  <el-form-item>
                    <el-button
                        type="primary"
                        icon="el-icon-search"
                        @click="search"
                    >查询</el-button>
                  </el-form-item>
              </el-col>
          </el-row>
         
      </el-form>
      <el-divider></el-divider>
      
      <el-form :model="resultForm" :inline="true">
        <el-row>
            <el-col style="font-size:24px; padding-bottom: 40px" :span="3">查询结果</el-col>
            <el-col :offset="16" :span="2">  
                <el-form-item>
                <el-button
                    type="primary"
                    icon="el-icon-goods"
                    @click="exportData"
                >导出</el-button>
                </el-form-item>
            </el-col>
        </el-row>
      </el-form>
       <template>
            <el-table
            :data="tableResult"
            style="width: 100%"
            highlight-current-row
            tooltip-effect="dark">
            <el-table-column
                prop="name"
                label="科室名称">
            </el-table-column>
            <el-table-column
                prop="number"
                label="看诊人数">
            </el-table-column>
            <el-table-column
                prop="west"
                label="西药费">
            </el-table-column>
            <el-table-column
                prop="chineseComplete"
                label="中成药">
            </el-table-column>
            <el-table-column
                prop="chineseHerb"
                label="中草药">
            </el-table-column>
            <el-table-column
                prop="registration"
                label="挂号费">
            </el-table-column>
            <el-table-column
                prop="check"
                label="检查费">
            </el-table-column>
            <el-table-column
                prop="exam"
                label="检验费">
            </el-table-column>
            <el-table-column
                prop="treatment"
                label="治疗费">
            </el-table-column>
            <el-table-column
                prop="surgery"
                label="手术治疗费">
            </el-table-column>
            <el-table-column
                prop="others"
                label="其他治疗费">
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
        tableResult: [],
        form:{
            dateStart: '',
            dateEnd: '',
            id: ''
        },
        resultForm:{
            totalMoney: ''
        },
        options: [{
          value: 'billingDepartment',
          label: '开单科室'
        }, {
          value: 'operationDepartment',
          label: '执行科室'
        }],
        value: '',
        key:0

          
      };
    },
    methods:{
        exportData(){
          if(this.key==0){
            this.$message.error('先进行查询');
          }else{
              this.$confirm("确认导出吗?", "提示", {
              type: "warning"
          }).then(() => {
              this.searchLoading = true;

              setTimeout(() => {
              this.$message({
                  message: "导出成功",
                  type: "success"
              });
              }, 1500);
              });
          }
        },
        search(){
         if(this.value=='' || this.form.dateStart=='' || this.form.dateEnd==''){
          this.$message.error('请将查询条件填写完整');
         }
         else if (this.value=='operationDepartment') {
            this.key=1;
            this.tableResult = [{
            name: '全科诊室',
            number: 19,
            west:24,
            chineseComplete:54,
            chineseHerb:234,
            registration:64,
            check:23,
            exam:1,
            treatment:42,
            surgery:2,
            others:0,
          }, {
            name: '化验科',
            number: 19,
            west:45,
            chineseComplete:64,
            chineseHerb:34,
            registration:2,
            check:32,
            exam:23,
            treatment:23,
            surgery:42,
            others:24,
          }, {
            name: '检查室',
            number: 100,
            west: 814,
            chineseComplete:0,
            chineseHerb:50,
            registration:350,
            check:990,
            exam:970,
            treatment:0,
            surgery:0,
            others:0,
          }, {
            name: '西药房',
            number: 19,
            west:12,
            chineseComplete:21,
            chineseHerb:53,
            registration:31,
            check:12,
            exam:53,
            treatment:12,
            surgery:45,
            others:23,
          }, {
            name: '中药房',
            number: 10,
            west:0,
            chineseComplete:20,
            chineseHerb:0,
            registration:10,
            check:0,
            exam:0,
            treatment:0,
            surgery:0,
            others:0,
          }, {
            name: '内科',
            number: 20,
            west:0,
            chineseComplete:20,
            chineseHerb:1,
            registration:10,
            check:0,
            exam:0,
            treatment:0,
            surgery:0,
            others:0,
          }, {
            name: '全科诊室',
            number: 30,
            west:0,
            chineseComplete:20,
            chineseHerb:3,
            registration:10,
            check:0,
            exam:0,
            treatment:0,
            surgery:0,
            others:0,
          }, {
            name: '合计',
            number: 217,
            west:897,
            chineseComplete:199,
            chineseHerb:375,
            registration:477,
            check:1067,
            exam:1047,
            treatment:77,
            surgery:89,
            others:47,
          }];
         } else {
            this.tableResult = [{
            name: '全科门诊',
            number: 100,
            west: 814,
            chineseComplete:0,
            chineseHerb:50,
            registration:350,
            check:990,
            exam:970,
            treatment:0,
            surgery:0,
            others:0,
          }, {
            name: '内科',
            number: 19,
            west:12,
            chineseComplete:21,
            chineseHerb:53,
            registration:31,
            check:12,
            exam:53,
            treatment:12,
            surgery:45,
            others:23,
          }, {
            name: '全科诊室',
            number: 19,
            west:24,
            chineseComplete:54,
            chineseHerb:234,
            registration:64,
            check:23,
            exam:1,
            treatment:42,
            surgery:2,
            others:0,
          }, {
            name: '妇产科',
            number: 19,
            west:45,
            chineseComplete:64,
            chineseHerb:34,
            registration:2,
            check:32,
            exam:23,
            treatment:23,
            surgery:42,
            others:24,
          }, {
            name: '合计',
            number: 157,
            west:897,
            chineseComplete:139,
            chineseHerb:371,
            registration:447,
            check:1067,
            exam:1047,
            treatment:77,
            surgery:89,
            others:47,
          }];
         }
        }
          
    }
};
</script>
