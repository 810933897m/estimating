<template>
    <div class="app-container">
        <!-- *************列表渲染************* -->
        <div class="table-list">
            <el-table show-header border :data="(productManagementList).slice((currentPage-1)*pagesize,currentPage*pagesize)" class="table-picture">
                <el-table-column
                label="分销标题"
                max-height="550"
                align="center">
                    <template slot-scope="scope">
                        <p :title="scope.row.title" style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{scope.row.title}}</p>
                    </template>
                </el-table-column>

                <!-- <el-table-column
                label="分销内容"
                align="center">
                    <template slot-scope="scope">
                        <p :title="scope.row.content" style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{scope.row.content}}</p>
                    </template>
                </el-table-column> -->

                <el-table-column
                label="封面图"
                align="center">
                    <template slot-scope="scope">
                        <img  :src="'../../..'+scope.row.thumb" class="img-study" alt="">
                    </template>
                </el-table-column>

                <el-table-column label="查看详情" width="100px" align="center" fixed="right">
                    <template slot-scope="scope">
                        <el-button type="info" size="small"  @click="detail(scope.row)">查看</el-button>
                    </template>
                </el-table-column>

                <el-table-column label="修改" width="100px" align="center" fixed="right">
                    <template slot-scope="scope">
                        <el-button type="primary"  size="small"  @click="edit(scope.row),dialogVisible = true">修改</el-button>
                    </template>
                </el-table-column>

                <el-table-column label="删除" width="100px" align="center" fixed="right">
                    <template slot-scope="scope">
                        <el-button type="danger" size="small"  @click="deleteList(scope.row)">删除</el-button>
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
        :total="productManagementList.length">
        </el-pagination>
        <!-- *************分页************* -->

        </div>
        <!-- *************列表渲染结束************* -->

        <!--*************修改模态框*************-->
        <el-dialog
        title="修改"
        :visible.sync="dialogVisible"
        width="70%">
        <!-- :before-close="handleClose" -->
            <el-form ref="updata" :model="updata" label-width="70px">
                <el-form-item label="分销标题">
                    <el-input v-model="updata.title"></el-input>
                </el-form-item>

                <el-form-item label="分销内容">
                    <!-- <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="内容"
                    v-model="updata.content">
                    </el-input> -->
                    <quill-editor ref="myTextEditor" class="editor"
                            v-model="updata.content" :options="quillOption">
                    </quill-editor> 
                </el-form-item>

                <el-form-item label="封面图" style="margin-top:120px;">
                    <!-- <el-input v-model="updata.product_content"></el-input> -->
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
import quillConfig from '@/utils/quill-config';
import { quillEditor } from 'vue-quill-editor';
export default {
    created() {
        this.tableListColumn = [...TABLE_LIST_COLUMN];
        // this.tableCrriculumList = [...TABLE_CRRICULUM_LIST];
        this.getList();
    },
    data() {
        return {
            fileList:[],
            updata:{
                title : '',
                subhead : '',
                content : '',
                picture : '',
            },//修改参数
            updataId:'',

            dialogVisible : false,//弹出框
            list : [],//初始渲染列表
            showcCrriculum : false,
            crriculumList : [],
            productManagementList :[],
            radio1 : 0,
            jo : [],

            //*************分页变量*************
            currentPage : 1, //初始页
            pagesize : 5,    //每页的数据
            //*************分页变量*************
        };
    },
    components: {
        quillEditor
    },
    computed: {
        // tableList() {
        //     return this.list.slice((this.currentPage - 1) *  this.pageSize, (this.currentPage - 1) *  this.pageSize + 10)
        // },
    },
    created(){
       this.getPistributionList();//初始渲染列表调用
       //console.log(this.productManagementList)
    },
    methods: {
        getPistributionList() {//初始渲染列表方法
            let str='';
             request.post("/api/distribution/list").then(res => {
                //  console.log(res)
                if (res.code === 200) {
                    this.total = res.data.length
                    this.productManagementList = res.data
                }
            });
        },
        deleteList(row) {//删除商品
            //console.log(row)
            //接受一整行数据
            this.$confirm("您确定要删除？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消"
            }).then(() => {
                request.post("/api/distribution/delete", {
                        id:row.id
                    }).then(res => {
                        this.getPistributionList()
                        res.errno === 0 && this.getPistributionList();
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
        edit(row) {//点击修改按钮展示原有数据

            // 修改列表赋值
            this.updataId = row.id;
            this.updata.title = row.title;
            this.updata.content = row.content;
            this.updata.picture = row.thumb;
            // console.log(this.radio)
        },
        confirmRevision(){//点击确定修改
            request.post("/api/distribution/edit",{//发送数据到后台
                //后台参数
                id : this.updataId,
                title : this.updata.title,
                content : this.updata.content,
                thumb : this.updata.picture,
            }).then(res => {
                    if (res.code === 200) {
                    this.productManagementList = res.data
                    this.$message({
                        // type: res.errno === 0 ? "success" : "warning",
                        type: "success",
                        message: '修改成功！'//提示修改成功
                    });
                    this.$refs.upload.clearFiles();
                    this.getPistributionList();//重新渲染数据
                }
            });
        },//*************确定修改结束*************
        
        //*************分页*************
        handleSizeChange: function (size) {//选择条数
                this.pagesize = size;
                //console.log(this.pagesize)  //每页下拉显示数据
        },
        handleCurrentChange: function(currentPage){//换页
                this.currentPage = currentPage;
                //console.log(this.currentPage)  //点击第几页
        },
        //*************分页*************
        ImgUploadSectionFile(param){//图片上传
            let formData = new FormData();
                formData.append('thumb', param.file);
                request.post("/api/image/add", formData).then(res => {
                    if (res.code == 200){
                        console.log(res.data)
                        this.updata.picture = res.data;
                        // this.form.bannerImg=res.data;
                    }
                });
        },
        detail(row){//跳转到详情页
                // console.log(row.id)
                this.$router.push({path:'/distributionDetail',query:{id:row.id}})
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
    .editor{
        height:300px;
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
</style>