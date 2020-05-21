<template>
    <div class="app-container">
        <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%">
        <el-form ref="form" :model="form" label-width="120px" style="width:90%;padding-right:50px;">
            <el-form-item label="审核人" class="select">
                <el-select v-model="price_check1" filterable placeholder="请选择" style="width:150px;float:left;">
                    <el-option
                    v-for="item in price_check"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
              </el-form-item>
        </el-form>


        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="updateBtn">确 定</el-button>
        </span>
        </el-dialog>

        <div style="margin-bottom:20px;width:100%;background:rgb(48,65,85);color:white;height:30px;"><span style="float:left;margin-left:10px;margin-top:5px;font-size:15px;">询价更新</span></div>
        <el-form ref="form" :model="form" label-width="120px" style="width:90%;padding-right:50px;">
            <el-form-item label="城市" class="select">
                <el-select v-model="city1" filterable placeholder="请选择产品分类" style="width:150px;float:left;">
                    <el-option
                    v-for="item in city"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
              </el-form-item>

            <el-form-item label="行政区" class="form-input" prop="title" style="width:270px;float:left;">
                <el-input  placeholder="请输入行政区" v-model="form.district"></el-input>
            </el-form-item>

            <el-form-item label="小区名称" class="form-input" prop="title" style="width:270px;float:left;">
                <el-input  placeholder="请输入小区地址" v-model="form.plot_name"></el-input>
            </el-form-item>

            <el-form-item label="小区地址" class="form-input" prop="title" style="width:270px;float:left;">
                <el-input  placeholder="请输入小区地址" v-model="form.plot_address"></el-input>
            </el-form-item>

            <el-form-item label="楼栋单元号" class="form-input" prop="title" style="width:270px;float:left;">
                <el-input  placeholder="请输入楼栋单元号" v-model="form.unit_number"></el-input>
            </el-form-item>

            <el-form-item label="建筑面积" class="form-input" prop="title" style="width:270px;float:left;position:relative;">
                <el-input  placeholder="请输入建筑面积" v-model="form.construct_area"></el-input>
            </el-form-item>
            
            <span style="margin-top:10px;float:left;">m²</span>

            <el-form-item label="所在楼层" class="form-input" prop="title" style="width:270px;float:left;">
                <el-input  placeholder="请输入所在楼层" v-model="form.floor"></el-input>
            </el-form-item>

            <el-form-item label="总楼层" class="form-input" prop="title" style="width:270px;float:left;">
                <el-input placeholder="请输入总楼层" v-model="form.total_floor"></el-input>
            </el-form-item>

            <el-form-item label="建成年代" class="form-input" prop="title" style="width:270px;float:left;">
                <el-input placeholder="请输入建成年代" v-model="form.activate_time"></el-input>
            </el-form-item>

            <el-form-item label="房屋用途" class="select">
                <el-select v-model="house_way1" filterable placeholder="请选择产品分类" style="width:150px;float:left;">
                    <el-option
                    v-for="item in house_way"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="特殊因素" class="select">
                  <el-select v-model="special_element" filterable placeholder="请选择产品分类" style="width:150px;float:left;">
                    <el-option
                    v-for="item in factor"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
              </el-form-item>

               <el-form-item label="询价银行" class="select">
                <el-select v-model="ask_bank" filterable placeholder="请选择产品分类" style="width:150px;float:left;">
                    <el-option
                    v-for="item in bank"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
              </el-form-item> 

              <el-form-item label="市场人员" class="select">
                  <el-select v-model="bazaar_crew1" filterable placeholder="请选择" style="width:150px;float:left;">
                    <el-option
                    v-for="item in bazaar_crew"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="询值人员1" class="select">
                  <el-select v-model="form.ask_price" filterable placeholder="请选择" style="width:150px;float:left;">
                    <el-option
                    v-for="item in ask_price"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="备注" class="form-input" prop="title" style="width:270px;float:left;">
                <el-input  placeholder="请输入备注" v-model="form.remark"></el-input>
            </el-form-item>

            <el-form-item label="询值单价" class="form-input" prop="title" style="width:270px;float:left;">
                <el-input  placeholder="请输入询值单价" v-model="form.ask_univalence" @change="priceChange"></el-input>
            </el-form-item>

            <el-form-item label="询值总价" class="form-input" prop="title" style="width:270px;float:left;">
                <el-input  placeholder="请输入询值总价" v-model="form.ask_price_total" ></el-input>
            </el-form-item>

            <el-form-item label="净值系数" class="select">
                <el-select v-model="factor_value1" filterable placeholder="请选择" style="width:150px;float:left;">
                    <el-option
                    v-for="item in factor_value"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <!-- <el-cascader
                style="width:180px;float:left;"
                v-model="form.facto"
                :options="options"
                :props="{checkStrictly:true}"
                clearable
                filterable
                @change="handleChange1">
                </el-cascader> -->
              </el-form-item>

              <el-form-item label="净值总价" class="form-input" prop="title" style="width:270px;float:left;">
                <el-input  placeholder="请输入净值总价" v-model="form.total_prices"></el-input>
            </el-form-item>

            <el-form-item label="小区特殊情况" class="form-input" prop="title" style="width:500px;float:left;">
                <el-input  placeholder="请输入小区特殊情况" v-model="form.plot_special"></el-input>
            </el-form-item>

        </el-form>
        <div style="width:100%;float:left;">
            
            <!-- <table>
                <tr style="font-size:14px;">
                    <td><p style="margin-top:0px;">系统价格 单价:<span style="color:red;">0000</span>元/m²</p></td>
                    <td><p style="margin-top:0px;"> 总价:<span style="color:red;">0000</span>万元</p></td>
                    <td style="visibility:hidden;">总价:<span style="color:red;">0000</span>万元</td>
                    <td>
                        <el-form>
                        <el-form-item label="" class="form-input" prop="title" style="width:200px;">
                            <p style="float:left;">市场单价</p>
                            <el-input style="float:left;width:100px;margin-top:15px;margin-left:10px;"  placeholder="" v-model="MarketPrice"></el-input>
                        </el-form-item>
                        </el-form>
                    </td>
                    <td>
                        <el-form>
                        <el-form-item label="" class="form-input" prop="title" style="width:200px;">
                            <p style="float:left;">市场总价</p>
                            <el-input style="width:100px;margin-top:15px;margin-left:10px;"  placeholder="" v-model="MarketAllPrice"></el-input>
                        </el-form-item>
                        </el-form>
                    </td>
                    <td>
                        <el-form>
                        <el-form-item label="" class="form-input" prop="title" style="width:200px;">
                            <p style="float:left;">修正单价</p>
                            <el-input style="width:100px;margin-top:15px;margin-left:10px;"  placeholder="" v-model="correctPrice"></el-input>
                        </el-form-item>
                        </el-form>
                    </td>
                </tr>
                <tr style="font-size:14px;">
                    <td style="width:250px;"><p style="margin-top:0px;">抵押价值区间 单价:<span style="color:red;">0000-0000</span>元/m²</p></td>
                    <td style=""><p style="margin-top:0px;">总价:<span style="color:red;">0000-0000</span>万元</p></td>
                    <td style="visibility:hidden;">总价:<span style="color:red;">0000</span>万元</td>
                    <td>
                        <el-form>
                        <el-form-item label="" class="form-input" prop="title" style="width:200px;">
                            <p style="float:left;">抵押单价</p>
                            <el-input style="width:100px;margin-top:15px;margin-left:10px;"  placeholder="" v-model="mortgagePrice"></el-input>
                        </el-form-item>
                        </el-form>
                    </td>
                    <td>
                        <el-form>
                        <el-form-item label="" class="form-input" prop="title" style="width:200px;">
                            <p style="float:left;">抵押总价</p>
                            <el-input style="width:100px;margin-top:15px;margin-left:10px;"  placeholder="" v-model="mortgageAllPrice"></el-input>
                        </el-form-item>
                        </el-form>
                    </td>
                    <td>
                        <el-form>
                        <el-form-item label="" class="form-input" prop="title" style="width:200px;">
                            <p style="float:left;">其它反馈</p>
                            <el-input style="width:100px;margin-top:15px;margin-left:10px;"  placeholder="" v-model="feedback"></el-input>
                        </el-form-item>
                        </el-form>
                    </td>
                </tr>
                <tr style="font-size:14px;">
                    <td>竞品平均价格 单价:<span style="color:red;">0000</span>元/m²</td>
                    <td>总价:<span style="color:red;">0000</span>万元</td>
                </tr>
            </table> -->

            <el-button type="primary" style="margin-left:60%;" plain @click="updataCommodity()">
                确认修改
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
                price_check: '',
        },

        city1:'',
        house_way1 : '',
        special_element: '',
        ask_bank:'',
        bazaar_crew1:'',
        factor_value1:'',


        MarketPrice : 0.00,
        MarketAllPrice : 0.00,
        correctPrice : 0.00,
        mortgagePrice : 0.00,
        mortgageAllPrice : 0.00,
        feedback : '',
        allInquiry : [],
        activeName: 'first',
        fileList:[],
        imageUrl : '',
        ask_price:[],
        bazaar_crew:[],
        param:[],
        price_check:[],
        price_check1:'',
        bank:[],
        city :[],
        factor:[],
        factor_value :[],
        house_way :[],
        type :[],
        priceOne : '',
        priceOneChange :'',
        ask_price1 : '',
        dialogVisible: false,

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
       this.getSelect()
    },
    methods: {
        handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
        getSelect() {//初始渲染列表方法封装
            this.dialogFormVisible = false;
            request.post("/admin/AskPrice/get",{
            id : this.$route.query.id 
        }).then(res => {
            if (res.code == 200) {
                this.form = res.data;
                this.form.ask_price = res.data.ask_price;
                this.priceOne = res.data.ask_univalence;
                
                this.city1 = res.data.city;
                this.house_way1 = res.data.house_way;
                this.special_element = res.data.special_element;
                this.ask_bank = res.data.ask_bank;
                this.bazaar_crew1 = res.data.bazaar_crew;
                this.factor_value1 = res.data.factor;
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
        updateBtn(){//确定修改
            this.dialogVisible = false;
            console.log(this.form.ask_price)
            request.post("/admin/AskPrice/update", {//发送数据到后台
                    id:this.$route.query.id,
                    plot_name : this.form.plot_name,
                    unit_number : this.form.unit_number,
                    ask_price : this.form.ask_price,
                    construct_area : this.form.construct_area,
                    ask_price : this.form.ask_price,
                    ask_univalence : this.form.ask_univalence,
                    ask_price_total : this.form.ask_price_total,
                    price_user_id : this.price_check1,

                    city : this.city1,
                    district : this.form.district,
                    plot_address : this.form.plot_address,
                    floor : this.form.floor,
                    activate_time : this.form.activate_time,
                    house_way : this.house_way1,
                    special_element : this.special_element,
                    ask_bank : this.ask_bank,
                    remark : this.form.remark,
                    total_floor : this.form.total_floor,
                    plot_special : this.form.plot_special,
                    total_prices : this.form.total_prices,
                    bazaar_crew : this.bazaar_crew1,
                    factor : this.factor_value1,
                    }).then(res => {
                        this.$message({
                            // type: res.errno === 0 ? "success" : "warning",
                            type: "success",
                            message: '修改成功'//提示修改成功
                        });
                    });
        },
        updataCommodity(){//确认修改
        if(this.priceOneChange){
            this.dialogVisible = true;
        }else{
            request.post("/admin/AskPrice/update", {//发送数据到后台
                    id:this.$route.query.id,
                    plot_name : this.form.plot_name,
                    unit_number : this.form.unit_number,
                    construct_area : this.form.construct_area,
                    ask_price : this.form.ask_price,
                    ask_univalence : this.form.ask_univalence,
                    ask_price_total : this.form.ask_price_total,

                    city : this.city1,
                    district : this.form.district,
                    plot_address : this.form.plot_address,
                    floor : this.form.floor,
                    activate_time : this.form.activate_time,
                    house_way : this.house_way1,
                    special_element : this.special_element,
                    ask_bank : this.ask_bank,
                    remark : this.form.remark,
                    total_floor : this.form.total_floor,
                    plot_special : this.form.plot_special,
                    total_prices : this.form.total_prices,
                    bazaar_crew : this.bazaar_crew1,
                    factor : this.factor_value1,
                    }).then(res => {
                        this.$message({
                            // type: res.errno === 0 ? "success" : "warning",
                            type: "success",
                            message: '修改成功'//提示修改成功
                        });
                    });
        }
        },
        priceChange(){
            if(this.form.ask_univalence-this.priceOne>=1000 ||this.priceOne-this.form.ask_univalence>=1000 ){
                this.priceOneChange = true;
            }else{
                this.priceOneChange = false;
            }
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
    .el-input__inner{
        height: 30px !important;
    }
    div.popContainer {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.3);
        z-index: 10000;
    }
</style>