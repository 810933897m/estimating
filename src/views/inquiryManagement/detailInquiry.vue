<template>
    <div class="app-container">
        <div style="margin-bottom:20px;width:100%;background:rgb(48,65,85);color:white;height:30px;"><span style="float:left;margin-left:10px;margin-top:5px;font-size:15px;">询价详情数据</span></div>
                <el-button type="primary" style="float:left;" plain @click="back">
                    回退
                </el-button>
                <div style="float:left;">
                <p class="disab">所属部门 : {{form.enquiry_department}}</p>
                <p class="disab">城市 : {{form.city}}</p>
                <p class="disab">行政区 : {{form.district}}</p>
                <p class="disab">小区名称 : {{form.plot_name}}</p>
                <p class="disab">小区地址 : {{form.plot_address}}</p>
                <p class="disab">楼栋单元号 : {{form.unit_number}}</p>
                <p class="disab">房屋类型 : {{form.house_type}}</p>
                <p class="disab">房屋用途 : {{form.house_way}}</p>
                <p class="disab">建筑面积 : {{form.construct_area}}</p>
                <p class="disab">所在楼层 : {{form.floor}}</p>
                <p class="disab">总楼层 : {{form.total_floor}}</p>
                <p class="disab">特殊因素 : {{form.special_element}}</p>
                <p class="disab">权力性质 : {{form.right_nature}}</p>
                <p class="disab">询价银行 : {{form.ask_bank}}</p>
                <p class="disab">市场人员 : {{form.bazaar_crew}}</p>
                <p class="disab">询值人员 : {{form.ask_price}}</p>
                <p class="disab">询值单价 : {{form.ask_univalence}}</p>
                <p class="disab">询值总价 : {{form.ask_price_total}}</p>
                <p class="disab">净值系数 : {{form.factor}}</p>
                <p class="disab">净值总价 : {{form.total_prices}}</p>
                <p class="disab">补交土地出让金 : {{form.land_leasing}}</p>
                <p class="disab">建成年代 : {{form.activate_time}}</p>
                <p class="disab">备注 : {{form.remark}}</p>
                <p class="disab">小区特殊情况 : {{form.plot_special}}</p>
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
            request.post("/admin/AskPrice/get",{
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
        },
        handleChange1(){

        },
        back(){
            this.$router.go(-1)
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
    .disab{
        margin-top:15px;
        float:left;
        margin-left:20px;
        min-width: 300px;
    }
</style>