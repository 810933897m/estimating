<template>
    <div class="app-container">
        <div style="margin-bottom:20px;width:100%;background:rgb(48,65,85);color:white;height:30px;"><span style="float:left;margin-left:10px;margin-top:5px;font-size:15px;">用户信息</span></div>
        <el-form ref="form" :model="form" label-width="120px" style="width:90%;padding-right:50px;">

            <el-form-item label="用户名" class="form-input"  prop="title" style="width:500px;">
                <el-input  placeholder="请输入"  v-model="form.username"></el-input>
            </el-form-item>

            <el-form-item label="密码" class="form-input" prop="title" style="width:500px;">
                <el-input  placeholder="请输入" v-model="form.password"></el-input>
            </el-form-item>

            <el-form-item label="邮箱" class="form-input" prop="title" style="width:500px;">
                <el-input  placeholder="请输入" v-model="form.email"></el-input>
            </el-form-item>

            <el-form-item label="编号" class="form-input" prop="title" style="width:500px;">
                <el-input  placeholder="请输入" v-model="form.userno"></el-input>
            </el-form-item>

            <el-form-item label="状态" class="form-input" prop="title" style="width:500px;">
                <!-- <el-input  placeholder="请输入状态" v-model="form.status"></el-input> -->
                 <el-radio v-model="form.status" label="0">正常</el-radio>
                 <el-radio v-model="form.status" label="1">禁用</el-radio>
            </el-form-item>

        </el-form>
        <div style="width:100%;float:left;">
            <!-- <el-button type="primary" style="margin-left:60%;" plain @click="inquiryBtn()">
                询价
            </el-button> -->
            <el-button type="primary" style="margin-left:45%;" plain @click="addCommodity()">
                添加
            </el-button>
            <!-- <el-button type="primary" style="" plain @click="addProjectCommodity()">
                转立项
            </el-button> -->
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
            options:map.options,
            quillOption: quillConfig,
            cpPicture:[],
            paramFile : '',
            form : {
                username : '',
                userno : '',
                email : '',
                password:'',
                status : '',
            },
        allInquiry1 : [],
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
        currentPage : 1, //初始页
        // pagesize : 5,   //每页的数据
        count : 0,
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
       this.getAllInquiry()
    //    this.getSelect()
    },
    activated(){
        this.inquiryBtn()
    },
    methods: {
        totalPrices(){//当改变值时做算法
            this.form.total_prices = this.form.ask_price_total * this.form.facto;
        },
        inquiryBtn(){
            request.post("/admin/askPrice/query",{
                plot_name : this.form.plot_name,

            }).then(res => {
            // console.log(res)
            if (res.code == 200) {
              this.allInquiry1 = res.data.list;
              console.log(this.allInquiry1)
              this.count = res.data.page.count;
              this.max = res.data.page.max;
              this.page = res.data.page.page;
              this.size = res.data.page.size;
            }
        });
        },
        getAllInquiry() {
            // this.dialogFormVisible = false;
            // request.post("/admin/askPrice/query").then(res => {
            //     // console.log(res)
            //     if (res.code == 200) {
                    
            //         this.allInquiry = res.data.list;
            //         this.count = res.data.page.count;
            //         this.max = res.data.page.max;
            //         this.page = res.data.page.page;
            //         this.size = res.data.page.size;
            //     }
            // });
        },
        addCommodity(){//点击提交按钮
            console.log(this.form)
                
                request.post("/admin//admin/create", {//发送数据到后台
                    username : this.form.username,
                    userno : this.form.userno,
                    email : this.form.email,
                    password : this.form.password,
                    status : this.form.status,
                    }).then(res => {
                        console.log(res)
                        if(res.code == 200){
                            this.$message({
                            // type: res.errno === 0 ? "success" : "warning",
                            type: "success",
                            message: '添加成功'//提示添加成功
                        });
                        // this.form = [];
                        this.$router.go(-1)
                        }
                    });
        },
        addProjectCommodity(){
            request.post("/admin/AskPrice/create", {//发送数据到后台
                    plot_name : this.form.plot_name,
                    unit_number : this.form.unit_number,
                    construct_area : this.form.construct_area,
                    ask_price : this.form.ask_price,
                    ask_univalence : this.form.ask_univalence,
                    ask_price_total : this.form.ask_price_total,

                    city : this.form.city,
                    district : this.form.district,
                    plot_address : this.form.plot_address,
                    floor : this.form.floor,
                    activate_time : this.form.activate_time,
                    house_way : this.form.house_way,
                    special_element : this.form.special_element,
                    ask_bank : this.form.ask_bank,
                    remark : this.form.remark,
                    total_floor : this.form.total_floor,
                    plot_special : this.form.plot_special,
                    total_prices : this.form.total_prices,
                    bazaar_crew : this.form.bazaar_crew,
                    factor : this.form.facto,
                    }).then(res => {
                        console.log(res)
                            if(res.code == 200){
                                this.$message({
                                // type: res.errno === 0 ? "success" : "warning",
                                type: "success",
                                message: '添加成功'//提示添加成功
                            });
                            this.$router.push({path:'/addProjectInitiation',query:{row:res.data,id:res.data.id}})
                        }
                    });
        },
        imlist(){
            
        },
        handleCurrentChange(currentPage){//换页
            // console.log(currentPage)
            this.currentPage = currentPage;
            request.post("/admin/askPrice/query",{
                plot_name : this.form.plot_name,
                page : currentPage,
            }).then(res => {
                if (res.code == 200) {
                    this.allInquiry1 = res.data.list;
                    console.log(this.allInquiry1)
                }
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
        width:300px;float:left;
    }
    el-form-item{
        width: 20% !important;
    }
    .select{
        float:left;
    }
</style>