<template>
  <section>
      <el-form :model="form" :inline="true">
          <el-col style="font-size:24px; font-weight: bold; padding-bottom: 40px">费用查询</el-col>
          <el-row>
              <el-col :span="6">
                <el-form-item label="病历号：">
                    <el-input v-model="form.id" placeholder="请输入病历号"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                  <el-form-item label="开始日期（选填）：">
                    <el-date-picker
                    v-model="form.dateStart"
                    type="date"
                    placeholder="选择日期">
                    </el-date-picker>
                  </el-form-item>
              </el-col>
              <el-col :span="8">
                  <el-form-item label="结束日期（选填）：">
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
                        icon="el-icon-goods"
                        @click="search"
                    >费用查询</el-button>
                  </el-form-item>
              </el-col>
          </el-row>
          <!-- <el-row>
              <el-form-item>
                <el-button
                    type="primary"
                    icon="el-icon-goods"
                    @click="search"
                    style="margin-left: 600px"
                >退费结算</el-button>
              </el-form-item>
          </el-row> -->

      </el-form>
      <el-divider></el-divider>
      <el-form :model="resultForm" :inline="true">
        <el-row>
            <el-col style="font-size:24px; padding-bottom: 40px; font-weight: bold" :span="3">查询结果</el-col>
            <el-col :offset="13" :span="6">
                <el-form-item label="合计：">
                    <el-input v-model="resultForm.totalMoney"></el-input>
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
                prop="date"
                label="收费时间"
                width="180">
            </el-table-column>
            <el-table-column
                label="病历号"
                width="180">{{form.id}}
            </el-table-column>
            <el-table-column
                prop="name"
                label="患者姓名">
            </el-table-column>
            <el-table-column
                prop="itemName"
                label="收费项目">
            </el-table-column>
            <el-table-column
                prop="unitPrice"
                label="项目单价">
            </el-table-column>
            <el-table-column
                prop="number"
                label="项目数量">
            </el-table-column>
            <el-table-column
                prop="total"
                label="项目总额">
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
        }
          
      };
    },
    methods:{
        search(){
        if(this.form.id==''){
           this.$message.error('请输入病历号');
        }
        else if (this.form.dateStart=='') {
            this.resultForm.totalMoney = 0
            this.tableResult = [{
            date: '2020-05-07',
            name: '李明',
            itemName: '挂号',
            unitPrice: 1,
            number: 1,
            total: 1
          }, {
            date: '2020-05-05',
            name: '李明',
            itemName: '莲花清胶囊',
            unitPrice: 9,
            number: 1,
            total: 9
          }, {
            date: '2020-05-01',
            name: '李明',
            itemName: '999感冒颗粒',
            unitPrice: 10,
            number: 1,
            total: 10
          }, {
            date: '2020-04-29',
            name: '李明',
            itemName: '999感冒颗粒',
            unitPrice: 10,
            number: 1,
            total: 10
          },{
            date: '2020-01-12',
            name: '李明',
            itemName: '彩超',
            unitPrice: 130,
            number: 1,
            total: 130
          }];
          this.tableResult.forEach(item => {
          this.resultForm.totalMoney += item.total;
        });
         } else {
            this.resultForm.totalMoney = 0
            this.tableResult = [{
            date: '2020-05-07',
            name: '李明',
            itemName: '挂号',
            unitPrice: 1,
            number: 1,
            total: 1
          }, {
            date: '2020-05-05',
            name: '李明',
            itemName: '莲花清胶囊',
            unitPrice: 9,
            number: 1,
            total: 9
          }, {
            date: '2020-05-01',
            name: '李明',
            itemName: '999感冒颗粒',
            unitPrice: 10,
            number: 1,
            total: 10
          }];
          this.tableResult.forEach(item => {
          this.resultForm.totalMoney += item.total;
        });
         }
            
        }
    }
};
</script>
