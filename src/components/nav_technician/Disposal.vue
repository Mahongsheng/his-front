<template>
  <section>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0;">
      <el-row>
        <el-form :inline="true" :model="filters">
          <el-form-item label="病历号：">
            <el-input v-model="filters.medicalRecord_id" placeholder="请输入病历号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" v-on:click="getDisposal()">查询</el-button>
          </el-form-item>

          <el-form-item style="font-size: 20px">
            患者姓名：{{patientMedicalRecord.name}}&nbsp;&nbsp;&nbsp;&nbsp; 病历号：{{patientMedicalRecord.medicalRecord_id}}&nbsp;&nbsp;&nbsp;&nbsp;
            年龄：{{patientMedicalRecord.age}}&nbsp;&nbsp;&nbsp;&nbsp; 性别：{{patientMedicalRecord.sex}}
          </el-form-item>

          <el-tag style="margin-top: 4px;float: right; font-size: 14px">科室: 护理科</el-tag>
        </el-form>
      </el-row>
    </el-col>

    <template>
      <el-tag style="padding: 0; width: 100%;height: 40px">
        <el-button type="primary" icon="el-icon-success" style="float: left" @click="execute()">执行确认</el-button>
      </el-tag>
      <el-table
        ref="multipleTable"
        :data="disposalItem"
        highlight-current-row
        v-loading="loading"
        tooltip-effect="dark"
        style="width: 100%;"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>

        <el-table-column prop="name" label="检查项目" width="250"></el-table-column>

        <el-table-column prop="unit" label="规格" width="120"></el-table-column>

        <el-table-column prop="number" label="数量" width="120"></el-table-column>

        <el-table-column prop="status" label="执行状态" min-width="120"></el-table-column>

        <el-table-column label="操作">
          <template scope="scope">
            <el-button type="info" size="small" @click="handleEdit(scope.$index, scope.row)">结果录入</el-button>
            <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">取消执行</el-button>
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
        <el-form :model="paymentForm">
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
              <el-button @click="dialogFormVisible = false" style="float: right; margin-left:15px">取 消</el-button>
              <el-button type="primary" @click="dialogClick" style="float: right">确 认</el-button>
            </el-row>
          </el-form-item>
        </el-form>
      </el-dialog>
    </template>
  </section>
</template>
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
      disposalItem: [],
      multipleSelection: null,
      dialogFormVisible: false
    };
  },
  methods: {
    getDisposal() {
      this.loading = true;

      setTimeout(() => {
        this.disposalItem = [
          {
            name: "小清创缝合",
            unit: "次",
            number: 1,
            status: "未执行"
          },
          {
            name: "洗胃",
            unit: "次",
            number: 1,
            status: "未执行"
          }
        ];

        this.patientMedicalRecord.name = "小明";
        this.patientMedicalRecord.sex = "男";
        this.patientMedicalRecord.age = 20;
        this.patientMedicalRecord.medicalRecord_id = this.filters.medicalRecord_id;

        this.$message({
          message: "已获取处置项目信息",
          type: "success"
        });
        this.loading = false;
      }, 1500);
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    execute() {
      this.$confirm("请确认是否执行处置?", "提示", {
        type: "warning"
      }).then(() => {
        this.multipleSelection.forEach(item => {
          item.status = "已执行";
        });
        this.$refs.multipleTable.clearSelection();
        this.$message({
          message: "确认执行处置项目",
          type: "success"
        });
      });
    },

    handleDel: function(index, row) {
      if (row.status != "取消执行") {
        this.$confirm("请确认是否取消执行?", "提示", {
          type: "warning"
        }).then(() => {
          row.status = "取消执行";
          this.$message({
            message: "取消执行成功成功",
            type: "success"
          });
        });
      } else {
        this.$message({
          message: "该处置项目已取消执行",
          type: "warning"
        });
      }
    },

    handleEdit: function(index, row) {
      this.dialogFormVisible = true;
    },

    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    dialogClick() {
      this.dialogFormVisible = false;
      this.$message({
        message: "录入成功",
        type: "success"
      });
    }
  }
};
</script>
