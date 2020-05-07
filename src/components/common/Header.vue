<template>
  <div class="header">
    HIS 东软云医院
    <div class="user-info">
      <el-dropdown trigger="click" @command="handleCommand">
                <span class="el-dropdown-link" v-text="user.username"></span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="logout">退出登陆</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        user: {
          username: "",
          permission: ""
        }
      }
    },
    beforeCreate() {
      // document.querySelector('body').setAttribute('style', 'margin = 0;')
    },
    created() {
      this.user.username = sessionStorage.getItem("user");
      this.user.permission = sessionStorage.getItem("permission");
    }
    ,
    methods: {
      handleCommand(command) {
        if (command === 'logout') {
          this.$confirm('确认退出吗?', '提示', {
          }).then(() => {
            sessionStorage.removeItem('user');
            this.$router.push('/login');
            this.$message({
              message: '注销成功！',
              type: 'success'
            });
          })
        }
      }
    }
  }
</script>
<style scoped>
  .header {
    position: relative;
    box-sizing: border-box;
    padding-left: 50px;
    width: 100%;
    height: 70px;
    font-size: 22px;
    line-height: 70px;
    color: #fff;
    background-color: #242f42;
    margin: 0;
  }

  .user-info {
    float: right;
    padding-right: 50px;
    font-size: 16px;
    color: #fff;
  }

  .user-info .el-dropdown-link {
    position: relative;
    display: inline-block;
    padding-left: 50px;
    color: #fff;
    cursor: pointer;
    vertical-align: middle;
  }

  .user-info .user-logo {
    position: absolute;
    left: 0;
    top: 15px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  .el-dropdown-menu__item {
    text-align: center;
  }
</style>
