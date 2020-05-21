<template>
    <div class="app-container">
        <div style="height: 300px;">
          <el-steps direction="vertical" >
            <el-step process-status="finish" title="步骤 1"></el-step>
            <el-step process-status="finish" title="步骤 2"></el-step>
            <el-step process-status="finish" title="步骤 3" description="这是一段很长很长很长的描述性文字"></el-step>
          </el-steps>
        </div>
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
            request.post("/admin/Auditing/inquire",{
            id : this.$route.query.row.id 
        }).then(res => {
            // console.log(res)
            if (res.code == 200) {
                console.log(res)
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