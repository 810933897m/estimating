<template>
  <div class="app-container">

    <!-- <el-form ref="form" >
                <el-form-item>
                    <el-input v-model="search" style="width:600px;" placeholder="请输入查询数据"></el-input>
                    <el-button type="info" style="margin-left:0px;" plain >高级</el-button>
                    <el-button type="primary" style="" plain @click="searchBtn()">查询</el-button>
                    <el-button type="primary" style="" plain @click="BillingBtn()">添加收款</el-button>

                </el-form-item>
            </el-form> -->
      <el-form ref="form" >
        <el-form-item>
            <el-radio v-model="activeName" label="first" @change="handleClick()">未收款</el-radio>
            <el-radio v-model="activeName" label="two" @change="handleClick()">已收款</el-radio>
            <!-- <el-radio v-model="activeName" label="success" @change="handleClick()">收款成功</el-radio>
            <el-radio v-model="activeName" label="no" @change="handleClick()">收款失败</el-radio> -->
            <el-input v-model="search" style="width:200px;" placeholder="请输入查询数据"></el-input>
            <el-button type="primary" style="" plain @click="searchBtn">查询</el-button>
            <el-button type="primary" style="" v-if="activeName == 'first'" plain @click="BillingBtn()">添加收款</el-button>
        </el-form-item>
    </el-form>


      <el-table 
      class="table-picture"
      :data="agentList"
      border
       max-height="550"
      style="width: 100%;">

      <el-table-column
      width="40px"
      v-if="activeName == 'first'"
      key="1"
      align="left">
        <template slot-scope="scope" >
          <el-checkbox v-model="scope.row.checked"></el-checkbox>
        </template>
      </el-table-column>

      <el-table-column
       label="id"
      width="50px"
      key="2"
      align="center">
        <template slot-scope="scope" >
          {{scope.row.id}}
        </template>
      </el-table-column>

      <!-- <el-table-column
      label="紧急程度"
      width="120px"
      align="center">
        <template slot-scope="scope">
          {{scope.row.approval_status}}
        </template>
      </el-table-column> -->

      <el-table-column
      label="流水号"
      width="120px"
      key="5"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.serial_number" style="cursor: pointer;" @click="getInfo(scope.row)" class="nooverflow">{{scope.row.serial_number}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="报告号"
      width="150px"
      key="6"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.report_number" class="nooverflow">{{scope.row.report_number}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="应收金额"
      width="120px"
      key="7"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.money_due" class="nooverflow">{{scope.row.money_due}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="已收金额"
      key="8"
      width="120px"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.actual_charge" class="nooverflow">{{scope.row.actual_charge}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="项目地址"
      key="9"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.plot_address" class="nooverflow">{{scope.row.plot_address}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="外业状态"
      width="130px"
      key="10"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.outworker_relevance_status" class="nooverflow">{{scope.row.outworker_relevance_status}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="内业状态"
      width="100px"
      key="11"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.secretary_relevance_status" class="nooverflow">{{scope.row.secretary_relevance_status}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="二审状态"
      key="12"
      width="100px"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.secretary_relevance_check" class="nooverflow">{{scope.row.secretary_relevance_check}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="终审状态"
      key="13"
      width="100px"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.final_appraisal_check" class="nooverflow">{{scope.row.final_appraisal_check}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="财务状态"
      width="100px"
      key="14"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.finance_status" class="nooverflow">{{scope.row.finance_status}}</p>
        </template>
      </el-table-column>

      

      <!-- <el-table-column
          label="收款方式"
          v-if="activeName != 'first'"
          key="15"
          align="center">
            <template slot-scope="scope" >
              <p :title="scope.row.charge_way" class="nooverflow">{{scope.row.charge_way}}</p>
            </template>
          </el-table-column>
          
          <el-table-column
          v-if="activeName != 'first'"
          key="16"
          label="收费总金额"
          align="center">
            <template slot-scope="scope" >
              <p :title="scope.row.charge_amount_total" class="nooverflow">{{scope.row.charge_amount_total}}</p>
            </template>
          </el-table-column>

          <el-table-column
          label="收款日期"
          v-if="activeName != 'first'"
          key="17"
          align="center">
            <template slot-scope="scope" >
              <p :title="scope.row.transfer_date" class="nooverflow">{{scope.row.transfer_date}}</p>
            </template>
          </el-table-column>

          <el-table-column
          label="收款方"
          v-if="activeName != 'first'"
          key="18"
          align="center">
            <template slot-scope="scope" >
              <p :title="scope.row.transfer_personnel" class="nooverflow">{{scope.row.transfer_personnel}}</p>
            </template>
          </el-table-column>

          <el-table-column
          label="转账备注"
          v-if="activeName != 'first'"
          key="19"
          align="center">
            <template slot-scope="scope" >
              <p :title="scope.row.charge_remark" class="nooverflow">{{scope.row.charge_remark}}</p>
            </template>
          </el-table-column> -->

      <el-table-column
      label="操作"
      fixed="right"
      width="200px" align="center">
        <template slot-scope="scope">
          <!-- <el-button size="small" type="primary" @click="addRecord(scope.row)" >添加记录</el-button> -->
          <el-button size="small" type="primary" @click="printReceipt(scope.row)">打印收据</el-button>
          <el-button size="small" type="primary" @click="recordDetail(scope.row)">记录查询</el-button>
        </template>
      </el-table-column>

      <!-- <el-table-column
        label="删除"
        width="100px" align="center"
        fixed="right">
        <template slot-scope="scope">
            <el-button size="small" type="danger" @click="confirmDel(scope.row)">删除</el-button>
        </template>
      </el-table-column> -->
      
    </el-table>
    <!--*************收款记录模态框*************-->
        <el-dialog
        title="收款记录"
        :visible.sync="dialogVisibleRecordDetail"
        width="50%">

        <el-table 
        class="table-picture"
        :data="recordDetailList"
        border
        max-height="300"
        style="width: 100%;">

        <el-table-column
        label="付款方"
        align="center">
          <template slot-scope="scope" >
            <p :title="scope.row.transfer_personnel" class="nooverflow">{{scope.row.transfer_personnel}}</p>
          </template>
        </el-table-column>

        <el-table-column
        label="收款方式"
        align="center">
          <template slot-scope="scope" >
            <p :title="scope.row.charge_way" class="nooverflow">{{scope.row.charge_way}}</p>
          </template>
        </el-table-column>

        <el-table-column
        label="收款时间"
        align="center">
          <template slot-scope="scope" >
            <p :title="scope.row.transfer_date" class="nooverflow">{{scope.row.transfer_date}}</p>
          </template>
        </el-table-column>

        <el-table-column
        label="收款金额"
        width="150px"
        align="center">
          <template slot-scope="scope" >
            <p :title="scope.row.charge_amount" class="nooverflow">{{scope.row.charge_amount}}</p>
          </template>
        </el-table-column>

        <el-table-column
        label="收款备注"
        align="center">
          <template slot-scope="scope" >
            <p :title="scope.row.charge_remark" class="nooverflow">{{scope.row.charge_remark}}</p>
          </template>
        </el-table-column>
<!-- 
        <el-table-column
        label="收款状态"
        align="center">
          <template slot-scope="scope" >
            <p :title="scope.row.financial_status" class="nooverflow">{{scope.row.financial_status}}</p>
          </template>
        </el-table-column> -->

        <el-table-column
        label="收款操作人"
        width="120px"
        align="center">
          <template slot-scope="scope" >
            <p :title="scope.row.create_username" class="nooverflow">{{scope.row.create_username}}</p>
          </template>
        </el-table-column>
        
        </el-table>
            <span slot="footer" class="dialog-footer" style="margin-top:10px;">
                <el-button @click="dialogVisibleRecordDetail = false">取 消</el-button>
            </span>
        </el-dialog>
        <!--*************收款记录模态框*************-->

        <!--*************收款记录模态框*************-->
        <el-dialog
        title="收款记录"
        :visible.sync="dialogVisibleRecordDetail1"
        width="50%">

        <el-table 
        class="table-picture"
        :data="recordDetailList"
        border
        max-height="300"
        style="width: 100%;">

        <el-table-column
        label="付款方"
        align="center">
          <template slot-scope="scope" >
            <p :title="scope.row.transfer_personnel" class="nooverflow">{{scope.row.transfer_personnel}}</p>
          </template>
        </el-table-column>

        <el-table-column
        label="收款方式"
        align="center">
          <template slot-scope="scope" >
            <p :title="scope.row.charge_way" class="nooverflow">{{scope.row.charge_way}}</p>
          </template>
        </el-table-column>

        <el-table-column
        label="收款时间"
        align="center">
          <template slot-scope="scope" >
            <p :title="scope.row.transfer_date" class="nooverflow">{{scope.row.transfer_date}}</p>
          </template>
        </el-table-column>

        <el-table-column
        label="收款金额"
        width="150px"
        align="center">
          <template slot-scope="scope" >
            <p :title="scope.row.charge_amount" class="nooverflow">{{scope.row.charge_amount}}</p>
          </template>
        </el-table-column>

        <el-table-column
        label="收款备注"
        align="center">
          <template slot-scope="scope" >
            <p :title="scope.row.charge_remark" class="nooverflow">{{scope.row.charge_remark}}</p>
          </template>
        </el-table-column>
<!-- 
        <el-table-column
        label="收款状态"
        align="center">
          <template slot-scope="scope" >
            <p :title="scope.row.financial_status" class="nooverflow">{{scope.row.financial_status}}</p>
          </template>
        </el-table-column> -->

        <el-table-column
        label="收款操作人"
        width="120px"
        align="center">
          <template slot-scope="scope" >
            <p :title="scope.row.create_username" class="nooverflow">{{scope.row.create_username}}</p>
          </template>
        </el-table-column>

        </el-table>
            <span slot="footer" class="dialog-footer" style="margin-top:10px;">
                <el-button @click="dialogVisibleRecordDetail1 = false">取 消</el-button>
            </span>
        </el-dialog>
        <!--*************收款记录模态框*************-->

    <!--*************添加收款模态框*************-->
        <el-dialog
        title="添加"
        :visible.sync="dialogVisible"
        width="50%">
        <!-- :before-close="handleClose" -->
            <el-form label-width="90px">

                <el-form-item label="收款方式" class="select" >
                  <el-input placeholder="请输入收款方式" v-model="charge_way"></el-input>
                </el-form-item>

              <el-form-item label="收费金额" class="select" >
                  <el-input placeholder="请输入收费金额" v-model="charge_amount"></el-input>
                </el-form-item>

              <el-form-item label="收款日期" class="select" >
                  <el-input placeholder="请输入收款日期" v-model="transfer_date"></el-input>
                </el-form-item>
 
              <el-form-item label="收款方" class="select" >
                  <el-input placeholder="请输入收款方" v-model="transfer_personnel"></el-input>
                </el-form-item>

                <el-form-item label="转账备注" class="select" >
                  <el-input placeholder="请输入转账备注" v-model="charge_remark"></el-input>
                </el-form-item>

            </el-form>
        
            <span slot="footer" class="dialog-footer" style="margin-top:10px;">
                <el-button type="primary" @click="confirmRevision(),dialogVisible = false">保 存</el-button>
                <el-button @click="dialogVisible = false">取 消</el-button>
            </span>
        </el-dialog>
        <!--*************添加收款模态框*************-->

        <!--*************添加收款模态框*************-->
        <el-dialog
        title="添加"
        :visible.sync="dialogVisibleAdd"
        width="60%">
        <!-- :before-close="handleClose" -->
            <el-form label-width="90px" style="float:left;">

                <!-- <el-form-item label="收款方式" style="width:250px;float:left;">
                  <el-input placeholder="请输入收款方式" v-model="add.charge_way"></el-input>
                </el-form-item> -->
                <el-form-item label="收款方式" class="select" style="float:left;">
                <el-select v-model="add.charge_way" filterable placeholder="请选择" style="">
                    <el-option
                    v-for="item in charge_way1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="收费总金额" style="width:250px;float:left;" >
                  <el-input disabled placeholder="请输入收费金额" v-model="add.charge_amount_total"></el-input>
                </el-form-item>

              <!-- <el-form-item label="收款日期" style="width:250px;float:left;">
                  <el-input placeholder="请输入收款日期" v-model="add.transfer_date"></el-input>
                </el-form-item> -->
                <el-form-item label="收款日期" style="width:300px;float:left;">
                  <el-date-picker
                  v-model="add.transfer_date"
                  type="date"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  placeholder="选择收款日期">
                </el-date-picker>
              </el-form-item>

              <el-form-item label="付款方" style="width:250px;float:left;">
                  <el-input placeholder="请输入付款方" v-model="add.transfer_personnel"></el-input>
                </el-form-item>

                <el-form-item label="转账备注" style="width:250px;float:left;">
                  <el-input placeholder="请输入转账备注" v-model="add.charge_remark"></el-input>
                </el-form-item>

                <el-table 
                class="table-picture"
                :data="billingList"
                border
                max-height="200"
                style="width: 100%;">

                <el-table-column
                label="id"
                align="center">
                  <template slot-scope="scope" >
                    {{scope.row.id}}
                  </template>
                </el-table-column>

                <el-table-column
                label="流水号"
                align="center">
                  <template slot-scope="scope">
                    <p :title="scope.row.serial_number" style="cursor: pointer;" @click="getInfo(scope.row)" class="nooverflow">{{scope.row.serial_number}}</p>
                  </template>
                </el-table-column>

                <el-table-column
                label="报告编号"
                align="center">
                  <template slot-scope="scope">
                    <p :title="scope.row.report_number" class="nooverflow">{{scope.row.report_number}}</p>
                  </template>
                </el-table-column>

                <el-table-column
                label="项目地址"
                align="center">
                  <template slot-scope="scope">
                    <p :title="scope.row.project_address" class="nooverflow">{{scope.row.project_address}}</p>
                  </template>
                </el-table-column>

                <el-table-column
                label="收款金额"
                align="center">
                  <template slot-scope="scope">
                    <el-input @change="countMoney(scope.row.charge_amount)" v-model="scope.row.charge_amount"></el-input>
                    <!-- <p :title="scope.row.project_address" class="nooverflow">{{scope.row.project_address}}</p> -->
                  </template>
                </el-table-column>

                </el-table>

            </el-form>
        
            <span slot="footer" class="dialog-footer" style="margin-top:10px;">
                <el-button type="primary" @click="confirmRevisionAdd(),dialogVisibleAdd = false">保 存</el-button>
                <el-button @click="dialogVisibleAdd = false">取 消</el-button>
            </span>
        </el-dialog>
        <!--*************添加收款模态框*************-->

    <!-- *************分页************* -->
    <el-pagination
    style="margin-top:20px;"
    @current-change="handleCurrentChange"
    @size-change="handleSizeChange"
    :page-sizes="[20,50,100,150]" 
    :page-size="page"
    layout="total, sizes, prev, pager, next, jumper"
    :total="count">
    </el-pagination>
    <!-- *************分页************* -->

  </div>
</template>
<script>
import request from "@/utils/request";
// import check from "@/views/shopAdministration/checkClerk"
import map from '@/utils/city';
export default {
    data() {
      return {
        activeName : 'first',
        add:{
          charge_way : '',
          charge_amount_total : 0,
          transfer_date : '',
          transfer_personnel : '',
          charge_remark : '',
        },

        charge_way : '',
        charge_way1 : [],
        charge_amount : '',
        transfer_date : '',
        transfer_personnel : '',
        charge_remark : '',

        search : '',
        options:map.options,
        agentList : [],//列表 绑定
        billingList : [],//开票列表 绑定
        dialogFormVisible : false,//弹出框
        dialogVisible : false,//弹出框
        dialogVisibleRecordDetail : false,//弹出框
        dialogVisibleRecordDetail1 : false,//弹出框
        dialogVisibleAdd : false,//弹出框
        disa : true,
        shopId : '',//id存储
        formLabelWidth : '120px',
        Id : '',
        generateReportId:'',
        recordDetailList : [],
        report_number :'',
        report_number1 : [],
        report_number_children : '',
        report_number_children1 : [],

        //*************分页变量*************
        currentPage : 1, //初始页
        pagesize : 20,   //每页的数据
        count : 0,
        max : 1,
        page : 1,
        size :1,
       //*************分页变量*************
      }
    },
    created() {
     this.getAgentList();//渲染列表
    },
    methods: {
       handleClick(tab, event){//改变状态
        // console.log(this.activeName)
        this.agentList = [];
        if(this.activeName == 'first'){
          request.post("/admin/Financial/query").then(res => {
            if (res.code == 200) {
              this.agentList = res.data.list;
              this.count = res.data.page.count;
              this.max = res.data.page.max;
              this.page = res.data.page.page;
              this.size = res.data.page.size;
            }
        });
        }else if(this.activeName == 'two'){
          request.post("/admin/Financial/financialQuery",{
            type : 1,
          }).then(res => {
            if (res.code == 200) {
              this.agentList = res.data.list;
              this.count = res.data.page.count;
              this.max = res.data.page.max;
              this.page = res.data.page.page;
              this.size = res.data.page.size;
            }
        });
        }else if(this.activeName == 'success'){
          request.post("/admin/Financial/financialQuery",{
            type : 2,
          }).then(res => {
            if (res.code == 200) {
              this.agentList = res.data.list;
              this.count = res.data.page.count;
              this.max = res.data.page.max;
              this.page = res.data.page.page;
              this.size = res.data.page.size;
            }
        });
        }else if(this.activeName == 'no'){
          request.post("/admin/Financial/financialQuery",{
            type : 3,
          }).then(res => {
            if (res.code == 200) {
              this.agentList = res.data.list;
              this.count = res.data.page.count;
              this.max = res.data.page.max;
              this.page = res.data.page.page;
              this.size = res.data.page.size;
            }
        });
        }
      },
      confirmRevision(){//添加确定
          request.post("/admin/financial/create",{
            project_id : this.generateReportId,
            charge_way : this.charge_way,
            charge_amount : this.charge_amount,
            transfer_date : this.transfer_date,
            transfer_personnel : this.transfer_personnel,
            charge_remark : this.charge_remark,
          }).then(res => {
            if (res.code == 200) {
              // console.log(res)
              this.$message({
                // type: res.errno === 0 ? "success" : "warning",
                type: "success",
                message: '添加成功'//提示添加成功
              });
              this.getAgentList();
              this.charge_way = '';
              this.charge_amount = '';
              this.transfer_date = '';
              this.transfer_personnel = '';
              this.charge_remark = '';
            }
          });
      },
      recordDetail(row){//详情
        if(this.activeName == 'first'){
          request.post("/admin/Financial/getFinancialInfo",{
            id : row.id,
          }).then(res => {
              if (res.code == 200) {
                // console.log(res)
                this.recordDetailList =res.data.list;
              }
          });

          this.dialogVisibleRecordDetail = true;
        }else{
          // console.log('5235235235')
          request.post("/admin/Financial/financialQueryInfo",{
            id : row.id,
          }).then(res => {
              if (res.code == 200) {
                // console.log(res)
                this.recordDetailList =res.data.list;
              }
          });

          this.dialogVisibleRecordDetail1 = true;
        }
      },
      getAgentList() {//初始渲染列表方法封装
        // this.dialogFormVisible = false;
        request.post("/admin/financial/query").then(res => {
            if (res.code == 200) {
              // console.log(res)
              this.agentList = res.data.list;
              this.count = res.data.page.count;
              this.max = res.data.page.max;
              this.page = res.data.page.page;
              this.size = res.data.page.size;
            }
        });
        
        request.post("/admin/values/query",{
          type : 'settlement_method',
          name : '',
        }).then(res => {
            if (res.code == 200) {
              // console.log(res)
              this.charge_way1 = res.data;
            }
        });
    },
      addRecord(row) {//添加记录
        this.dialogVisible = true;
        this.generateReportId = row.id;
      },
      reportChange(){//报告改变
        request.post("/admin/values/query",{
          type : 'report_number_children',
          name : this.report_number,
        }).then(res => {
            if (res.code == 200) {
              // console.log(res)
              this.report_number_children1 = res.data;
            }
        });
      },
      generateReport(row){//生成报告
        // console.log(row.id)
        this.generateReportId = row.id;
      },
      getInfo(row, event, column){
        // console.log(row.id);
        window.open(row.project_info_url, '_blank')
      },
      searchBtn(){//搜索
        if(this.activeName == 'first'){
          request.post("/admin/Financial/query",{
            keyword : this.search,
          }).then(res => {
            if (res.code == 200) {
              this.agentList = res.data.list;
              this.count = res.data.page.count;
              this.max = res.data.page.max;
              this.page = res.data.page.page;
              this.size = res.data.page.size;
            }
        });
        }else if(this.activeName == 'two'){
          request.post("/admin/Financial/financialQuery",{
            type : 1,
            keyword : this.search,
          }).then(res => {
            if (res.code == 200) {
              this.agentList = res.data.list;
              this.count = res.data.page.count;
              this.max = res.data.page.max;
              this.page = res.data.page.page;
              this.size = res.data.page.size;
            }
        });
        }
      },
      addProjectInitiation(){
        // this.$router.push({path:'/addProjectInitiation'})
      },
      handleChange (value) {
        this.center = value[2];
      },
      confirmDetail(row) {//查看
        this.shopId = row.id;
        this.$router.push({path:'/detaiPprojectInitiation',query:{id:row.id}})
      },
      handleCurrentChange: function(currentPage){//换页
        this.currentPage =currentPage;
        if(this.activeName == 'first'){
          request.post("/admin/Financial/query",{
            page : currentPage,
            keyword : this.search,
            pageSize : this.pagesize,
          }).then(res => {
            if (res.code == 200) {
              this.agentList = res.data.list;
              this.count = res.data.page.count;
              this.max = res.data.page.max;
              this.page = res.data.page.page;
              this.size = res.data.page.size;
            }
        });
        }else if(this.activeName == 'two'){
          request.post("/admin/Financial/financialQuery",{
            type : 1,
            page : currentPage,
            keyword : this.search,
            pageSize : this.pagesize,
          }).then(res => {
            if (res.code == 200) {
              this.agentList = res.data.list;
              this.count = res.data.page.count;
              this.max = res.data.page.max;
              this.page = res.data.page.page;
              this.size = res.data.page.size;
            }
        });
        }
      },
      handleSizeChange: function (size) {
            this.pagesize = size;
            // console.log(this.pagesize)  //每页下拉显示数据
            // request.post("/admin/financial/query",{
            //     page : this.currentPage,
            //     keyword : this.search,
            //     pageSize : this.pagesize,
            // }).then(res => {
            //     if (res.code == 200) {
            //       this.agentList = res.data.list;
            //     }
            // })
            if(this.activeName == 'first'){
            request.post("/admin/Financial/query",{
              page : this.currentPage,
              keyword : this.search,
              pageSize : this.pagesize,
            }).then(res => {
              if (res.code == 200) {
                this.agentList = res.data.list;
                this.count = res.data.page.count;
                this.max = res.data.page.max;
                this.page = res.data.page.page;
                this.size = res.data.page.size;
              }
          });
          }else if(this.activeName == 'two'){
            request.post("/admin/Financial/financialQuery",{
              type : 1,
              page : this.currentPage,
              keyword : this.search,
              pageSize : this.pagesize,
            }).then(res => {
              if (res.code == 200) {
                this.agentList = res.data.list;
                this.count = res.data.page.count;
                this.max = res.data.page.max;
                this.page = res.data.page.page;
                this.size = res.data.page.size;
              }
            });
          }
        },

        changeAdd(id){
          console.log(id)
        },
        BillingBtn(){//开票
        this.billingList = [];
          this.agentList.forEach(element => {
            if(element.checked){
              this.billingList.push(element)
            }
          });
          console.log(this.billingList)
          this.dialogVisibleAdd = true;
        },
        countMoney(money){
          // console.log()
          let sum = 0;
          this.billingList.forEach(element => {
            sum += Number(element.charge_amount)
          });
          // console.log(sum)
          this.add.charge_amount_total = sum;
        },
        confirmRevisionAdd(){
          console.log(this.add)
          let list1={}
          let list2 = [];
          this.billingList.forEach(element => {
            list1 = {
              project_id:element.id,
              charge_amount : element.charge_amount
            }
            list2.push(list1)
          });
          console.log(list2)
          request.post("/admin/Financial/create",{
                child : list2,
                charge_amount_total : this.add.charge_amount_total,
                charge_way : this.add.charge_way,
                transfer_date : this.add.transfer_date,
                transfer_personnel : this.add.transfer_personnel,
                charge_remark : this.add.charge_remark,
          }).then(res => {
                if (res.code == 200) {
                  // this.agentList = res.data.list;
                  this.$message({
                    // type: res.errno === 0 ? "success" : "warning",
                    type: "success",
                    message: '添加成功'//提示添加成功
                  });
                  this.add = {
                    charge_amount_total : '',
                    charge_way : '',
                    transfer_date : '',
                    transfer_personnel : '',
                    charge_remark : '',
                  };
                this.handleClick();
                }
          })
        },
        printReceipt(row){//打印
          console.log(row)
        },
  }
}
</script>
<style lang="less">
  .app-container {
    .el-cascader {
      width:400px;
    }
  }
</style>