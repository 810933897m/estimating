<template>
    <div class="app-container">
        <!-- <el-table 
      class="table-picture"
      :data="form"
      border
       max-height="550"
      style="width: 100%;">

      <el-table-column
       label="标题"
      width="50px"
      align="center">
        <template slot-scope="scope" >
          {{scope.row.title}}
        </template>
      </el-table-column>

      <el-table-column
       label="内容"
      width="50px"
      align="center">
        <template slot-scope="scope" >
          {{scope.row.value}}
        </template>
      </el-table-column>
      </el-table> -->
      <el-form ref="form" label-width="200px" style="width:100%;">
        <el-form-item v-for="(item,index) in form" :key="index" :label="item.title" class="form-input" prop="title" style="width:500px;">
              <!-- <span>{{item.title}}</span> -->
            <el-input disabled v-model="item.value"></el-input>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
import request from "@/utils/request";
import { quillEditor } from 'vue-quill-editor';
import quillConfig from '@/utils/quill-config'
import map from '@/utils/city';
export default {
    created() {
        
    },
    data() {
        return {
            options:map.options,
            quillOption: quillConfig,
            cpPicture:[],
            paramFile : '',
            form : [],
        allInquiry : [],
        activeName: 'first',
        fileList:[],
        imageUrl : '',
        ask_price:[],
        bazaar_crew:[],
        param:[],
        price_check:[],
        bank:[],
        city :[],
        factor:[],
        factor_value :[],
        house_way :[],
        type :[],

        //*************分页变量*************
        // currentPage : 1, //初始页
        // pagesize : 5,   //每页的数据
        count : 1,
        max : 1,
        page : 1,
        size :1,
       //*************分页变量*************
        };
    },
    computed: {
       
    },
    created(){
       quillEditor,
    //    console.log(map.options)
        // console.log(this.$route.query.id)
       this.getSelect()
    },
    methods: {
        getSelect() {//初始渲染数据
            request.post("/admin/excel/show",{
            id : this.$route.query.id 
        }).then(res => {
            // console.log(res)
            if (res.code == 200) {
                // console.log(res)
                this.form = res.data;
            }
        });
        
        },
        handleChange1(){

        },
    }
};
</script>

<style style lang="less" scoped>
    .app-container {
        .table-list {
            margin: 0 auto;
            .table-content {
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
        }
        .table-page {
            margin-top: 20px;
            float: right;
        }
    }
    .editor{
        width: 200%;
        height: 300px;
    }
    .hot{
        color: #606266;
        font-size: 14px;
        margin-left:10px;
        margin-right:10px;
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
        width: 50px;
        height: 50px;
        line-height: 50px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
    .form-input{
        width:300px;float:left;
    }
    el-form-item{
        width: 20% !important;
    }
    .select{
        float:left;
    }
</style>