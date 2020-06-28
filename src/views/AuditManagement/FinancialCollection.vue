<template>

  <div class="app-container">
    <el-form ref="form" >
        <el-form-item>
            <el-radio v-model="activeName" label="first" @change="handleClick()">未审核</el-radio>
            <el-radio v-model="activeName" label="two" @change="handleClick()">已审核</el-radio>
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
      width="50px"
      key="1"
      align="center">
        <template slot-scope="scope" >
          {{scope.row.id}}
        </template>
      </el-table-column>

      <el-table-column
      label="备注"
      key="13" 
      v-if="activeName == 'two'"
      width="150px"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.finance_status_desc" class="nooverflow">{{scope.row.finance_status_desc}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="流水号"
      width="120px"
      key="2"
      align="center">
        <template slot-scope="scope" >
          <p :title="scope.row.serial_number" style="cursor: pointer;" @click="getInfo(scope.row)" class="nooverflow">{{scope.row.serial_number}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="报告编号"
      width="150px"
      key="3"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.report_number" class="nooverflow">{{scope.row.report_number}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="应收金额"
      width="130px"
      key="4" 
      v-if="activeName == 'first'"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.money_due" class="nooverflow">{{scope.row.money_due}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="实收金额"
      width="130px"
      key="5" 
      v-if="activeName == 'first'"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.actual_charge" class="nooverflow">{{scope.row.actual_charge}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="项目地址"
      width="200px"
      key="6"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.plot_address" class="nooverflow">{{scope.row.plot_address}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="小区名称"
      width="130px"
      key="7"
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
      key="8"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.report_tale" class="nooverflow">{{scope.row.report_tale}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="物业类型"
      width="100px"
      key="9"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.property_type" class="nooverflow">{{scope.row.property_type}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="项目状态"
      width="100px"
      key="10"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.approval_status" class="nooverflow">{{scope.row.approval_status}}</p>
        </template>
      </el-table-column>
    
      <!-- <el-table-column
      label="撰写人员"
      width="100px"
      v-if="activeName == 'two'"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.approval_status" class="nooverflow">{{scope.row.approval_status}}</p>
        </template>
      </el-table-column> -->

      <el-table-column
      label="流程状态"
      width="100px"
      key="11"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.approval_status" class="nooverflow">{{scope.row.approval_status}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="立项时间"
      key="12" 
      v-if="activeName == 'first'"
      width="150px"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.create_time" style="" class="nooverflow">{{scope.row.create_time}}</p>
        </template>
      </el-table-column>

      <!-- <el-table-column
      label="分配时间"
      v-else-if="activeName == 'two'"
      width="150px"
      align="center">
        <template slot-scope="scope">
          {{scope.row.finish_time}}
        </template>
      </el-table-column> -->

      <el-table-column
      label="操作"
      fixed="right"
      v-if="activeName == 'first'"
      width="100px" align="center">
        <template slot-scope="scope">
          <!-- <el-button size="small" type="primary" v-if="activeName == 'first'" @click="addRecord(scope.row)" >记录添加</el-button>
          <el-button size="small" type="primary" v-if="activeName == 'first'" @click="recordList(scope.row)" >记录列表</el-button> -->
          <el-button size="small" type="primary" v-if="activeName == 'first'" @click="AssignTasks(scope.row)" >通过</el-button>
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

    <!-- 记录添加弹出框 -->
          <el-dialog style="" :append-to-body='true' title="记录添加" :visible.sync="dialogFormVisible">

            <el-form ref="form" label-width="120px" :model="form" style="width:100%;">
                <!-- <el-form-item label="询值单价" class="form-input" prop="title" style="width:300px;">
                    <el-input  placeholder="请输入净值单价" v-model="charge_way"></el-input>
                </el-form-item> -->
                <el-form-item label="收款方式" class="select" style="">
                  <el-select v-model="charge_way" filterable style="width:200px;">
                      <el-option
                      v-for="item in charge_way1"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                      </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="收费金额" class="form-input" prop="title" style="width:300px;">
                    <el-input  placeholder="请输入收费金额" v-model="charge_amount"></el-input>
                </el-form-item>
                <el-form-item label="转账公司" class="form-input" prop="title" style="width:300px;">
                    <el-input  placeholder="请输入转账公司" v-model="transfer_company"></el-input>
                </el-form-item>
                <el-form-item label="转账人员" class="form-input" prop="title" style="width:300px;">
                    <el-input  placeholder="请输入转账人员" v-model="transfer_personnel"></el-input>
                </el-form-item>
                <el-form-item label="收费备注" class="form-input" prop="title" style="width:300px;">
                    <el-input  placeholder="请输入收费备注" v-model="charge_remark"></el-input>
                </el-form-item>
              <el-button size="small" type="primary" style="margin-left:20px;margin-top:5px;" @click="outworkidBtn()">确定</el-button>

            </el-form>
          </el-dialog>
          <!-- **************分配任务弹出框************** -->
    

  <!-- 分配任务弹出框 -->
          <el-dialog style="" :append-to-body='true' title="通过" :visible.sync="dialogFormVisiblePass">
           
            <el-form ref="form" label-width="120px" :model="form" style="width:100%;">
              <div style="width:100%;position:relative;height:50px;">
              <el-form-item label="提示信息" class="form-input" prop="title" style="width:300px;float:left;">
                <el-input  placeholder="请输入提示信息" v-model="admin_desc"></el-input>
              </el-form-item>

              <el-button size="small" type="primary" style="margin-left:20px;margin-top:5px;" @click="outworkidBtnPass()">确定</el-button>
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
        dialogFormVisiblePass : false,
        admin_desc : '',
        charge_way:'',
        charge_way1 : [],
        charge_amount : '',
        transfer_company : '',
        transfer_personnel : '',
        charge_remark : '',
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
      this.agentList =[];
        // console.log(this.activeName)
        if(this.activeName == 'first'){
          this.getAgentList();//渲染列表
        }else if(this.activeName == 'two'){
          // console.log('2')
          request.post("/admin/auditing/finish").then(res => {
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
        request.post("/admin/auditing/query").then(res => {
            if (res.code == 200) {
              this.agentList = res.data.list;
              this.count = res.data.page.count;
              this.max = res.data.page.max;
              this.page = res.data.page.page;
              this.size = res.data.page.size;
            }
        });

        // request.post("/admin/Financial/param").then(res => {
        //     if (res.code == 200) {
        //       console.log(res)
        //       this.charge_way1 = res.data.charge_way;
        //     }
        // });

    },serachBtn(){ // 搜索功能
      if(this.activeName == 'first'){
          request.post("/admin/auditing/query",{
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
          request.post("/admin/auditing/finish",{
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
      AssignTasks(row){//分配任务
        this.Id = row.id;
        this.dialogFormVisiblePass = true;
        // this.$confirm("财务审核通过？", "提示", {
        //         confirmButtonText: "确定",
        //         cancelButtonText: "取消"
        //     }).then(() => {
        //         request.post("/admin/auditing/submit", {
        //                 id:row.id,
        //                 // finance_user_id	 : row.create_user_id,
        //         }).then(res => {
        //             this.getAgentList()
        //             // res.errno === 0 && this.getList();
        //             this.$message({
        //                 // type: res.errno === 0 ? "success" : "warning",
        //                 type: "success",
        //                 message: '审核成功！'
        //             });
        //         }).catch(res => {
        //             this.$message({
        //                 type: "warning",
        //                 message: "审核失败!"
        //             });
        //         });
        //     });
      },
      outworkidBtnPass(){
        request.post("/admin/auditing/submit", {
                id:this.Id,
                admin_desc :this.admin_desc,
          }).then(res => {
                // res.errno === 0 && this.getList();
              this.handleClick();
              this.$message({
                  // type: res.errno === 0 ? "success" : "warning",
                   type: "success",
                  message: '通过成功！'
              });
              this.dialogFormVisiblePass = false;
              
          })
      },
      outworkidBtn(){//添加记录确定
        if(this.activeName == 'first'){
          request.post("/admin/Financial/create",{
          project_id : this.Id,
          charge_way : this.charge_way,
          charge_amount : this.charge_amount,
          transfer_company : this.transfer_company,
          transfer_personnel : this.transfer_personnel,
          charge_remark : this.charge_remark,
          // page : this.currentPage,
          }).then(res => {
              if (res.code == 200) {
                this.$message({
                    // type: res.errno === 0 ? "success" : "warning",
                    type: "success",
                    message: '添加成功'//提示添加成功
                });
                this.handleClick();
                this.charge_way = '';
                this.charge_amount = '';
                this.charge_remark = '';
                this.transfer_company = '';
                this.transfer_personnel = '';
              }
          });
        this.dialogFormVisible=false;
        }else if(this.activeName == 'two'){
          request.post("/admin/Secretary/update",{
          id : this.ROW.id,
          secretaryid : this.outworkid,
          // page : this.currentPage,
          }).then(res => {
              if (res.code == 200) {
                this.$message({
                    // type: res.errno === 0 ? "success" : "warning",
                    type: "success",
                    message: '重新分配成功'//提示修改成功
                });
                this.handleClick();
              }
          });
        this.dialogFormVisible = false;
        }

        // console.log(this.ROW.id);
        // console.log(this.outworkid);
        
      },
      //分页
      handleCurrentChange: function(currentPage){//换页
      // console.log(currentPage)  
          this.currentPage = currentPage;
          if(this.activeName == 'first'){
            request.post("/admin/auditing/query",{
            page : currentPage,
            keyword : this.search,
          }).then(res => {
              // console.log(res)
              if (res.code == 200) {
                this.agentList = res.data.list;
              }
          });
          }else if(this.activeName == 'two'){
            request.post("/admin/auditing/finish",{
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
      getInfo(row){//点击跳到综合页面
        // console.log(row.id);
        window.open(row.project_info_url, '_blank')
      },
      addCommodity(){//添加询价
        this.$router.push({path:'/addInquiry'})
      },
      addRecord(row){
        this.dialogFormVisible = true;
        this.charge_way = row.charge_way;
        this.charge_amount = row.charge_amount;
        this.transfer_company = row.transfer_company;
        this.transfer_personnel = row.transfer_personnel;
        this.charge_remark = row.charge_remark;
        this.Id = row.id;
        // console.log(row)
      },
      recordList(row){
        this.$router.push({path:'/FinancialCollectionDetail',query:{row:row}})
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