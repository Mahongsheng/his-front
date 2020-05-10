<template>
  <section>
    <el-row>
      <!--工具栏-->
      <el-col :span="24" class="toolbar" style="padding-bottom: 0;">
        <el-form :inline="true" :model="filters">
          <el-form-item label="收费员：">
            <el-input v-model="filters.clerkName" placeholder="收费员姓名"></el-input>
          </el-form-item>
          <el-form-item label="时间">
            <el-date-picker
              type="date"
              placeholder="选择起始日期"
              style="width: 100%;"
              v-model="filters.startDate"
              value-format="yyyy-MM-dd"
              format="yyyy-MM-dd"
            ></el-date-picker>
            <el-date-picker
              type="date"
              placeholder="选择结束日期"
              style="width: 100%;"
              v-model="filters.endDate"
              value-format="yyyy-MM-dd"
              format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" v-on:click="searchForm()">查询</el-button>
            <el-button type="primary" icon="el-icon" v-on:click="getCheckForm()">核对通过</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <!--分割条-->
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark"></div>
      </el-col>
    </el-row>
    <!--日结信息区域-->
    <!--起始截止日期-->
    <el-row  type="flex"  justify="left">
      <el-form :inline="true" :model="filters">
        <el-form-item label="日结时间范围：">
          <el-col :span="6"><el-input size="large" placeholder="起始日期" v-model="filters.startDate" :disabled="true"></el-input></el-col>
          <el-col :span="6" offset="6">至</el-col>
          <el-col :span="6"><el-input size="large" placeholder="结束日期" v-model="filters.endDate" :disabled="true"></el-input></el-col>
        </el-form-item>
      </el-form>
    </el-row>
    <!--制表人，收款员，制表时间-->
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark"></div>
      </el-col>
    </el-row>
    <el-row>
      <el-form :inline="true" :model="filters">
        <el-form-item label="制表人：">
          <el-col><el-input placeholder="制表人" v-model="filters.clerkName" :disabled="true"></el-input></el-col>
        </el-form-item>
        <el-form-item label="收费员：">
          <el-col><el-input placeholder="收费员" v-model="filters.clerkName" :disabled="true"></el-input></el-col>
        </el-form-item>
        <el-form-item label="制表时间：">
          <el-col><el-input placeholder="" v-model="filters.tableDate" :disabled="true"></el-input></el-col>
        </el-form-item>
      </el-form>
    </el-row>
    <!--起始发票-->
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark"></div>
      </el-col>
    </el-row>
    <el-row>
      <el-form :inline="true" :model="filters">
        <el-form-item label="起始发票号：">
          <el-col :span="6"><el-input size="large" placeholder="" v-model="filters.fromInvoiceNum" :disabled="true"></el-input></el-col>
          <el-col :span="6" offset="6">至</el-col>
          <el-col :span="6"><el-input size="large" placeholder="" v-model="filters.toInvoiceNum" :disabled="true"></el-input></el-col>
        </el-form-item>
        <el-form-item label="共计：">
          <el-col :span="6">
            <el-input size="large" placeholder="" v-model="filters.numStartInvoice" :disabled="true">
              <i slot="suffix" style="font-style:normal;margin-right: 10px;">张</i>
            </el-input>
          </el-col>
        </el-form-item>
      </el-form>
    </el-row>

    <!--作废发票-->
    <el-row>
      <el-form :inline="true" :model="filters">
        <el-form-item label="作废发票号：">
          <el-col :span="12"><el-input size="large" placeholder="" v-model="filters.invalidInvoiceNum" :disabled="true"></el-input></el-col>
        </el-form-item>
        <el-form-item label="共计：">
          <el-col :span="12">
            <el-input size="large" placeholder="" v-model="filters.numinvalidInvoice" :disabled="true">
              <i slot="suffix" style="font-style:normal;margin-right: 10px;">张</i>
            </el-input>
          </el-col>
        </el-form-item>
      </el-form>
    </el-row>

    <!--重打发票-->
    <el-row>
    <el-form :inline="true" :model="filters">
      <el-form-item label="重打发票号：">
        <el-col :span="12"><el-input size="large" placeholder="" v-model="filters.reInvoiceNum" :disabled="true"></el-input></el-col>
      </el-form-item>
      <el-form-item label="共计：">
        <el-col :span="12">
          <el-input size="large" placeholder="" v-model="filters.numreInvoiceNum" :disabled="true">
            <i slot="suffix" style="font-style:normal;margin-right: 10px;">张</i>
          </el-input>
        </el-col>
      </el-form-item>
    </el-form>
    </el-row>

    <!--汇总-->
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark"></div>
      </el-col>
    </el-row>
    <el-row>
      <el-form :inline="true" :model="filters">
        <el-form-item label="总金额：">
          <el-col>
            <el-input size="large" placeholder="" v-model="filters.totalCost" :disabled="true">
              <i slot="suffix" style="font-style:normal;margin-right: 10px;">元</i>
            </el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="自费金额：">
            <el-col>
              <el-input size="large" placeholder="" v-model="filters.selfPaidPrice" :disabled="true">
                <i slot="suffix" style="font-style:normal;margin-right: 10px;">元</i>
              </el-input>
            </el-col>
        </el-form-item>
        <el-form-item label="自付金额：">
          <el-col>
            <el-input size="large" placeholder="" v-model="filters.selfPaid" :disabled="true">
              <i slot="suffix" style="font-style:normal;margin-right: 10px;">元</i>
            </el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="报销金额：">
          <el-col>
            <el-input size="large" placeholder="" v-model="filters.reimbursementPrice" :disabled="true">
              <i slot="suffix" style="font-style:normal;margin-right: 10px;">元</i>
            </el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="优惠金额：">
          <el-col>
            <el-input size="large" placeholder="" v-model="filters.discountPrice" :disabled="true">
              <i slot="suffix" style="font-style:normal;margin-right: 10px;">元</i>
            </el-input>
          </el-col>
        </el-form-item>
      </el-form>
    </el-row>

    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark"></div>
      </el-col>
    </el-row>
    <el-row>
      <el-form :inline="true" :model="filters">
        <el-form-item label="西药费：">
          <el-col>
            <el-input size="large" placeholder="" v-model="filters.westernDrugCost" :disabled="true">
              <i slot="suffix" style="font-style:normal;margin-right: 10px;">元</i>
            </el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="中草药费：">
          <el-col>
            <el-input size="large" placeholder="" v-model="filters.chineseDrugCost" :disabled="true">
              <i slot="suffix" style="font-style:normal;margin-right: 10px;">元</i>
            </el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="药费总计：">
          <el-col>
            <el-input size="large" placeholder="" v-model="filters.drugCost" :disabled="true">
              <i slot="suffix" style="font-style:normal;margin-right: 10px;">元</i>
            </el-input>
          </el-col>
        </el-form-item>

      </el-form>
    </el-row>

    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark"></div>
      </el-col>
    </el-row>
    <el-row>
      <el-form :inline="true" :model="filters">
        <el-form-item label="挂号费：">
          <el-col>
            <el-input size="large" placeholder="" v-model="filters.registerCost" :disabled="true">
              <i slot="suffix" style="font-style:normal;margin-right: 10px;">元</i>
            </el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="医疗费用：">
          <el-col>
            <el-input size="large" placeholder="" v-model="filters.medicalCost" :disabled="true">
              <i slot="suffix" style="font-style:normal;margin-right: 10px;">元</i>
            </el-input>
          </el-col>
        </el-form-item>
      </el-form>
    </el-row>

    <el-row>
      <el-form :inline="true" :model="filters">
        <el-form-item label="其他费用：">
          <el-col>
            <el-input size="large" placeholder="" v-model="filters.otherCost" :disabled="true">
              <i slot="suffix" style="font-style:normal;margin-right: 10px;">元</i>
            </el-input>
          </el-col>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row>
      <el-form :inline="true" :model="filters">
        <el-form-item label="总业务收入：">
          <el-col>
            <el-input size="large" placeholder="" v-model="filters.totalBusinessCost" :disabled="true">
              <i slot="suffix" style="font-style:normal;margin-right: 10px;">元</i>
            </el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="大写：">
          <el-col>
            <el-input size="large" placeholder="" v-model="filters.capitalCost" :disabled="true">
              <i slot="suffix" style="font-style:normal;margin-right: 10px;">元</i>
            </el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="小写：">
          <el-col>
            <el-input size="large" placeholder="" v-model="filters.lowercaseCost" :disabled="true">
              <i slot="suffix" style="font-style:normal;margin-right: 10px;">元</i>
            </el-input>
          </el-col>
        </el-form-item>
      </el-form>
    </el-row>


  </section>
</template>

<script>
    export default {
        name: "dailyCheck",
        data() {
          return{
            filters:{
              tableDate:"",
              clerkName:"",
              endDate:"",
              startDate:"",
              fromInvoiceNum:'',
              toInvoiceNum:'',
              numStartInvoice:'',
              invalidInvoiceNum:'',
              numinvalidInvoice:'',
              reInvoiceNum:'',
              numreInvoiceNum:'',
              totalCost:'',
              selfPaidPrice:'',
              selfPaid:'',
              reimbursementPrice:'',
              discountPrice:'',
              drugCost:'',
              westernDrugCost:'',
              chineseDrugCost:'',
              registerCost:'',
              medicalCost:'',
              otherCost:'',
              totalBusinessCost:'',
              capitalCost:"",
              lowercaseCost:''
            }
          };
        },

      methods:{
        searchForm: function() {
          if(this.filters.clerkName == "")
          {
            this.$message({
              message: "请输入收费员姓名！",
              type: "error"
            });
          }else if(this.filters.startDate == ""){
            this.$message({
              message: "请选择起始日期！",
              type: "error"
            });
          }else if(this.filters.endDate == ""){
            this.$message({
              message: "请选择结束日期！",
              type: "error"
            });
          }else{
            setTimeout(() =>{
              let myDate = new Date();
              this.filters.tableDate = myDate.toLocaleDateString();
              this.filters.fromInvoiceNum = 20200501088;
              this.filters.toInvoiceNum = 20200801010;
              this.filters.numStartInvoice = 15;
              this.filters.invalidInvoiceNum = 20200501116;
              this.filters.numinvalidInvoice = 10;
              this.filters.reInvoiceNum = 20200501091;
              this.filters.numreInvoiceNum = 1;
              this.filters.totalCost = 120.97;
              this.filters.selfPaidPrice = 41.76;
              this.filters.selfPaid = 0.00;
              this.filters.reimbursementPrice = 0.00;
              this.filters.discountPrice = 79.21;
              this.filters.drugCost = 30.74;
              this.filters.westernDrugCost = 22.02;
              this.filters.chineseDrugCost = 8.72;
              this.filters.registerCost = 3.00;
              this.filters.medicalCost = 3.00;
              this.filters.otherCost = 0.00;
              this.filters.totalBusinessCost = 33.74;
              this.filters.capitalCost = "叁拾叁点柒肆";
              this.filters.lowercaseCost = 33.74;

              this.$message({
                message: "查询成功！",
                type: "success"})
            },1000);
          }
        },

        getCheckForm: function () {
          this.$confirm("请确认信息是否核对完毕","提示",{
            type: "warning"
          }).then(() =>{
            this.$message({
              message: "日结工作完毕！",
              type: "success"
            });
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
