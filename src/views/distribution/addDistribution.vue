<template>
    <div class="app-container">
        <el-form ref="form" :model="form" label-width="70px">
            <el-form-item label="标题" class="form-input" prop="title">
                <el-input v-model="form.title" placeholder="请输入分销标题"></el-input>
            </el-form-item>

            <el-form-item label="内容" class="form-input" prop="integral">
                <!-- <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入分销内容"
                v-model="form.content">
                </el-input> -->
                <quill-editor ref="myTextEditor" class="editor"
                    v-model="form.content" :options="quillOption">
                </quill-editor> 
            </el-form-item>
            
            <el-form-item label="封面图" prop="coverFile" style="margin-top:120px;">
                    <el-upload
                        class="upload-demo"
                        ref="upload"
                        :limit="1"
                        :http-request="ImgUploadSectionFile"
                        :with-credentials="true"
                        :auto-upload="true"
                        accept=".png,.jpg,.gif,.svg"
                        action=""
                        list-type="list"
                        :file-list="fileList">
                        <el-button slot="trigger" type="primary">选取图片</el-button>
                    </el-upload>
            </el-form-item>

        </el-form>

        <el-button type="primary" style="float:left;margin-left:40%;margin-bottom:40px;" plain @click="addCommodity()">
            立即添加
        </el-button>
    </div>
</template>

<script>
import request from "@/utils/request";
import { quillEditor } from 'vue-quill-editor';
import quillConfig from '@/utils/quill-config'
export default {
    created() {
        
    },
    data() {
        return {
            quillOption: quillConfig,
            cpPicture:[],
            paramFile : '',
            form : {
            title : '',
            subhead : '',
            content : '',
        },
        fileList:[],
        imageUrl : '',

        };
    },
    computed: {
       
    },
    created(){
       quillEditor
    },
    methods: {
        ImgUploadSectionFile(param){//图片上传
            let formData = new FormData();
                formData.append('thumb', param.file);
                request.post("/api/image/add", formData).then(res => {
                    if (res.code == 200){
                        this.picture = res.data;
                    }
                });
        },
        addCommodity(){//点击提交按钮
                request.post("/api/distribution/add", {//发送数据到后台
                        title : this.form.title,
                        content : this.form.content ,
                        thumb : this.picture,
                        }).then(res => {
                            res.errno === 0 && this.getList();
                            this.$message({
                                // type: res.errno === 0 ? "success" : "warning",
                                type: "success",
                                message: '添加成功'//提示添加成功
                            });
                            this.form.title='';
                            this.form.content='';
                            this.$refs.upload.clearFiles(); 
                    });
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
        width:50%;
    }
    el-form-item{
        width: 20% !important;
    }
</style>