<template>
  <section>
    <div class="components-container">
      <el-row class="toolbar">
        <el-form :inline="true" :model="filters">
          <el-form-item>
            <el-input v-model="filters.name" placeholder="请输入项目名称"></el-input>
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
      >
        <el-table-column type="index"></el-table-column>

        <el-table-column prop="number" label="项目编码"></el-table-column>

        <el-table-column prop="name" label="项目名称"></el-table-column>

        <el-table-column prop="unit" label="规格"></el-table-column>

        <el-table-column prop="price" label="单价"></el-table-column>

        <el-table-column prop="department" label="执行科目"></el-table-column>

        <el-table-column prop="type" label="执行类型"></el-table-column>

        <el-table-column label="操作"  align="center">
          <template scope="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 编辑界面 -->
      <el-dialog
        title="编辑"
        :visible.sync="editFormVisible"
        :close-on-click-modal="false"
        width="550px"
      >
        <el-form :model="editForm" label-width="80px" ref="editForm">
          <el-form-item label="项目编码" prop="number">
            <el-input v-model="editForm.number" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="项目名称">
            <el-input v-model="editForm.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="规格">
            <el-select v-model="editForm.unit" placeholder="请选择">
              <el-option
                v-for="item in unitOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="单价">
            <el-input v-model="editForm.price" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="执行科目">
            <el-select v-model="editForm.department" placeholder="请选择">
              <el-option
                v-for="item in departmentOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="项目类型">
            <el-select v-model="editForm.type" placeholder="请选择">
              <el-option
                v-for="item in typeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="editFormVisible = false">取消</el-button>
          <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
        </div>
      </el-dialog>

      <!-- 新增界面 -->
      <el-dialog
        title="新增医技项目"
        :visible.sync="addFormVisible"
        :close-on-click-modal="false"
        width="550px"
      >
        <el-form :model="addForm" label-width="80px" ref="addForm">
          <el-form-item label="项目编码" prop="number">
            <el-input v-model="addForm.number" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="项目名称">
            <el-input v-model="addForm.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="规格">
            <el-select v-model="addForm.unit" placeholder="请选择">
              <el-option
                v-for="item in unitOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="单价">
            <el-input v-model="addForm.price" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="执行科目">
            <el-select v-model="addForm.department" placeholder="请选择">
              <el-option
                v-for="item in departmentOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="项目类型">
            <el-select v-model="addForm.type" placeholder="请选择">
              <el-option
                v-for="item in typeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
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
  min-height: calc(100vh - 110px);
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
  min-height: 80vh;
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
      multipleSelection: null,
      unitOptions: [
        {
          value: "日",
          label: "日"
        },
        {
          value: "次",
          label: "次"
        },
        {
          value: "每个部位",
          label: "每个部位"
        },
        {
          value: "小时",
          label: "小时"
        },
        {
          value: "半小时",
          label: "半小时"
        }
      ],

      departmentOptions: [
        {
          value: "护理科",
          label: "护理科"
        },
        {
          value: "放射科",
          label: "放射科"
        },
        {
          value: "检验科",
          label: "检验科"
        }
      ],

      typeOptions: [
        {
          value: "检查",
          label: "检查"
        },
        {
          value: "处置",
          label: "处置"
        },
        {
          value: "检验",
          label: "检验"
        }
      ],

      //编辑界面
      editFormVisible: false,
      editLoading: false,
      editForm: {
        number: "",
        name: "",
        unit: "",
        price: 0,
        department: "",
        type: ""
      },

      //新增界面
      addFormVisible: false,
      addLoading: false,
      addForm: {
        number: "",
        name: "",
        unit: "",
        price: 0,
        department: "",
        type: ""
      }
    };
  },

  created() {
    this.itemTable = [
      {
        number: 120200001,
        name: "大抢救",
        unit: "日",
        price: 200.0,
        department: "护理科",
        type: "处置"
      },
      {
        number: 120200002,
        name: "中抢救",
        unit: "日",
        price: 150.0,
        department: "护理科",
        type: "处置"
      },
      {
        number: 120200003,
        name: "小抢救",
        unit: "日",
        price: 80.0,
        department: "护理科",
        type: "处置"
      },
      {
        number: 120300001,
        name: "中心吸氧",
        unit: "小时",
        price: 2.5,
        department: "护理科",
        type: "处置"
      },
      {
        number: 120300002,
        name: "低流量吸氧",
        unit: "小时",
        price: 2.0,
        department: "护理科",
        type: "处置"
      },
      {
        number: 210101001,
        name: "普通透视",
        unit: "每个部位",
        price: 5.0,
        department: "放射科",
        type: "检查"
      },
      {
        number: 210101002,
        name: "食管钡餐透视",
        unit: "次",
        price: 15.0,
        department: "放射科",
        type: "检查"
      },
      {
        number: 210101003,
        name: "床旁透视透视与术中透视",
        unit: "半小时",
        price: 40.0,
        department: "放射科",
        type: "检查"
      },
      {
        number: 210103018,
        name: "X浆肾素活性测定",
        unit: "次",
        price: 80.0,
        department: "检验科",
        type: "检验"
      },
      {
        number: 210103020,
        name: "促红细胞生成素测定",
        unit: "次",
        price: 50.0,
        department: "检验科",
        type: "检验"
      },
      {
        number: 210103021,
        name: "睾酮测定",
        unit: "次",
        price: 80.0,
        department: "检验科",
        type: "检验"
      }
    ];
  },

  methods: {
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
            message: "无此医技项目",
            type: "error"
          });
        }
      }, 1500);
    },

    //删除
    handleDelete: function(index, row) {
      this.$confirm("确认删除该项目吗?", "提示", {
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
              if (item.number == this.editForm.number) {
                item.number = this.editForm.number;
                item.name = this.editForm.name;
                item.unit = this.editForm.unit;
                item.price = this.editForm.price;
                item.department = this.editForm.department;
                item.type = this.editForm.type;
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
    }
  }
};
</script>