<template>
    <div class="app-container">
        <el-form ref="form" :rules="rules" :model="form" label-width="80px">
            <el-form-item label="产品名称" class="form-input" required prop="title">
                <el-input v-model="form.title" placeholder="请输入产品名称"></el-input>
            </el-form-item>

            <el-form-item label="产品简介" class="form-input" required prop="subtitle">
                <el-input v-model="form.subtitle" placeholder="请输入产品简介"></el-input>
            </el-form-item>

            <el-form-item label="所需积分" class="form-input" required prop="integral">
                <el-input v-model="form.integral" placeholder="请输入所需积分"></el-input>
            </el-form-item>

            <el-form-item label="描述" class="form-input" required prop="describe">
                <el-input v-model="form.describe" placeholder="请输入描述"></el-input>
            </el-form-item>

            <el-form-item label="产品说明" class="form-input" required prop="explain">
                <el-input v-model="form.explain" placeholder="请输入产品说明"></el-input>
            </el-form-item>
            
            <el-form-item label="产品颜色" class="form-input" required prop="color">
                <el-input v-model="form.color" placeholder="请输入产品颜色"></el-input>
            </el-form-item>

            <!-- banner图上传 -->
            <el-form-item label="banner图" prop="file">
                <el-upload
                class="upload-demo"
                ref="upload"
                :limit="1"
                :http-request="bannerUploadSectionFile"
                :with-credentials="true"
                :auto-upload="true"
                action=""
                list-type="list"
                :file-list="fileList">
                    <el-button slot="trigger" type="primary">选取图片</el-button>
                </el-upload>
            </el-form-item>

            <!-- 封面图片上传 -->
            <el-form-item label="封面图片" prop="coverFile" required>
                <el-upload
                class="upload-demo"
                ref="upload"
                :limit="1"
                :http-request="coverImgUploadSectionFile"
                :with-credentials="true"
                :auto-upload="true"
                action=""
                list-type="list"
                :file-list="fileList">
                    <el-button slot="trigger" type="primary">选取图片</el-button>
                </el-upload>
            </el-form-item>

            <span class="hot">是否热门</span>
            <el-radio v-model="radio" label="0">否</el-radio>
            <el-radio v-model="radio" label="1">是</el-radio>
            <br/>
            
            <!-- 产品图片上传 -->
            <el-form-item label="产品图片" style="margin-top:20px;" prop="pictures">
                <el-upload
                class="upload-demo"
                ref="upload"
                :http-request="picturesUploadSectionFile"
                :with-credentials="true"
                :auto-upload="true"
                action=""
                list-type="list"
                :file-list="fileList">
                    <el-button slot="trigger" type="primary">选取图片</el-button>
                </el-upload>
            </el-form-item>
        </el-form>

        <el-button type="primary" plain @click="addCommodity()">立即添加</el-button>
    </div>
</template>

<script>
import { TABLE_LIST_COLUMN, TABLE_CRRICULUM_LIST} from "./common/config";
import {FILE_UPLOAD_PATH} from '../../config/config.js';
import request from "@/utils/request";
export default {
    created() {
        
    },
    data() {
        return {
            cpPicture:[],
            paramFile:'',
            radio:'',
            form: {
            title: '',
            subtitle: '',
            integral: '',
            describe: '',
            explain: '',
            color: '',
            bannerImg: '',
            coverImg: '',
            ishot: true,
            pictures: [],
            // pictures: '',
            file:'',
            coverFile:''
        },
        imageUrl: '',
        rules: {//*************验证是否输入为空*************
        title:[
            {required:true,message:'请输入产品名称', trigger: 'blur'}
        ],
        subtitle:[
            {required:true,message:'请输入产品简介', trigger: 'blur'}
        ],
        integral:[
            {required:true,message:'请输入所需积分', trigger: 'blur'}
        ]
        ,
        describe:[
            {required:true,message:'请输入描述', trigger: 'blur'}
        ],
        explain:[
            {required:true,message:'请输入产品说明', trigger: 'blur'}
        ],
        color:[
            {required:true,message:'请输入产品颜色', trigger: 'blur'}
        ],
        file: [
					{ required: true, message: "请选择要上传的文件", trigger: ['blur', 'change']}
			],
        },//*************验证是否输入为空*************

        fileList: [],
        filePath:FILE_UPLOAD_PATH,
        };
    },
    computed: {
       
    },
    created(){
       
    },
    methods: {
        addCommodity(){//点击提交按钮
            console.log(typeof(this.radio))
            console.log(this.form.pictures)
            if(this.form.pictures==''){//如果没有添加产品图片，则取消产品图片字段的传送
                request.post("/api/productAdministration/addProduct", {//发送数据到后台
                        title : this.form.title,
                        subtitle : this.form.subtitle,
                        integral : this.form.integral ,
                        describe : this.form.describe ,
                        explain : this.form.explain ,
                        color : this.form.color ,
                        bannerImg : this.form.bannerImg  ,
                        coverImg : this.form.coverImg  ,
                        ishot: this.radio ,
                        }).then(res => {
                        console.log(this.form.title,this.form.subtitle,this.form.integral,this.form.describe,this.form.explain,this.form.color,'1'+this.form.bannerImg,this.form.coverImg)
                        if(this.form.title!=''&&this.form.subtitle!=''&&this.form.integral!=''&&this.form.describe!=''&&this.form.explain!=''&&this.form.color!=''&&this.form.bannerImg!=''&&this.form.coverImg!=''){
                            console.log('233')
                            res.errno === 0 && this.getList();
                            this.$message({
                                // type: res.errno === 0 ? "success" : "warning",
                                type: "success",
                                message: '添加成功'//提示添加成功
                            });
                            console.log(this.form.title,this.form.title,this.form.subtitle,this.form.integral,this.form.describe,this.form.explain,this.form.color,'1'+this.form.bannerImg,this.form.coverImg)
                            location.reload();//刷新当前页面
                            // this.form.title='';
                            // this.radio='';
                        }else{
                            this.$message({
                            type: "warning",
                            message: "请检查是否填写完整!" 
                        });
                        }
                    })
                    .catch(res => {
                        this.$message({
                            type: "warning",
                            message: "添加失败!"
                        });
                    });
            }
            else{//如果上传产品图片则有此字段
            console.log(this.form.pictures)
            this.form.pictures=JSON.stringify(this.form.pictures)

            request.post("/api/productAdministration/addProduct", {//发送数据到后台
                        title : this.form.title,
                        subtitle : this.form.subtitle,
                        integral  : this.form.integral ,
                        describe  : this.form.describe ,
                        explain  : this.form.explain ,
                        color  : this.form.color ,
                        bannerImg   : this.form.bannerImg  ,
                        coverImg   : this.form.coverImg  ,
                        ishot  : this.radio ,
                        pictures  : this.form.pictures
                        }).then(res => {
                        console.log(this.form.title,this.form.subtitle,this.form.integral,this.form.describe,this.form.explain,this.form.color,'1'+this.form.bannerImg,this.form.coverImg)
                        if(this.form.title!=''&&this.form.subtitle!=''&&this.form.integral!=''&&this.form.describe!=''&&this.form.explain!=''&&this.form.color!=''&&this.form.bannerImg!=''&&this.form.coverImg!=''){
                            console.log('233')
                            res.errno === 0 && this.getList();
                            this.$message({
                                // type: res.errno === 0 ? "success" : "warning",
                                type: "success",
                                message: '添加成功'//提示添加成功
                            });
                            console.log(this.form.title,this.form.title,this.form.subtitle,this.form.integral,this.form.describe,this.form.explain,this.form.color,'1'+this.form.bannerImg,this.form.coverImg)
                            //  location.reload();//刷新当前页面
                            // this.form.title='';
                            // this.radio='';
                        }else{
                            this.$message({
                            type: "warning",
                            message: "请检查必填项是否填写完整!" 
                        });
                        }
                        
                    })
                    .catch(res => {
                        this.$message({
                            type: "warning",
                            message: "添加失败!"
                        });
                    });
                    }
        },
        bannerUploadSectionFile: function (param) {//banner图上传
            let formData = new FormData();
            formData.append('file', param.file);
            console.log(this.paramFile+typeof(this.paramFile))
            request.post("/api/productAdministration/uploadImg", formData).then(res => {
                //  console.log(res)
                // console.log(res)
                this.form.bannerImg=res.data;
            });
        },
        coverImgUploadSectionFile: function (param) {//点击封面图片上传
            let formData = new FormData();//转为form data格式 
            formData.append('file', param.file);
            console.log(this.paramFile+typeof(this.paramFile))
            request.post("/api/productAdministration/uploadImg", formData).then(res => {
                //  console.log(res)
                // console.log(res)
                this.form.coverImg=res.data;
                // console.log(this.form.coverImg)
            });
        },
        picturesUploadSectionFile: function (param) {//点击产品图片上传
            console.log(param.file)
            let formData = new FormData();//转为form data格式
            formData.append('file', param.file);
            console.log(this.paramFile+typeof(this.paramFile))
            request.post("/api/productAdministration/uploadImg", formData).then(res => {
                console.log(res)
                this.form.pictures.push(res.data);
                console.log(this.form.pictures)
            }); 
        }
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
    .pictrue-upload{
        color: #606266;
        font-size: 14px;
        margin-top:20px;float:left;
        margin-left:10px;
        margin-right:10px;
    }
    .form-input{
        width:50%;
    }
</style>