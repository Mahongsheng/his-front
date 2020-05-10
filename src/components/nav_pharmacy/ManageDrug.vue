<template>
  <section>
    <!--查询药品-->
    <el-row>
       <el-col :span="12" class="toolbar" style="padding-bottom: 0;">
        <el-form :inline="true" :model="filters">
          <el-form-item>
            <el-input v-model="filters.mnemonicCode" placeholder="请输入药品助记码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" v-on:click="searchDrug()">查询药品</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <!--增加药品-->
      <el-col :span="12" class="toolbar" style="padding-bottom: 0;">
            <el-button type="primary" icon="el-icon-import" @click="dialogFormImport = true">导入药品</el-button>
            <!--对话框-->
            <el-dialog title="导入药品" :visible.sync="dialogFormImport">
              <el-form :model="drugForm">
                <el-form-item label="药品编码" :label-width="formLabelWidth">
                  <el-input v-model="drugForm.dCode" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="药品名称" :label-width="formLabelWidth">
                  <el-input v-model="drugForm.dName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="规格" :label-width="formLabelWidth">
                  <el-input v-model="drugForm.dSpecification" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="单位" :label-width="formLabelWidth">
                  <el-input v-model="drugForm.dUnit" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="剂型" :label-width="formLabelWidth">
                  <el-input v-model="drugForm.dClass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="单价" :label-width="formLabelWidth">
                  <el-input v-model="drugForm.dPrice" autocomplete="off"></el-input>
                </el-form-item>
              </el-form>

              <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="importDrug()">确 定</el-button>
                <el-button @click="dialogFormImport = false">取 消</el-button>
              </div>
            </el-dialog>

      </el-col>
    </el-row>
    <!--分割条-->
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark"></div>
      </el-col>
    </el-row>

    <!--列表-->
    <template>
      <el-table
        ref="multipleTable"
        max-height="400"
        :data="drugItem"
        highlight-current-row
        v-loading="loading"
        tooltip-effect="dark"
        style="width: 100%;"
        @selection-change="handleSelectionChange"
        :model="filters">

        <el-table-column type="selection" width="55"></el-table-column>

        <el-table-column prop="drug_code" label="药品编码" width="200"></el-table-column>

        <el-table-column prop="drug_name" label="药品名称" width="300"></el-table-column>

        <el-table-column prop="drug_specification" label="规格" width="150"></el-table-column>

        <el-table-column prop="drug_unit" label="单位" width="100"></el-table-column>

        <el-table-column prop="drug_class" label="剂型" width="100"></el-table-column>

        <el-table-column prop="drug_price" label="单价" width="100"></el-table-column>

        <el-table-column label="操作" width="100">
          <template scope="scope">
            <el-button type="danger" size="small" @click="delDrug(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>

      </el-table>

<!--      <el-pagination-->
<!--        background-->
<!--        layout="prev, pager, next"-->
<!--        :total="1000">-->
<!--      </el-pagination>-->
      <!--批量删除 && 页面分割-->
      <div class="block">
        <el-row :gutter="100">
          <!--批量删除-->
          <el-col :span="8" class="toolbar" style="padding-bottom: 0;">
            <el-form :inline="true" :model="filters">
              <el-form-item>
                <el-button type="primary" icon="el-icon-import" v-on:click="multiDelDrug()">批量删除</el-button>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="8">
            <!--页面分割-->
            <el-pagination
              background
              :page-size="10"
              layout="prev, pager, next, sizes, total, jumper"
              :total="1000">
            </el-pagination>
          </el-col>
        </el-row>
      </div>

    </template>

  </section>


</template>

<el-dialog title="导入药品" :visible.sync="dialogFormImport" center>
  <el-form :model="form">
    <el-form-item label="药品编码" :label-width="formLabelWidth">
      <el-input v-model="form.name" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormImport = false">取 消</el-button>
    <el-button type="primary" @click="dialogFormImport = false">确 定</el-button>
  </div>
</el-dialog>

<script>
    export default {
        data(){
          return{
            filters: {
              mnemonicCode: ""
            },
            loading: false,

            drugItem: [{
              drug_code: 86979474000208,
              drug_name: "注射用甲氨喋呤",
              drug_specification: "1g×1支",
              drug_unit: "支",
              drug_class: "针剂",
              drug_price: 15.73
            },{
              drug_code: 86979474000209,
              drug_name: "氟康唑氯化钠注射液(大扶康)",
              drug_specification: "200mg×100ml/瓶",
              drug_unit: "瓶",
              drug_class: "针剂",
              drug_price: 7.01
            },{
              drug_code: 86979474000208,
              drug_name: "50%葡萄糖注射液(塑瓶)",
              drug_specification: "10:20ml×1支",
              drug_unit: "支",
              drug_class: "针剂",
              drug_price: 25.16
            },{
              drug_code: 86979474000209,
              drug_name: "盐酸特比萘芬阴道泡腾片(丁克)",
              drug_specification: "50mg×7片/盒",
              drug_unit: "盒",
              drug_class: "片剂",
              drug_price: 40.62
            },{
              drug_code: 86979474000208,
              drug_name: "红芪",
              drug_specification: "10g/袋",
              drug_unit: "袋",
              drug_class: "中药饮片",
              drug_price: 30.79
            },{
              drug_code: 86979474000209,
              drug_name: "盐酸氨酮戊酸散(外用)",
              drug_specification: "118mg×1瓶",
              drug_unit: "瓶",
              drug_class: "散剂",
              drug_price: 19.51
            },{
              drug_code: 86979474000208,
              drug_name: "盐酸美金刚片(易贝申)",
              drug_specification: "10mg×28片/盒",
              drug_unit: "盒",
              drug_class: "片剂",
              drug_price: 22.05
            },{
              drug_code: 86979474000209,
              drug_name: "磷酸奥司他韦胶囊(达菲)",
              drug_specification: "75mg×10粒/盒",
              drug_unit: "盒",
              drug_class: "胶囊",
              drug_price: 60.96
            }
            ],
            dialogFormImport : false,
            drugForm:{
              dCode: '',
              dName: "",
              dSpecification: "",
              dUnit: "",
              dClass: "",
              dPrice: ''
            },
            formLabelWidth: '120px'
          };
        },



        methods: {

          handleSelectionChange(val) {
            this.multipleSelection = val;
          },

          searchDrug(){
            let cursor = this.filters.mnemonicCode;
            // console.log(cursor);
            if(cursor == "ZSYJAZZ"){
              this.drugItem = [{drug_code: 86979474000208,drug_name: "注射用甲氨喋呤",drug_specification: "1g×1支",drug_unit: "支",drug_class: "针剂",drug_price: 15.73}];
              this.$message({
                message: "查询到该药品！",
                type: "success"
              });
            }else if(cursor == "FKZLHNZSY(DFK)"){
              this.drugItem = [{drug_code: 86979474000209,drug_name: "氟康唑氯化钠注射液(大扶康)",drug_specification: "200mg×100ml/瓶",drug_unit: "瓶",drug_class: "针剂",drug_price: 7.01}];
              this.$message({
                message: "查询到该药品！",
                type: "success"
              });
            }else if(cursor == "PTTZSY(SP)"){
              this.drugItem = [{drug_code: 86979474000208,drug_name: "50%葡萄糖注射液(塑瓶)",drug_specification: "10:20ml×1支",drug_unit: "支",drug_class: "针剂",drug_price: 25.16}];
              this.$message({
                message: "查询到该药品！",
                type: "success"
              });
            }else if(cursor == "YSTBZFYDPTP(DK)"){
              this.drugItem = [{drug_code: 86979474000209,drug_name: "盐酸特比萘芬阴道泡腾片(丁克)",drug_specification: "50mg×7片/盒",drug_unit: "盒",drug_class: "片剂",drug_price: 40.62}];
              this.$message({
                message: "查询到该药品！",
                type: "success"
              });
            }else if(cursor == "HZ"){
              this.drugItem = [{drug_code: 86979474000208,drug_name: "红芪",drug_specification: "10g/袋",drug_unit: "袋",drug_class: "中药饮片",drug_price: 30.79}];
              this.$message({
                message: "查询到该药品！",
                type: "success"
              });
            }else if(cursor == "YSATWSS(WY)"){
              this.drugItem = [{drug_code: 86979474000209,drug_name: "盐酸氨酮戊酸散(外用)",drug_specification: "118mg×1瓶",drug_unit: "瓶",drug_class: "散剂",drug_price: 19.51}];
              this.$message({
                message: "查询到该药品！",
                type: "success"
              });
            }else if(cursor == "YSMJGP(YBS)"){
              this.drugItem = [{drug_code: 86979474000208,drug_name: "盐酸美金刚片(易贝申)",drug_specification: "10mg×28片/盒",drug_unit: "盒",drug_class: "片剂",drug_price: 22.05}];
              this.$message({
                message: "查询到该药品！",
                type: "success"
              });
            }else if(cursor == "LSASTWJN(DF)"){
              this.drugItem = [{drug_code: 86979474000209,drug_name: "磷酸奥司他韦胶囊(达菲)",drug_specification: "75mg×10粒/盒",drug_unit: "盒",drug_class: "胶囊",drug_price: 60.96}];
              this.$message({
                message: "查询到该药品！",
                type: "success"
              });
            } else {
              this.$message({
                message: "未查询到该药品！",
                type: "error"
              });
            }
          },

          importDrug(){
            this.drugItem.push({drug_code: this.drugForm.dCode,drug_name: this.drugForm.dName,drug_specification: this.drugForm.dSpecification,
                                drug_unit: this.drugForm.dUnit,drug_class: this.drugForm.dClass,drug_price: this.drugForm.dPrice});
            this.$message({
              message: "已导入药品！",
              type: "success"
            });
            this.dialogFormImport = false
          },

          delDrug(index, row){
            this.$alert('是否删除该药品','提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                          while(index < this.drugItem.length - 1){
                            this.drugItem[index] = this.drugItem[index+1];
                            index++;
                          }
                          this.drugItem.pop();
                          this.$message({
                            message: "已成功删除药品！",
                            type: "success"
                          });
                        }
            });

          },

          multiDelDrug(){
            this.$alert('是否删除选中药品','提示',{
                        confirmButtonText: '确定',
                        callback: action => {
                          this.multipleSelection.forEach(item =>{
                            let index = 0;
                            while(index < this.drugItem.length){
                              if(this.drugItem[index].drug_name != item.drug_name){
                                index++;
                              }else{
                                  break;
                              }
                            }
                            while(index < this.drugItem.length - 1){
                              this.drugItem[index] = this.drugItem[index+1];
                              index++;
                            }
                            this.drugItem.pop();
                          });
                          this.$message({
                            message: "已成功删除选中药品！",
                            type: "success"
                          });
                        }
            });


          }

        }





    }
</script>

<style scoped>
  .el-row {
    margin-bottom: 20px;
  &:last-child {
     margin-bottom: 0;
   }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

  .el-pagination{
    text-align: right;
  }

</style>
