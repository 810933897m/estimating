<template>

  <div class="app-container">
    <!-- <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
    <el-tab-pane label="未审核" name="first">
      
    </el-tab-pane>

    <el-tab-pane label="已审核" name="two">
    </el-tab-pane>

    <el-form ref="form" >
        <el-form-item style="width:300px;float:left;">
            <el-input v-model="search" style="width:300px;float:left;" placeholder="请输入查询数据"></el-input>
        </el-form-item>
        <el-button type="primary" style="" plain @click="serachBtn">查询</el-button>
    </el-form> -->

    <el-form ref="form" >
        <el-form-item>
            <el-radio v-model="activeName" label="first" @change="handleClick()">未审核</el-radio>
            <el-radio v-model="activeName" label="two" @change="handleClick()">已通过</el-radio>
            <el-radio v-model="activeName" label="no" @change="handleClick()">已拒绝</el-radio>
            <el-input v-model="search" style="width:200px;" placeholder="请输入查询数据"></el-input>
            <el-button type="primary" style="" plain @click="serachBtn">查询</el-button>
        </el-form-item>
    </el-form>

    <el-table 
      class="table-picture"
      :data="agentList"
      border
       max-height="550"
      style="width: 100%;">

      <el-table-column
       label="id"
       key="1"
      width="50px"
      align="center">
        <template slot-scope="scope" >
          {{scope.row.id}}
        </template>
      </el-table-column>

      <el-table-column
      label="退款方式"
      width="120px"
      key="15"
      v-if="activeName != 'zero'"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.charge_way" class="nooverflow">{{scope.row.charge_way}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="退款总金额"
      width="120px"
      key="16"
      v-if="activeName != 'zero'"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.total_refund_amount" class="nooverflow">{{scope.row.total_refund_amount}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="退款日期"
      width="120px"
      key="17"
      v-if="activeName != 'zero'"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.transfer_date" class="nooverflow">{{scope.row.transfer_date}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="收款方"
      width="120px"
      key="18"
      v-if="activeName != 'zero'"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.transfer_personnel" class="nooverflow">{{scope.row.transfer_personnel}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="退款备注"
      width="120px"
      key="19"
      v-if="activeName != 'zero'"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.charge_remark" class="nooverflow">{{scope.row.charge_remark}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="退款状态"
      key="20"
      v-if="activeName != 'zero'"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.financial_status" class="nooverflow">{{scope.row.financial_status}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="审核状态"
      key="21"
      v-if="activeName != 'zero'"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.refund_audit_status" class="nooverflow">{{scope.row.refund_audit_status}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="审核人"
      key="22"
      v-if="activeName != 'zero'"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.refund_audit_user" class="nooverflow">{{scope.row.refund_audit_user}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="操作人"
      key="23"
      v-if="activeName != 'zero'"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.create_username" class="nooverflow">{{scope.row.create_username}}</p>
        </template>
      </el-table-column>
      
      <el-table-column
      label="操作"
      fixed="right"
      width="250px" align="center">
        <template slot-scope="scope">
          <!-- <el-button size="small" type="primary" v-if="activeName == 'first'" @click="advancedAudit(scope.row)" >转让</el-button> -->
          <el-button size="small" type="primary" v-if="activeName == 'first'" @click="submit(scope.row)" >同意</el-button>
          <el-button size="small" type="primary" v-if="activeName == 'first'" @click="refuse(scope.row)">拒绝</el-button>
          <el-button size="small" type="primary" @click="recordDetail(scope.row)">记录查询</el-button>
        </template>
      </el-table-column>
      
    </el-table>
    <!-- *************分页************* -->
    <el-pagination
    style="margin-top:20px;"
    @current-change="handleCurrentChange"
    :page-sizes="[20]" 
    :page-size="page"
    layout="total, sizes, prev, pager, next, jumper"
    :total="count">
    </el-pagination>
    <!-- *************分页************* -->
    
  <!-- </el-tabs> -->
    
    <!-- 高级审核弹出框 -->
          <el-dialog style="" :append-to-body='true' title="高级审核" :visible.sync="dialogFormVisibleAudit">
           
            <el-form ref="form" label-width="120px" :model="form" style="width:100%;">
              <div style="width:100%;position:relative;height:50px;">
              <!-- <el-form-item label="提示信息" class="form-input" prop="title" style="width:300px;float:left;">
                <el-input  placeholder="请输入提示信息" v-model="admin_desc"></el-input>
              </el-form-item> -->

              <el-form-item label="高级审核人员" class="select" style="width:300px;float:left;">
                <el-select v-model="audit" filterable style="">
                      <el-option
                      v-for="item in audit1"
                      :key="item.value"
                      :label="item.value"
                      :value="item.value">
                      </el-option>
                </el-select>
              </el-form-item>

              <el-button size="small" type="primary" style="margin-left:20px;margin-top:5px;" @click="outworkidBtn2()">确定</el-button>
              <!-- <el-button size="small" type="primary" style="margin-left:20px;margin-top:5px;" v-else @click="outworkidBtn1()">拒绝</el-button> -->
              </div>

            </el-form>
            
          </el-dialog>
          <!-- **************分配任务弹出框************** -->

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
        label="流水号"
        align="center">
          <template slot-scope="scope" >
            <p :title="scope.row.serial_number" class="nooverflow">{{scope.row.serial_number}}</p>
          </template>
        </el-table-column>

        <el-table-column
        label="报告号"
        align="center">
          <template slot-scope="scope" >
            <p :title="scope.row.report_number" class="nooverflow">{{scope.row.report_number}}</p>
          </template>
        </el-table-column>

        <el-table-column
        label="所属部门"
        align="center">
          <template slot-scope="scope" >
            <p :title="scope.row.enquiry_department" class="nooverflow">{{scope.row.enquiry_department}}</p>
          </template>
        </el-table-column>

        <el-table-column
        label="项目地址"
        width="150px"
        align="center">
          <template slot-scope="scope" >
            <p :title="scope.row.show_merge_addr" class="nooverflow">{{scope.row.show_merge_addr}}</p>
          </template>
        </el-table-column>

        <el-table-column
        label="应收金额"
        align="center">
          <template slot-scope="scope" >
            <p :title="scope.row.money_due" class="nooverflow">{{scope.row.money_due}}</p>
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
        label="实收金额"
        width="120px"
        align="center">
          <template slot-scope="scope" >
            <p :title="scope.row.actual_charge" class="nooverflow">{{scope.row.actual_charge}}</p>
          </template>
        </el-table-column>

        <el-table-column
        label="已退金额"
        width="120px"
        align="center">
          <template slot-scope="scope" >
            <p :title="scope.row.refund_amount" class="nooverflow">{{scope.row.refund_amount}}</p>
          </template>
        </el-table-column>

        </el-table>
            <span slot="footer" class="dialog-footer" style="margin-top:10px;">
                <el-button @click="dialogVisibleRecordDetail1 = false">取 消</el-button>
            </span>
        </el-dialog>
        <!--*************收款记录模态框*************-->


          <!-- 分配任务弹出框 -->
          <el-dialog style="" :append-to-body='true' title="操作" :visible.sync="dialogFormVisible">
           
            <el-form ref="form" label-width="120px" :model="form" style="width:100%;">
              <div style="width:100%;position:relative;height:50px;">
              <el-form-item label="提示信息" class="form-input" prop="title" style="width:300px;float:left;">
                <el-input  placeholder="请输入提示信息" v-model="admin_desc"></el-input>
              </el-form-item>

              <el-button size="small" type="primary" style="margin-left:20px;margin-top:5px;" v-if="tongyi" @click="outworkidBtn()">确定</el-button>
              <el-button size="small" type="primary" style="margin-left:20px;margin-top:5px;" v-else @click="outworkidBtn1()">拒绝</el-button>
              </div>

            </el-form>
            
          </el-dialog>
          <!-- **************分配任务弹出框************** -->
  </div>
</template>
<script>
import request from "@/utils/request";
// import check from "@/views/shopAdministration/checkClerk"
import map from '@/utils/city';
export default {
    data() {
      return {
        dialogVisibleRecordDetail1 : false,
        recordDetailList : [],
        audit:'',
        audit1 :[],
        tongyi : '',
        admin_desc:'',
        distribution:'1',
        search : '',
        ROW : {},
        checked:'',
        options:map.options,
        activeName: 'first',
        outworkid:'',
        outworkid1:[
          {
            value:'1',
            label: "外采用户1",
          }, {
            value:'2',
            label: "外采用户2",
          }, {
            value:'3',
            label: "外采用户3",
          }
        ],
        agentList : [{
            
        },],//列表绑定
        form:{
          user : '',
        },
        dialogFormVisible : false,//弹出框
        dialogFormVisibleAudit : false,//弹出框
        disa : true,
        shopId : '',//id存储
        formLabelWidth : '120px',
        Id : '',

        //*************分页变量*************
        // currentPage : 1, //初始页
        // pagesize : 5,   //每页的数据
        currentPage : 1,
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
      advancedAudit(row){//高级审核
      // console.log(row.id)
        this.dialogFormVisibleAudit = true;
        this.Id = row.id;
      },
      submit(row){//同意按钮
        this.tongyi = true;
        this.dialogFormVisible = true;
        this.Id = row.id;
      },
      refuse(row){//拒绝按钮
        this.tongyi = false;
        this.dialogFormVisible = true;
        this.Id = row.id;
      },
      handleClick(tab, event){//改变状态
      this.agentList =[];
        // console.log(this.activeName)
        if(this.activeName == 'first'){
          // this.getAgentList();//渲染列表
          request.post("/admin/FinancialRefund/auditQuery",{
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
        }else if(this.activeName == 'two'){
          // console.log('2')
          request.post("/admin/FinancialRefund/auditQuery",{
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
          // console.log('2')
          request.post("/admin/FinancialRefund/auditQuery",{
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
      recovery(row){//回收
        this.$confirm("您确定要回收？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消"
            }).then(() => {
                request.post("/admin/Outwork/recycle", {
                        id:row.id
                }).then(res => {
                    // res.errno === 0 && this.getList();
                    this.$message({
                        // type: res.errno === 0 ? "success" : "warning",
                        type: "success",
                        message: '回收成功！'
                    });
                }).catch(res => {
                    this.$message({
                        type: "warning",
                        message: "回收失败!"
                    });
                });
            });
      },
      getAgentList() {//初始渲染列表方法封装某人
        request.post("/admin/FinancialRefund/auditQuery",{
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
        

        request.post("/admin/values/query",{
          type : 'senior_audit',
          name : '',
        }).then(res => {
            if (res.code == 200) {
              // console.log(res)
              this.audit1 = res.data;
            }
        });

    },serachBtn(){ // 搜索功能
      if(this.activeName == 'first'){
          request.post("/admin/projectReview/query",{
          keyword : this.search,
          // page : this.currentPage,
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
          request.post("/admin/projectReview/finish",{
          keyword : this.search,
          // page : this.currentPage,
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
      recordDetail(row){//详情
        if(this.activeName == 'first'){
          request.post("/admin/FinancialRefund/getInfo",{
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
          request.post("/admin/FinancialRefund/getInfo",{
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
      AssignTasks(row){//分配任务
        this.dialogFormVisible=true;
        // console.log(row)
        this.outworkid = row.admin_id;
        this.ROW = row;
      },
      getInfo(row, event, column){//点击跳到综合页面
        // console.log(row.id);
        window.open(row.project_info_url, '_blank')
      },
      outworkidBtn2(){//高级审核确定
        request.post("/admin/projectReview/change",{
          id : this.Id,
          username : this.audit,
          // page : this.currentPage,
          }).then(res => {
              if (res.code == 200) {
                this.$message({
                    // type: res.errno === 0 ? "success" : "warning",
                    type: "success",
                    message: '转让成功'//提示转让成功
                });
                this.getAgentList();
              }
          });
        this.dialogFormVisibleAudit=false;
        this.audit = '';
      },
      outworkidBtn(){//同意确定
          request.post("/admin/RefundAudit/pass",{
          id : this.Id,
          refund_audit_remark : this.admin_desc,
          // page : this.currentPage,
          }).then(res => {
              if (res.code == 200) {
                this.$message({
                    // type: res.errno === 0 ? "success" : "warning",
                    type: "success",
                    message: '同意成功'//提示同意成功
                });
                this.getAgentList();
              }
          });
        this.dialogFormVisible=false;
        this.admin_desc = '';
      },
      outworkidBtn1(){//拒绝确定
          request.post("/admin/RefundAudit/refuse",{
          id : this.Id,
          refund_audit_remark : this.admin_desc,
          // page : this.currentPage,
          }).then(res => {
              if (res.code == 200) {
                this.$message({
                    // type: res.errno === 0 ? "success" : "warning",
                    type: "success",
                    message: '拒绝成功'//提示拒绝成功
                });
                this.getAgentList();
              }
          });
        this.dialogFormVisible=false;
        this.admin_desc = '';
      },
      updateAgent(row) {//修改按钮
        // console.log(row);
        // this.$router.push({path:'/updataInquiry',query:{id:row.id}})
      },
      confirmDetail(row) {//点击查看询价详情
         this.shopId = row.id;
          this.$router.push({path:'/detailInquiry',query:{id:row.id}})
      },
      addProject(row){//转立项
         this.$router.push({path:'/addProjectInitiation',query:{row:row,id:row.id}})
      },
      //分页
      handleCurrentChange: function(currentPage){//换页
      // console.log(currentPage)  
          this.currentPage = currentPage;
          if(this.activeName == 'first'){
            request.post("/admin/projectReview/query",{
            page : currentPage,
            keyword : this.search,
          }).then(res => {
              // console.log(res)
              if (res.code == 200) {
                this.agentList = res.data.list;
              }
          });
          }else if(this.activeName == 'two'){
            request.post("/admin/projectReview/finish",{
            page : currentPage,
            keyword : this.search,
          }).then(res => {
              // console.log(res)
              if (res.code == 200) {
                this.agentList = res.data.list;
              }
          });
          }
      },
      addCommodity(){//添加询价
        this.$router.push({path:'/addInquiry'})
      }
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