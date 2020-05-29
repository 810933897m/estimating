<template>
  <div id="app">
    <!-- <router-view/> -->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <!-- <lg-preview></lg-preview> -->
  </div>
</template>

<script>
import axios from "axios";
import request from "./utils/request";
  export default {
    name: 'App',
    data() {
        return {
            lTime: new Date().getTime(), // 最后一次点击的时间
            cTime: new Date().getTime(), //当前时间
            // tOut: 20 * 1000, //超时时间20秒
            tOut: 30 * 60 * 1000, //超时时间30min
            pathList: [],
            te: null
        };
    },
    // 侧边栏菜单
    created() {
        // this.pathList = this.$store.state.user.pathList.map(item => item.path);
        // // console.log(this.pathList);
        // if (this.pathList.length <= 0) {
        //     // console.log(123);
        //     this.rou();
        // }
        // const token = localStorage.getItem("token");
        // // console.log('token:'+token)
        // if (token) {
        //     this.te = setInterval(this.tTime, 300000);
        // }
    },
    method:{
      // rou() {
      //       let admin = localStorage.getItem("role");
      //       request.post("/admin/project/get").then(res => {
      //           if (res.code === 200) {
      //               console.log(res.data);
      //               this.pathList = res.data;
      //               this.$store.commit("SER_PATH_LIST", res.data);
      //           }
      //       });
      //   }
    },
  }
</script>

<style>
.el-form-item__content {
    line-height: 40px;
    position: static;
    font-size: 14px;
}
.preview figure {
  float: left;
  width: 22%;
  margin: 1.5%;
}

.preview figure img {
  width: 200px;
}
img{
  width: 100%;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
