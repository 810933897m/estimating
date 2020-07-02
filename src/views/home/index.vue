<template>

  <div class="app-container">
      
  </div>
</template>
<script>
import request from "@/utils/request";
// import check from "@/views/shopAdministration/checkClerk"
import map from '@/utils/city';
export default {
    data() {
      return {
          wind: 'NO',
      }
    },
    // beforeRouteEnter(to, from, next) {
    //     console.log(from)
    //     next()
    //     if(from.path == '/login'){
    //       console.log("okokokok")
    //       setTimeout(function(){
    //        location.reload();
    //       },300)
    //     }else{
    //       console.log("nonono")
    //     }
    // },
    created() {
        // console.log(window.history.length)
    },
     mounted () {
      //第一种方法
      // if(window.name == ""){
      // console.log("首次被加载");
      // window.name = "isReload";  // 在首次进入页面时我们可以给window.name设置一个固定值 
      // }else if(window.name == "isReload"){
      // console.log("页面被刷新");
      // }
      //第二种方法

      // if (window.performance.navigation.type == 1) {

      // }else{
      //   setTimeout(function(){
      //      location.reload();
      //     },2000)
      // }  
    },
    methods: {

  }
}
</script>
<style lang="less">
  
</style>