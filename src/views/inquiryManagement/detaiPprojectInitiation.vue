<template>
    <div class="app-container">
        <div style="margin-bottom:20px;width:100%;background:rgb(48,65,85);color:white;height:30px;"><span style="float:left;margin-left:10px;margin-top:5px;font-size:15px;">报告立项详情数据</span></div>
        <el-form ref="form" :model="form" label-width="120px" style="width:90%;padding-right:50px;">
            <el-form-item label="流水号" class="form-input" prop="title" style="width:270px;float:left;">
                <el-input  disabled v-model="form.serial_number"></el-input>
            </el-form-item>

            <el-form-item label="报告号" class="form-input" prop="title" style="width:270px;float:left;">
                <el-input  disabled v-model="form.district"></el-input>
            </el-form-item>

            <el-form-item label="项目地址" class="form-input" prop="title" style="width:270px;float:left;">
                <el-input  disabled v-model="form.project_address"></el-input>
            </el-form-item>

            <el-form-item label="小区名称" class="form-input" prop="title" style="width:270px;float:left;">
                <el-input  disabled v-model="form.plot_name"></el-input>
            </el-form-item>

            <el-form-item label="受理时间" class="form-input" prop="title" style="width:270px;float:left;">
                <el-input  disabled v-model="form.create_time"></el-input>
            </el-form-item>

            <el-form-item label="项目分类" class="form-input" prop="title" style="width:270px;float:left;position:relative;">
                <el-input  disabled v-model="form.project_classify"></el-input>
            </el-form-item>
            
            <el-form-item label="物业类型" class="form-input" prop="title" style="width:270px;float:left;">
                <el-input  disabled v-model="form.property_type"></el-input>
            </el-form-item>

            <el-form-item label="估价目的" class="form-input" prop="title" style="width:270px;float:left;">
                <el-input  disabled v-model="form.inquiry_purpose"></el-input>
            </el-form-item>

            <el-form-item label="报告类型" class="form-input" prop="title" style="width:270px;float:left;">
                <el-input disabled v-model="form.report_tale"></el-input>
            </el-form-item>

            <el-form-item label="业务来源" class="form-input" prop="title" style="width:270px;float:left;">
                <el-input disabled v-model="form.activate_time"></el-input>
            </el-form-item>

            <el-form-item label="资料齐全" class="form-input" prop="title" style="width:270px;float:left;">
                <el-input  disabled v-model="form.source"></el-input>
            </el-form-item>

            <el-form-item label="业务员姓名" class="form-input" prop="title" style="width:270px;float:left;">
                <el-input  disabled v-model="form.district"></el-input>
            </el-form-item>

            <el-form-item label="受理人" class="form-input" prop="title" style="width:270px;float:left;">
                <el-input  disabled v-model="form.create_username"></el-input>
            </el-form-item>

            <el-form-item label="旧流水号" class="form-input" prop="title" style="width:270px;float:left;">
                <el-input  disabled v-model="form.district"></el-input>
            </el-form-item>

            <el-form-item label="旧报告号" class="form-input" prop="title" style="width:270px;float:left;">
                <el-input  disabled v-model="form.district"></el-input>
            </el-form-item>

              <el-form-item label="估价委托方" class="form-input" prop="title" style="width:270px;float:left;">
                <el-input  disabled v-model="form.valuation_principal"></el-input>
            </el-form-item>

            <el-form-item label="状态" class="form-input" prop="title" style="width:270px;float:left;">
                <el-input  disabled v-model="form.ask_univalence"></el-input>
            </el-form-item>

            <el-form-item label="项目状态" class="form-input" prop="title" style="width:270px;float:left;">
                <el-input  disabled v-model="form.approval_status"></el-input>
            </el-form-item>

            <el-form-item label="收费备注" class="form-input" prop="title" style="width:270px;float:left;">
                <el-input  disabled v-model="form.delivery_note"></el-input>
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
                total_prices : '',
                plot_name : '',
                city:'',
                district : '',
                total_floor:'',
                house_way : '',
                special_element : "",
                ask_bank:'',
                floor:'',
                bazaar_crew:'',
                activate_time : '',
                plot_address : "",
                ask_price_total:'',
                construct_area:'',
                ask_price:'',
                create_time : '',
                create_username : "",
                remark:'',
                show_project_staus:'',
                show_price_status:'',
                unit_number : '',
                facto : "",
                plot_special:'',
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
            request.post("/admin/project/get",{
            id : this.$route.query.id 
        }).then(res => {
            // console.log(res)
            if (res.code == 200) {
                // console.log(res)
                this.form = res.data;
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