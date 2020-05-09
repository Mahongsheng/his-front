<template>
  <section>
    <div class="components-container">
      <el-row>
        <el-form :inline="true" :model="filters">
          <el-form-item label="病历号：">
            <el-input v-model="filters.medicalRecord_id" placeholder="请输入病历号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" v-on:click="getTest()">查询</el-button>
          </el-form-item>

          <el-form-item style="font-size: 20px;" label="患者姓名：">{{patientMedicalRecord.name}}</el-form-item>
          <el-form-item
            style="font-size: 20px"
            label="病历号："
          >{{patientMedicalRecord.medicalRecord_id}}</el-form-item>
          <el-form-item style="font-size: 20px" label="年龄：">{{patientMedicalRecord.age}}</el-form-item>
          <el-form-item style="font-size: 20px" label="性别：">{{patientMedicalRecord.sex}}</el-form-item>

          <el-tag style="margin-top: 4px;float: right; font-size: 14px">科室: 检验科</el-tag>
        </el-form>
      </el-row>

      <!--列表-->
      <template>
        <el-tag style="padding: 0; width: 100%;height: 40px">
          <el-button
            type="primary"
            icon="el-icon-success"
            style="float: left"
            @click="multiExecute()"
            :disabled="this.multipleSelection.length===0"
          >批量执行</el-button>
        </el-tag>
        <el-table
          class="multipleTable"
          ref="multipleTable"
          :data="inspectionItem"
          highlight-current-row
          v-loading="loading"
          tooltip-effect="dark"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" :selectable='checkBox'></el-table-column>

          <el-table-column prop="name" label="检验项目"></el-table-column>

          <el-table-column prop="unit" label="规格"></el-table-column>

          <el-table-column prop="number" label="数量"></el-table-column>

          <el-table-column prop="status" label="执行状态"></el-table-column>

          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="small"
                v-if="scope.row.status=='未执行'"
                @click="handleExecute(scope.$index, scope.row)"
              >执行确认</el-button>
              <el-button
                type="danger"
                size="small"
                v-if="scope.row.status=='未执行'"
                @click="handleDel(scope.$index, scope.row)"
              >取消执行</el-button>
              <el-button
                type="info"
                size="small"
                v-if="scope.row.status=='已执行'"
                @click="handleEdit(scope.$index, scope.row)"
              >结果录入</el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-dialog
          title="结果录入"
          :visible.sync="dialogFormVisible"
          width="600px"
          :append-to-body="true"
          center
        >
          <el-form :model="form">
            <el-form-item label="执行情况：" :label-width="formLabelWidth">
              <el-input v-model="patientMedicalRecord.evaluation" style="min-width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="上传文件： " :label-width="formLabelWidth">
              <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                multiple
                :limit="3"
                :on-exceed="handleExceed"
                :file-list="fileList"
              ></el-upload>
              <el-button size="small" type="primary">点击上传</el-button>
              <el-row>
                <el-button
                  @click="dialogFormVisible = false"
                  style="float: right; margin-left:15px"
                >取 消</el-button>
                <el-button type="primary" @click="dialogClick" style="float: right">确 认</el-button>
              </el-row>
            </el-form-item>
          </el-form>
        </el-dialog>
      </template>
    </div>
  </section>
</template>

<style scoped>
.components-container {
  /* background-color: #f0f2f5; */
  min-height: calc(100vh - 110px);
}

.toolbar {
  height: 40px;
}

.multipleTable {
  margin-top: 15px;
  border-radius: 4px;
  border: 1px solid #e6ebf5;
  background-color: #fff;
  overflow: hidden;
  color: #303133;
  -webkit-transition: 0.3s;
  transition: 0.3s;
  min-height: 75vh;
}
</style>

<script>
export default {
  data() {
    return {
      filters: {
        medicalRecord_id: "",
        date: ""
      },
      patientMedicalRecord: {
        medicalRecord_id: "",
        name: "",
        sex: "",
        age: "",
        evaluation: ""
      },
      loading: false,
      inspectionItem: [],
      multipleSelection: [],
      dialogFormVisible: false,
      resultForm: ""
    };
  },
  methods: {
    getTest() {
      this.loading = true;

      setTimeout(() => {
        this.inspectionItem = [
          {
            name: "糖化X红蛋白测定（色谱法）",
            unit: "次",
            number: 1,
            status: "未执行"
          },
          {
            name: "葡萄糖测定（干化X法）(X清)",
            unit: "次",
            number: 1,
            status: "未执行"
          },
          {
            name: "唐氏综合症筛查",
            unit: "单侧",
            number: 1,
            status: "未执行"
          }
        ];

        this.patientMedicalRecord.name = "小明";
        this.patientMedicalRecord.sex = "男";
        this.patientMedicalRecord.age = 20;
        this.patientMedicalRecord.medicalRecord_id = this.filters.medicalRecord_id;

        this.$message({
          message: "已获取该患者检验项目信息",
          type: "success"
        });
        this.loading = false;
      }, 1500);
    },

    checkBox(row, rowIndex){
      if(row.status == "未执行"){
        return true;
      }
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    multiExecute() {
      this.$confirm("请确认是否执行检验?", "提示", {
        type: "warning"
      }).then(() => {
        this.multipleSelection.forEach(item => {
          if (item.status == "未执行") {
            item.status = "已执行";
          }
        });
        this.$refs.multipleTable.clearSelection();
        this.$message({
          message: "确认执行检验项目",
          type: "success"
        });
      });
    },

    handleExecute: function(index, row) {
      this.$confirm("请确认是否执行检验?", "提示", {
        type: "warning"
      }).then(() => {
        row.status = "已执行";
        this.$message({
          message: "确认执行检验项目",
          type: "success"
        });
      });
    },

    handleDel: function(index, row) {
      this.$confirm("请确认是否取消执行该项目?", "提示", {
        type: "warning"
      }).then(() => {
        row.status = "已取消执行";
        this.$message({
          message: "取消执行成功",
          type: "success"
        });
      });
    },

    handleEdit: function(index, row) {
      this.dialogFormVisible = true;
      this.resultForm = Object.assign({}, row);
    },

    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },

    dialogClick() {
      this.dialogFormVisible = false;
      this.inspectionItem.forEach(item => {
        if (item.name == this.resultForm.name) {
          item.status = "结果已录入";
        }
      });

      this.$message({
        message: "录入成功",
        type: "success"
      });
    }
  }
};
</script>