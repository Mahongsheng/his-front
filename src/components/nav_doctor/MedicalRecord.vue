<template>
  <el-row :gutter="20">
    <el-col :span="6">
      <el-row :gutter="20" style="margin-bottom: 10px">
        <el-tag style="width: 150px">患者选择:</el-tag>
        <el-button icon="el-icon-refresh" style="float: right" circle @click="refreshPatient"></el-button>
      </el-row>
      <el-row :gutter="20">
        <el-tag style="width: 100%">来诊患者</el-tag>
      </el-row>
      <el-row :gutter="20">
        <el-table
          :data="patientNotDiagnose"
          highlight-current-row
          width="100%"
          row-style="height:40px"
          cell-style="padding:0"
          max-height="250px"
          @current-change="handleCurrentChangeNotD"
          v-loading="loading"
        >
          <el-table-column prop="form_id" label="挂号单号" width="143px"></el-table-column>
          <el-table-column prop="name" label="患者姓名" width="143px"></el-table-column>
        </el-table>
      </el-row>
      <el-row :gutter="20" style="margin-top: 20px">
        <el-tag style="width: 100%">已诊患者</el-tag>
      </el-row>
      <el-row :gutter="20">
        <el-table
          :data="patientDiagnosed"
          highlight-current-row
          width="100%"
          row-style="height:40px"
          cell-style="padding:0"
          max-height="250px"
          @current-change="handleCurrentChangeD"
          v-loading="loading"
        >
          <el-table-column prop="form_id" label="挂号单号" width="143px"></el-table-column>
          <el-table-column prop="name" label="患者姓名" width="143px"></el-table-column>
        </el-table>
      </el-row>
    </el-col>
    <el-col :span="17" style="margin-left: 30px">
      <el-row :gutter="20" style="margin-bottom: 10px">
        <el-tag style="width: 330px">
          患者姓名：{{patientMedicalRecord.name}}&nbsp;&nbsp;&nbsp;&nbsp;病历号：{{patientMedicalRecord.medicalRecord_id}}&nbsp;&nbsp;&nbsp;&nbsp;
          年龄：{{patientMedicalRecord.age}}&nbsp;&nbsp;&nbsp;&nbsp;性别：{{patientMedicalRecord.sex}}
        </el-tag>
        <el-button
          type="primary"
          style="float: right"
          @click="diagnose"
          v-if="this.isDiagnosed==false"
        >提交诊断</el-button>
      </el-row>
      <el-tabs type="border-card">
        <el-tab-pane label="病历首页">
          <el-row :gutter="20">
            <el-tag>病史内容:</el-tag>
            <el-form label-width="100px" style="margin-top: 15px">
              <el-form-item label="主诉">
                <el-input type="textarea" v-model="patientMedicalRecord.zs"></el-input>
              </el-form-item>
              <el-form-item label="现病史">
                <el-input type="textarea" v-model="patientMedicalRecord.xbs"></el-input>
              </el-form-item>
              <el-form-item label="现病治疗情况">
                <el-input type="textarea" v-model="patientMedicalRecord.xbzlqk"></el-input>
              </el-form-item>
              <el-form-item label="既往史">
                <el-input type="textarea" v-model="patientMedicalRecord.jws"></el-input>
              </el-form-item>
              <el-form-item label="过敏史">
                <el-input type="textarea" v-model="patientMedicalRecord.gms"></el-input>
              </el-form-item>
              <el-form-item label="体格检查">
                <el-input type="textarea" v-model="patientMedicalRecord.tgjc"></el-input>
              </el-form-item>
            </el-form>
            <el-tag>评估/判断:</el-tag>
            <el-form ref="form" :model="form" label-width="100px" style="margin-top: 15px">
              <el-form-item label="初步诊断">
                <el-input type="textarea" v-model="patientMedicalRecord.cbzd"></el-input>
              </el-form-item>
            </el-form>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="检查申请">
          <el-row :gutter="20">
            <el-row>
              <el-tag>门诊诊断:</el-tag>
              <el-tag
                type="info"
                v-if="this.patientMedicalRecord.cbzd!=null"
              >{{this.patientMedicalRecord.cbzd}}</el-tag>
              <el-button
                type="primary"
                style="float:right;margin-left:10px;margin-right:10px"
                size="small"
                @click="multiDelete_inspection"
              >删除</el-button>
              <el-button
                type="primary"
                style="float:right;margin-left:10px"
                size="small"
                @click="dialogFormVisible_inspection = true"
              >增加</el-button>

              <el-dialog title="添加检查项目" :visible.sync="dialogFormVisible_inspection" width="400px">
                <el-form :model="inspectionForm">
                  <el-form-item label="检查项目：" :label-width="formLabelWidth">
                    <el-select v-model="inspectionForm.id" placeholder="请选择项目">
                      <el-option
                        v-for="(item, index) in inspectionList"
                        :value="item.id"
                        :label="item.name"
                        :key="index"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="数量：" :label-width="formLabelWidth">
                    <el-input v-model="inspectionForm.number" style="width: 50px"></el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisible_inspection = false">取 消</el-button>
                  <el-button type="primary" @click="inspectionFormClick">确 定</el-button>
                </div>
              </el-dialog>
            </el-row>
            <el-row>
              <el-table
                ref="multipleTable"
                :data="inspectionItemList"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange_inspection"
              >
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="name" label="检查项目名称" width="200px"></el-table-column>
                <el-table-column prop="unit" label="规格" width="180px"></el-table-column>
                <el-table-column prop="price" label="单价" width="150px"></el-table-column>
                <el-table-column prop="number" label="数量" width="150px"></el-table-column>
              </el-table>
            </el-row>
            <el-row style="margin-top: 20px">
              <el-tag style="width: 110px">本检查金额合计：</el-tag>
              <el-tag style="width: 70px" type="text">{{this.totalPrice_inspection}} 元</el-tag>
              <el-button
                type="primary"
                style="float: right;margin-right: 20px"
                @click="submit_inspection"
                size="medium"
              >提交检查</el-button>
            </el-row>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="检验申请">
           <el-row :gutter="20">
            <el-row>
              <el-tag>门诊诊断:</el-tag>
              <el-tag
                type="info"
                v-if="this.patientMedicalRecord.cbzd!=null"
              >{{this.patientMedicalRecord.cbzd}}</el-tag>
              <el-button
                type="primary"
                style="float:right;margin-left:10px;margin-right:10px"
                size="small"
                @click="multiDelete_test"
              >删除</el-button>
              <el-button
                type="primary"
                style="float:right;margin-left:10px"
                size="small"
                @click="dialogFormVisible_test = true"
              >增加</el-button>

              <el-dialog title="添加检验项目" :visible.sync="dialogFormVisible_test" width="400px">
                <el-form :model="testForm">
                  <el-form-item label="检验项目：" :label-width="formLabelWidth">
                    <el-select v-model="testForm.id" placeholder="请选择项目">
                      <el-option
                        v-for="(item, index) in testList"
                        :value="item.id"
                        :label="item.name"
                        :key="index"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="数量：" :label-width="formLabelWidth">
                    <el-input v-model="testForm.number" style="width: 50px"></el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisible_test = false">取 消</el-button>
                  <el-button type="primary" @click="testFormClick">确 定</el-button>
                </div>
              </el-dialog>
            </el-row>
            <el-row>
              <el-table
                ref="multipleTable"
                :data="testItemList"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange_test"
              >
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="name" label="检验项目名称" width="200px"></el-table-column>
                <el-table-column prop="unit" label="规格" width="180px"></el-table-column>
                <el-table-column prop="price" label="单价" width="150px"></el-table-column>
                <el-table-column prop="number" label="数量" width="150px"></el-table-column>
              </el-table>
            </el-row>
            <el-row style="margin-top: 20px">
              <el-tag style="width: 110px">本检验金额合计：</el-tag>
              <el-tag style="width: 70px" type="text">{{this.totalPrice_test}} 元</el-tag>
              <el-button
                type="primary"
                style="float: right;margin-right: 20px"
                @click="submit_test"
                size="medium"
              >提交检验</el-button>
            </el-row>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="门诊确诊">门诊确诊</el-tab-pane>
        <el-tab-pane label="处置申请">
           <el-row :gutter="20">
            <el-row>
              <el-tag>门诊诊断:</el-tag>
              <el-tag
                type="info"
                v-if="this.patientMedicalRecord.cbzd!=null"
              >{{this.patientMedicalRecord.cbzd}}</el-tag>
              <el-button
                type="primary"
                style="float:right;margin-left:10px;margin-right:10px"
                size="small"
                @click="multiDelete_disposal"
              >删除</el-button>
              <el-button
                type="primary"
                style="float:right;margin-left:10px"
                size="small"
                @click="dialogFormVisible_disposal = true"
              >增加</el-button>

              <el-dialog title="添加处置项目" :visible.sync="dialogFormVisible_disposal" width="400px">
                <el-form :model="disposalForm">
                  <el-form-item label="处置项目：" :label-width="formLabelWidth">
                    <el-select v-model="disposalForm.id" placeholder="请选择项目">
                      <el-option
                        v-for="(item, index) in disposalList"
                        :value="item.id"
                        :label="item.name"
                        :key="index"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="数量：" :label-width="formLabelWidth">
                    <el-input v-model="disposalForm.number" style="width: 50px"></el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisible_disposal = false">取 消</el-button>
                  <el-button type="primary" @click="disposalFormClick">确 定</el-button>
                </div>
              </el-dialog>
            </el-row>
            <el-row>
              <el-table
                ref="multipleTable"
                :data="disposalItemList"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange_disposal"
              >
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="name" label="处置项目名称" width="200px"></el-table-column>
                <el-table-column prop="unit" label="规格" width="180px"></el-table-column>
                <el-table-column prop="price" label="单价" width="150px"></el-table-column>
                <el-table-column prop="number" label="数量" width="150px"></el-table-column>
              </el-table>
            </el-row>
            <el-row style="margin-top: 20px">
              <el-tag style="width: 110px">本处置金额合计：</el-tag>
              <el-tag style="width: 70px" type="text">{{this.totalPrice_disposal}} 元</el-tag>
              <el-button
                type="primary"
                style="float: right;margin-right: 20px"
                @click="submit_disposal"
                size="medium"
              >提交处置</el-button>
            </el-row>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="成药处方">
          <el-row :gutter="20">
            <el-row>
              <el-tag>门诊诊断:</el-tag>
              <el-tag
                type="info"
                v-if="this.patientMedicalRecord.cbzd!=null"
              >{{this.patientMedicalRecord.cbzd}}</el-tag>
              <el-button
                type="primary"
                style="float:right;margin-left:10px;margin-right:10px"
                size="small"
                @click="multiDelete"
              >删药</el-button>
              <el-button
                type="primary"
                style="float:right;margin-left:10px"
                size="small"
                @click="dialogFormVisible = true"
              >增药</el-button>
              <!--点击增药按钮，弹出对话框-->
              <el-dialog title="添加药品" :visible.sync="dialogFormVisible" width="400px">
                <el-form :model="drugForm">
                  <el-form-item label="药品名称：" :label-width="formLabelWidth">
                    <el-select v-model="drugForm.drug_id" placeholder="请选择药品">
                      <el-option
                        v-for="(item, index) in medicineList"
                        :value="item.drug_id"
                        :label="item.name"
                        :key="index"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="药品数量：" :label-width="formLabelWidth">
                    <el-input v-model="drugForm.number" style="width: 50px"></el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="drugFormClick">确 定</el-button>
                </div>
              </el-dialog>
            </el-row>
            <el-row>
              <el-table
                ref="multipleTable"
                :data="prescriptionList"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange"
              >
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="name" label="药品名称" width="200px"></el-table-column>
                <el-table-column prop="unit" label="规格" width="180px"></el-table-column>
                <el-table-column prop="price" label="单价" width="150px"></el-table-column>
                <el-table-column prop="number" label="数量" width="150px"></el-table-column>
              </el-table>
            </el-row>
            <el-row style="margin-top: 20px">
              <el-tag style="width: 110px">本处方金额合计：</el-tag>
              <el-tag style="width: 70px" type="text">{{this.totalPrice}} 元</el-tag>
              <el-button
                type="primary"
                style="float: right;margin-right: 20px"
                @click="prescribe"
                size="medium"
              >提交处方</el-button>
            </el-row>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="草药处方">草药处方</el-tab-pane>
        <el-tab-pane label="费用查询">费用查询</el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>
</template>
<script>

export default {
  data() {
    return {
      filter: {
        doctor_id: ""
      },
      patientNotDiagnose: [],
      patientDiagnosed: [],
      currentRow: null,
      patientMedicalRecord: {
        registrationForm_id: "",
        medicalRecord_id: "",
        patient_id: "",
        name: "",
        sex: "",
        age: "",
        zs: "",
        xbs: "",
        xbzlqk: "",
        jws: "",
        gms: "",
        tgjc: "",
        cbzd: ""
      },
      isDiagnosed: false,
      loading: false,
      medicineList: [],
      inspectionList: [],
      testList: [],
      disposalList: [],
      prescriptionList: [],
      inspectionItemList: [],
      testItemList: [],
      disposalItemList: [],
      drugForm: {
        drug_id: "",
        name: "",
        unit: "",
        price: "",
        number: 1
      },
      inspectionForm: {
        id: "",
        name: "",
        unit: "",
        price: "",
        number: 1
      },
      testForm: {
        drug_id: "",
        name: "",
        unit: "",
        price: "",
        number: 1
      },
      disposalForm: {
        drug_id: "",
        name: "",
        unit: "",
        price: "",
        number: 1
      },
      dialogFormVisible: false,
      dialogFormVisible_inspection: false,
      dialogFormVisible_test: false,
      dialogFormVisible_disposal: false,
      formLabelWidth: "100px",
      drugMultipleSelection: [],
      inspectionMultipleSelection: [],
      testMultipleSelection: [],
      disposalMultipleSelection: [],
      totalPrice: 0,
      totalPrice_inspection: 0,
      totalPrice_test: 0,
      totalPrice_disposal: 0
    };
  },
  created() {
    /*页面创建时获取未诊、待诊患者数据，获取药品信息*/
    this.getDoctorId();
    this.getMedicineInfo();
    this.getInspectionInfo();
    this.getTestInfo();
    this.getDisposalInfo();
    this.refreshPatient();
  },

  methods: {
    getDoctorId() {
      this.filter.doctor_id = sessionStorage.getItem("user_id");
    },

    /*获取来诊患者数据*/
    findPatientNotDiagnose() {
      this.patientNotDiagnose = [
        { form_id: 3, name: "小明", patient_id: 1, sex: "男", age: "20" }
      ];
    },

    /*获取已诊患者数据*/
    findPatientDiagnosed() {
      this.patientDiagnosed = [
        {
          form_id: 1,
          name: "患者1",
          patient_id: 2,
          sex: "女",
          age: "21",
          patientMedicalRecord: {}
        },
        {
          form_id: 2,
          name: "患者2",
          patient_id: 2,
          sex: "女",
          age: "18",
          patientMedicalRecord: {}
        }
      ];
    },

    /*刷新患者数据*/
    refreshPatient() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.findPatientNotDiagnose();
        this.findPatientDiagnosed();
        this.$message({
          message: "刷新成功！",
          type: "success"
        });
      }, 1500);
    },

    /*获取未诊患者表点击“行”数据*/
    handleCurrentChangeNotD(val) {
      this.currentRow = val;
      this.isDiagnosed = false;
      this.patientMedicalRecord.registrationForm_id = this.currentRow.form_id;
      this.findPatientMedicalRecord();
    },

    /*获取已诊患者表点击“行”数据*/
    handleCurrentChangeD(val) {
      this.currentRow = val;
      this.isDiagnosed = true;
      this.patientDiagnosed.forEach(item => {
        if (this.currentRow.patient_id === item.patient_id) {
          this.patientMedicalRecord = item.patientMedicalRecord;
        }
      });
      this.findPatientMedicalRecord();
    },

    /*获取病人病历单信息*/
    findPatientMedicalRecord() {
      this.patientMedicalRecord.medicalRecord_id = 1;
      this.patientMedicalRecord.patient_id = this.currentRow.patient_id;
      this.patientMedicalRecord.name = this.currentRow.name;
      this.patientMedicalRecord.sex = this.currentRow.sex;
      this.patientMedicalRecord.age = this.currentRow.age;
    },

    /*诊断*/
    diagnose() {
      this.$confirm("请确认是否提交诊断信息", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$message({
          message: "添加诊断成功！",
          type: "success"
        });
        this.loading = true;
        setTimeout(() => {
          this.patientNotDiagnose = [];
          this.patientDiagnosed.push({
            form_id: 3,
            name: this.currentRow.name,
            patient_id: this.currentRow.patient_id,
            sex: this.currentRow.sex,
            age: this.currentRow.age,
            patientMedicalRecord: this.patientMedicalRecord
          });
          this.loading = false;
          this.$message({
            message: "刷新成功！",
            type: "success"
          });
        }, 1500);

        this.$refs[this.patientMedicalRecord].resetFields();
      });
    },

    /*获取药品信息*/
    getMedicineInfo() {
      this.medicineList = [
        {
          drug_id: 1,
          name: "蒲地蓝消炎口服液",
          unit: "10.00ml*12支/盒",
          price: 40.2
        },
        { drug_id: 2, name: "六味地黄丸", unit: "0.18g*120丸/盒", price: 19.8 },
        {
          drug_id: 3,
          name: "脑心通胶囊",
          unit: "15mg*18粒*2板/盒",
          price: 30.3
        },
        {
          drug_id: 4,
          name: "奥美拉唑胶囊",
          unit: "20mg*18粒*2板/盒",
          price: 17
        },
        {
          drug_id: 5,
          name: "云南白药胶囊",
          unit: "25mg*16粒*2板/盒",
          price: 20.5
        },
        {
          drug_id: 6,
          name: "阿司匹林片",
          unit: "20mg*16粒*2板/盒",
          price: 7.5
        },
        {
          drug_id: 7,
          name: "头孢拉定胶囊",
          unit: "20mg*20粒*2板/盒",
          price: 7.7
        },
        { drug_id: 8, name: "六神丸", unit: "30mg*10粒*6支/盒", price: 25 }
      ];
    },

    getInspectionInfo() {
      this.inspectionList = [
        {
          id: 1,
          name: "普通透视",
          unit: "每个部位",
          price: 100
        },
        { id: 2, name: "气脑造影", unit: "次", price: 200 },
        {
          id: 3,
          name: "脑室碘水造影",
          unit: "次",
          price: 300
        }
      ];
    },

    getTestInfo() {
      this.testList = [
        {
          id: 1,
          name: "糖化X红蛋白测定（色谱法）",
          unit: "次",
          price: 100
        },
        { id: 2, name: "葡萄糖测定（干化X法）(X清)", unit: "次", price: 200 },
        {
          id: 3,
          name: "唐氏综合症筛查",
          unit: "单侧",
          price: 300
        }
      ];
    },

    getDisposalInfo() {
      this.disposalList = [
        {
          id: 1,
          name: "小清创缝合",
          unit: "次",
          price: 100
        },
        { id: 2, name: "洗胃", unit: "次", price: 200 }
      ];
    },

    /*点击药品添加表单确认事件*/
    drugFormClick() {
      this.dialogFormVisible = false;
      this.medicineList.forEach(item => {
        if (this.drugForm.drug_id === item.drug_id) {
          this.drugForm.name = item.name;
          this.drugForm.price = item.price;
          this.drugForm.unit = item.unit;
          this.totalPrice += item.price * this.drugForm.number;
        }
      });
      this.prescriptionList.push(this.drugForm);
      this.drugForm = {
        drug_id: "",
        name: "",
        unit: "",
        price: "",
        number: ""
      };
      this.$message({
        message: "添加成功！",
        type: "success"
      });
    },

    inspectionFormClick() {
      this.dialogFormVisible_inspection = false;
      this.inspectionList.forEach(item => {
        if (this.inspectionForm.id === item.id) {
          this.inspectionForm.name = item.name;
          this.inspectionForm.price = item.price;
          this.inspectionForm.unit = item.unit;
          this.totalPrice_inspection += item.price * this.inspectionForm.number;
        }
      });
      this.inspectionItemList.push(this.inspectionForm);
      this.inspectionForm = {
        id: "",
        name: "",
        unit: "",
        price: "",
        number: ""
      };
      this.$message({
        message: "添加成功！",
        type: "success"
      });
    },

    testFormClick() {
      this.dialogFormVisible_test = false;
      this.testList.forEach(item => {
        if (this.testForm.id === item.id) {
          this.testForm.name = item.name;
          this.testForm.price = item.price;
          this.testForm.unit = item.unit;
          this.totalPrice_test += item.price * this.testForm.number;
        }
      });
      this.testItemList.push(this.testForm);
      this.testForm = {
        id: "",
        name: "",
        unit: "",
        price: "",
        number: ""
      };
      this.$message({
        message: "添加成功！",
        type: "success"
      });
    },

    disposalFormClick() {
      this.dialogFormVisible_disposal = false;
      this.disposalList.forEach(item => {
        if (this.disposalForm.id === item.id) {
          this.disposalForm.name = item.name;
          this.disposalForm.price = item.price;
          this.disposalForm.unit = item.unit;
          this.totalPrice_disposal += item.price * this.disposalForm.number;
        }
      });
      this.disposalItemList.push(this.disposalForm);
      this.disposalForm = {
        id: "",
        name: "",
        unit: "",
        price: "",
        number: ""
      };
      this.$message({
        message: "添加成功！",
        type: "success"
      });
    },

    /*药品表多选*/
    handleSelectionChange(val) {
      this.drugMultipleSelection = val;
    },

    handleSelectionChange_inspection(val) {
      this.inspectionMultipleSelection = val;
    },

    handleSelectionChange_test(val) {
      this.testMultipleSelection = val;
    },

    handleSelectionChange_disposal(val) {
      this.disposalMultipleSelection = val;
    },

    multiDelete() {
      let newArr = [];
      this.totalPrice = 0;

      this.prescriptionList.forEach(item => {
        let flag = false;
        this.drugMultipleSelection.forEach(delItem => {
          if (item.drug_id === delItem.drug_id) {
            flag = true;
          }
        });
        if (flag === false) {
          newArr.push(item);
          this.totalPrice += item.price * item.number;
        }
        flag = false;
      });
      this.prescriptionList = newArr;
      this.$message.error("删除成功！");
    },

    multiDelete_inspection() {
      let newArr = [];
      this.totalPrice_inspection = 0;

      this.inspectionItemList.forEach(item => {
        let flag = false;
        this.inspectionMultipleSelection.forEach(delItem => {
          if (item.id === delItem.id) {
            flag = true;
          }
        });
        if (flag === false) {
          newArr.push(item);
          this.totalPrice_inspection += item.price * item.number;
        }
        flag = false;
      });
      this.inspectionItemList = newArr;
      this.$message.error("删除成功！");
    },

    multiDelete_test() {
      let newArr = [];
      this.totalPrice_test = 0;

      this.testItemList.forEach(item => {
        let flag = false;
        this.testMultipleSelection.forEach(delItem => {
          if (item.id === delItem.id) {
            flag = true;
          }
        });
        if (flag === false) {
          newArr.push(item);
          this.totalPrice_test += item.price * item.number;
        }
        flag = false;
      });
      this.testItemList = newArr;
      this.$message.error("删除成功！");
    },

    multiDelete_disposal() {
      let newArr = [];
      this.totalPrice_disposal = 0;

      this.disposalItemList.forEach(item => {
        let flag = false;
        this.disposalMultipleSelection.forEach(delItem => {
          if (item.id === delItem.id) {
            flag = true;
          }
        });
        if (flag === false) {
          newArr.push(item);
          this.totalPrice_disposal += item.price * item.number;
        }
        flag = false;
      });
      this.disposalItemList = newArr;
      this.$message.error("删除成功！");
    },

    /*开处方*/
    prescribe() {
      this.$confirm("请确认是否提交处方信息", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.prescriptionList = [];
        this.$message({
          message: "提交成功！",
          type: "success"
        });
      });
    },

    submit_inspection() {
      this.$confirm("请确认是否提交检查项目信息", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.inspectionItemList = [];
        this.$message({
          message: "提交成功！",
          type: "success"
        });
      });
    },
    submit_test() {
      this.$confirm("请确认是否提交检验项目信息", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.testItemList = [];
        this.$message({
          message: "提交成功！",
          type: "success"
        });
      });
    },
    submit_disposal() {
      this.$confirm("请确认是否提交处置项目信息", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.disposalItemList = [];
        this.$message({
          message: "提交成功！",
          type: "success"
        });
      });
    }
  }
};
</script>
