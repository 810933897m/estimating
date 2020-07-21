<template>

  <div class="app-container">
    <!-- <el-form ref="form" >
        <el-form-item style="width:300px;float:left;">
            <el-input v-model="search" style="width:300px;float:left;" placeholder="请输入查询数据"></el-input>
        </el-form-item>
        <el-button type="primary" style="" plain @click="serachBtn">查询</el-button>
        <el-button type="primary" style="margin-left:0px;" plain @click="uploadBtn">添加</el-button>
    </el-form> -->
    <el-form ref="form" >
        <el-form-item>
            <el-radio v-model="activeName" label="first" @change="handleClick()">项目列表</el-radio>
            <el-radio v-model="activeName" label="two" @change="handleClick()">退单 </el-radio>
            <el-radio v-model="activeName" label="three" @change="handleClick()">撤单</el-radio>

            <el-radio v-model="activeName" label="need_report" @change="handleClick()">报告待回收</el-radio>
            <el-radio v-model="activeName" label="need_payment" @change="handleClick()">待付款</el-radio>
            <el-radio v-model="activeName" label="need_collection" @change="handleClick()">待退款</el-radio>
            <el-radio v-model="activeName" label="need_invoice" @change="handleClick()">发票待回收</el-radio>
            <!-- <el-radio v-model="activeName" label="no" @change="handleClick()">开票失败</el-radio> -->
            <el-input v-model="search" style="width:200px;" placeholder="请输入查询数据"></el-input>
            <el-button type="primary" style="" plain @click="serachBtn">查询</el-button>
            <!-- <el-button type="primary" style="margin-left:0px;" plain @click="uploadBtn">添加</el-button> -->
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

      <!-- <el-table-column
       label="挂起原因"
      width="100px"
      key="1" 
      v-if="activeName != 'first'"
      align="center">
        <template slot-scope="scope" >
          <p :title="scope.row.admin_desc" class="nooverflow">{{scope.row.admin_desc}}</p>
        </template>
      </el-table-column> -->

      <el-table-column
      label="流水号"
      width="200px"
      key="22" 
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.serial_number" style="cursor: pointer;" @click="getInfo(scope.row)" class="nooverflow">{{scope.row.serial_number}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="报告类型"
      width="120px"
      key="3" 
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.report_tale" class="nooverflow">{{scope.row.report_tale}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="估价目的"
      width="120px"
      key="4" 
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.inquiry_purpose" class="nooverflow">{{scope.row.inquiry_purpose}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="报告号"
      width="200px"
      key="5" 
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.report_number" class="nooverflow">{{scope.row.report_number}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="报告地址"
      key="6" 
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.show_merge_addr" class="nooverflow">{{scope.row.show_merge_addr}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="受理时间"
      width="150px"
      key="7" 
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.create_time" class="nooverflow">{{scope.row.create_time}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="分配时间"
      width="100px"
      key="8" 
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.create_time" class="nooverflow">{{scope.row.create_time}}</p>
        </template>
      </el-table-column>
    
      <el-table-column
      label="操作"
      v-if="activeName != 'two' && activeName != 'three'"
      fixed="right"
      align="center">
        <template slot-scope="scope">
          <el-button v-if="activeName == 'first'" size="small" type="primary" @click="AssignTasks(scope.row)" >申请</el-button>
          <el-button v-else size="small" type="primary" @click="determine(scope.row)" >确定</el-button>
          <!-- <el-button size="small" type="primary" @click="cancel(scope.row)" >取消</el-button> -->

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
    
          <!-- 分配任务弹出框 -->
          <!-- <el-dialog style="" :append-to-body='true' title="退费" :visible.sync="dialogFormVisible">
           
            <el-form ref="form" label-width="120px" :model="form" style="width:100%;">
              <el-radio @change="operationBtn" v-model="operation" label="1">通过</el-radio>
              <el-radio @change="operationBtn" v-model="operation" label="2">拒绝</el-radio>

              <el-form-item v-show="tuifei" label="退费理由" class="form-input" prop="title" style="width:300px;">
                <el-input  v-model="admin_desc"></el-input>
              </el-form-item>

              <el-button size="small" type="primary" style="margin-left:20px;margin-top:5px;" v-if="tongyi" @click="outworkidBtn()">确定退费</el-button>

            </el-form>
            
          </el-dialog> -->
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

          <!-- 分配任务弹出框 -->
          <el-dialog style="" :append-to-body='true' title="申请" :visible.sync="dialogFormVisible">
            
            <el-form ref="form" label-width="120px" style="width:100%;">
              <!-- <div style="width:100%;position:relative;height:50px;"> -->
              <el-form-item label="退单撤单" class="select" style="">
                  <el-select v-model="type" filterable style="">
                      <el-option
                      v-for="item in type1"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                      </el-option>
                  </el-select>
                </el-form-item>

              <el-form-item label="回收报告" class="form-input" prop="title" style="width:500px;">
                <el-radio v-model="need_report" label="0">否</el-radio>
                <el-radio v-model="need_report" label="1">是</el-radio>
              </el-form-item>

              <el-form-item label="需要收费" class="form-input" prop="title" style="width:500px;">
                <el-radio v-model="need_payment" label="0">否</el-radio>
                <el-radio v-model="need_payment" label="1">是</el-radio>
              </el-form-item>

              <el-form-item label="需要退费" class="form-input" prop="title" style="width:500px;">
                <el-radio v-model="need_collection" label="0">否</el-radio>
                <el-radio v-model="need_collection" label="1">是</el-radio>
              </el-form-item>

              <el-form-item label="回收发票" class="form-input" prop="title" style="width:500px;">
                <el-radio v-model="need_invoice" label="0">否</el-radio>
                <el-radio v-model="need_invoice" label="1">是</el-radio>
              </el-form-item>

              <el-form-item label="备注" class="form-input" prop="title"  style="width:500px;">
                <el-input  placeholder="请输入" v-model="admin_desc"></el-input>
              </el-form-item>

            </el-form>
            
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="outworkidBtn1(),dialogFormVisible = false">保 存</el-button>
                <el-button @click="dialogFormVisible = false">取 消</el-button>
            </span>
          </el-dialog>

          <!-- 分配任务弹出框 -->
          <el-dialog style="" :append-to-body='true' title="确定" :visible.sync="dialogFormVisible3">
            
            <el-form ref="form" label-width="120px" style="width:100%;">

              <el-form-item label="备注" class="form-input" prop="title"  style="width:500px;">
                <el-input  placeholder="请输入" v-model="admin_desc1"></el-input>
              </el-form-item>

            </el-form>
            
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="outworkidBtn2(),dialogFormVisible3 = false">保 存</el-button>
                <el-button @click="dialogFormVisible3 = false">取 消</el-button>
            </span>
          </el-dialog>

  </div>
</template>
<script>
import request from "@/utils/request";
// import check from "@/views/shopAdministration/checkClerk"
import map from '@/utils/city';
export default {
    data() {
      return {
        type : '',
        type1 : [
          {
            value : '1',
            label : '退单'
          },{
            value : '2',
            label : '撤单'
          }
        ],
        need_report : '0',
        need_payment : '0',
        need_collection : '0',
        need_invoice : '0',


        operation : '',
        tuifei : false,
        falseC:'',
        radio:'',
        tongyi : '',
        admin_desc:'',
        admin_desc1 : '',
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
        dialogFormVisible3 : false,//报告审核人弹出框
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
        // console.log(this.activeName)
        this.agentList = [];

        if(this.activeName == 'first'){
          request.post("/admin/projectWithdraw/query",{
            status : 0,
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
          request.post("/admin/projectWithdraw/query",{
            status : 1,
          }).then(res => {
            if (res.code == 200) {
              this.agentList = res.data.list;
              this.count = res.data.page.count;
              this.max = res.data.page.max;
              this.page = res.data.page.page;
              this.size = res.data.page.size;
            }
          });
        }else if(this.activeName == 'three'){
          request.post("/admin/projectWithdraw/query",{
            status : 2,
          }).then(res => {
            if (res.code == 200) {
              this.agentList = res.data.list;
              this.count = res.data.page.count;
              this.max = res.data.page.max;
              this.page = res.data.page.page;
              this.size = res.data.page.size;
            }
          });
        }else if(this.activeName == 'need_report'){
          request.post("/admin/projectWithdraw/status",{
            type : 'need_report',
          }).then(res => {
            if (res.code == 200) {
              this.agentList = res.data.list;
              this.count = res.data.page.count;
              this.max = res.data.page.max;
              this.page = res.data.page.page;
              this.size = res.data.page.size;
            }
          });
        }else if(this.activeName == 'need_payment'){
          request.post("/admin/projectWithdraw/status",{
            type : 'need_payment',
          }).then(res => {
            if (res.code == 200) {
              this.agentList = res.data.list;
              this.count = res.data.page.count;
              this.max = res.data.page.max;
              this.page = res.data.page.page;
              this.size = res.data.page.size;
            }
          });
        }else if(this.activeName == 'need_collection'){
          request.post("/admin/projectWithdraw/status",{
            type : 'need_collection',
          }).then(res => {
            if (res.code == 200) {
              this.agentList = res.data.list;
              this.count = res.data.page.count;
              this.max = res.data.page.max;
              this.page = res.data.page.page;
              this.size = res.data.page.size;
            }
          });
        }else if(this.activeName == 'need_invoice'){
          request.post("/admin/projectWithdraw/status",{
            type : 'need_invoice',
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
            status : 0,
          }).then(res => {
            if (res.code == 200) {
              this.agentList = res.data.list;
              this.count = res.data.page.count;
              this.max = res.data.page.max;
              this.page = res.data.page.page;
              this.size = res.data.page.size;
            }
        });
        // request.post("/admin/outwork/param").then(res => {
        //     if (res.code == 200) {
        //       console.log(res)
        //       this.outworkid1 = res.data.admin_username;
        //     }
        // });
    },
    determine(row){
      this.Id = row.id;
      this.dialogFormVisible3 = true;
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
          request.post("/admin/projectWithdraw/query",{
            status : 0,
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
          request.post("/admin/projectWithdraw/query",{
            status : 1,
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
        }else if(this.activeName == 'three'){
          request.post("/admin/projectWithdraw/query",{
            status : 2,
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
        }else if(this.activeName == 'need_report'){
          request.post("/admin/projectWithdraw/status",{
            type : 'need_report',
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
        }else if(this.activeName == 'need_payment'){
          request.post("/admin/projectWithdraw/status",{
            type : 'need_payment',
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
        }else if(this.activeName == 'need_collection'){
          request.post("/admin/projectWithdraw/status",{
            type : 'need_collection',
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
        }else if(this.activeName == 'need_invoice'){
          request.post("/admin/projectWithdraw/status",{
            type : 'need_invoice',
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
      AssignTasks(row){//分配任务
        this.tongyi = true;
        this.dialogFormVisible = true;
        this.Id = row.id;
      },
      refuse(row){
        this.tongyi = false;
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
      },
      // outworkidBtn1(){//分配任务确定
      //     request.post("/admin/ProjectSeal/refuse",{
      //     id : this.Id,
      //     admin_desc : this.admin_desc,
      //     }).then(res => {
      //         if (res.code == 200) {
      //           this.$message({
      //               // type: res.errno === 0 ? "success" : "warning",
      //               type: "success",
      //               message: '回收成功'//提示回收成功
      //           });
      //           this.handleClick();
      //         }
      //     });
      //   this.dialogFormVisible=false;
      //   this.admin_desc = '';
        
      //   console.log(this.ROW.id);
      //   console.log(this.outworkid);
      // },
      outworkidBtn2(){
        if(this.activeName == 'need_report'){
          request.post("/admin/projectWithdraw/finish",{
            id : this.Id,
            type : 'need_report',
            admin_desc : this.admin_desc1,
          }).then(res => {
              if (res.code == 200) {
                this.$message({
                    // type: res.errno === 0 ? "success" : "warning",
                    type: "success",
                    message: '确定成功'//提示确定成功
                });
                this.admin_desc1 = '';
                this.handleClick();
              }
          });
        }else if(this.activeName == 'need_payment'){
          request.post("/admin/projectWithdraw/finish",{
            id : this.Id,
            type : 'need_payment',
            admin_desc : this.admin_desc1,
          }).then(res => {
              if (res.code == 200) {
                this.$message({
                    // type: res.errno === 0 ? "success" : "warning",
                    type: "success",
                    message: '确定成功'//提示确定成功
                });
                this.admin_desc1 = '';
                this.handleClick();
              }
          });
        }else if(this.activeName == 'need_collection'){
          request.post("/admin/projectWithdraw/finish",{
            id : this.Id,
            type : 'need_collection',
            admin_desc : this.admin_desc1,
          }).then(res => {
              if (res.code == 200) {
                this.$message({
                    // type: res.errno === 0 ? "success" : "warning",
                    type: "success",
                    message: '确定成功'//提示确定成功
                });
                this.admin_desc1 = '';
                this.handleClick();
              }
          });
        }else if(this.activeName == 'need_invoice'){
          request.post("/admin/projectWithdraw/finish",{
            id : this.Id,
            type : 'need_invoice',
            admin_desc : this.admin_desc1,
          }).then(res => {
              if (res.code == 200) {
                this.$message({
                    // type: res.errno === 0 ? "success" : "warning",
                    type: "success",
                    message: '确定成功'//提示确定成功
                });
                this.admin_desc1 = '';
                this.handleClick();
              }
          });
        }
      },
      outworkidBtn1(){//分配任务确定
          request.post("/admin/projectWithdraw/create",{
          id : this.Id,
          type : this.type,
          need_report : this.need_report,
          need_payment : this.need_payment,
          need_collection : this.need_collection,
          need_invoice : this.need_invoice,
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
        this.type = '';
        this.need_report = '0';
        this.need_payment = '0';
        this.need_collection = '0';
        this.need_invoice = '0';
        this.admin_desc = '';
        
      },
      //分页
      handleCurrentChange: function(currentPage){//换页
          this.currentPage = currentPage;
          if(this.activeName == 'first'){
          request.post("/admin/projectWithdraw/query",{
            status : 0,
            keyword : this.search,
            page : currentPage,
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
          request.post("/admin/projectWithdraw/query",{
            status : 1,
            keyword : this.search,
            page : currentPage,
          }).then(res => {
            if (res.code == 200) {
              this.agentList = res.data.list;
              this.count = res.data.page.count;
              this.max = res.data.page.max;
              this.page = res.data.page.page;
              this.size = res.data.page.size;
            }
          });
        }else if(this.activeName == 'three'){
          request.post("/admin/projectWithdraw/query",{
            status : 2,
            keyword : this.search,
            page : currentPage,
          }).then(res => {
            if (res.code == 200) {
              this.agentList = res.data.list;
              this.count = res.data.page.count;
              this.max = res.data.page.max;
              this.page = res.data.page.page;
              this.size = res.data.page.size;
            }
          });
        }else if(this.activeName == 'need_report'){
          request.post("/admin/projectWithdraw/status",{
            type : 'need_report',
            keyword : this.search,
            page : currentPage,
          }).then(res => {
            if (res.code == 200) {
              this.agentList = res.data.list;
              this.count = res.data.page.count;
              this.max = res.data.page.max;
              this.page = res.data.page.page;
              this.size = res.data.page.size;
            }
          });
        }else if(this.activeName == 'need_payment'){
          request.post("/admin/projectWithdraw/status",{
            type : 'need_payment',
            keyword : this.search,
            page : currentPage,
          }).then(res => {
            if (res.code == 200) {
              this.agentList = res.data.list;
              this.count = res.data.page.count;
              this.max = res.data.page.max;
              this.page = res.data.page.page;
              this.size = res.data.page.size;
            }
          });
        }else if(this.activeName == 'need_collection'){
          request.post("/admin/projectWithdraw/status",{
            type : 'need_collection',
            keyword : this.search,
            page : currentPage,
          }).then(res => {
            if (res.code == 200) {
              this.agentList = res.data.list;
              this.count = res.data.page.count;
              this.max = res.data.page.max;
              this.page = res.data.page.page;
              this.size = res.data.page.size;
            }
          });
        }else if(this.activeName == 'need_invoice'){
          request.post("/admin/projectWithdraw/status",{
            type : 'need_invoice',
            keyword : this.search,
            page : currentPage,
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
      },
      getInfo(row, event, column){//点击跳到综合页面
        window.open(row.project_info_url, '_blank')
      },
      submit(){
        request.post("/admin/Auditing/affirm",{
          id : this.ReportReviewerId,
          price_status : this.price_status,
          ask_univalence : this.ask_univalence,
        }).then(res => {
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