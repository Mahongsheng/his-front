<template>
    <div class="wrapper">
      <v-head></v-head>
      <el-container class="container">
        <el-aside width="220px"><v-sidebar></v-sidebar></el-aside>
        <el-main><router-view/></el-main>
      </el-container>
    </div>
</template>

<script>
    import vHead from '../Header.vue';
    import vSidebar from './Sidebar-operator.vue';
    export default {
        components:{
            vHead, vSidebar
        },
        created() {
        }
    }
</script>
