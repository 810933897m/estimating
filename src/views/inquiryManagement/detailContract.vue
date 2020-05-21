<template>
    <div class="app-container">
        <div style="margin-bottom:20px;width:100%;background:rgb(48,65,85);color:white;height:30px;"><span style="float:left;margin-left:10px;margin-top:5px;font-size:15px;">合同详情数据</span></div>
        <el-form ref="form" :model="form" label-width="120px" style="width:90%;padding-right:50px;">
            <el-form-item label="合同编号" class="form-input" prop="title" style="width:500px;">
                <el-input  disabled v-model="form.contract_no"></el-input>
            </el-form-item>

            <el-form-item label="甲方" class="form-input" prop="title" style="width:500px;">
                <el-input  disabled v-model="form.first_party"></el-input>
            </el-form-item>

            <el-form-item label="乙方" class="form-input" prop="title" style="width:500px;">
                <el-input  disabled v-model="form.second_party"></el-input>
            </el-form-item>

            <el-form-item label="合同内容" class="form-input" prop="title" style="width:500px;">
                <el-input  disabled v-model="form.content"></el-input>
            </el-form-item>
            
        </el-form>
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
                contract_no : '',
                first_party : '',
                second_party:'',
                content : '',
        },
        allInquiry : [],
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
        // currentPage : 1, //初始页
        // pagesize : 5,   //每页的数据
        count : 1,
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
        // console.log(this.$route.query.id)
       this.getSelect()
    },
    methods: {
        getSelect() {//初始渲染数据
            request.post("/admin/contractManagement/get",{
            id : this.$route.query.id 
        }).then(res => {
            // console.log(res)
            if (res.code == 200) {
                // console.log(res)
                this.form = res.data;
                // this.form.bazaar_crew = Number(res.data.bazaar_crew);
                console.log(typeof this.form.bazaar_crew)
            }
        });
        request.post("/admin/askPrice/param").then(res => {//获取选择器数据
                // console.log(res)
                if (res.code == 200) {
                    this.city=res.data.param.city;//城市
                    this.bank=res.data.param.bank;//询价银行
                    this.factor=res.data.param.factor;//特殊因素
                    this.factor_value=res.data.param.factor_value;//净值系数
                    this.house_way=res.data.param.house_way;//房屋用途
                    this.type=res.data.param.type;//房屋类型
                    
                    this.bazaar_crew=res.data.bazaar_crew;//市场人员
                    this.ask_price=res.data.ask_price;//询值人员
                    this.price_check=res.data.price_check;//价格变更审核人员
                    
                    this.price_check1 = res.data.price_check[0].value;
                    // console.log(this.ask_price)
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