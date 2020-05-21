<template>
<div class="app-container">
  <el-form ref="form" label-width="120px">
    <!-- *************月度上传************* -->
    <el-form-item label="激励计划导入：" prop="coverFile">
      <el-upload
      class="upload-demo"
      ref="upload"
      accept=".xlsx,.xls,.csv,.pdf"
      :http-request="excelFile"
      :with-credentials="true"
      :auto-upload="true"
      action=""
      list-type="list"
      :file-list="fileList">
        <el-button slot="trigger" type="primary">导入计划</el-button>
      </el-upload>
    </el-form-item>
    <!-- *************文件上传************* -->

    <!-- *************月度上传************* -->
    <el-form-item label="级别认证导入：" prop="coverFile">
      <el-upload
      class="upload-demo"
      ref="upload2"
      accept=".xlsx,.xls,.csv,.pdf"
      :http-request="excelFile2"
      :with-credentials="true"
      :auto-upload="true"
      action=""
      list-type="list"
      :file-list="fileList">
        <el-button slot="trigger" type="primary">导入认证</el-button>
      </el-upload>
    </el-form-item>
    <!-- *************文件上传************* -->

  </el-form>
</div>
</template>
<script>

import request from "@/utils/request";
  export default {
    data() {
      return {
        fileList:[],
      }
    },
    created(){
        //this.theLocation();
    },
    computed:{
       
    },
    methods: {
      excelFile(param){//上传文件
        let formData = new FormData();
          formData.append('file', param.file);
          request.post("/api/user/stimulate/daoru", formData).then(res => {
            if(res.code==200){
              this.$message({
                // type: res.errno === 0 ? "success" : "warning",
                type: "success",
                message: '导入成功!'//提示导入成功
              });
            }
          });
      },
      excelFile2(param){//上传文件
        let formData = new FormData();
          formData.append('file', param.file);
          request.post("/api/user/attestation/daoru", formData).then(res => {
            if(res.code==200){
              this.$message({
                // type: res.errno === 0 ? "success" : "warning",
                type: "success",
                message: '导入成功!'//提示导入成功
              });
            }
          });
      },
    },
}
</script>
<style lang="less" scoped>
    .app-container {
      width: 60%;
    }
</style>