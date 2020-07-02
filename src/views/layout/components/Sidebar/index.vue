<template>
  <scroll-bar>
    <el-menu
      mode="vertical"
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
    >
      <sidebar-item :routes="routes"></sidebar-item>
    </el-menu>
  </scroll-bar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import ScrollBar from '@/components/ScrollBar'
import request from "@/utils/request";

export default {
  data(){
    return{
      ss :2,
      menuList : [],
      arr:['home','/administrators','userList','roleList',"/inquiryManagement",'inquiry',"projectInitiation",'/fieldManagement','seal','printing'],
    }
  },
  components: { SidebarItem, ScrollBar },
  created(){
      this.routes1();
      this.menuList = []
  },
  methods:{
    routes1(){
      // console.log(this.$router.options.routes)
      localStorage.setItem("pathList",this.$router.options.routes)
      // return this.$router.options.routes
    }
  },
  
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes() {
      // request.post("/admin/access/menu").then(res => { 
      //       // console.log(res)
      //       if (res.code == 200) {

      //         this.menuList = res.data.list;
      //         console.log(this.menuList)
      //         // menuList.JSON.string(menuList)
      //         localStorage.setItem('user_id',res.data.user.id)
              

      //         this.$router.options.routes.forEach(element => {
      //             element.hidden = !this.menuList.includes(element.path)
      //             if(element.children){
      //                 element.children.forEach(element1 => {
      //                     element1.hidden = !this.menuList.includes(element1.path)
      //                 });
      //             }
      //         });
              
      //         console.log('1234')
      //         console.log(this.$router.options.routes)
      //         // this.$router.options.routes[2].path = '2124'
              
      //         localStorage.setItem("pathList",this.$router.options.routes)
      //       }
      //   });

        
      
      // console.log(this.$router.options.routes)
      return this.$router.options.routes
      // return JSON.parse(sessionStorage.getItem('route1'))
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
