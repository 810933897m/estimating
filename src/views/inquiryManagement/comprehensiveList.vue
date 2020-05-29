<template>
    <div class="app-container">
        <!-- <div  @click="back" class="backBtn" style="">x</div> -->
        <el-form ref="form" label-width="120px" style="width:90%;padding-right:50px;">
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="基本信息" name="information">
                <div style="float:left;margin-bottom:10px;width:100%;background:rgb(48,65,85);color:white;height:30px;"><span style="float:left;margin-left:10px;margin-top:5px;font-size:15px;">询价信息</span></div>
                <p>所属机构：{{information.subsidiary_organ}}</p>
                <p>分支机构：{{information.affiliated_agency}}</p>
                <p>银行人员：{{information.bank_clerk}}</p>
                <p>银行手机：{{information.bank_phone}}</p>
                <div style="float:left;margin-bottom:10px;width:100%;background:rgb(48,65,85);color:white;height:30px;"><span style="float:left;margin-left:10px;margin-top:5px;font-size:15px;">项目信息</span></div>
                <p>所属部门：{{information.subsidiary_department}}</p>
                <p>发送份数：{{information.send_num}}</p>
                <p>项目分类：{{information.project_classify}}</p>
                <p>估价目的：{{information.inquiry_purpose}}</p>
                <p>物业名称：{{information.property_type}}</p>
                <p>报告类型：{{information.report_tale}}</p>
                <p>城市：{{information.city}}</p>
                <p>小区名：{{information.plot_name}}</p>
                <p>项目地址：{{information.project_address}}</p>
                <p>证载地址：{{information.load_address}}</p>
                <p>建筑面积：{{information.construct_area}}</p>
                <p>土地面积：{{information.land_area}}</p>
                <p>单价：{{information.ask_univalence}}</p>
                <p>总价：{{information.ask_price_total}}</p>
                <p>净值总价：{{information.total_net_price}}</p>
                <p>贷款机构：{{information.lending_agency}}</p>
                <p>贷款支行：{{information.lending_bank}}</p>
                <p>估价委托方：{{information.valuation_principal}}</p>
                <p>估价委托方电话：{{information.valuation_client_phone}}</p>
                <div style="float:left;margin-bottom:10px;width:100%;background:rgb(48,65,85);color:white;height:30px;"><span style="float:left;margin-left:10px;margin-top:5px;font-size:15px;">收费信息</span></div>
                <p>市场负责人：{{information.market_leader}}</p>
                <p>是否要发票：{{information.invoice}}</p>
                <p>是否要合同：{{information.contract}}</p>
                <p>结算方式：{{information.settlement_method}}</p>
                <p>应收金额(元)：{{information.money_due}}</p>
                <p>收费备注(元)：{{information.fee_note}}</p>
                <div style="float:left;margin-bottom:10px;width:100%;background:rgb(48,65,85);color:white;height:30px;"><span style="float:left;margin-left:10px;margin-top:5px;font-size:15px;">立项备注</span></div>
                <p style="width:500px;">备注：{{information.project_approval_remark}}</p>
                
            </el-tab-pane>

                <el-tab-pane label="外业操作记录" name="field">
                    <div style="float:left;margin-bottom:20px;width:100%;background:rgb(48,65,85);color:white;height:30px;"><span style="float:left;margin-left:10px;margin-top:5px;font-size:15px;">外业基本信息</span></div>
                    <p>报告号：{{field.report_number}}</p>
                    <p>项目地址：{{field.project_address}}</p>
                    <p>报告类型：{{field.report_tale}}</p>
                    <p>外业人员：{{field.admin_username}}</p>
                    <p>外业操作时间：{{field.update_time}}</p>
                    <p>状态：{{field.status}}</p>

                    <div style="float:left;margin-bottom:20px;width:100%;background:rgb(48,65,85);color:white;height:30px;"><span style="float:left;margin-left:10px;margin-top:5px;font-size:15px;">外业分配记录</span></div>
                        <el-table 
                        class="table-picture"
                        :data="distribution"
                        border
                        max-height="550"
                        style="width: 100%;">

                        <el-table-column
                        label="分配人"
                        align="center">
                            <template slot-scope="scope" >
                            {{scope.row.create_username}}
                            </template>
                        </el-table-column>

                        <el-table-column
                        label="执行人"
                        align="center">
                            <template slot-scope="scope" >
                            {{scope.row.admin_username}}
                            </template>
                        </el-table-column>

                        <el-table-column
                        label="分配时间"
                        align="center">
                            <template slot-scope="scope" >
                            {{scope.row.create_time}}
                            </template>
                        </el-table-column>

                        

                        </el-table>

                    <div style="float:left;margin-bottom:20px;width:100%;background:rgb(48,65,85);color:white;height:30px;"><span style="float:left;margin-left:10px;margin-top:5px;font-size:15px;">外业执行记录</span></div>
                            <el-table 
                            class="table-picture"
                            :data="executionRecord"
                            border
                            max-height="550"
                            style="width: 100%;">

                            <el-table-column
                            label="id"
                            width="50px"
                            align="center">
                                <template slot-scope="scope" >
                                {{scope.row.id}}
                                </template>
                            </el-table-column>

                            <el-table-column
                            label="外业执行人"
                            align="center">
                                <template slot-scope="scope" >
                                {{scope.row.admin_username}}
                                </template>
                            </el-table-column>

                            <el-table-column
                            label="执行时间"
                            align="center">
                                <template slot-scope="scope" >
                                {{scope.row.update_time}}
                                </template>
                            </el-table-column>

                            <el-table-column
                            label="执行事件"
                            align="center">
                                <template slot-scope="scope" >
                                {{scope.row.action}}
                                </template>
                            </el-table-column>

                            <el-table-column
                            label="备注"
                            align="center">
                                <template slot-scope="scope" >
                                {{scope.row.admin_desc}}
                                </template>
                            </el-table-column>
                    </el-table>
                    
            </el-tab-pane>

            <el-tab-pane label="勘察信息" name="survey">
                <div style="float:left;margin-bottom:20px;width:100%;background:rgb(48,65,85);color:white;height:30px;"><span style="float:left;margin-left:10px;margin-top:5px;font-size:15px;">勘察信息</span></div>
                <p>是否勘察：{{survey.reconnaissance}}</p>
                <p>预留费用：{{survey.costs_reserved}}</p>
                <p>资料提供方式：{{survey.materials_offer_way}}</p>
                <div style="float:left;margin-bottom:20px;width:100%;background:rgb(48,65,85);color:white;height:30px;"><span style="float:left;margin-left:10px;margin-top:5px;font-size:15px;">勘察联系人</span></div>
                <el-table 
                class="table-picture"
                :data="surverList"
                border
                max-height="350">

                <el-table-column
                label="姓名"
                align="center">
                    <template slot-scope="scope">
                    {{scope.row.name}}
                    </template>
                </el-table-column>

                <el-table-column
                label="联系人电话"
                align="center">
                    <template slot-scope="scope">
                    {{scope.row.telephone}}
                    </template>
                </el-table-column>

                <el-table-column
                label="公司"
                align="center">
                    <template slot-scope="scope">
                    {{scope.row.company}}
                    </template>
                </el-table-column>

                <el-table-column
                label="地址"
                align="center">
                    <template slot-scope="scope">
                    {{scope.row.company_addr}}
                    </template>
                </el-table-column>

                <el-table-column
                label="邮政编码"
                align="center">
                    <template slot-scope="scope">
                    {{scope.row.post_code}}
                    </template>
                </el-table-column>

                </el-table>
            </el-tab-pane>
            <el-tab-pane label="内业操作记录" name="Interior">
                <div style="float:left;margin-bottom:20px;width:100%;background:rgb(48,65,85);color:white;height:30px;"><span style="float:left;margin-left:10px;margin-top:5px;font-size:15px;">内页基本信息</span></div>
                    <p>报告号：{{Interior.report_number}}</p>
                    <p>项目地址：{{Interior.project_address}}</p>
                    <p>报告类型：{{Interior.report_tale}}</p>
                    <p>外业人员：{{Interior.admin_username}}</p>
                    <p>外业操作时间：{{Interior.update_time}}</p>
                    <p>状态：{{Interior.status}}</p>
                
                <div style="float:left;margin-bottom:20px;width:100%;background:rgb(48,65,85);color:white;height:30px;"><span style="float:left;margin-left:10px;margin-top:5px;font-size:15px;">外业分配记录</span></div>
                        <el-table 
                        class="table-picture"
                        :data="InteriorList"
                        border
                        max-height="550"
                        style="width: 100%;">

                        <el-table-column
                        label="分配人"
                        align="center">
                            <template slot-scope="scope" >
                            {{scope.row.create_username}}
                            </template>
                        </el-table-column>

                        <el-table-column
                        label="执行人"
                        align="center">
                            <template slot-scope="scope" >
                            {{scope.row.admin_username}}
                            </template>
                        </el-table-column>
                        </el-table>

                        <el-table-column
                        label="分配时间"
                        align="center">
                            <template slot-scope="scope" >
                            {{scope.row.create_time}}
                            </template>
                        </el-table-column>

                        

                        <div style="float:left;margin-bottom:20px;width:100%;background:rgb(48,65,85);color:white;height:30px;"><span style="float:left;margin-left:10px;margin-top:5px;font-size:15px;">内业执行记录</span></div>
                            <el-table 
                            class="table-picture"
                            :data="InteriorRecord"
                            border
                            max-height="550"
                            style="width: 100%;">

                            <el-table-column
                            label="id"
                            width="50px"
                            align="center">
                                <template slot-scope="scope" >
                                {{scope.row.id}}
                                </template>
                            </el-table-column>

                            <el-table-column
                            label="外业执行人"
                            align="center">
                                <template slot-scope="scope" >
                                {{scope.row.admin_username}}
                                </template>
                            </el-table-column>

                            <el-table-column
                            label="执行时间"
                            align="center">
                                <template slot-scope="scope" >
                                {{scope.row.update_time}}
                                </template>
                            </el-table-column>

                            <el-table-column
                            label="执行事件"
                            align="center">
                                <template slot-scope="scope" >
                                {{scope.row.action}}
                                </template>
                            </el-table-column>

                            <el-table-column
                            label="备注"
                            align="center">
                                <template slot-scope="scope" >
                                {{scope.row.admin_desc}}
                                </template>
                            </el-table-column>
                    </el-table>
            </el-tab-pane>
            <el-tab-pane label="合同管理" name="contract">
                <el-form-item label="合同编号" class="form-input" prop="title" style="width:80%;">
                    <el-input disabled v-model="contract.contract_no"></el-input>
                </el-form-item>
                <el-form-item label="甲方" class="form-input" prop="title" style="width:80%;">
                    <el-input disabled v-model="contract.first_party"></el-input>
                </el-form-item>
                <el-form-item label="乙方" class="form-input" prop="title" style="width:80%;">
                    <el-input disabled  v-model="contract.second_party"></el-input>
                </el-form-item>
                
                <el-form-item label="合同内容" class="form-input" prop="title" style="width:80%;">
                    <el-input
                    
                    disabled
                    type="textarea"
                    :autosize="{ minRows: 5, maxRows: 15}"
                    v-model="contract.content">
                    </el-input>
                </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="打印 盖章 装订" name="printing">
                        <div style="float:left;margin-bottom:10px;width:100%;background:rgb(48,65,85);color:white;height:30px;"><span style="float:left;margin-left:10px;margin-top:5px;font-size:15px;">打印</span></div>
                
                            <el-table 
                            class="table-picture"
                            :data="PrintList"
                            border
                            max-height="550"
                            style="width: 100%;">

                            <el-table-column
                            label="id"
                            width="50px"
                            align="center">
                                <template slot-scope="scope" >
                                {{scope.row.id}}
                                </template>
                            </el-table-column>

                            <el-table-column
                            label="状态"
                            align="center">
                                <template slot-scope="scope" >
                                {{scope.row.type}}
                                </template>
                            </el-table-column>

                            <el-table-column
                            label="用户备注"
                            align="center">
                                <template slot-scope="scope" >
                                {{scope.row.admin_desc}}
                                </template>
                            </el-table-column>

                            <el-table-column
                            label="打印人"
                            align="center">
                                <template slot-scope="scope" >
                                {{scope.row.create_username}}
                                </template>
                            </el-table-column>

                            <el-table-column
                            label="打印时间"
                            align="center">
                                <template slot-scope="scope" >
                                {{scope.row.create_time}}
                                </template>
                            </el-table-column>

                        </el-table>
                        <div style="float:left;margin-bottom:10px;width:100%;background:rgb(48,65,85);color:white;height:30px;"><span style="float:left;margin-left:10px;margin-top:5px;font-size:15px;">盖章</span></div>
                
                        <el-table 
                            class="table-picture"
                            :data="reportSeal"
                            border
                            max-height="550"
                            style="width: 100%;">

                            <el-table-column
                            label="id"
                            width="50px"
                            align="center">
                                <template slot-scope="scope" >
                                {{scope.row.id}}
                                </template>
                            </el-table-column>

                            <el-table-column
                            label="状态"
                            align="center">
                                <template slot-scope="scope" >
                                {{scope.row.type}}
                                </template>
                            </el-table-column>

                            <el-table-column
                            label="用户备注"
                            align="center">
                                <template slot-scope="scope" >
                                {{scope.row.admin_desc}}
                                </template>
                            </el-table-column>

                            <el-table-column
                            label="盖章人"
                            align="center">
                                <template slot-scope="scope" >
                                {{scope.row.create_username}}
                                </template>
                            </el-table-column>

                            <el-table-column
                            label="盖章时间"
                            align="center">
                                <template slot-scope="scope" >
                                {{scope.row.create_time}}
                                </template>
                            </el-table-column>
                        </el-table>
                        <div style="float:left;margin-bottom:10px;width:100%;background:rgb(48,65,85);color:white;height:30px;"><span style="float:left;margin-left:10px;margin-top:5px;font-size:15px;">装订</span></div>
                
                        <el-table 
                            class="table-picture"
                            :data="reportSeal"
                            border
                            max-height="550"
                            style="width: 100%;">

                            <el-table-column
                            label="id"
                            width="50px"
                            align="center">
                                <template slot-scope="scope" >
                                {{scope.row.id}}
                                </template>
                            </el-table-column>

                            <el-table-column
                            label="状态"
                            align="center">
                                <template slot-scope="scope" >
                                {{scope.row.type}}
                                </template>
                            </el-table-column>

                            <el-table-column
                            label="用户备注"
                            align="center">
                                <template slot-scope="scope" >
                                {{scope.row.admin_desc}}
                                </template>
                            </el-table-column>

                            <el-table-column
                            label="装订人"
                            align="center">
                                <template slot-scope="scope" >
                                {{scope.row.create_username}}
                                </template>
                            </el-table-column>

                            <el-table-column
                            label="装订时间"
                            align="center">
                                <template slot-scope="scope" >
                                {{scope.row.create_time}}
                                </template>
                            </el-table-column>
                        </el-table>
            </el-tab-pane>
            <el-tab-pane label="询价查看" name="inquiry">
                <el-timeline size="large">
                    <el-timeline-item size="large" v-for="(item,index) in timestamp" :key="index" placement="top">
                        <span>{{item.create_time}}&nbsp;&nbsp;{{item.create_username}} 【{{item.operate_type}}】{{item.update_content}}</span>
                        <!-- <p size="large" v-for="(item1,ind) in item.p" :key="ind">{{item1.p}}</p> -->
                    </el-timeline-item>
                </el-timeline>
            </el-tab-pane>
            <el-tab-pane label="项目查看" name="project">
                <el-timeline size="large">
                    <el-timeline-item size="large" v-for="(item,index) in timestamp1" :key="index" placement="top">
                        <span>{{item.create_time}}&nbsp;&nbsp;{{item.create_username}} 【{{item.operate_type}}】{{item.update_content}}</span>
                        <!-- <p size="large" v-for="(item1,ind) in item.p" :key="ind">{{item1.p}}</p> -->
                    </el-timeline-item>
                </el-timeline>
            </el-tab-pane>
            <el-tab-pane label="退费" name="Refund">
                <div v-for="(item,index) in projectRefund" :key="index">
                    <p>应收金额:{{item.refund_amount}}</p>
                    <p>应退金额:{{item.refund_collector}}</p>
                    <p>退费收款人:{{item.deposit_bank}}</p>
                    <p>退款银行:{{item.bank_account}}</p>
                    <p>退款账户:{{item.project_auditor_username}}</p>
                    <p>退款审核人姓名:{{item.applying_reason}}</p>
                    <p>申请理由:{{item.charge_amount}}</p>
                    <p>已收回份数:{{item.report_back_num}}</p>
                    <p>报告回收人:{{item.report_back_principal}}</p>
                    <p>退单:{{item.exit_type}}</p>
                    <p>通过:{{item.withdraw_status}}</p>
                    <p>退费退单拒绝理由:{{item.withdraw_objection}}</p>
                    <p>退款操作人id:{{item.create_user_id}}</p>
                    <p>退款操作人:{{item.create_username}}</p>
                </div>
            </el-tab-pane>
            <el-tab-pane label="退单" name="Chargeback">
                <div v-for="(item,index) in projectcChargeback" :key="index">
                    <p>应收金额:{{item.refund_amount}}</p>
                    <p>应退金额:{{item.refund_collector}}</p>
                    <p>退费收款人:{{item.deposit_bank}}</p>
                    <p>退款银行:{{item.bank_account}}</p>
                    <p>退款账户:{{item.project_auditor_username}}</p>
                    <p>退款审核人姓名:{{item.applying_reason}}</p>
                    <p>申请理由:{{item.charge_amount}}</p>
                    <p>已收回份数:{{item.report_back_num}}</p>
                    <p>报告回收人:{{item.report_back_principal}}</p>
                    <p>退单:{{item.exit_type}}</p>
                    <p>通过:{{item.withdraw_status}}</p>
                    <p>退单拒绝理由:{{item.withdraw_objection}}</p>
                    <p>退单操作人id:{{item.create_user_id}}</p>
                    <p>退单操作人:{{item.create_username}}</p>
                </div>
            </el-tab-pane>
        </el-tabs>
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
            reportSeal : [],//盖章列表
            reportMake : [],//装订列表
            PrintList:[],//打印列表
            contract:{//合同信息
                contract_no:'',
                first_party:'',
                second_party:'',
                content:'',
            },
            surverList:[],//勘察联系人
            survey : {//勘察信息
                reconnaissance:'',
                costs_reserved :'',
                materials_offer_way:'',
            },
            executionRecord : [],//执行记录
            distribution:[],//分配记录
            InteriorRecord:[],//内页执行记录
            InteriorList:[],//内页分配
            information:{//基本信息
               subsidiary_organ : '',
               affiliated_agency : '',
               bank_clerk : '',
               bank_phone : '',
            },
            projectcChargeback:[],//退单
            projectRefund:[],//退费
            field:{
                report_number:'',
                project_address:'',
                report_tale:'',
                admin_username:'',
                update_time:'',
                status:'',
            },
            Interior:{
                report_number:'',
                project_address:'',
                report_tale:'',
                admin_username:'',
                update_time:'',
                status:'',
            },
            activeName:'information',//默认选项卡
            activeName1 : 'printingList',//打印装订默认
            fieldList : [],
            timestamp : [],
            timestamp1 : [],
        //     timestamp : [
        //   {
        //     time:'1937-5-25',
        //     p:[
        //       {
        //         p:'2212222222'
        //       },{
        //         p:'2224222222'
        //       }
        //     ]
        //   },{
        //     time:'1999-5-25',
        //     p:[
        //       {
        //         p:'222622222'
        //       },{
        //         p:'222228222'
        //       }
        //     ]
        //   },{
        //     time:'2005-2-25',
        //     p:[
        //       {
        //         p:'229222222'
        //       },{
        //         p:'222202222'
        //       }
        //     ]
        //   },{
        //     time:'2020-5-18',
        //     p:[
        //       {
        //         p:'22222222'
        //       },{
        //         p:'22222222'
        //       },{
        //         p:'22222222'
        //       },{
        //         p:'22222222'
        //       },{
        //         p:'22222222'
        //       },{
        //         p:'22222222'
        //       }
        //     ]
        //   }
        // ],
        };
    },
    computed: {
       
    },
    created(){
        this.getSelect();
    },
    methods: {
        getSelect() {//初始渲染数据
        request.post("/admin/ProjectInfo/get",{
            id : this.$route.query.id,
        }).then(res => {
                // console.log(res)
                if (res.code == 200) {
                    this.information = res.data;
                    if(!this.information){
                        this.information.subsidiary_organ = '';
                        this.information.affiliated_agency = '';
                        this.information.bank_clerk = '';
                        this.information.bank_phone = '';
                    }
                }
        });

        request.post("/admin/ProjectInfo/reportPrintMakeSeal",{//打印信息
                    id : this.$route.query.id,
                }).then(res => {
                    // console.log(res)
                    if (res.code == 200) {
                        this.PrintList = res.data.reportPrint;
                    }
                });

                request.post("/admin/ProjectInfo/reportPrintMakeSeal",{//打印信息
                    id : this.$route.query.id,
                }).then(res => {
                    // console.log(res)
                    if (res.code == 200) {
                        this.PrintList = res.data.reportPrint;
                    }
                });

                request.post("/admin/ProjectInfo/reportPrintMakeSeal",{//盖章信息
                    id : this.$route.query.id,
                }).then(res => {
                    // console.log(res)
                    if (res.code == 200) {
                        this.reportSeal = res.data.reportSeal;
                    }
                });

                request.post("/admin/ProjectInfo/askPriceLog",{//合同信息
                    id : this.$route.query.id,
                }).then(res => {
                    console.log(res)
                    if (res.code == 200) {
                        this.timestamp = res.data.list;
                        console.log(this.timestamp)
                    }
                });

                request.post("/admin/ProjectInfo/reportPrintMakeSeal",{//装订信息
                    id : this.$route.query.id,
                }).then(res => {
                    // console.log(res)
                    if (res.code == 200) {
                        this.reportMake = res.data.reportMake;
                    }
                });

                request.post("/admin/ProjectInfo/projectLog",{//项目信息
                    id : this.$route.query.id,
                }).then(res => {
                    console.log(res)
                    if (res.code == 200) {
                        this.timestamp1 = res.data.list;
                        console.log(this.timestamp1)
                    }
                });

                request.post("/admin/ProjectInfo/projectRefund",{//退费记录
                    id : this.$route.query.id,
                }).then(res => {
                    console.log(res)
                    if (res.code == 200) {
                        this.projectRefund = res.data.list;
                        console.log(this.projectRefund)
                    }
                });

                request.post("/admin/ProjectInfo/projectcChargeback",{//退单记录
                    id : this.$route.query.id,
                }).then(res => {
                    console.log(res)
                    if (res.code == 200) {
                        this.projectcChargeback = res.data.list;
                        console.log(this.projectcChargeback)
                    }
                });
        },
        handleClick(tab, event){
            if(this.activeName == 'information'){

            }else if(this.activeName == 'field'){
                request.post("/admin/ProjectInfo/outAllocation",{//分配记录
                    id : this.$route.query.id,
                }).then(res => {
                    // console.log(res)
                    if (res.code == 200) {
                        this.distribution = res.data.list;
                    }
                });

                request.post("/admin/ProjectInfo/outInfo",{//外业基本信息
                    id : this.$route.query.id,
                }).then(res => {
                    // console.log(res)
                    if (res.code == 200) {
                        this.field = res.data.list[0];
                        if(!this.field){
                            this.field.report_number = '';
                            this.field.rproject_address = '';
                            this.field.rreport_tale = '';
                            this.field.radmin_username = '';
                            this.field.rupdate_time = '';
                            this.field.rstatus = '';
                        }
                    }
                });

                 request.post("/admin/ProjectInfo/outExecute",{//执行记录
                    id : this.$route.query.id,
                }).then(res => {
                    // console.log(res)
                    if (res.code == 200) {
                        this.executionRecord = res.data.list;
                    }
                });
            }else if(this.activeName == 'survey'){//勘察
                    request.post("/admin/ProjectInfo/get",{
                        id : this.$route.query.id,
                    }).then(res => {
                        // console.log(res)
                        if (res.code == 200) {
                            this.survey = res.data;
                            this.surverList = res.data.express;
                        }
                    });
            }else if(this.activeName == 'Interior'){//内业
                request.post("/admin/ProjectInfo/secretaryAllocation",{//分配记录
                    id : this.$route.query.id,
                }).then(res => {
                    // console.log(res)
                    if (res.code == 200) {
                        this.InteriorList = res.data.list;
                    }
                });

                request.post("/admin/ProjectInfo/secretaryInfo",{//内业基本信息
                    id : this.$route.query.id,
                }).then(res => {
                    // console.log(res)
                    if (res.code == 200) {
                        this.Interior = res.data.list[0];
                        if(!this.Interior){
                            this.Interior.report_number = '';
                            this.Interior.project_address = '';
                            this.Interior.report_tale = '';
                            this.Interior.admin_username = '';
                            this.Interior.update_time = '';
                            this.Interior.status = '';
                        }
                    }
                });

                request.post("/admin/ProjectInfo/secretaryExecute",{//执行记录
                    id : this.$route.query.id,
                }).then(res => {
                    // console.log(res)
                    if (res.code == 200) {
                        this.InteriorRecord = res.data.list;
                    }
                });
            }else if(this.activeName == 'contract'){//合同管理
                request.post("/admin/ProjectInfo/contractList",{//合同信息
                    id : this.$route.query.id, 
                }).then(res => {
                    // console.log(res)
                    if (res.code == 200) {
                        this.contract = res.data.list[0];
                        // console.log(this.contract)
                    }
                });
            }else if(this.activeName == 'printing'){//打印盖章装订
            

            }else if(this.activeName == 'inquiry'){
                

            }else if(this.activeName == 'project'){
                
            }
        },
        back(){//回退到之前页面
            this.$router.go(-1)
        },
        // handleClick1(){
        //     if(this.activeName1 == 'printingList'){
        //         request.post("/admin/ProjectInfo/reportPrintMakeSeal",{//打印信息
        //             id : this.$route.query.id,
        //         }).then(res => {
        //             // console.log(res)
        //             if (res.code == 200) {
        //                 this.PrintList = res.data.reportPrint;
        //             }
        //         });
        //     }else if(this.activeName1 == 'sealList'){
        //         request.post("/admin/ProjectInfo/reportPrintMakeSeal",{//盖章信息
        //             id : this.$route.query.id,
        //         }).then(res => {
        //             // console.log(res)
        //             if (res.code == 200) {
        //                 this.reportSeal = res.data.reportSeal;
        //             }
        //         });
        //     }else if(this.activeName1 == 'bindingList'){
        //         request.post("/admin/ProjectInfo/reportPrintMakeSeal",{//装订信息
        //             id : this.$route.query.id,
        //         }).then(res => {
        //             // console.log(res)
        //             if (res.code == 200) {
        //                 this.reportMake = res.data.reportMake;
        //             }
        //         });
        //     }
        // },
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
    p{
        width:33%;float:left;
    }
    .backBtn{
        position: fixed;
        right:5%;
        margin-bottom:20px;
        width:20px;
        height:20px;
        border-radius:50%;
        background:rgb(96, 98, 102);
        color:white;
        text-align:center;
        line-height: 20px;
        cursor: pointer;
    }
    .backBtn:hover{
        cursor: pointer;
        width:20px;
        height:20px;
        border-radius:50%;
        background:rgb(92, 182, 255);
        color:white;
        text-align:center;
        line-height: 20px;
    }
</style>