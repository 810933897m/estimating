<template>
    <div class="app-container">
        <!-- *************列表渲染************* -->
        <el-card class="box-card">

        <div slot="header" class="clearfix">
            <el-form ref="form" label-width="100px">
                <el-form-item label="分类名称" class="form-input" prop="title">
                    <el-input v-model="addProduct_classification" style="width:200px;" placeholder="请输入分类名称"></el-input>
                    <el-button type="primary" style="margin-left:50px;" plain @click="addCommodity()">立即添加</el-button>
                </el-form-item>
            </el-form>
        </div>

        <div class="table-list">
            <el-table show-header 
            max-height="400"
            border :data="(productManagementList).slice((currentPage-1)*pagesize,currentPage*pagesize)" 
            class="table-picture">
                <el-table-column
                label="编号"
                align="center">
                    <template slot-scope="scope">
                        {{scope.row.id}}
                    </template>
                </el-table-column>

                <el-table-column
                label="分类名称"

                align="center">
                    <template slot-scope="scope">
                        <p :title="scope.row.product_classification" style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{scope.row.product_classification}}</p>
                    </template>
                </el-table-column>

                <el-table-column label="修改" width="130px" align="center" fixed="right">
                    <template slot-scope="scope">
                        <el-button type="primary"  size="small"  @click="edit(scope.row),dialogVisible = true">修改</el-button>
                    </template>
                </el-table-column>

                <el-table-column label="删除" width="130px" align="center" fixed="right">
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
        </el-card>
        <!-- *************列表渲染结束************* -->

        <!--*************修改模态框*************-->
        <el-dialog
        title="修改"
        :visible.sync="dialogVisible"
        width="30%">
        <!-- :before-close="handleClose" -->
            <el-form ref="updata" :model="updata" label-width="90px">
                <el-form-item label="分类名称">
                    <el-input v-model="updata.product_classification"></el-input>
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
export default {
    created() {
        this.tableListColumn = [...TABLE_LIST_COLUMN];
        // this.tableCrriculumList = [...TABLE_CRRICULUM_LIST];
        this.getList();
    },
    data() {
        return {
            updata:{
                product_classification : '',
            },//修改参数
            updataId:'',

            dialogVisible : false,//弹出框
            list : [],//初始渲染列表
            showcCrriculum : false,
            crriculumList : [],
            productManagementList :[],
            radio1 : 0,
            jo : [],
            addProduct_classification:'',
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
    created(){
       this.getChannelList();//初始渲染列表调用
    },
    methods: {
        getChannelList() {//初始渲染列表方法
            let str='';
             request.post("/api/classify/list").then(res => {
                if (res.code === 200) {
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
                request.post("/api/classify/delete", {
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
        edit(row) {//点击修改按钮展示原有数据

            // 修改列表赋值
            this.updataId = row.id;
            this.updata.product_classification = row.product_classification;
        },
        confirmRevision(){//点击确定修改
            // this.updata.pictures='';
            request.post("/api/classify/edit",{//发送数据到后台
                //后台参数
                id : this.updataId,
                product_classification : this.updata.product_classification,
            }).then(res => {
                    if (res.code === 200) {
                    this.productManagementList = res.data
                    this.$message({
                        // type: res.errno === 0 ? "success" : "warning",
                        type: "success",
                        message: '修改成功！'//提示修改成功
                    });
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
        addCommodity(){//点击提交按钮
            request.post("/api/classify/add", {//发送数据到后台
                product_classification : this.addProduct_classification,
                }).then(res => {
                    res.errno === 0 && this.getList();
                    this.$message({
                        // type: res.errno === 0 ? "success" : "warning",
                        type: "success",
                        message: '添加成功'//提示添加成功
                    });
                    this.getChannelList();//初始渲染列表调用
                    this.addProduct_classification = '';
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