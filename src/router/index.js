import Vue from 'vue'
import Router from 'vue-router'
import Home_admin from "../components/common/admin/Home-admin";
import Login from "../components/page/Login";
import Registration from "../components/nav_registration/Registration";
import Back_registration from "../components/nav_registration/Back_registration";
import Pay from "../components/nav_registration/Pay";
import Refund from "../components/nav_registration/Refund";
import MedicalRecord from "../components/nav_doctor/MedicalRecord";
import DispenseDrug from "../components/nav_pharmacy/DispenseDrug";
import ReturnDrug from "../components/nav_pharmacy/ReturnDrug";
import Inspection from "../components/nav_technician/Inspection";
import Test from "../components/nav_technician/Test";
import Disposal from "../components/nav_technician/Disposal";
<<<<<<< HEAD
import Settlement from "../components/nav_registration/Settlement";
import Settlement_history from "../components/nav_registration/Settlement_history";
=======
import Settlement from "../components/nav_registration/Settlement.vue";
import Settlement_history from "../components/nav_registration/Settlement_history.vue";
import FareCheck from "../components/nav_registration/FareCheck"
>>>>>>> 9b39d86c910b43dd7135751a25c747fdaa556260

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login',
      component: Login,
      meta:{
        title: "HIS东软云医院"
      }
    },
    {
      path: '/login',
      component: Login,
      meta:{
        title: "HIS东软云医院"
      }
    },
    {
      path: '/home-admin',
      component: Home_admin,
      children: [
        {
          path: '/home-admin/registration',
          component: Registration,
          meta:{
            title: "HIS东软云医院"
          }
        },
        {
          path: '/home-admin/back_registration',
          component: Back_registration,
          meta:{
            title: "HIS东软云医院"
          }
        },
        {
          path: '/home-admin/pay',
          component: Pay,
          meta:{
            title: "HIS东软云医院"
          }
        },
        {
          path: '/home-admin/refund',
          component: Refund,
          meta:{
            title: "HIS东软云医院"
          }
        },
        {
          path: '/home-admin/medicalRecord',
          component: MedicalRecord,
          meta:{
            title: "HIS东软云医院"
          }
        },
        {
          path: '/home-admin/dispenseDrug',
          component: DispenseDrug,
          meta:{
            title: "HIS东软云医院"
          }
        },
        {
          path: '/home-admin/returnDrug',
          component: ReturnDrug,
          meta:{
            title: "HIS东软云医院"
          }
        },
        {
          path: '/home-admin/inspection',
          component: Inspection,
          meta:{
            title: "HIS东软云医院"
          }
        },
        {
          path: '/home-admin/test',
          component: Test,
          meta:{
            title: "HIS东软云医院"
          }
        },
        {
          path: '/home-admin/disposal',
          component: Disposal,
          meta:{
            title: "HIS东软云医院"
          }
        },
         {
           path: '/home-admin/settlement',
           component: Settlement,
           meta:{
             title:"HIS东软云医院"
           }
         },
         {
           path: '/home-admin/settlement_history',
           component: Settlement_history,
           meta:{
             title:"HIS东软云医院"
           }
         },
<<<<<<< HEAD
=======
        {
          path: '/home-admin/fareCheck',
          component: FareCheck,
          meta:{
            title: "HIS东软云医院"
          }
        },


>>>>>>> 9b39d86c910b43dd7135751a25c747fdaa556260
      ]
    }
  ]
})
