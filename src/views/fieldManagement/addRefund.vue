<template>
    <div class="app-container">
        <div style="margin-bottom:20px;width:100%;background:rgb(48,65,85);color:white;height:30px;"><span style="float:left;margin-left:10px;margin-top:5px;font-size:15px;">询价信息</span></div>
        <el-form ref="form" :model="form" label-width="120px" style="width:90%;padding-right:50px;">
            <el-form-item label="应收金额" class="form-input" prop="title" style="width:300px;float:left;">
                <el-input placeholder="请输入应收金额" v-model="form.charge_amount"></el-input>
            </el-form-item>

            <el-form-item label="退费金额" class="form-input" prop="title" style="width:300px;float:left;">
                <el-input placeholder="请输入退费金额" v-model="form.refund_amount"></el-input>
            </el-form-item>

            <el-form-item label="退费收款人" class="form-input"  prop="title">
                <el-input  placeholder="请输入退费收款人"  v-model="form.refund_collector"></el-input>
            </el-form-item>

            <el-form-item label="退款银行" class="form-input" prop="title" style="width:300px;float:left;">
                <el-input  placeholder="请输入退款银行" v-model="form.deposit_bank"></el-input>
            </el-form-item>

            <el-form-item label="退款账户" class="form-input" prop="title" style="width:300px;float:left;">
                <el-input  placeholder="请输入退款账户" v-model="form.bank_account"></el-input>
            </el-form-item>

            <el-form-item label="审核人" class="select">
                <el-select v-model="form.project_auditor_id" filterable  placeholder="请选择审核人" style="width:180px;float:left;">
                    <el-option
                    v-for="item in project_auditor_id1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
              </el-form-item>

            <el-form-item label="申请理由" class="form-input" prop="title" style="width:300px;float:left;position:relative;">
                <el-input  placeholder="请输入申请理由" v-model="form.applying_reason"></el-input>
            </el-form-item>
            
            <el-form-item label="已收回份数" class="form-input" prop="title" style="width:300px;float:left;">
                <el-input  placeholder="请输入报告已收回份数" v-model="form.report_back_num"></el-input>
            </el-form-item>

            <el-form-item label="收回负责人" class="form-input" prop="title" style="width:300px;float:left;">
                <el-input placeholder="请输入报告收回负责人" v-model="form.report_back_principal"></el-input>
            </el-form-item>

            <el-form-item label="" class="form-input" prop="title" style="width:300px;float:left;">
                <el-radio v-model="form.exit_type" label="0">退单</el-radio>
                <el-radio v-model="form.exit_type" label="1">撤单</el-radio>
            </el-form-item>

        </el-form>
        <div style="width:100%;float:left;">
            <el-button type="primary" style="" plain @click="addCommodity()">
                确认添加
            </el-button>
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
            project_auditor_id1:[],
            paramFile : '',
            form : {
                refund_amount : '',
                refund_collector : '',
                deposit_bank:'',
                bank_account : '',
                project_auditor_id:'',
                applying_reason : '',
                report_back_num : "",
                report_back_principal:'',
                charge_amount:'',
                exit_type:'0'
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
       this.getAllInquiry(),
       this.getSelect()
    },
    activated(){
        this.inquiryBtn()
    },
    methods: {
        totalPrices(){//当改变值时做算法
            this.form.total_prices = this.form.ask_price_total * this.form.facto;
        },
        getSelect() {//初始渲染列表方法封装
            this.dialogFormVisible = false;
            request.post("/admin/ProjectWithdraw/param").then(res => {
            if (res.code == 200) {
              console.log(res)
              this.project_auditor_id1 = res.data.project_auditor;
              // this.agentList = res.data.list;
            }
        });
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
                
                request.post("/admin/projectWithdraw/create", {//发送数据到后台
                    project_id:this.$route.query.id,
                    refund_amount : this.form.refund_amount,
                    refund_collector : this.form.refund_collector,
                    deposit_bank : this.form.deposit_bank,
                    bank_account : this.form.bank_account,
                    project_auditor_id : this.form.project_auditor_id,
                    applying_reason : this.form.applying_reason,
                    exit_type : this.form.exit_type,
                    charge_amount :this.form.charge_amount,

                    report_back_num	 : this.form.report_back_num,
                    report_back_principal : this.form.report_back_principal,
                    
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
            request.post("/admin/projectWithdraw/create", {//发送数据到后台
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