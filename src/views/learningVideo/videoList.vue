<template>
    <div class="app-container">
        <!-- *************列表渲染************* -->
        <div class="table-list">
            <el-table show-header 
            max-height="550"
            border :data="(videoList).slice((currentPage-1)*pagesize,currentPage*pagesize)" 
            class="table-picture">
                <el-table-column
                label="课程名称"
                width="400px"
                align="center">
                    <template slot-scope="scope">
                        <p :title="scope.row.title" style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{scope.row.title}}</p>
                    </template>
                </el-table-column>

                <el-table-column
                label="讲师名称"
                align="center">
                    <template slot-scope="scope">
                        <p :title="scope.row.lecturer" style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{scope.row.lecturer}}</p>
                    </template>
                </el-table-column>

                 <el-table-column
                label="课程图片"
                width="200px"
                align="center">
                    <template slot-scope="scope">
                        <img  :src="'../../..'+scope.row.thumb" class="img-study" alt="">
                        <!-- <p :title="scope.row.course_video" style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{scope.row.course_video}}</p> -->
                    </template>
                </el-table-column>

                <el-table-column
                label="课程添加时间"
                width="150px"
                align="center">
                    <template slot-scope="scope">
                        <p :title="scope.row.addtime" style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{scope.row.addtime}}</p>
                    </template>
                </el-table-column>

                <el-table-column label="查看详情" width="100px" align="center" fixed="right">
                    <template slot-scope="scope">
                        <el-button type="info" size="small" @click="detail(scope.row)">查看</el-button>
                    </template>
                </el-table-column>

                <el-table-column label="修改" width="100px" align="center" fixed="right">
                    <template slot-scope="scope">
                        <el-button type="primary"  size="small" @click="edit(scope.row),dialogVisible = true">修改</el-button>
                    </template>
                </el-table-column>

                <el-table-column label="删除" width="100px" align="center" fixed="right">
                    <template slot-scope="scope">
                        <el-button type="danger" size="small" @click="deleteList(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!-- *************分页************* -->
            <el-pagination
            style="margin-top:20px;"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[5, 10, 20, 40]" 
            :page-size="pagesize"         
            layout="total, sizes, prev, pager, next, jumper"
            :total="videoList.length">
            </el-pagination>
            <!-- *************分页************* -->

        </div>
        <!-- *************列表渲染结束************* -->

        <!--*************修改模态框*************-->
        <el-dialog
        title="修改"
        :visible.sync="dialogVisible"
        width="30%">
        <!-- :before-close="handleClose" -->
            <el-form ref="updata" :model="updata" label-width="90px">
                <el-form-item label="课程名称">
                    <el-input v-model="updata.title"></el-input>
                </el-form-item>

                <el-form-item label="讲师名称">
                    <el-input v-model="updata.lecturer"></el-input>
                </el-form-item>

                <el-form-item label="视频地址">
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
                            视频修改
                        </el-button>
                    </chunckFileUpload>
                </el-form-item>

                <el-form-item label="封面图">
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
                        <el-button slot="trigger" type="primary">选取文件</el-button>
                    </el-upload>
                </el-form-item>
                <!-- *************文件上传************* -->
            </el-form>
        
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirmRevision(),dialogVisible = false">修 改</el-button>
            </span>
        </el-dialog>
        <!--*************修改模态框结束*************-->

    </div>
</template>

<script>
import request from "@/utils/request";
import chunckFileUpload from "@/components/Upload/chunckFileUpload";
export default {
    created() {
        this.tableListColumn = [...TABLE_LIST_COLUMN];
        // this.tableCrriculumList = [...TABLE_CRRICULUM_LIST];
        this.getList();
    },
    data() {
        return {
            updata:{
                title : '',
                lecturer : '',
                video : '',
                thumb : '',
                questions : '',
            },//修改参数
            updataId:'',
            fileList:[],

            dialogVisible : false,//弹出框
            list : [],//初始渲染列表
            showcCrriculum : false,
            crriculumList : [],
            videoList :[],
            radio1 : 0,
            jo : [],
            videoFlag: false,
            //是否显示进度条
            videoUploadPercent: "",
            //进度条的进度，
            isShowUploadVideo: false,
            //显示上传按钮
            videoForm: {
                showVideoPath: ''
            },
            videoPath:'',//如果为空则发送原路径

            //*************分页变量*************
            currentPage : 1, //初始页
            pagesize : 5,    //每页的数据
            //*************分页变量*************
            
        };
    },
    computed: {
        // tableList() {
        //     return this.list.slice((this.currentPage - 1) *  this.pageSize, (this.currentPage - 1) *  this.pageSize + 10)
        // },
    },
    components: {
        chunckFileUpload 
    },
    created(){
       this.getChannelList();//初始渲染列表调用
    },
    methods: {
        getChannelList() {//初始渲染列表方法
            let str='';
            request.post("/api/classroom/list").then(res => {
                if (res.code === 200) {
                    this.total = res.data.length
                    this.videoList = res.data
                }
            });
        },
        deleteList(row) {//删除商品
            //接受一整行数据
            this.$confirm("您确定要删除？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消"
            }).then(() => {
                request.post("/api/classroom/delete", {
                        id:row.id
                }).then(res => {
                    this.getChannelList()
                    // res.errno === 0 && this.getList();
                    this.$message({
                        // type: res.errno === 0 ? "success" : "warning",
                        type: "success",
                        message: '删除成功！'
                    });
                }).catch(res => {
                    this.$message({
                        type: "warning",
                        message: "删除失败!"
                    });
                });
            });
        },
        closeCrriculum() {
            this.showcCrriculum = false;
            this.crriculumList = [];
        },
        okCrriculum() {
            this.closeCrriculum()
        },
        ImgUploadSectionFile(param){//图片上传
            let formData = new FormData();
            formData.append('thumb', param.file);
            request.post("/api/image/add", formData).then(res => {
                if (res.code == 200){
                    this.updata.thumb = res.data;
                }
            });
        },
        excelFileClass(param){//修改题目
            let formData = new FormData();
            formData.append('Excelfile', param.file);
            request.post("/api/classroom/questions/add", formData).then(res => {
                if (res.code == 200){
                    this.updata.questions = res.data;
                    console.log(this.updata.questions)
                }
            });
        },
        edit(row) {//点击修改按钮展示原有数据
            // 修改列表赋值
            this.updataId = row.id;
            this.updata.title = row.title;
            this.updata.lecturer = row.lecturer;
            this.updata.thumb = row.thumb;
            this.videoPath = row.course_video;
            this.videoForm.showVideoPath = row.course_video;
            this.updata.questions = row.questions;
        },
        confirmRevision(){//点击确定修改
            if(this.videoForm.showVideoPath==''){
                this.videoForm.showVideoPath = this.videoPath;
                request.post("/api/classroom/edit",{//发送数据到后台
                    //后台参数
                    id : this.updataId,
                    title : this.updata.title,
                    lecturer : this.updata.lecturer,
                    thumb : this.updata.thumb,
                    video : this.videoForm.showVideoPath,
                    editfile : this.updata.questions,
                }).then(res => {
                    if (res.code === 200) {
                        this.videoList = res.data
                        this.$message({
                            // type: res.errno === 0 ? "success" : "warning",
                            type: "success",
                            message: '修改成功！'//提示修改成功
                        });
                        this.videoPath = '';
                        this.getChannelList();//重新渲染数据
                    }
                });
            }else{
                // this.updata.pictures='';
                request.post("/api/classroom/edit",{//发送数据到后台
                    //后台参数
                    id : this.updataId,
                    title : this.updata.title,
                    lecturer : this.updata.lecturer,
                    thumb : this.updata.thumb,
                    video : this.videoForm.showVideoPath,
                    editfile : this.updata.questions,
                }).then(res => {
                    if (res.code === 200) {
                        this.videoList = res.data
                        this.$message({
                            // type: res.errno === 0 ? "success" : "warning",
                            type: "success",
                            message: '修改成功！'//提示修改成功
                        });
                            this.$refs.upload.clearFiles();
                            this.videoPath = '';
                            this.updata.questions = '',
                            this.getChannelList();//重新渲染数据
                            this.$refs.uploadExcel.clearFiles();
                    }
                });
            }
        },//*************确定修改结束*************
        
        //*************分页*************
        handleSizeChange: function (size) {//选择条数
            this.pagesize = size;
        },
        handleCurrentChange: function(currentPage){//换页
            this.currentPage = currentPage;
        },
        //*************分页*************
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
        excelFile(param){//视频上传
            let formData = new FormData();
            formData.append('video', param.file);
            request.post("/api/classroom/video/add", formData).then(res => {
                if (res.code == 200){
                    this.videoForm.showVideoPath = res.data;
                }
            });
        },
        //上传成功回调
        handleVideoSuccess(res, file) {
            this.isShowUploadVideo = true;
            this.videoFlag = false;
            this.videoUploadPercent = 0;
            //前台上传地址
            //if (file.status == 'success' ) {
            //    this.videoForm.showVideoPath = file.url;
            //} else {
            //     layer.msg("上传失败，请重新上传");
            //}
            //后台上传地址
            if (res.Code == 0) {
                this.videoForm.showVideoPath = res.Data;
            } else {
                layer.msg(res.Message);
            }
        },
        detail(row){//跳转到详情页
            this.$router.push({path:'/videoDetail',query:{id:row.id}})
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
    .btn-operation{
        width: 73px;height: 28px;
        line-height:5px;
    }
    .table-picture img{
        width: 80px;
        height: 50px;
    }
    .hot{
        color: #606266;
        font-size: 14px;
        margin-left:10px;
        margin-right:10px;
    }
    .sss{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 200px;
    }
    .img-study{
        width:200px;
    }
</style>