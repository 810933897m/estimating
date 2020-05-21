<template>
    <div class="app-container">
        <!-- *************列表渲染************* -->
        <div class="table-list">
            <el-table show-header 
            max-height="550"
            border :data="(productManagementList).slice((currentPage-1)*pagesize,currentPage*pagesize)" 
            class="table-picture">
                <el-table-column
                label="产品名称"
                align="center">
                    <template slot-scope="scope">
                        <p :title="scope.row.product_name" style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{scope.row.product_name}}</p>
                    </template>
                </el-table-column>

                <el-table-column
                label="产品简介"
                align="center">
                    <template slot-scope="scope">
                        <p :title="scope.row.introduction" style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{scope.row.introduction}}</p>
                    </template>
                </el-table-column>

                <el-table-column
                label="公司名称"
                align="center"
                >
                    <template slot-scope="scope">
                        <p :title="scope.row.company_name" style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{scope.row.company_name}}</p>
                    </template>
                </el-table-column>
<!-- 
                <el-table-column
                label="产品详情介绍"
                align="center">
                    <template slot-scope="scope">
                        <div :title="scope.row.product_content" v-html="scope.row.product_content" ></div>
                    </template>
                </el-table-column> -->

                <el-table-column
                label="封面图"
                align="center">
                    <template slot-scope="scope">
                        <img  :src="'../../..'+scope.row.thumb" class="img-study" alt="">
                        <!-- <p :title="scope.row.course_video" style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{scope.row.course_video}}</p> -->
                    </template>
                </el-table-column>

                <el-table-column
                label="产品分类"
                width="100px"
                align="center">
                    <template slot-scope="scope">
                        {{scope.row.classify}}
                    </template>
                </el-table-column>

                <el-table-column label="修改" width="100px" align="center" fixed="right">
                    <template slot-scope="scope">
                        <el-button type="primary"  size="small" @click="edit(scope.row),dialogVisible = true">修改</el-button>
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
        width="60%">
        <!-- :before-close="handleClose" -->
            <div style="height:400px;overflow-x:auto;">
                <el-form ref="updata" :model="updata" label-width="90px">
                    <el-form-item label="产品名称">
                        <el-input v-model="updata.product_name"></el-input>
                    </el-form-item>

                    <el-form-item label="产品简介">
                        <el-input v-model="updata.introduction"></el-input>
                    </el-form-item>

                    <el-form-item label="公司名称">
                        <el-input v-model="updata.company_name"></el-input>
                    </el-form-item>

                    <el-form-item label="产品介绍">
                        <!-- <el-input v-model="updata.product_content"></el-input> -->
                        <quill-editor ref="myTextEditor" class="editor"
                            v-model="updata.product_content" :options="quillOption">
                        </quill-editor>
                    </el-form-item>

                    <el-form-item label="产品分类" style="margin-top:150px;">
                        <el-select v-model="updata.classify" @change="selec" filterable placeholder="请选择产品分类">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.product_classification"
                            :value="item.id">
                            </el-option>
                        </el-select>
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
                            <el-button slot="trigger" type="primary">选取图片</el-button>
                        </el-upload>
                    </el-form-item> 

                </el-form>
            </div>
        
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
            quillOption: quillConfig,
            fileList:[],
            options:[],//分类
            value:'',
            updata:{
                product_name : '',
                introduction : '',
                company_name : '',
                product_content : '',
                classify : '',
                classify_id : '',
                picture : '',
            },//修改参数
            updataId:'',
            banner : [],
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



            /***********富文本变量***********/
            editorOption: {
              modules: {
                toolbar: [
                  ["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线
                  ["blockquote", "code-block"], // 引用  代码块
                  [{ header: 1 }, { header: 2 }], // 1、2 级标题
                  [{ list: "ordered" }, { list: "bullet" }], // 有序、无序列表
                  [{ script: "sub" }, { script: "super" }], // 上标/下标
                  [{ indent: "-1" }, { indent: "+1" }], // 缩进
                  // [{'direction': 'rtl'}],                         // 文本方向
                  [{ size: ["small", false, "large", "huge"] }], // 字体大小
                  [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
                  [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
                  [{ font: [] }], // 字体种类
                  [{ align: [] }], // 对齐方式
                  ["clean"], // 清除文本格式
                  ["link", "image", "video"] // 链接、图片、视频
                ], //工具菜单栏配置
              },
              placeholder: '请在这里添加产品描述', //提示
              readyOnly: false, //是否只读
              theme: 'snow', //主题 snow/bubble
              syntax: true, //语法检测
            }
            /***********富文本变量***********/

            
        };
    },
    components: {quillEditor},
    computed: {
        // tableList() {
        //     return this.list.slice((this.currentPage - 1) *  this.pageSize, (this.currentPage - 1) *  this.pageSize + 10)
        // },
    },
    created(){
       this.getChannelList();//初始渲染列表调用
       this.getClassify()//调用分类列表
    },
    methods: {
        selec(value){
            console.log(value)
            this.value = value;
        },
        //******富文本******** 
        onEditorBlur(editor) {},
          // 获得焦点
        onEditorFocus(editor) {},
          // 开始
        onEditorReady(editor) {},
          // 值发生变化
        onEditorChange(editor) {
            console.log(editor)
            this.updata.product_content = editor.html;
        },
        //******富文本******** 

        getClassify(){//调用分类列表
             request.post("/api/classify/list").then(res => {
                if (res.code === 200) {
                    this.options = res.data
                    console.log(res.data)
                }
            });
        },
        getChannelList() {//初始渲染列表方法
            let str='';
             request.post("/api/product/list").then(res => {
                if (res.code === 200) {
                    console.log(res)
                    this.total = res.data.length
                    this.productManagementList = res.data
                }
            });
        },
        deleteList(row) {//删除商品
            //接受一整行数据
            this.$confirm("您确定要删除？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消"
            }).then(() => {
                request.post("/api/product/delete", {
                        id:row.id
                    }).then(res => {
                        this.getChannelList()
                        res.errno === 0 && this.getList();
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
                        this.updata.picture = res.data;
                    }
                });
        },
        edit(row) {//点击修改按钮展示原有数据
            console.log(row)
            // 修改列表赋值
            this.updataId = row.id;
            this.updata.product_name = row.product_name;
            this.updata.introduction = row.introduction;
            this.updata.company_name = row.company_name;
            this.updata.product_content = row.product_content;
            this.updata.classify = row.classify;
            this.value = row.classify_id;
            this.updata.picture = row.thumb;
            this.banner = row.banner;
        },
        confirmRevision(){//点击确定修改

                request.post("/api/product/edit",{//发送数据到后台
                //后台参数
                id : this.updataId,
                product_name : this.updata.product_name,
                introduction : this.updata.introduction,
                company_name : this.updata.company_name,
                product_content : this.updata.product_content,
                classify : this.value,
                thumb : this.updata.picture,
                banner : this.banner,
            }).then(res => {
                    console.log(res)
                    if (res.code === 200) {
                    this.productManagementList = res.data
                    this.$message({
                        // type: res.errno === 0 ? "success" : "warning",
                        type: "success",
                        message: '修改成功！'//提示修改成功
                    });
                    this.$refs.upload.clearFiles();
                    this.getChannelList();//重新渲染数据
                }
            });
            
        },//*************确定修改结束*************
        
        //*************分页*************
        handleSizeChange: function (size) {//选择条数
                this.pagesize = size;
        },
        handleCurrentChange: function(currentPage){//换页
                this.currentPage = currentPage;
        },
        //*************分页*************
        
    }
};
</script>

<style style lang="less" scoped>
    .editor{
        height:300px;
    }
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
</style>