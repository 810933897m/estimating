<template>
    <div class="app-container">
        <div style="margin-bottom:20px;width:100%;background:rgb(48,65,85);color:white;height:30px;"><span style="float:left;margin-left:10px;margin-top:5px;font-size:15px;">询价基本信息</span></div>
        <el-form ref="form" :model="form" label-width="120px" style="width:90%;padding-right:50px;">
            <el-form-item class="" style="position:relative;width:300px;float:left;">
                <span style="float:left;cursor: pointer;position:absolute;left:50px;" @click="Select('enquiry_department','')">所属部门*</span>
                <el-input  style="width:180px;" placeholder="请输入"  v-model="form.enquiry_department"></el-input>
              </el-form-item>

            <el-form-item class="" style="position:relative;width:300px;float:left;">
                <span style="float:left;cursor: pointer;position:absolute;left:50px;" @click="Select('city','')">城市*</span>
                <el-input  style="width:180px;" placeholder="请输入"  v-model="form.city"></el-input>
              </el-form-item>

            <el-form-item style="position:relative;width:300px;float:left;">
                <span style="float:left;cursor: pointer;position:absolute;left:50px;" @click="Select('city_children','')">行政区*</span>
                <el-input  style="width:180px;" placeholder="请输入行政区"  v-model="form.district"></el-input>
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

            <el-form-item style="position:relative;width:300px;float:left;">
                <span style="float:left;cursor: pointer;position:absolute;left:50px;" @click="Select('house_type','')">房屋类型*</span>
                <el-input @blur="sumNum" style="width:180px;" placeholder="请输入房屋类型"  v-model="house_type"></el-input>
            </el-form-item>

            <el-form-item style="position:relative;width:300px;float:left;">
                <span style="float:left;cursor: pointer;position:absolute;left:50px;" @click="Select('house_way','')">房屋用途*</span>
                <el-input  style="width:180px;" placeholder="请输入房屋用途"  v-model="form.house_way"></el-input>
            </el-form-item>

            <el-form-item label="建筑面积" class="form-input" prop="title" style="width:300px;float:left;position:relative;">
                <el-input @change="totalPrices();sumComputed()" placeholder="请输入建筑面积" v-model="form.construct_area"></el-input>
            </el-form-item>
            
            <span style="margin-top:10px;margin-left:2px;float:left;"> </span>

            <el-form-item label="所在楼层" class="form-input" prop="title" style="width:300px;float:left;">
                <el-input  placeholder="请输入所在楼层" v-model="form.floor"></el-input>
            </el-form-item>

            <el-form-item label="总楼层" class="form-input" prop="title" style="width:300px;float:left;">
                <el-input placeholder="请输入总楼层" v-model="form.total_floor"></el-input>
            </el-form-item>

            <el-form-item label="特殊因素" class="form-input" prop="title" style="width:300px;float:left;">
                <el-input placeholder="请输入特殊因素" v-model="form.special_element"></el-input>
            </el-form-item>

            <!-- <el-form-item label="权力性质" class="form-input" prop="title" style="width:300px;float:left;">
                <el-input placeholder="请输入权力性质" v-model="form.right_nature"></el-input>
            </el-form-item> -->

            <el-form-item style="position:relative;width:300px;float:left;">
                <span style="float:left;cursor: pointer;position:absolute;left:50px;" @click="Select('right_nature','')">权利性质*</span>
                <el-input  style="width:180px;" placeholder="请输入询价银行"  v-model="form.right_nature"></el-input>
            </el-form-item>

            <el-form-item style="position:relative;width:300px;float:left;">
                <span style="float:left;cursor: pointer;position:absolute;left:50px;" @click="Select('ask_bank','')">询价银行*</span>
                <el-input  style="width:180px;" placeholder="请输入询价银行"  v-model="form.ask_bank"></el-input>
            </el-form-item>

            <el-form-item style="position:relative;width:300px;float:left;">
                <span style="float:left;cursor: pointer;position:absolute;left:50px;" @click="Select('bazaar_crew','')">市场人员*</span>
                <el-input  style="width:180px;" placeholder="请输入市场人员"  v-model="form.bazaar_crew"></el-input>
            </el-form-item>

              <el-form-item style="position:relative;width:300px;float:left;">
                <span style="float:left;cursor: pointer;position:absolute;left:50px;" @click="Select('ask_price','')">询值人员*</span>
                <el-input  style="width:180px;" placeholder="请输入询值人员"  v-model="form.ask_price"></el-input>
            </el-form-item>

            <el-form-item label="询值单价" class="form-input" prop="title" style="width:300px;float:left;">
                <el-input  @change="totalPrices();sumComputed()" placeholder="请输入询值单价" v-model="form.ask_univalence"></el-input>
            </el-form-item>

            <el-form-item  label="询值总价" class="form-input" prop="title" style="width:300px;float:left;">
                <el-input  placeholder="请输入询值总价" v-model="form.ask_price_total" @change="totalPrices();sumComputed()"></el-input>
            </el-form-item>
      
            <el-form-item style="position:relative;width:300px;float:left;">
                <span style="float:left;cursor: pointer;position:absolute;left:50px;" @click="Select('factor','')">净值系数*</span>
                <el-input  style="width:180px;" placeholder="请输入净值系数"  v-model="factor" @change="totalPrices();sumComputed()"></el-input>
            </el-form-item>

            <!-- <el-form-item  label="净值系数" class="form-input" prop="title" style="width:300px;float:left;">
                <el-input  placeholder="请输入净值系数" v-model="form.facto"></el-input>
            </el-form-item> -->

            <el-form-item label="净值总价" class="form-input" prop="title" style="width:300px;float:left;">
                <el-input placeholder="请输入净值总价" v-model="form.total_prices"></el-input>
            </el-form-item>
              <!-- <el-form-item label="净值总价" class="form-input" prop="title" style="width:250px;float:left;">
                <el-input  placeholder="请输入净值总价" v-model="form.total_prices"></el-input>
            </el-form-item> -->

            <el-form-item label="补交土地出让金" class="form-input" prop="title" style="width:300px;float:left;">
                <el-input  @change="totalPrices();sumComputed()" placeholder="请输入补交土地出让金" v-model="form.tudi"></el-input>
            </el-form-item>

            <el-form-item label="建成年代" class="form-input" prop="title" style="width:300px;float:left;">
                <el-input placeholder="请输入建成年代" v-model="form.activate_time"></el-input>
            </el-form-item>

            <el-form-item label="备注" class="form-input" prop="title" style="width:100%;float:left;">
                <el-input  placeholder="请输入备注" v-model="form.remark"></el-input>
            </el-form-item>

            <el-form-item label="小区特殊情况" class="form-input" prop="title" style="width:100%;float:left;">
                <el-input  placeholder="请输入小区特殊情况" v-model="form.plot_special"></el-input>
            </el-form-item>

            <el-form-item label="项目信息" class="form-input1" prop="title" style="">
            <el-input
            type="textarea"
            :rows="2"
            placeholder=""
            v-model="textarea">
            </el-input>
            </el-form-item>

        </el-form>
        
        <div style="width:100%;float:left;">
            <el-button type="primary" style="margin-left:30%;" plain @click="showInput()">
                询价
            </el-button>
            <el-button type="primary" style="" plain @click="addCommodity()">
                保存
            </el-button>
            <el-button type="primary" style="" plain @click="addProjectCommodity()">
                转立项
            </el-button>
            <el-button type="primary" style="" plain @click="inquiryBtn()">
                查看历史记录
            </el-button>
        </div>
        <!-- <el-form v-for="(item,index) in publickList" :key="index" ref="form" label-width="120px" style="width:100%;padding-right:50px;">
        <div style="margin-top:10px;float:left;width:100%;background:rgb(48,65,85);color:white;height:30px;"><span style="float:left;margin-left:10px;margin-top:5px;font-size:15px;">询价{{index+1}}</span></div>

            <el-form-item label="建成年代" class="form-input" prop="title" style="width:300px;float:left;">
                <el-input placeholder="请输入建成年代" v-model="form.activate_time"></el-input>
            </el-form-item>

            <el-form-item label="备注" class="form-input" prop="title" style="width:100%;float:left;">
                <el-input  placeholder="请输入备注" v-model="form.remark"></el-input>
            </el-form-item>

            <el-form-item label="小区特殊情况" class="form-input" prop="title" style="width:100%;float:left;">
                <el-input  placeholder="请输入小区特殊情况" v-model="form.plot_special"></el-input>
            </el-form-item>
            </el-form>

            <el-button type="primary" style="float:left;" plain @click="addAddress()">
                添加地址
            </el-button> -->

        <div v-show="showDiv" style="margin-top:10px;float:left;width:100%;background:rgb(48,65,85);color:white;height:30px;"><span style="float:left;margin-left:10px;margin-top:5px;font-size:15px;">询价记录</span></div>

        <!-- <div style="width:90%;float:left;margin-top:20px;">
            <el-tabs v-model="activeName" type="card"> -->
                <!-- <el-tab-pane label="历史询价记录" name="first"> -->
                    <el-table 
                    v-show="showDiv"
                    class="table-picture"
                    :data="allInquiry1"
                    border
                    @cell-dblclick="backfill"
                    style="width: 90%;margin-left:2%;">
                    
                    <el-table-column
                    label="id"
                    width="50px"
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

                    <el-table-column
                    label="操作"
                    fixed="right"
                    width="100px" 
                    align="center">
                        <template slot-scope="scope">
                            <el-button size="small" type="primary" @click="backfill(scope.row)" >回填</el-button>
                        </template>
                    </el-table-column>

                    </el-table>

                    <!-- 分页 -->
                    <el-pagination
                    v-show="showDiv"
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

        <!--*************模态框*************-->
        <el-dialog
        title="选择"
        :visible.sync="dialogVisible"
        width="50%">
                <el-button style="margin-top:10px;" v-for="(item,index) in selectBox" :key="index" @click="selectBtn(item.value)">{{item.value}}</el-button>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <!-- <el-button type="primary" @click="confirmRevision(),dialogVisible = false">修 改</el-button> -->
            </span>
        </el-dialog>
        <!--*************模态框结束*************-->
        
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
            publickList : [
                {
                    priceyears : '',
                },{
                    priceyears : '',
                }
            ],
            house_type : '',
            selecter :'',
            selecter1:[
                {
                    value : '1',
                    label : '1',
                },{
                    value : '2',
                    label : '2',
                }
            ],
            dialogVisible : false,
            textarea: '',
            showDiv : false,
            options:map.options,
            quillOption: quillConfig,
            cpPicture:[],
            paramFile : '',
            form : {
            right_nature:'',
            enquiry_department:'',
            total_prices : '',
            plot_name : '',
            city:'北京市',
            district : '朝阳区',
            total_floor:'',
            house_way : '',
            house_type : '',
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
            facto : "1",
            plot_special:'',
            tudi : '',
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
        factor:'1',
        factor_value :[],
        house_way :[],
        type :[],
        values_type : '',

        //*************分页变量*************
        currentPage : 1, //初始页
        // pagesize : 5,   //每页的数据
        count : 0,
        max : 1,
        page : 1,
        size :1,
       //*************分页变量*************
       selectBox : [],
        };
    },
    watch:{
            'house_type': function(){//监听房屋类型值改变做算法
                if(this.house_type == '商品房'){
                    this.form.tudi = '0';

                    this.form.ask_price_total =parseFloat(this.form.construct_area * this.form.ask_univalence).toFixed(2) 
                    if(this.form.ask_price_total == 'NaN'){
                        this.form.ask_price_total = 0;
                    }
                }else if(this.house_type == '成本价'){
                    this.tudiMoney =parseFloat(15.6*this.form.construct_area/10000).toFixed(2) 
                    this.form.tudi = parseFloat(15.6*this.form.construct_area/10000).toFixed(2)
                    // console.log(15.6*this.form.construct_area/10000)
                    this.form.ask_price_total = parseFloat(this.form.construct_area * this.form.ask_univalence /10000 - Number(this.form.tudi)).toFixed(2)
                    if(this.form.ask_price_total == 'NaN'){
                        this.form.ask_price_total = 0;
                    }
                }else if(this.house_type == '优惠价标准价'){
                    this.tudiMoney = parseFloat(109.2*this.form.construct_area/10000).toFixed(2);
                    this.form.tudi = parseFloat(109.2*this.form.construct_area/10000).toFixed(2);
                    // console.log(109.2*this.form.construct_area/10000)
                    this.form.ask_price_total = parseFloat(this.form.construct_area * this.form.ask_univalence /10000 - Number(this.form.tudi)).toFixed(2);
                    if(this.form.ask_price_total == 'NaN'){
                        this.form.ask_price_total = 0;
                    }
                }else if(this.house_type == '按经适管理'){
                    this.tudiMoney = parseFloat(this.form.ask_price_total*0.03).toFixed(2);
                    this.form.tudi = parseFloat(this.form.ask_price_total*0.03).toFixed(2);
                    // console.log(this.form.ask_price_total*0.03)
                    this.form.ask_price_total = parseFloat(this.form.construct_area * this.form.ask_univalence /10000 - Number(this.form.tudi)).toFixed(2);
                    if(this.form.ask_price_total == 'NaN'){
                        this.form.ask_price_total = 0;
                    }
                }else if(this.house_type == '经济适用房'){
                    this.tudiMoney =parseFloat(this.form.ask_price_total*0.1).toFixed(2);
                    this.form.tudi = parseFloat(this.form.ask_price_total*0.1).toFixed(2);
                    // console.log(this.form.ask_price_total*0.1)
                    this.form.ask_price_total = parseFloat(this.form.construct_area * this.form.ask_univalence /10000 - Number(this.form.tudi)).toFixed(2);
                    if(this.form.ask_price_total == 'NaN'){
                        this.form.ask_price_total = 0;
                    }
                }
                this.form.total_prices = parseFloat(this.form.ask_price_total * this.factor).toFixed(2);
                console.log(this.form.total_prices)
                if(this.form.total_prices == 'NaN'){
                    this.form.total_prices = 0;
                }
            },
            'factor' : function(){//监听房屋类型值改变做算法
                console.log('14142')
                // this.form.total_prices = parseFloat(this.form.ask_price_total * this.factor).toFixed(2);
                if(this.house_type == '商品房'){
                    this.form.tudi = '0';
                    this.form.ask_price_total =parseFloat(this.form.construct_area * this.form.ask_univalence).toFixed(2) 
                    if(this.form.ask_price_total == 'NaN'){
                        this.form.ask_price_total = 0;
                    }
                }else if(this.house_type == '成本价'){
                    this.tudiMoney =parseFloat(15.6*this.form.construct_area/10000).toFixed(2) 
                    this.form.tudi = parseFloat(15.6*this.form.construct_area/10000).toFixed(2)
                    // console.log(15.6*this.form.construct_area/10000)
                    this.form.ask_price_total = parseFloat(this.form.construct_area * this.form.ask_univalence /10000 - Number(this.form.tudi)).toFixed(2)
                    if(this.form.ask_price_total == 'NaN'){
                        this.form.ask_price_total = 0;
                    }
                }else if(this.house_type == '优惠价标准价'){
                    this.tudiMoney = parseFloat(109.2*this.form.construct_area/10000).toFixed(2);
                    this.form.tudi = parseFloat(109.2*this.form.construct_area/10000).toFixed(2);
                    // console.log(109.2*this.form.construct_area/10000)
                    this.form.ask_price_total = parseFloat(this.form.construct_area * this.form.ask_univalence /10000 - Number(this.form.tudi)).toFixed(2);
                    if(this.form.ask_price_total == 'NaN'){
                        this.form.ask_price_total = 0;
                    }
                }else if(this.house_type == '按经适管理'){
                    this.tudiMoney = parseFloat(this.form.ask_price_total*0.03).toFixed(2);
                    this.form.tudi = parseFloat(this.form.ask_price_total*0.03).toFixed(2);
                    // console.log(this.form.ask_price_total*0.03)
                    this.form.ask_price_total = parseFloat(this.form.construct_area * this.form.ask_univalence /10000 - Number(this.form.tudi)).toFixed(2);
                    if(this.form.ask_price_total == 'NaN'){
                        this.form.ask_price_total = 0;
                    }
                }else if(this.house_type == '经济适用房'){
                    this.tudiMoney =parseFloat(this.form.ask_price_total*0.1).toFixed(2);
                    this.form.tudi = parseFloat(this.form.ask_price_total*0.1).toFixed(2);
                    // console.log(this.form.ask_price_total*0.1)
                    this.form.ask_price_total = parseFloat(this.form.construct_area * this.form.ask_univalence /10000 - Number(this.form.tudi)).toFixed(2);
                    if(this.form.ask_price_total == 'NaN'){
                        this.form.ask_price_total = 0;
                    }
                }
                this.form.total_prices = parseFloat(this.form.ask_price_total * this.factor).toFixed(2);
                if(this.form.total_prices == 'NaN'){
                    this.form.total_prices = 0;
                }
            },
    },
    computed: {
       
    },
    created(){
        this.form.ask_price = localStorage.getItem('username')
       quillEditor,
    //    console.log(map.options)
       this.getAllInquiry(),
       this.getSelect()
    },
    activated(){
        this.inquiryBtn()
    },
    methods: {
        addAddress(){//添加地址
            this.publickList.push({
                priceyears :'',
            })
        },
        sumComputed(){
                if(this.house_type == '商品房'){
                    this.form.tudi = '0';
                    this.form.ask_price_total = this.tudiMoney =parseFloat(this.form.construct_area * this.form.ask_univalence).toFixed(2) 
                    if(this.form.ask_price_total == 'NaN'){
                        this.form.ask_price_total = 0;
                    }
                }else if(this.house_type == '成本价'){
                    this.tudiMoney =parseFloat(15.6*this.form.construct_area/10000).toFixed(2) 
                    this.form.tudi = parseFloat(15.6*this.form.construct_area/10000).toFixed(2)
                    // console.log(15.6*this.form.construct_area/10000)
                    this.form.ask_price_total = parseFloat(this.form.construct_area * this.form.ask_univalence /10000 - Number(this.form.tudi)).toFixed(2)
                    if(this.form.ask_price_total == 'NaN'){
                        this.form.ask_price_total = 0;
                    }
                }else if(this.house_type == '优惠价标准价'){
                    this.tudiMoney = parseFloat(109.2*this.form.construct_area/10000).toFixed(2);
                    this.form.tudi = parseFloat(109.2*this.form.construct_area/10000).toFixed(2);
                    // console.log(109.2*this.form.construct_area/10000)
                    this.form.ask_price_total = parseFloat(this.form.construct_area * this.form.ask_univalence /10000 - Number(this.form.tudi)).toFixed(2);
                    if(this.form.ask_price_total == 'NaN'){
                        this.form.ask_price_total = 0;
                    }
                }else if(this.house_type == '按经适管理'){
                    this.tudiMoney = parseFloat(this.form.ask_price_total*0.03).toFixed(2);
                    this.form.tudi = parseFloat(this.form.ask_price_total*0.03).toFixed(2);
                    // console.log(this.form.ask_price_total*0.03)
                    this.form.ask_price_total = parseFloat(this.form.construct_area * this.form.ask_univalence /10000 - Number(this.form.tudi)).toFixed(2);
                    if(this.form.ask_price_total == 'NaN'){
                        this.form.ask_price_total = 0;
                    }
                }else if(this.house_type == '经济适用房'){
                    this.tudiMoney =parseFloat(this.form.ask_price_total*0.1).toFixed(2);
                    this.form.tudi = parseFloat(this.form.ask_price_total*0.1).toFixed(2);
                    // console.log(this.form.ask_price_total*0.1)
                    this.form.ask_price_total = parseFloat(this.form.construct_area * this.form.ask_univalence /10000 - Number(this.form.tudi)).toFixed(2);
                    if(this.form.ask_price_total == 'NaN'){
                        this.form.ask_price_total = 0;
                    }
                }
                this.form.total_prices = parseFloat(this.form.ask_price_total * this.factor).toFixed(2);
                if(this.form.total_prices == 'NaN'){
                    this.form.total_prices = 0;
                }
        },
        showInput(){
            if(this.factor == 1){
             this.textarea =this.form.enquiry_department+this.form.plot_name+ ' '+this.form.city+this.form.district+this.form.plot_address+this.form.unit_number+' '+this.form.house_way+' 建筑面积'+this.form.construct_area+'  询值单价'+this.form.ask_univalence+'  楼层'+this.form.floor+'/'+this.form.total_floor+' '+this.form.ask_bank+' '+this.form.remark+' 询值人员'+this.form.ask_price+'  报值人'+localStorage.getItem('username')+'@'+this.form.ask_price
            }else{
             this.textarea =this.form.enquiry_department+this.form.plot_name+ ' '+this.form.city+this.form.district+this.form.plot_address+this.form.unit_number+' '+this.form.house_way+' 建筑面积'+this.form.construct_area+'  询值单价'+this.form.ask_univalence+' 询值总价'+this.form.ask_price_total+'万  楼层'+this.form.floor+'/'+this.form.total_floor+' '+this.form.ask_bank+' '+this.form.remark+' 按'+this.house_type+'管理' +' 需扣除土地出让金'+this.tudiMoney+'万 询值人员'+this.form.ask_price+'  报值人'+localStorage.getItem('username')+'@'+this.form.ask_price
            }
        },
        totalPrices(){//当改变值时做算法
            if(this.house_type == '商品房'){
                    this.form.tudi = '0';
                    this.form.ask_price_total = this.tudiMoney =parseFloat(this.form.construct_area * this.form.ask_univalence).toFixed(2) 
                    if(this.form.ask_price_total == 'NaN'){
                        this.form.ask_price_total = 0;
                    }
                }else if(this.house_type == '成本价'){
                    this.tudiMoney =parseFloat(15.6*this.form.construct_area/10000).toFixed(2) 
                    this.form.tudi = parseFloat(15.6*this.form.construct_area/10000).toFixed(2)
                    // console.log(15.6*this.form.construct_area/10000)
                    this.form.ask_price_total = parseFloat(this.form.construct_area * this.form.ask_univalence /10000 - Number(this.form.tudi)).toFixed(2)
                    if(this.form.ask_price_total == 'NaN'){
                        this.form.ask_price_total = 0;
                    }
                }else if(this.house_type == '优惠价标准价'){
                    this.tudiMoney = parseFloat(109.2*this.form.construct_area/10000).toFixed(2);
                    this.form.tudi = parseFloat(109.2*this.form.construct_area/10000).toFixed(2);
                    // console.log(109.2*this.form.construct_area/10000)
                    this.form.ask_price_total = parseFloat(this.form.construct_area * this.form.ask_univalence /10000 - Number(this.form.tudi)).toFixed(2);
                    if(this.form.ask_price_total == 'NaN'){
                        this.form.ask_price_total = 0;
                    }
                }else if(this.house_type == '按经适管理'){
                    this.tudiMoney = parseFloat(this.form.ask_price_total*0.03).toFixed(2);
                    this.form.tudi = parseFloat(this.form.ask_price_total*0.03).toFixed(2);
                    // console.log(this.form.ask_price_total*0.03)
                    this.form.ask_price_total = parseFloat(this.form.construct_area * this.form.ask_univalence /10000 - Number(this.form.tudi)).toFixed(2);
                    if(this.form.ask_price_total == 'NaN'){
                        this.form.ask_price_total = 0;
                    }
                }else if(this.house_type == '经济适用房'){
                    this.tudiMoney =parseFloat(this.form.ask_price_total*0.1).toFixed(2);
                    this.form.tudi = parseFloat(this.form.ask_price_total*0.1).toFixed(2);
                    // console.log(this.form.ask_price_total*0.1)
                    this.form.ask_price_total = parseFloat(this.form.construct_area * this.form.ask_univalence /10000 - Number(this.form.tudi)).toFixed(2);
                    if(this.form.ask_price_total == 'NaN'){
                        this.form.ask_price_total = 0;
                    }
                }
                this.form.total_prices = parseFloat(this.form.ask_price_total * this.factor).toFixed(2);
                if(this.form.total_prices == 'NaN'){
                    this.form.total_prices = 0;
                }
        },
        getSelect() {//初始渲染列表方法封装
            this.dialogFormVisible = false;
            // request.post("/admin/askPrice/param").then(res => {
            //     // console.log(res.data)
            //     if (res.code == 200) {
            //         console.log(res)
            //         this.city=res.data.param.city;//城市
            //         this.bank=res.data.param.bank;//询价银行
            //         this.factor=res.data.param.factor;//特殊因素
            //         this.factor_value=res.data.param.factor_value;//净值系数
            //         this.house_way=res.data.param.house_way;//房屋用途
            //         this.type=res.data.param.type;//房屋类型
            //         this.bazaar_crew=res.data.bazaar_crew;//市场人员
            //         this.ask_price=res.data.ask_price;//询值人员
            //         this.price_check=res.data.price_check;//价格变更审核人员
            //         console.log(this.ask_price)
            //     }
            // });
        },
        inquiryBtn(){
            this.showDiv = true;
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
                    house_type : this.house_type,
                    plot_name : this.form.plot_name,
                    right_nature : this.form.right_nature,
                    unit_number : this.form.unit_number,
                    construct_area : this.form.construct_area,
                    ask_price : this.form.ask_price,
                    ask_univalence : this.form.ask_univalence,
                    ask_price_total : this.form.ask_price_total,
                    enquiry_department : this.form.enquiry_department,
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
                    factor : this.factor,

                    land_leasing : this.form.tudi,
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
                    enquiry_department : this.form.enquiry_department,
                    house_type : this.house_type,
                    city : this.form.city,
                    district : this.form.district,
                    plot_address : this.form.plot_address,
                    floor : this.form.floor,
                    activate_time : this.form.activate_time,
                    house_way : this.form.house_way,
                    special_element : this.form.special_element,
                    ask_bank : this.form.ask_bank,
                    right_nature : this.form.right_nature,
                    remark : this.form.remark,
                    total_floor : this.form.total_floor,
                    plot_special : this.form.plot_special,
                    total_prices : this.form.total_prices,
                    bazaar_crew : this.form.bazaar_crew,
                    factor : this.factor,

                    land_leasing : this.form.tudi,
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
        backfill(row){
            // console.log(row)
            this.$confirm("您确定要覆盖？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消"
            }).then(() => {

                // console.log(this.form)
                // console.log(row)
                this.form = row;
                this.form.facto = row.factor;
                this.form.right_nature = row.right_nature;
                this.house_type = row.house_type;
                this.form.tudi = row.land_leasing;
                
            });

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
        sumNum(){//房屋类型
            
        },
        clickNode(){
            console.log(('124124'))
        },
        Select(type,name){
            this.selectBox = [];
            if(type == 'city'){
                this.dialogVisible = true;
                request.post("/admin/values/query",{
                    type : type,
                    name : name,
                }).then(res => {
                    if (res.code == 200) {
                        this.values_type = 'city';
                        this.selectBox = res.data;
                    }
                });
            }else if(type == 'city_children'){
                this.dialogVisible = true;
                request.post("/admin/values/query",{
                    type : type,
                    name : this.form.city,
                }).then(res => {
                    if (res.code == 200) {
                        this.values_type = 'city_children';
                        this.selectBox = res.data;
                    }
                });
            }else if(type == 'enquiry_department'){
                this.dialogVisible = true;
                request.post("/admin/values/query",{
                    type : type,
                    name : name,
                }).then(res => {
                    if (res.code == 200) {
                        this.values_type = 'enquiry_department';
                        this.selectBox = res.data;
                    }
                });
            }else if(type == 'house_type'){
                this.dialogVisible = true;
                request.post("/admin/values/query",{
                    type : type,
                    name : name,
                }).then(res => {
                    if (res.code == 200) {
                        this.values_type = 'house_type';
                        this.selectBox = res.data;
                    }
                });
            }else if(type == 'house_way'){
                this.dialogVisible = true;
                request.post("/admin/values/query",{
                    type : type,
                    name : name,
                }).then(res => {
                    if (res.code == 200) {
                        this.values_type = 'house_way';
                        this.selectBox = res.data;
                    }
                });
            }else if(type == 'ask_bank'){
                this.dialogVisible = true;
                request.post("/admin/values/query",{
                    type : type,
                    name : name,
                }).then(res => {
                    if (res.code == 200) {
                        this.values_type = 'ask_bank';
                        this.selectBox = res.data;
                    }
                });
            }else if(type == 'bazaar_crew'){
                this.dialogVisible = true;
                request.post("/admin/values/query",{
                    type : type,
                    name : name,
                }).then(res => {
                    if (res.code == 200) {
                        this.values_type = 'bazaar_crew';
                        this.selectBox = res.data;
                    }
                });
            }else if(type == 'ask_price'){
                this.dialogVisible = true;
                request.post("/admin/values/query",{
                    type : type,
                    name : name,
                }).then(res => {
                    if (res.code == 200) {
                        this.values_type = 'ask_price';
                        this.selectBox = res.data;
                    }
                });
            }else if(type == 'factor'){
                this.dialogVisible = true;
                request.post("/admin/values/query",{
                    type : type,
                    name : name,
                }).then(res => {
                    if (res.code == 200) {
                        this.values_type = 'factor';
                        this.selectBox = res.data;
                    }
                });
            }else if(type == 'right_nature'){
                this.dialogVisible = true;
                request.post("/admin/values/query",{
                    type : type,
                    name : name,
                }).then(res => {
                    if (res.code == 200) {
                        this.values_type = 'right_nature';
                        this.selectBox = res.data;
                    }
                });
            }
            
        },
        selectBtn(value){
            if(this.values_type == 'city'){
                this.dialogVisible = false;
                this.form.city = value;
            }else if(this.values_type == 'city_children'){
                this.dialogVisible = false;
                this.form.district = value;
            }else if(this.values_type == 'enquiry_department'){
                this.dialogVisible = false;
                this.form.enquiry_department = value;
            }else if(this.values_type == 'house_type'){
                this.dialogVisible = false;
                this.house_type = value;
            }else if(this.values_type == 'house_way'){
                this.dialogVisible = false;
                this.form.house_way = value;
            }else if(this.values_type == 'ask_bank'){
                this.dialogVisible = false;
                this.form.ask_bank = value;
            }else if(this.values_type == 'bazaar_crew'){
                this.dialogVisible = false;
                this.form.bazaar_crew = value;
            }else if(this.values_type == 'ask_price'){
                this.dialogVisible = false;
                this.form.ask_price = value;
            }else if(this.values_type == 'factor'){
                this.dialogVisible = false;
                this.factor = value;
            }else if(this.values_type == 'right_nature'){
                this.dialogVisible = false;
                this.form.right_nature = value;
            }
            
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
    .form-input1{
        width:100%;float:left;
    }
    el-form-item{
        width: 20% !important;
    }
    .select{
        float:left;
    }
</style>