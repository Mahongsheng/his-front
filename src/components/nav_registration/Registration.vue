<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <h1 class="el-icon-paperclip" style="font-weight: bold;" disabled> 门诊挂号</h1>
    </div>
    <el-form label-position="right" :model="form" :rules="rules" ref="form" label-width="90px" class="demo-ruleForm">
      <el-row>
        <el-col :span="8">
          <el-form-item label="病历号" prop="medicalRecord">
            <el-input v-model="form.medicalRecord" placeholder="病历号" @change="getPatientInfo(form.medicalRecord)"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="form.name" placeholder="姓名"></el-input>
          </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <el-form-item label="性别" prop="sex">
            <el-select v-model="form.sex" placeholder="性别">
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="出生日期" prop="birth">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.birth" style="width: 100%;" value-format="yyyy-MM-dd"
              format="yyyy-MM-dd" @change="setAge(form.birth)"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="年龄" prop="age">
            <el-input v-model="form.age" placeholder="年龄"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="身份证号" prop="idNumber">
            <el-input v-model="form.idNumber" placeholder="身份证号"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item label="住址">
            <el-input v-model="form.address" placeholder="住址"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="看诊日期" prop="date">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.date" style="width: 100%;" value-format="yyyy-MM-dd"
              format="yyyy-MM-dd" @change="checkRegistDate"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="科室" prop="department">
            <el-select v-model="form.department" placeholder="科室">
              <el-option v-for="(item, index) in departmentList" :value="item.id" :label="item.name" :key="index"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item label="号别" prop="registeredLevel">
            <el-select v-model="form.registeredLevel" placeholder="号别" @change="setMoney(form.registeredLevel)">
              <el-option v-for="(item, index) in registeredLevelList" :value="item.id" :label="item.level" :key="index"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="看诊医生" prop="doctor">
            <el-select v-model="form.doctor" placeholder="看诊医生">
              <el-option v-for="(item, index) in doctorList" :value="item.doctor_id" :label="item.doctor" :key="index"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="应收金额" prop="money">
            <el-input v-model="form.money" placeholder="应收金额"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">挂号</el-button>
        <el-button @click="resetForm('form')">清空</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
  import axios from "axios";
  import qs from "qs";

  export default {
    data() {
      return {
        registeredLevelList: [{
          id: 1,
          level: '普通号',
          fee: 8
        }, {
          id: 2,
          level: '专家号',
          fee: 15
        }],
        departmentList: [{
          id: 1,
          name: '心血管内科'
        }, {
          id: 2,
          name: '外科'
        }, {
          id: 3,
          name: '儿科'
        }, {
          id: 4,
          name: '眼科'
        }],
        doctorList: [{
          doctor_id: 1,
          doctor: '张医生'
        }, {
          doctor_id: 2,
          doctor: '李医生'
        }],
        havePatient: false,
        form: {
          medicalRecord: '',
          name: '',
          sex: '',
          age: '',
          birth: '',
          idNumber: '',
          address: '',
          registeredLevel: '',
          date: '',
          department: '',
          doctor: '',
          money: ''
        },
        rules: {
          medicalRecord: [{
            required: true,
            message: '请输入病历号',
            trigger: 'blur'
          }],
          name: [{
            required: true,
            message: '请输入姓名',
            trigger: 'blur'
          }, ],
          sex: [{
            required: true,
            message: '请选择性别',
            trigger: 'change'
          }],
          age: [{
            required: true,
            message: '请输入年龄',
            trigger: 'blur'
          }, ],
          birth: [{
            type: 'string',
            required: true,
            message: '请选择您的出生日期',
            trigger: 'blur'
          }],
          date: [{
            type: 'string',
            required: true,
            message: '请选择看诊日期',
            trigger: 'blur'
          }],
          department: [{
            required: true,
            message: '请选择挂号科室',
            trigger: 'blur'
          }],
          registeredLevel: [{
            required: true,
            message: '请选择号别',
            trigger: 'blur'
          }],
          doctor: [{
            required: true,
            message: '请选择看诊医生',
            trigger: 'blur'
          }]
        }
      };
    },
    created: function() {
      this.form.medicalRecord = 6100000;
    },
    methods: {
      getPatientInfo(medicalID){
        this.form.name = "刘大力";
        this.form.sex = "男";
        this.form.birth = "1980-03-01";
        this.form.age = "40";
        this.form.address = "辽宁省沈阳市";
        this.form.idNumber = "211202198003018888";
      },
      /*提交挂号*/
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            /*看是否是第一次挂号，两种挂号方式接口不同*/
            this.$message({
              message: '挂号成功！',
              type: 'success'
            });
            this.$refs[formName].resetFields();
            this.form.medicalRecord++;
          } else {
            this.$message.error('请检查挂号信息是否正确！');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      /*获取挂号级别后自动显示应缴费金额*/
      setMoney(levelId) {
        this.registeredLevelList.forEach(item => {
          if (item.id === levelId) {
            this.form.money = item.fee;
          }
        });
      },
      setAge(birthday) {
        var remindTime = birthday; //自己选择的时间
        var str = remindTime.toString(); // toString
        str = str.replace('/-/g', '/'); //去空格字符等
        var oldTime = new Date(str).getTime(); //装date
        //    进行比较
        if (oldTime > new Date().getTime()) {
          this.$message.error('无效出生日期！');
          this.form.date = "";
        } else {
          var birthYear = birthday.substr(0, 4);
          var hisAge = new Date().getFullYear() - birthYear + 1;
          this.form.age = hisAge;
        }
      },
      checkRegistDate() {
        var remindTime = this.form.date; //自己选择的时间
        var str = remindTime.toString(); // toString
        str = str.replace('/-/g', '/'); //去空格字符等
        var oldTime = new Date(str).getTime(); //装date
        //    进行比较
        if (oldTime <= new Date().getTime()) {
          this.$message.error('无效挂号日期！');
          this.form.date = "";
        }
      }
    }
  }
</script>
<style>
  .el-select {
    display: block;
  }
  ::-webkit-scrollbar{
  display:none;
  }
</style>
