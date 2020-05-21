<template>
    <div class="app-container">
        <el-form ref="form" :model="form" label-width="90px">
            <el-form-item label="课程标题" class="form-input" prop="title">
                <el-input v-model="form.title" placeholder="请输入课程标题"></el-input>
            </el-form-item>

            <el-form-item label="讲师名称" class="form-input" prop="title">
                <el-input v-model="form.lecturer" placeholder="请输入讲师名称"></el-input>
            </el-form-item>
            
            <el-form-item label="上传视频" class="form-input" prop="title">
                <chunckFileUpload
                style="display: inline-block"
                @onSuccess="res => uploadVideo(res)"
                :show-file-list='true'
                accept=".mp4, .MP4, .avi, .AVI"
                type="video"
                @removeVideo="videoRemove">
                    <el-button
                    size="medium"
                    class="medium-btn"
                    type="primary">
                        上传视频
                    </el-button>
                </chunckFileUpload>
            </el-form-item>
                
            <el-form-item label="封面图" prop="coverFile">
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
                    <el-button slot="trigger" type="primary">
                        选取图片
                    </el-button>
                </el-upload>
            </el-form-item>
                
            <!-- *************文件上传************* -->
            <el-form-item label="导入题库" prop="coverFile">
                <el-upload
                class="upload-demo"
                ref="uploadExcel"
                :limit="1"
                accept=".xlsx,.xls,.csv,.pdf"
                :http-request="excelFileClass"
                :with-credentials="true"
                :auto-upload="true"
                action=""
                list-type="list"
                :file-list="fileList">
                    <el-button slot="trigger" type="primary">
                        选取文件
                    </el-button>
                </el-upload>
            </el-form-item>
            <!-- *************文件上传************* -->
        </el-form>

        <el-button type="primary" style="float:left;margin-left:40%;margin-bottom:40px;" plain @click="addCommodity()">立即添加</el-button>
    </div>
</template>

<script>
import request from "@/utils/request";
import chunckFileUpload from "@/components/Upload/chunckFileUpload";
export default {
    created() {
        
    },
    data() {
        return {
            questions:'',
            cpPicture:[],
            paramFile : '',
            videoList:[],//视频
            form : {
                title : '',
                lecturer : '',
            },
            imageUrl : '',

             videoFlag: false,
            //是否显示进度条
            videoUploadPercent: "",
            //进度条的进度，
            isShowUploadVideo: false,
            //显示上传按钮
            videoForm: {
                showVideoPath: ''
            },
            fileList:[],
            picture:''
        };
    },
    computed: {
       
    },
    components: {
        chunckFileUpload
    },
    created(){
       
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
        //视频上传
        uploadVideo(res){
            this.videoForm.showVideoPath = localStorage.getItem('videoSrc');
            if (res.state===2000){
                var myDate = new Date();
                const year = String(myDate.getFullYear());
                let month = String(myDate.getMonth()+1);
                let day = String(myDate.getDate());
                if(myDate.getMonth()+1 < 10){
                    month = '0'+ month
                }
                if(myDate.getDate() < 10){
                    day = '0' + day
                }
                const date = year+month+day;
                const file = 'slice/'+date+'/'+res.file_name;
                this.form.videoList.push(file);
            }
        },
        videoRemove(file){
            const list = this.form.videoList;
            this.form.videoList =  list.filter(item=>{
                return item.slice(item.lastIndexOf('/')+1,item.length)!=file.name;
            })
        },
        uploadVideoProcess(event, file, fileList) {//进度条
            this.videoFlag = true;
            this.videoUploadPercent = file.percentage.toFixed(0) * 1;
        },
        excelFileClass(param){//修改题目
            let formData = new FormData();
            formData.append('Excelfile', param.file);
            request.post("/api/classroom/questions/add", formData).then(res => {
                if (res.code == 200){
                    this.questions = res.data;
                }
            });
        },
        addCommodity(){//点击提交按钮
            request.post("/api/classroom/add", {//发送数据到后台
                title : this.form.title,
                lecturer : this.form.lecturer,
                video:this.videoForm.showVideoPath,
                thumb:this.picture,
                file : this.questions,
            }).then(res => {
                res.errno === 0 && this.getList();
                this.$message({
                // type: res.errno === 0 ? "success" : "warning",
                type: "success",
                message: '添加成功'//提示添加成功
            });
                this.form.title = '';
                this.form.lecturer = '';
                this.videoForm.showVideoPath = '';
                this.$refs.upload.clearFiles();
                this.$refs.uploadExcel.clearFiles();
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
        width:50%
    }

    .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
    border-color: #409eff;
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
    .video-avatar {
    width: 400px;
    height: 200px;
    }
</style>