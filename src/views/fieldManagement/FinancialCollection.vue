<template>

  <div class="app-container">

    <el-form ref="form" >
                <el-form-item>
                    <el-input v-model="search" style="width:600px;" placeholder="流水号/报告号/项目地址/小区名称/看房联系人电话/估价委托方"></el-input>
                    <el-button type="info" style="margin-left:0px;" plain >高级</el-button>
                    <el-button type="primary" style="" plain @click="searchBtn()">查询</el-button>
                    <!-- <el-button type="info" style="margin-left:0px;" plain  @click="addProjectInitiation()">资料齐全</el-button> -->
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
      width="50px"
      align="center">
        <template slot-scope="scope" >
          {{scope.row.id}}
        </template>
      </el-table-column>

      <el-table-column
      label="流水号"
      width="120px"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.serial_number" style="cursor: pointer;" @click="getInfo(scope.row)" class="nooverflow">{{scope.row.serial_number}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="报告编号"
      width="150px"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.report_number" class="nooverflow">{{scope.row.report_number}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="应收金额"
      width="130px"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.money_due" class="nooverflow">{{scope.row.money_due}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="实收金额"
      width="130px"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.actual_charge" class="nooverflow">{{scope.row.actual_charge}}</p>
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
      label="小区名称"
      width="130px"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.plot_name" class="nooverflow">{{scope.row.plot_name}}</p>
        </template>
      </el-table-column>

      <!-- <el-table-column
      label="紧急程度"
      width="100px"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.report_tale" class="nooverflow">{{scope.row.report_tale}}</p>
        </template>
      </el-table-column> -->

      <el-table-column
      label="报告类型"
      width="100px"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.report_tale" class="nooverflow">{{scope.row.report_tale}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="物业类型"
      width="100px"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.property_type" class="nooverflow">{{scope.row.property_type}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="项目状态"
      width="100px"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.project_status" class="nooverflow">{{scope.row.project_status}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="操作"
      fixed="right"
      
      width="200px" align="center">
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="addRecord(scope.row)" >添加记录</el-button>
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
        label="收款方式"
        align="center">
          <template slot-scope="scope" >
            {{scope.row.charge_way}}
          </template>
        </el-table-column>

        <el-table-column
        label="收费金额"
        align="center">
          <template slot-scope="scope" >
            {{scope.row.charge_amount}}
          </template>
        </el-table-column>

        <el-table-column
        label="收款日期"
        align="center">
          <template slot-scope="scope" >
            {{scope.row.transfer_date}}
          </template>
        </el-table-column>

        <el-table-column
        label="收款方"
        align="center">
          <template slot-scope="scope" >
            {{scope.row.transfer_personnel}}
          </template>
        </el-table-column>

        <el-table-column
        label="转账备注"
        align="center">
          <template slot-scope="scope" >
            {{scope.row.charge_remark}}
          </template>
        </el-table-column>
        </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisibleRecordDetail = false">取 消</el-button>
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
        
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="confirmRevision(),dialogVisible = false">保 存</el-button>
                <el-button @click="dialogVisible = false">取 消</el-button>
            </span>
        </el-dialog>
        <!--*************添加收款模态框*************-->

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

  </div>
</template>
<script>
import request from "@/utils/request";
// import check from "@/views/shopAdministration/checkClerk"
import map from '@/utils/city';
export default {
    data() {
      return {
        charge_way : '',
        charge_amount : '',
        transfer_date : '',
        transfer_personnel : '',
        charge_remark : '',

        search : '',
        options:map.options,
        agentList : [],//列表 绑定
        dialogFormVisible : false,//弹出框
        dialogVisible : false,//弹出框
        dialogVisibleRecordDetail : false,//弹出框
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
        // currentPage : 1, //初始页
        // pagesize : 5,   //每页的数据
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
        this.dialogVisibleRecordDetail = true;
        request.post("/admin/financial/info",{
            id : row.id,
          }).then(res => {
            if (res.code == 200) {
              // console.log(res)
              this.recordDetailList =res.data;

            }
        });
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
        
        // request.post("/admin/projectExpress/param").then(res => {
        //     if (res.code == 200) {
        //       console.log(res)
        //     }
        // });

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
        request.post("/admin/financial/query",{
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
          request.post("/admin/financial/query",{
          page : currentPage,
          keyword : this.search,
        }).then(res => {
            if (res.code == 200) {
              this.agentList = res.data.list;
            }
        });
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