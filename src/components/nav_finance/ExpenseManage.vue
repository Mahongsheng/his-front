<template>
  <section>
    <div class="components-container">
      <el-row class="toolbar">
        <el-form :inline="true" :model="filters">
          <el-form-item>
            <el-input v-model="filters.name" placeholder="请输入费用科目名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" v-on:click="searchItem" icon="el-icon-search">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleAdd" icon="el-icon-circle-plus">新增</el-button>
          </el-form-item>
        </el-form>
      </el-row>

      <el-table
        class="itemTable"
        :data="itemTable"
        highlight-current-row
        v-loading="searchLoading"
        tooltip-effect="dark"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>

        <el-table-column type="index"></el-table-column>

        <el-table-column prop="number" label="费用科目编码" align="center"></el-table-column>

        <el-table-column prop="name" label="费用科目名称" align="center"></el-table-column>

        <el-table-column label="操作" align="center">
          <template scope="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-col :span="24" class="toolbar" style="margin-top: 20px">
        <el-button
          type="danger"
          @click="batchRemove"
          :disabled="this.multipleSelection.length===0"
        >批量删除</el-button>
        <el-pagination
          layout="prev, pager, next"
          @current-change="handleCurrentChange"
          :page-size="10"
          :total="10"
          style="float:right;"
        ></el-pagination>
      </el-col>

      <!-- 编辑界面 -->
      <el-dialog
        title="编辑"
        :visible.sync="editFormVisible"
        :close-on-click-modal="false"
        width="400px"
      >
        <el-form :model="editForm" label-width="100px" ref="editForm">
          <el-form-item label="费用科目编码">
            <el-input v-model="editForm.number" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="费用科目名称">
            <el-input v-model="editForm.name" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="editFormVisible = false">取消</el-button>
          <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
        </div>
      </el-dialog>

      <!-- 新增界面 -->
      <el-dialog
        title="新增费用科目"
        :visible.sync="addFormVisible"
        :close-on-click-modal="false"
        width="400px"
      >
        <el-form :model="addForm" label-width="100px" ref="addForm">
          <el-form-item label="费用科目编码">
            <el-input v-model="addForm.number" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="费用科目名称">
            <el-input v-model="addForm.name" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="addFormVisible = false">取消</el-button>
          <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
        </div>
      </el-dialog>
    </div>
  </section>
</template>

<style scoped>
.components-container {
  /* background-color: #f0f2f5; */
  min-height: calc(100vh - 120px);
}

.toolbar {
  height: 40px;
}

.itemTable {
  margin-top: 25px;
  border-radius: 4px;
  border: 1px solid #e6ebf5;
  background-color: #fff;
  overflow: hidden;
  color: #303133;
  -webkit-transition: 0.3s;
  transition: 0.3s;
  max-height: 75vh;
}
</style>

<script>
export default {
  data() {
    return {
      filters: {
        name: ""
      },
      itemTable: [],
      searchLoading: false,
      item: [],
      multipleSelection: [],
      total: 2,
      page: 1,

      //编辑界面
      editFormVisible: false,
      editLoading: false,
      editFormNumber: 0,
      editForm: {
        number: "",
        name: ""
      },

      //新增界面
      addFormVisible: false,
      addLoading: false,
      addForm: {
        number: "",
        name: ""
      }
    };
  },

  created() {
    this.itemTable = [
      {
        number: "GHF",
        name: "挂号费"
      },
      {
        number: "ZLF",
        name: "诊疗费"
      },
      {
        number: "JYF",
        name: "检验费"
      },
      {
        number: "JYCLF",
        name: "检验材料费"
      },
      {
        number: "MRIJCF",
        name: "MRI检查费"
      },
      {
        number: "MRICLF",
        name: "MRI材料费"
      },
      {
        number: "XYF",
        name: "西药费"
      },
      {
        number: "ZCYF",
        name: "中成药费"
      },
      {
        number: "CZF",
        name: "处置费"
      },
      {
        number: "MZF",
        name: "麻醉费"
      }
    ];
  },

  methods: {
    handleCurrentChange(val) {
      this.page = val;
    },

    //查询
    searchItem() {
      this.searchLoading = true;
      let find = false;

      setTimeout(() => {
        this.itemTable.forEach(item => {
          if (item.name == this.filters.name) {
            this.itemTable = [item];
            find = true;
          }
        });

        this.searchLoading = false;
        if (find) {
          this.$message({
            message: "查询成功",
            type: "success"
          });
        } else {
          this.$message({
            message: "查询失败",
            type: "error"
          });
        }
      }, 1500);
    },

    //删除
    handleDelete: function(index, row) {
      this.$confirm("确认是否删除该费用科目?", "提示", {
        type: "warning"
      }).then(() => {
        this.searchLoading = true;

        setTimeout(() => {
          this.itemTable.splice(index, 1);
          this.searchLoading = false;
          this.$message({
            message: "删除成功",
            type: "success"
          });
        }, 1500);
      });
    },

    //显示编辑界面
    handleEdit: function(index, row) {
      this.editFormVisible = true;
      this.editFormNumber = row.number;
      this.editForm = Object.assign({}, row);
    },

    //显示新增界面
    handleAdd: function() {
      this.addFormVisible = true;
    },

    //编辑
    editSubmit: function() {
      this.$refs.editForm.validate(valid => {
        this.$confirm("确认提交吗？", "提示", {}).then(() => {
          this.editLoading = true;

          setTimeout(() => {
            this.itemTable.forEach(item => {
              if (item.number == this.editFormNumber) {
                item.number = this.editForm.number;
                item.name = this.editForm.name;
              }
            });

            this.editLoading = false;
            this.$message({
              message: "提交成功",
              type: "success"
            });
            this.editFormVisible = false;
          }, 1500);
        });
      });
    },

    //新增
    addSubmit: function() {
      this.$refs.addForm.validate(valid => {
        this.$confirm("确认提交吗？", "提示", {}).then(() => {
          this.addLoading = true;

          setTimeout(() => {
            this.itemTable.push(this.addForm);

            this.addLoading = false;
            this.$message({
              message: "提交成功",
              type: "success"
            });
            this.addFormVisible = false;
            this.$refs["addForm"].resetFields();
          }, 1500);
        });
      });
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    batchRemove: function() {
      this.$confirm("确认是否删除这些费用科目?", "提示", {
        type: "warning"
      }).then(() => {
        this.searchLoading = true;
        setTimeout(() => {
          let tempItem = [];

          this.itemTable.forEach(item => {
            let hasItem = false;
            this.multipleSelection.forEach(sele => {
              if (sele.number == item.number) {
                hasItem = true;
              }
            });

            if (!hasItem) {
              tempItem.push(item);
            }
          });

          this.itemTable = tempItem;
          this.searchLoading = false;
          this.$message({
            message: "删除成功",
            type: "success"
          });
        }, 1500);
      });
    }
  }
};
</script>