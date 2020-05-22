<template>
    <div class="app-container">
        <div style="margin-bottom:20px;width:100%;background:rgb(48,65,85);color:white;height:30px;"><span style="float:left;margin-left:10px;margin-top:5px;font-size:15px;">询价信息</span></div>
        <el-form ref="form" :model="form" label-width="120px" style="width:90%;padding-right:50px;">
            <el-form-item label="城市" class="select" >
                <el-select v-model="form.city" filterable placeholder="请选择产品分类" style="width:180px;float:left;">
                    <el-option
                    v-for="item in city"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
              </el-form-item>

            <el-form-item label="行政区" class="form-input"  prop="title">
                <el-input  placeholder="请输入行政区"  v-model="form.district"></el-input>
            </el-form-item>

            <el-form-item label="小区名称" class="form-input" prop="title" style="width:300px;float:left;">
                <el-input  placeholder="请输入小区地址" v-model="form.plot_name"></el-input>
            </el-form-item>

            <el-form-item label="小区地址" class="form-input" prop="title" style="width:300px;float:left;">
                <el-input  placeholder="请输入小区地址" v-model="form.plot_address"></el-input>
            </el-form-item>

            <el-form-item label="楼栋单元号" class="form-input" prop="title" style="width:300px;float:left;">
                <el-input  placeholder="请输入楼栋单元号" v-model="form.unit_number"></el-input>
            </el-form-item>

            <el-form-item label="建筑面积" class="form-input" prop="title" style="width:300px;float:left;position:relative;">
                <el-input  placeholder="请输入建筑面积" v-model="form.construct_area"></el-input>
            </el-form-item>
            
            <span style="margin-top:10px;margin-left:2px;float:left;">m²</span>

            <el-form-item label="所在楼层" class="form-input" prop="title" style="width:300px;float:left;">
                <el-input  placeholder="请输入所在楼层" v-model="form.floor"></el-input>
            </el-form-item>

            <el-form-item label="总楼层" class="form-input" prop="title" style="width:300px;float:left;">
                <el-input placeholder="请输入总楼层" v-model="form.total_floor"></el-input>
            </el-form-item>

            <el-form-item label="建成年代" class="form-input" prop="title" style="width:300px;float:left;">
                <el-input placeholder="请输入建成年代" v-model="form.activate_time"></el-input>
            </el-form-item>

            <el-form-item label="房屋用途" class="select">
                <el-select v-model="form.house_way" filterable  placeholder="请选择产品分类" style="width:180px;float:left;">
                    <el-option
                    v-for="item in house_way"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="特殊因素" class="select">
                  <el-select v-model="form.special_element"  filterable placeholder="请选择产品分类" style="width:180px;float:left;">
                    <el-option
                    v-for="item in factor"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
              </el-form-item>

               <el-form-item label="询价银行" class="select">
                <el-select v-model="form.ask_bank" filterable placeholder="请选择产品分类" style="width:180px;float:left;">
                    <el-option
                    v-for="item in bank"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
              </el-form-item> 

              <el-form-item label="市场人员" class="select">
                  <el-select v-model="form.bazaar_crew" filterable placeholder="请选择" style="width:180px;float:left;">
                    <el-option
                    v-for="item in bazaar_crew"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="询值人员" class="select">
                  <el-select v-model="form.ask_price" filterable placeholder="请选择" style="width:180px;float:left;">
                    <el-option
                    v-for="item in ask_price"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="备注" class="form-input" prop="title" style="width:300px;float:left;">
                <el-input  placeholder="请输入备注" v-model="form.remark"></el-input>
            </el-form-item>

            <el-form-item label="询值单价" class="form-input" prop="title" style="width:300px;float:left;">
                <el-input  placeholder="请输入询值单价" v-model="form.ask_univalence"></el-input>
            </el-form-item>

            <el-form-item label="询值总价" class="form-input" prop="title" style="width:300px;float:left;">
                <el-input  placeholder="请输入询值总价" v-model="form.ask_price_total" @change="totalPrices"></el-input>
            </el-form-item>

            <el-form-item label="净值系数" class="select">
                <el-select v-model="form.facto" filterable placeholder="请选择" @change="totalPrices" style="width:180px;float:left;">
                    <el-option
                    v-for="item in factor_value"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="净值总价" class="form-input" prop="title" style="width:250px;float:left;">
                <el-input  placeholder="请输入净值总价" v-model="form.total_prices"></el-input>
            </el-form-item>

            <el-form-item label="小区特殊情况" class="form-input" prop="title" style="width:500px;float:left;">
                <el-input  placeholder="请输入小区特殊情况" v-model="form.plot_special"></el-input>
            </el-form-item>

        </el-form>
        <div style="width:100%;float:left;">
            <el-button type="primary" style="margin-left:60%;" plain @click="inquiryBtn()">
                询价
            </el-button>
            <el-button type="primary" style="" plain @click="addCommodity()">
                保存并复制
            </el-button>
            <el-button type="primary" style="" plain @click="addProjectCommodity()">
                转立项
            </el-button>
        </div>
        
        <div style="margin-top:10px;float:left;width:100%;background:rgb(48,65,85);color:white;height:30px;"><span style="float:left;margin-left:10px;margin-top:5px;font-size:15px;">询价记录</span></div>

        <!-- <div style="width:90%;float:left;margin-top:20px;">
            <el-tabs v-model="activeName" type="card"> -->
                <!-- <el-tab-pane label="历史询价记录" name="first"> -->
                    <el-table 
                    class="table-picture"
                    :data="allInquiry1"
                    border
                     
                    style="width: 90%;margin-left:5%;">
                    
                    <el-table-column
                    label="ID"
                    align="center">
                        <template slot-scope="scope">
                        {{scope.row.id}}
                        </template>
                    </el-table-column>

                    <el-table-column
                    label="小区名称"
                    align="center">
                        <template slot-scope="scope">
                        {{scope.row.plot_name}}
                        </template>
                    </el-table-column>

                    <el-table-column
                    label="城市"
                    align="center">
                        <template slot-scope="scope">
                        {{scope.row.city}}
                        </template>
                    </el-table-column>

                    <el-table-column
                    label="行政区"
                    align="center">
                        <template slot-scope="scope">
                        {{scope.row.district}}
                        </template>
                    </el-table-column>

                    <el-table-column
                    label="总楼层"
                    align="center">
                        <template slot-scope="scope">
                        {{scope.row.total_floor}}
                        </template>
                    </el-table-column>

                    <el-table-column
                    label="房屋用途"
                    align="center">
                        <template slot-scope="scope">
                        {{scope.row.house_way}}
                        </template>
                    </el-table-column>

                    <el-table-column
                    label="特殊因素"
                    align="center">
                        <template slot-scope="scope">
                        {{scope.row.special_element}}
                        </template>
                    </el-table-column>

                    <el-table-column
                    label="询价银行"
                    align="center">
                        <template slot-scope="scope">
                        {{scope.row.ask_bank}}
                        </template>
                    </el-table-column>

                    <el-table-column
                    label="所在楼层"
                    align="center">
                        <template slot-scope="scope">
                        {{scope.row.floor}}
                        </template>
                    </el-table-column>

                    <el-table-column
                    label="市场人员"
                    align="center">
                        <template slot-scope="scope">
                        {{scope.row.bazaar_crew}}
                        </template>
                    </el-table-column>
                    </el-table>

                    <!-- 分页 -->
                    <el-pagination
                    @click="imlist"
                    style="margin-top:20px;margin-left:5%;"
                    @current-change="handleCurrentChange"
                    :page-sizes="[20]" 
                    :page-size="page"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="count">
                    </el-pagination>
                    <!-- 分页 -->
                <!-- </el-tab-pane> -->
            <!-- </el-tabs>
        </div> -->
        
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
            request.post("/admin/askPrice/param").then(res => {
                
                // console.log(res.data)
                if (res.code == 200) {
                    console.log(res)
                    this.city=res.data.param.city;//城市
                    this.bank=res.data.param.bank;//询价银行
                    this.factor=res.data.param.factor;//特殊因素
                    this.factor_value=res.data.param.factor_value;//净值系数
                    this.house_way=res.data.param.house_way;//房屋用途
                    this.type=res.data.param.type;//房屋类型
                    
                    this.bazaar_crew=res.data.bazaar_crew;//市场人员
                    this.ask_price=res.data.ask_price;//询值人员
                    this.price_check=res.data.price_check;//价格变更审核人员
                    console.log(this.ask_price)
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
                    //     this.form.forEach(item => {
                    //     console.log(item)
                    //     if(item == ''){
                    //         this.$message({
                    //             // type: res.errno === 0 ? "success" : "warning",
                    //             type: "warning",
                    //             message: '请核实是否全部填写完成！'//提示未核实
                    //         });
                    //     }
                    // });
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