<template>

  <div class="app-container">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
    <el-tab-pane label="退单" name="first"></el-tab-pane>
    <!-- <el-tab-pane label="盖章成功" name="success"></el-tab-pane>-->
    <el-tab-pane label="撤单" name="last"></el-tab-pane> 

    <el-form ref="form" >
        <el-form-item style="width:300px;float:left;">
            <el-input v-model="search" style="width:300px;float:left;" placeholder="请输入查询数据"></el-input>
        </el-form-item>
        <el-button type="primary" style="" plain @click="serachBtn">查询</el-button>
        <el-button type="primary" style="margin-left:0px;" plain @click="uploadBtn">添加</el-button>
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
      label="紧急程度"
      width="120px"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.approval_status" class="nooverflow">{{scope.row.approval_status}}</p>
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
      label="旧流水号"
      width="150px"
      align="center">
        <!-- <template slot-scope="scope">
          <p :title="scope.row.report_number" class="nooverflow">{{scope.row.report_number}}</p>
        </template> -->
      </el-table-column>

      <el-table-column
      label="旧报告编号"
      width="200px"
      align="center">
        <!-- <template slot-scope="scope">
          <p :title="scope.row.plot_address" class="nooverflow">{{scope.row.plot_address}}</p>
        </template> -->
      </el-table-column>

      <el-table-column
      label="项目状态"
      width="100px"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.property_type" class="nooverflow">{{scope.row.property_type}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="退单状态"
      width="100px"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.show_withdraw_status" class="nooverflow">{{scope.row.show_withdraw_status}}</p>
        </template>
      </el-table-column>
      

      <el-table-column
      label="项目地址"
      width="130px"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.plot_address" class="nooverflow">{{scope.row.plot_address}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="小区名称"
      width="100px"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.report_tale" class="nooverflow">{{scope.row.report_tale}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="受理时间"
      width="100px"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.created_time" class="nooverflow">{{scope.row.created_time}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="报告类型"
      width="100px"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.report_tale" class="nooverflow">{{scope.row.report_tale}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="流程状态"
      width="100px"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.property_type" class="nooverflow">{{scope.row.property_type}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="撰写人员"
      width="100px"
      align="center">
        <!-- <template slot-scope="scope">
          <p :title="scope.row.approval_status" class="nooverflow">{{scope.row.approval_status}}</p>
        </template> -->
      </el-table-column>
    
      <el-table-column
      label="操作"
      fixed="right"
      align="center">
        <template slot-scope="scope">
          <!-- <el-button size="small" type="primary" @click="AssignTasks(scope.row)" >退费</el-button> -->
          <el-button size="small" type="primary" @click="cancel(scope.row)" >取消</el-button>

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
    
  </el-tabs>
    
          <!-- 分配任务弹出框 -->
          <el-dialog style="" :append-to-body='true' title="退费" :visible.sync="dialogFormVisible">
           
            <el-form ref="form" label-width="120px" :model="form" style="width:100%;">
              <!-- <div style="width:100%;position:relative;height:50px;"> -->
              <el-radio @change="operationBtn" v-model="operation" label="1">通过</el-radio>
              <el-radio @change="operationBtn" v-model="operation" label="2">拒绝</el-radio>

              <el-form-item v-show="tuifei" label="退费理由" class="form-input" prop="title" style="width:300px;">
                <el-input  v-model="admin_desc"></el-input>
              </el-form-item>

              <el-button size="small" type="primary" style="margin-left:20px;margin-top:5px;" v-if="tongyi" @click="outworkidBtn()">确定退费</el-button>
              <!-- </div> -->

            </el-form>
            
          </el-dialog>
          <!-- **************分配任务弹出框************** -->

          <!-- 分配任务弹出框 -->
          <el-dialog style="" :append-to-body='true' title="选择项目id" :visible.sync="dialogFormVisible1">
            <el-form ref="form" label-width="120px" style="width:100%;">
              <el-table 
              class="table-picture"
              :data="agentList1"
              border
              max-height="500"
              style="width: 100%;">

              <el-table-column
              label="选择"
              align="center">
                <template slot-scope="scope">
                   <el-radio v-model="radio" :label="scope.row.id">{{falseC}}</el-radio>
                </template>
              </el-table-column>

              <el-table-column
              label="流水号"
              align="center">
                <template slot-scope="scope">
                  {{scope.row.serial_number}}
                </template>
              </el-table-column>

              <el-table-column
              label="报告号"
              align="center">
                <template slot-scope="scope">
                  {{scope.row.serial_date}}
                </template>
              </el-table-column>

              <el-table-column
              label="小区名称"
              align="center">
                <template slot-scope="scope">
                  {{scope.row.report_tale}}
                </template>
              </el-table-column>
              
              <el-table-column
              label="项目地址"
              align="center">
                <template slot-scope="scope">
                  {{scope.row.plot_name}}
                </template>
              </el-table-column>

              <el-table-column
              label="项目分类"
              align="center">
                <template slot-scope="scope">
                  {{scope.row.project_classify}}
                </template>
              </el-table-column>

              <el-table-column
              label="物业类型"
              align="center">
                <template slot-scope="scope">
                  {{scope.row.property_type}}
                </template>
              </el-table-column>

              <el-table-column
              label="估价目的"
              align="center">
                <template slot-scope="scope">
                  {{scope.row.inquiry_purpose}}
                </template>
              </el-table-column>

              <el-table-column
              label="报告类型"
              align="center">
                <template slot-scope="scope">
                  {{scope.row.report_tale}}
                </template>
              </el-table-column>

              <el-table-column
              label="业务来源"
              align="center">
                <template slot-scope="scope">
                  {{scope.row.source}}
                </template>
              </el-table-column>

              <el-table-column
              label="流程状态"
              align="center">
                <template slot-scope="scope">
                  {{scope.row.project_status}}
                </template>
              </el-table-column>
              </el-table>

              <el-button type="primary" style="margin-left:0px;" plain @click="addCommodity">确认选中</el-button>
              
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
        operation : '',
        tuifei : false,
        falseC:'',
        radio:'',
        tongyi : '',
        admin_desc:'',
        ReportReviewerId: '',
        price_status: '',
        ask_univalence: '',
        ask_univalence1 : [],
        fileList:[],
        fileType:'',
        fileType1:[
          {
            label:'其它',
            value:'1'
          }
        ],
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
        agentList : [],//列表绑定
        agentList1 : [],//列表绑定
        form:{
          user : '',
        },
        dialogFormVisible : false,//弹出框
        dialogFormVisible1 : false,//上传附件弹出框
        dialogFormVisible2 : false,//报告审核人弹出框
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
      excelFileClass(param){//修改题目
          console.log(param);
            // let formData = new FormData();
            // formData.append('Excelfile', param.file);
            // request.post("/api/classroom/questions/add", formData).then(res => {
            //     if (res.code == 200){
            //         this.questions = res.data;
            //     }
            // });
      },
      handleClick(tab, event){//改变状态
        console.log(this.activeName)
        if(this.activeName == 'first'){
          request.post("/admin/projectWithdraw/query",{
            exit_type:0,
          }).then(res => {
            if (res.code == 200) {
              this.agentList = res.data.list;
              this.count = res.data.page.count;
              this.max = res.data.page.max;
              this.page = res.data.page.page;
              this.size = res.data.page.size;
            }
        });
        }else if(this.activeName == 'last'){
          request.post("/admin/projectWithdraw/query",{
            exit_type:1,
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
        request.post("/admin/projectWithdraw/query",{
            exit_type:0,
          }).then(res => {
            if (res.code == 200) {
              this.agentList = res.data.list;
              this.count = res.data.page.count;
              this.max = res.data.page.max;
              this.page = res.data.page.page;
              this.size = res.data.page.size;
            }
        });
        request.post("/admin/Auditing/param").then(res => {
            if (res.code == 200) {
              console.log(res)
              this.ask_univalence1 = res.data.check_user;
              // this.agentList = res.data.list;
            }
        });
        // request.post("/admin/outwork/param").then(res => {
        //     if (res.code == 200) {
        //       console.log(res)
        //       this.outworkid1 = res.data.admin_username;
        //     }
        // });
    },
    cancel(row){
      this.$confirm("您确定要取消？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消"
            }).then(() => {
                request.post("/admin/ProjectWithdraw/update", {
                        id:row.id,
                        withdraw_status : '2',
                }).then(res => {
                    
                    // res.errno === 0 && this.getList();
                    this.$message({
                        // type: res.errno === 0 ? "success" : "warning",
                        type: "success",
                        message: '取消成功！'
                    });
                })
                // .catch(res => {
                //     this.$message({
                //         type: "warning",
                //         message: "删除失败!"
                //     });
                // });
                this.getChannelList()
            })
    },
    serachBtn(){ // 搜索功能
      if(this.activeName == 'first'){
          request.post("/admin/ProjectWithdraw/query",{
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
        this.tongyi = true;
        console.log(row)
        this.dialogFormVisible = true;
        this.Id = row.id;
      },
      refuse(row){
        this.tongyi = false;
        console.log(row)
        this.dialogFormVisible = true;
        this.Id = row.id;
      },
      outworkidBtn(){//分配任务确定
          request.post("/admin/projectwithdraw/update",{
          id : this.Id,
          operation : this.operation,
          withdraw_objection : this.admin_desc,
          }).then(res => {
              if (res.code == 200) {
                this.$message({
                    // type: res.errno === 0 ? "success" : "warning",
                    type: "success",
                    message: '盖章成功'//提示盖章成功
                });
                this.handleClick();
              }
          });
        this.dialogFormVisible=false;
        this.admin_desc = '';
        console.log(this.ROW.id);
        console.log(this.outworkid);
      },
      outworkidBtn1(){//分配任务确定
          request.post("/admin/ProjectSeal/refuse",{
          id : this.Id,
          admin_desc : this.admin_desc,
          }).then(res => {
              if (res.code == 200) {
                this.$message({
                    // type: res.errno === 0 ? "success" : "warning",
                    type: "success",
                    message: '回收成功'//提示回收成功
                });
                this.handleClick();
              }
          });
        this.dialogFormVisible=false;
        this.admin_desc = '';
        
        console.log(this.ROW.id);
        console.log(this.outworkid);
      },
      //分页
      handleCurrentChange: function(currentPage){//换页
          console.log(currentPage)  
          this.currentPage = currentPage;
          if(this.activeName == 'first'){
            request.post("/admin/ProjectWithdraw/query",{
              page : currentPage,
              keyword : this.search,
          }).then(res => {
              console.log(res)
              if (res.code == 200) {
                this.agentList = res.data.list;
              }
          });
          }
      },
      operationBtn(){//退费
        if(this.operation == '2'){
          this.tuifei = true;
        }else{
          this.tuifei = false;
        }
      },
      addCommodity(){//添加
        this.$router.push({path:'/addRefund',query:{id:this.radio}})
      },
      uploadBtn(){
        request.post("/admin/ProjectWithdraw/getProject").then(res => {
              console.log(res)
              if (res.code == 200) {
                this.agentList1 = res.data.list;
              }
          });
        this.dialogFormVisible1 = true;
      },
      submitBtn(row){//提交
        this.ReportReviewerId = row.id;
        this.price_status = row.price_status;
        this.dialogFormVisible2 = true;
        console.log(this.ReportReviewerId,this.price_status)
      },
      getInfo(row, event, column){//点击跳到综合页面
        console.log(row.id);
        window.open(row.project_info_url, '_blank')
      },
      submit(){
        request.post("/admin/Auditing/affirm",{
          id : this.ReportReviewerId,
          price_status : this.price_status,
          ask_univalence : this.ask_univalence,
        }).then(res => {
            console.log(res)
            if (res.code == 200) {
              this.$message({
                    // type: res.errno === 0 ? "success" : "warning",
                    type: "success",
                    message: '提交成功'//提交成功
                });
              this.getAgentList();//渲染列表
              // this.agentList = res.data.list;
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