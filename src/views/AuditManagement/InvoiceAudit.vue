<template>

  <div class="app-container">
    <el-form ref="form" >
        <el-form-item>
            <el-radio v-model="activeName" label="first" @change="handleClick()">未审核</el-radio>
            <el-radio v-model="activeName" label="success" @change="handleClick()">已审核</el-radio>
            <el-radio v-model="activeName" label="no" @change="handleClick()">审核失败</el-radio>
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

      <!-- <el-table-column
          v-if="activeName == 'first'"
          width="40px"
          key="1"
          align="left">
            <template slot-scope="scope" >
              <el-checkbox v-model="scope.row.checked"></el-checkbox>
            </template>
      </el-table-column> -->

      <el-table-column
       label="id"
      width="50px"
      key="2222"
      align="center">
        <template slot-scope="scope" >
          {{scope.row.id}}
        </template>
      </el-table-column>

      <!-- <el-table-column
      label="流水号"
      width="120px"
      key="5"
      v-if="activeName == 'first'"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.serial_number" style="cursor: pointer;" @click="getInfo(scope.row)" class="nooverflow">{{scope.row.serial_number}}</p>
        </template>
      </el-table-column> -->


      <!-- <el-table-column
      label="小区名称"
      width="100px"
      key="11"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.plot_name" class="nooverflow">{{scope.row.plot_name}}</p>
        </template>
      </el-table-column> -->

      <el-table-column
      label="受理时间"
      key="12"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.create_time" class="nooverflow">{{scope.row.create_time}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="开票备注"
      width="100px"
      key="9222"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.invoice_note" class="nooverflow">{{scope.row.invoice_note}}</p>
        </template>
      </el-table-column>

      <el-table-column
          label="开票类型"
          key="15"
          align="center">
            <template slot-scope="scope" >
              <p :title="scope.row.invoice_type" class="nooverflow">{{scope.row.invoice_type}}</p>
            </template>
          </el-table-column>
          
          <el-table-column
          key="16"
          label="名称"
          align="center">
            <template slot-scope="scope" >
              <p :title="scope.row.invoice_company" class="nooverflow">{{scope.row.invoice_company}}</p>
            </template>
          </el-table-column>

          <el-table-column
          label="纳税人识别码"
          key="17"
          align="center">
            <template slot-scope="scope" >
              <p :title="scope.row.taxpayer_identification" class="nooverflow">{{scope.row.taxpayer_identification}}</p>
            </template>
          </el-table-column>

          <el-table-column
          label="发票金额"
          key="18"
          align="center">
            <template slot-scope="scope" >
              <p :title="scope.row.invoice_money_total" class="nooverflow">{{scope.row.invoice_money_total}}</p>
            </template>
          </el-table-column>

          <!-- <el-table-column
          label="开票人姓名"
          align="center">
            <template slot-scope="scope" >
              {{scope.row.invoice_username}}
            </template>
          </el-table-column> -->

          <el-table-column
          label="开户行"
          key="20"
          align="center">
            <template slot-scope="scope" >
              <p :title="scope.row.invoice_bank" class="nooverflow">{{scope.row.invoice_bank}}</p>
            </template>
          </el-table-column>

          <el-table-column
          key="21"
          label="开户账户"
          align="center">
            <template slot-scope="scope" >
              <p :title="scope.row.invoice_bank_card" class="nooverflow">{{scope.row.invoice_bank_card}}</p>
            </template>
          </el-table-column>

      <el-table-column
      label="操作"
      fixed="right"
      v-if="activeName == 'first'"
      width="150px" align="center">
        <template slot-scope="scope">
          <el-button size="small" type="primary" v-if="activeName == 'first'" @click="AssignTasks(scope.row)" >同意</el-button>
          <!-- <el-button size="small" type="primary" v-if="activeName == 'first'" @click="AssignTasks1(scope.row)" >拒绝</el-button> -->
          <!-- <el-button size="small" type="primary" v-else-if="activeName == 'two'" @click="AssignTasks(scope.row)">重新分配</el-button> -->
          <!-- <div v-show="dialogFormVisible" class="dialog-box"></div> -->

          <!-- <el-button size="small" type="info" @click="confirmDetail(scope.row)">查看</el-button>
          <el-button v-if="!scope.row.project_status" size="small" type="primary" @click="addProject(scope.row)" >转立项</el-button> -->
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

          <!--*************添加收款模态框*************-->
        <el-dialog
        title="添加"
        :visible.sync="dialogFormVisible"
        width="50%">
        <!-- :before-close="handleClose" -->
            <el-form label-width="90px">

                <el-form-item v-if="passShow" label="发票号" class="form-input" prop="title" style="">
                    <!-- <el-input  placeholder="请输入" v-model="invoice_number"></el-input> -->
                    <el-input
                    placeholder="请输入"
                    type="textarea"
                    :autosize="{ minRows: 5, maxRows: 10}"
                    v-model="invoice_number">
                    </el-input>
                </el-form-item>

                  <el-form-item label="审核建议" class="form-input" prop="title" style="">
                    <el-input  placeholder="请输入" v-model="admin_desc"></el-input>
                </el-form-item>
                <!-- <el-button v-if="passShow" size="small" type="primary" style="float:left;margin-left:20px;margin-top:5px;" @click="outworkidBtn()">确定</el-button>
                <el-button v-if="!passShow" size="small" type="primary" style="float:left;margin-left:20px;margin-top:5px;" @click="outworkidBtn1()">确定</el-button> -->
            </el-form>
        
            <span slot="footer" class="dialog-footer" style="margin-top:10px;">
                <el-button v-if="passShow" type="primary" @click="outworkidBtn(),dialogFormVisible = false">保 存</el-button>
                <el-button v-if="!passShow" type="primary" @click="outworkidBtn(),dialogFormVisible = false">保 存</el-button>

                <el-button @click="dialogFormVisible = false">取 消</el-button>
            </span>
        </el-dialog>
        <!--*************添加收款模态框*************-->
    
          
  </div>
</template>
<script>
import request from "@/utils/request";
// import check from "@/views/shopAdministration/checkClerk"
import map from '@/utils/city';
export default {
    data() {
      return {
        old_price: '',
        new_price: '',
        ask_univalence:'',
        distribution:'1',
        search : '',
        ROW : {},
        checked:'',
        options:map.options,
        activeName: 'first',
        admin_desc : '',
        invoice_number : '',
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
        passShow : false,
        dialogFormVisible : false,//弹出框
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
      handleClick(tab, event){//改变状态
      this.agentList = [];
        if(this.activeName == 'first'){
          request.post("/admin/AuditInvoice/query",{
            type : 0
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
          request.post("/admin/AuditInvoice/query",{
            type : 1
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
          request.post("/admin/AuditInvoice/query",{
            type : 2
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
        request.post("/admin/AuditInvoice/query",{
            type : 0
          }).then(res => {
            if (res.code == 200) {
              this.agentList = res.data.list;
              this.count = res.data.page.count;
              this.max = res.data.page.max;
              this.page = res.data.page.page;
              this.size = res.data.page.size;
            }
          });

        // request.post("/admin/Secretary/param").then(res => {
        //     if (res.code == 200) {
        //       console.log(res)
        //       this.outworkid1 = res.data.admin_username;
        //     }
        // });

    },serachBtn(){ // 搜索功能
      if(this.activeName == 'first'){
          request.post("/admin/AuditInvoice/query",{
          keyword : this.search,
          type : 0,
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
        }else if(this.activeName == 'success'){
          request.post("/admin/AuditInvoice/query",{
          keyword : this.search,
          type : 1,
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
        }else if(this.activeName == 'no'){
          request.post("/admin/AuditInvoice/query",{
          keyword : this.search,
          type : 2,
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
      AssignTasks(row){//分配任务
        this.dialogFormVisible=true;
        console.log(row)
        this.outworkid = row.admin_id;
        this.ROW = row;
        this.old_price = row.old_price;
        this.new_price = row. new_price;
        this.passShow = true;
        // this.ask_univalence = row.ask_univalence;
      },
      AssignTasks1(row){//分配任务
        this.dialogFormVisible=true;
        console.log(row)
        this.outworkid = row.admin_id;
        this.ROW = row;
        this.old_price = row.old_price;
        this.new_price = row. new_price;
        this.passShow = false;
        // this.ask_univalence = row.ask_univalence;
      },
      outworkidBtn(){//分配任务确定
        if(this.activeName == 'first'){
          request.post("/admin/AuditInvoice/create",{
            id : this.ROW.id,
            invoice_number : this.invoice_number,
            invoice_remark:this.admin_desc,
          }).then(res => {
              if (res.code == 200) {
                this.$message({
                    // type: res.errno === 0 ? "success" : "warning",
                    type: "success",
                    message: '同意变更成功'//提示同意变更成功
                });
                this.invoice_number = '';
                this.admin_desc = '';
                this.handleClick();
              }
          });
        this.dialogFormVisible=false;
        }
      },
      outworkidBtn1(){//分配任务确定
        if(this.activeName == 'first'){
          request.post("/admin/AuditInvoice/update",{
            id : this.ROW.id,
            invoice_remark:this.admin_desc,
          }).then(res => {
              if (res.code == 200) {
                this.$message({
                    // type: res.errno === 0 ? "success" : "warning",
                    type: "success",
                    message: '取消变更成功'//取消变更成功
                });
                this.admin_desc = '';
                this.handleClick();
              }
          });
        this.dialogFormVisible=false;
        }
      },
      updateAgent(row) {//修改按钮
        console.log(row);
        // this.$router.push({path:'/updataInquiry',query:{id:row.id}})
      },
      getInfo(row, event, column){//点击跳到综合页面
        console.log(row.id);
        window.open(row.project_info_url, '_blank')
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
          console.log(currentPage)  
          this.currentPage = currentPage;
          if(this.activeName == 'first'){
            request.post("/admin/AuditInvoice/query",{
            page : currentPage,
            type : 0,
            keyword : this.search,
          }).then(res => {
              console.log(res)
              if (res.code == 200) {
                this.agentList = res.data.list;
              }
          });
          }else if(this.activeName == 'success'){
          request.post("/admin/AuditInvoice/query",{
          keyword : this.search,
          type : 1,
          page : this.currentPage,
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
          request.post("/admin/AuditInvoice/query",{
          keyword : this.search,
          type : 1,
          page : this.currentPage,
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