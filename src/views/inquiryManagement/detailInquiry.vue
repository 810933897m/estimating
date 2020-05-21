<template>
    <div class="app-container">
        <div style="margin-bottom:20px;width:100%;background:rgb(48,65,85);color:white;height:30px;"><span style="float:left;margin-left:10px;margin-top:5px;font-size:15px;">询价详情数据</span></div>
        <el-form ref="form" :model="form" label-width="120px" style="width:90%;padding-right:50px;">
            <el-form-item label="城市" class="form-input" prop="title" style="width:270px;float:left;">
                <el-input  placeholder="请输入行政区" disabled v-model="form.city"></el-input>
            </el-form-item>

            <el-form-item label="行政区" class="form-input" prop="title" style="width:270px;float:left;">
                <el-input  placeholder="请输入行政区" disabled v-model="form.district"></el-input>
            </el-form-item>

            <el-form-item label="小区名称" class="form-input" prop="title" style="width:270px;float:left;">
                <el-input  placeholder="请输入小区地址" disabled v-model="form.plot_name"></el-input>
            </el-form-item>

            <el-form-item label="小区地址" class="form-input" prop="title" style="width:270px;float:left;">
                <el-input  placeholder="请输入小区地址" disabled v-model="form.plot_address"></el-input>
            </el-form-item>

            <el-form-item label="楼栋单元号" class="form-input" prop="title" style="width:270px;float:left;">
                <el-input  placeholder="请输入楼栋单元号" disabled v-model="form.unit_number"></el-input>
            </el-form-item>

            <el-form-item label="建筑面积" class="form-input" prop="title" style="width:270px;float:left;position:relative;">
                <el-input  placeholder="请输入建筑面积" disabled v-model="form.construct_area"></el-input>
            </el-form-item>
            
            <span style="margin-top:10px;float:left;">m²</span>

            <el-form-item label="所在楼层" class="form-input" prop="title" style="width:270px;float:left;">
                <el-input  placeholder="请输入所在楼层" disabled v-model="form.floor"></el-input>
            </el-form-item>

            <el-form-item label="总楼层" class="form-input" prop="title" style="width:270px;float:left;">
                <el-input placeholder="请输入总楼层" disabled v-model="form.total_floor"></el-input>
            </el-form-item>

            <el-form-item label="建成年代" class="form-input" prop="title" style="width:270px;float:left;">
                <el-input placeholder="请输入建成年代" disabled v-model="form.activate_time"></el-input>
            </el-form-item>

            <!-- <el-form-item label="房屋用途" class="select">
                <el-select v-model="form.house_way" disabled filterable placeholder="请选择产品分类" style="width:150px;float:left;">
                    <el-option
                    v-for="item in house_way"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
              </el-form-item> -->
              <el-form-item label="房屋用途" class="form-input" prop="title" style="width:270px;float:left;">
                <el-input disabled v-model="form.house_way"></el-input>
            </el-form-item>

              <!-- <el-form-item label="特殊因素" class="select">
                  <el-select v-model="form.special_element" disabled filterable placeholder="请选择产品分类" style="width:150px;float:left;">
                    <el-option
                    v-for="item in factor"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
              </el-form-item> -->
              <el-form-item label="特殊因素" class="form-input" prop="title" style="width:270px;float:left;">
                <el-input disabled v-model="form.special_element"></el-input>
            </el-form-item>

               <!-- <el-form-item label="询价银行" class="select">
                <el-select v-model="form.ask_bank" disabled filterable placeholder="请选择产品分类" style="width:150px;float:left;">
                    <el-option
                    v-for="item in bank"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
              </el-form-item>  -->
              <el-form-item label="询价银行" class="form-input" prop="title" style="width:270px;float:left;">
                <el-input disabled v-model="form.ask_bank"></el-input>
            </el-form-item>

              <!-- <el-form-item label="市场人员" class="select">
                  <el-select v-model="form.bazaar_crew" disabled filterable placeholder="请选择" style="width:150px;float:left;">
                    <el-option
                    v-for="item in bazaar_crew"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
              </el-form-item> -->
              <el-form-item label="询价银行" class="form-input" prop="title" style="width:270px;float:left;">
                <el-input disabled v-model="form.bazaar_crew"></el-input>
            </el-form-item>

              <!-- <el-form-item label="询值人员" class="select">
                  <el-select v-model="form.ask_price" disabled filterable placeholder="请选择" style="width:150px;float:left;">
                    <el-option
                    v-for="item in ask_price"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
              </el-form-item> -->
              <el-form-item label="询值人员" class="form-input" prop="title" style="width:270px;float:left;">
                <el-input disabled v-model="form.ask_price"></el-input>
            </el-form-item>

              <el-form-item label="备注" class="form-input" prop="title" style="width:270px;float:left;">
                <el-input  placeholder="请输入备注" disabled v-model="form.remark"></el-input>
            </el-form-item>

            <el-form-item label="询值单价" class="form-input" prop="title" style="width:270px;float:left;">
                <el-input  placeholder="请输入询值单价" disabled v-model="form.ask_univalence"></el-input>
            </el-form-item>

            <el-form-item label="询值总价" class="form-input" prop="title" style="width:270px;float:left;">
                <el-input  placeholder="请输入询值总价" disabled v-model="form.ask_price_total"></el-input>
            </el-form-item>

            <!-- <el-form-item label="净值系数" class="select">
                <el-select v-model="form.factor" disabled filterable placeholder="请选择" style="width:150px;float:left;">
                    <el-option
                    v-for="item in price_check"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
              </el-form-item> -->
              <el-form-item label="净值系数" class="form-input" prop="title" style="width:270px;float:left;">
                <el-input disabled v-model="form.factor"></el-input>
            </el-form-item>

              <el-form-item label="净值总价" class="form-input" prop="title" style="width:270px;float:left;">
                <el-input  placeholder="请输入净值总价" disabled v-model="form.total_prices"></el-input>
            </el-form-item>

            <el-form-item label="小区特殊情况" class="form-input" prop="title" style="width:500px;float:left;">
                <el-input  placeholder="请输入小区特殊情况" disabled v-model="form.plot_special"></el-input>
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