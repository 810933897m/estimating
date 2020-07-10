<template>

  <div class="app-container">
    <!-- <el-tabs v-model="activeName" type="card">
    <el-tab-pane label="外业跟进" name="first"> -->
      <el-form ref="form" >
        <el-form-item>
            <el-radio v-model="distribution" label="5" @change="distributionBtn1()">项目列表</el-radio>
            <el-radio v-model="distribution" label="0" @change="distributionBtn1()">等待审核</el-radio>
            <el-radio v-model="distribution" label="1" @change="distributionBtn1()">审核通过</el-radio>
            <el-radio v-model="distribution" label="2" @change="distributionBtn1()">审核失败</el-radio>
            <el-radio v-model="distribution" label="3" @change="distributionBtn1()">取消变更</el-radio>
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
      align="center">
        <template slot-scope="scope" >
          {{scope.row.id}}
        </template>
      </el-table-column>

      <el-table-column
       label="挂起原因"
      width="100px"
      key="1" 
      v-if="distribution == '3'"
      align="center">
        <template slot-scope="scope" >
          <p :title="scope.row.hang_up_content" class="nooverflow">{{scope.row.hang_up_content}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="流水号"
      width="200px"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.serial_number" style="cursor: pointer;" @click="getInfo(scope.row)" class="nooverflow">{{scope.row.serial_number}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="报告类型"
      width="120px"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.report_tale" class="nooverflow">{{scope.row.report_tale}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="估价目的"
      width="120px"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.inquiry_purpose" class="nooverflow">{{scope.row.inquiry_purpose}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="报告号"
      width="200px"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.report_number" class="nooverflow">{{scope.row.report_number}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="报告地址"
      min-width="300px"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.show_merge_addr" class="nooverflow">{{scope.row.show_merge_addr}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="受理时间"
      width="150px"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.create_time" class="nooverflow">{{scope.row.create_time}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="分配时间"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.create_time" class="nooverflow">{{scope.row.create_time}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="查勘人员"
      key="2" 
      v-if="distribution == '1'||distribution == '2'||distribution == '3'||distribution == '4'||distribution == '6' "
      width="100px"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.admin_username" class="nooverflow">{{scope.row.admin_username}}</p>
        </template>
      </el-table-column>

       <!-- <el-table-column
      label="操作"
      v-if="distribution == '1'||distribution == '2'"
      fixed="right"
      width="200px" align="center">
        <template slot-scope="scope">
          <el-button size="small" type="primary"  @click="AssignTasks(scope.row)" >重新分配</el-button>
          <el-button size="small" type="primary" @click="recovery(scope.row)" >回收</el-button>
        </template>
      </el-table-column> -->

      <el-table-column
      label="操作"
      v-if="distribution == '0'||distribution == '5'"
      fixed="right"
      width="130px" align="center">
        <template slot-scope="scope">
          <el-button size="small" type="primary" v-if="distribution == 0" @click="cancel(scope.row)" >取消</el-button>
          <!-- <el-button size="small" type="primary" v-if="distribution == 1" @click="AssignTasks(scope.row)" >重新分配</el-button> -->
          <el-button size="small" type="primary" v-if="distribution == 5" @click="ApplyChange(scope.row)" >申请变更</el-button>
          <el-button size="small" type="primary" v-if="distribution == 4" @click="generateReport(scope.row)" >生成报告</el-button>
          
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
    <!-- </el-tab-pane>
  </el-tabs> -->
    
          <!-- 分配任务弹出框 -->
          <el-dialog style="" :append-to-body='true' title="任务分配" :visible.sync="dialogFormVisible">
           
            <el-form ref="form" label-width="120px" :model="form" style="">
              <div style="width:100%;position:relative;height:50px;">
                  <el-form-item label="外采用户" class="select" style="float:left;">
                  <el-select v-model="outworkid" filterable style="">
                      <el-option
                      v-for="item in outworkid1"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                      </el-option>
                  </el-select>
                </el-form-item>
              <el-button size="small" type="primary" style="margin-left:20px;margin-top:5px;" @click="outworkidBtn()">确定</el-button>
              </div>
            </el-form>
          </el-dialog>
          <!-- **************分配任务弹出框************** -->

          <!--*************修改模态框*************-->
        <el-dialog
        title="生成报告号"
        :visible.sync="dialogVisible"
        width="50%">
        <!-- :before-close="handleClose" -->
            <el-form label-width="90px">

                <el-form-item label="公司简称" class="select" >
                <el-select v-model="company" filterable placeholder="请选择" style="width:250px;">
                    <el-option
                    v-for="item in company1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="项目分类" class="select" >
                <el-select v-model="project_classify" filterable placeholder="请选择" style="width:250px;">
                    <el-option
                    v-for="item in project_classify1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="报告类型" class="select" >
                <el-select v-model="report_tale" filterable placeholder="请选择评估类型2" style="width:250px;">
                    <el-option
                    v-for="item in report_tale1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="字母分类" class="select" >
                <el-select v-model="Alphabetic" filterable placeholder="请选择字母类型" style="width:250px;">
                    <el-option
                    v-for="item in Alphabetic1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
              </el-form-item>

            </el-form>
        
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="confirmRevision(),dialogVisible = false">保 存</el-button>
                <el-button @click="dialogVisible = false">取 消</el-button>
            </span>
        </el-dialog>
        <!--*************修改模态框结束*************-->

        <!-- 申请变更弹出框 -->
          <el-dialog style="" :append-to-body='true' title="申请" :visible.sync="dialogFormVisibleChange">
           
            <el-form ref="form" label-width="120px" style="width:100%;">
              <!-- <div style="width:100%;position:relative;height:50px;"> -->
              
              <el-form-item label="变更类型" class="select" style="width:500px;">
                <el-select v-model="change_type" filterable style="">
                      <el-option
                      v-for="item in change_type1"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                      </el-option>
                </el-select>
              </el-form-item>

              <el-form-item v-show="change_type == '1'" label="询值单价" class="form-input" prop="title" style="width:500px;">
                <el-input  placeholder="请输入" v-model="ask_univalence"></el-input>
              </el-form-item>

              <el-form-item v-show="change_type == '2'" label="应收金额" class="form-input" prop="title" style="width:500px;">
                <el-input  placeholder="请输入" v-model="money_due"></el-input>
              </el-form-item>

              <el-form-item label="变更审核人员" class="select" style="width:500px;">
                <el-select v-model="change_user" filterable style="">
                      <el-option
                      v-for="item in change_user1"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                      </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="备注" class="form-input" prop="title" style="width:500px;">
                <el-input  placeholder="请输入" v-model="admin_desc"></el-input>
              </el-form-item>

              <!-- <el-form-item label="开票审核人id" class="select" style="width:500px;">
                <el-select v-model="form.Invoice_examiner_id" filterable style="">
                      <el-option
                      v-for="item in invoice_examiner"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                      </el-option>
                </el-select>
              </el-form-item> -->
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="outworkidBtn1(),dialogVisible = false">保 存</el-button>
                <el-button @click="dialogFormVisibleChange = false">取 消</el-button>
            </span>
          </el-dialog>
          <!-- **************申请变更弹出框************** -->


  </div>
</template>
<script>
import request from "@/utils/request";
// import check from "@/views/shopAdministration/checkClerk"
import map from '@/utils/city';
export default {
    data() {
      return {
        change_user : '',
        change_user1 : [],
        ask_univalence : '',
        money_due : '',
        admin_desc : '',
        change_type : '',
        change_type1 : [
          {
            label : '询值单价审核',
            value : '1',
          },
          {
            label : '应收金额',
            value : '2',
          }
        ],
        company : '',
        company1 : [],
        project_classify : '',
        project_classify1 : [],
        report_tale : '',
        report_tale1 : [],
        Alphabetic : '',
        Alphabetic1 : [],

        distribution:'5',
        search : '',
        ROW : {},
        checked:'',
        options:map.options,
        activeName: 'first',
        outworkid:'',
        outworkid1:[],
        agentList : [{
            
        },],//列表绑定
        form:{
          user : '',
        },
        dialogVisible : false,//弹出框
        dialogFormVisible : false,//弹出框
        dialogFormVisibleChange : false,//申请变更弹出框
        disa : true,
        shopId : '',//id存储
        formLabelWidth : '120px',
        Id : '',
        generateReportId : '',

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
      cancel(row){//取消
        this.$confirm("您确定要取消吗？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消"
            }).then(() => {
                request.post("/admin/projectChange/cannel", {
                        id:row.id
                }).then(res => {
                    this.distributionBtn1()
                    // res.errno === 0 && this.getList();
                    this.$message({
                        // type: res.errno === 0 ? "success" : "warning",
                        type: "success",
                        message: '取消成功！'
                    });
                }).catch(res => {
                    this.$message({
                        type: "warning",
                        message: "取消失败!"
                    });
                });
            });
      },
      recovery(row){//回收
        this.$confirm("您确定要回收？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消"
            }).then(() => {
                request.post("/admin/Outwork/recycle", {
                        id:row.id
                }).then(res => {
                    this.distributionBtn1()
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
      distributionBtn1(){//切换单选框改变数据
      this.dialogFormVisible = false;
      this.agentList =[];
        if(this.distribution == 0){
          // console.log('未分配')
          // this.getAgentList();//渲染列表
          request.post("/admin/projectChange/query",{
            type : 0,
          }).then(res => {
            if (res.code == 200) {
              this.agentList = res.data.list;
              this.count = res.data.page.count;
              this.max = res.data.page.max;
              this.page = res.data.page.page;
              this.size = res.data.page.size;
            }
          });
        }else if(this.distribution == 1){
          // console.log('已分配')
          request.post("/admin/projectChange/query",{
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
        }else if(this.distribution == 2){
          // console.log('已回收')
          request.post("/admin/projectChange/query",{
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
        }else if(this.distribution == 3){
          // console.log('已完成')
          request.post("/admin/projectChange/query",{
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
        }else if(this.distribution == 4){
          // console.log('已完成')
          request.post("/admin/projectChange/query",{
            type : 4,
          }).then(res => {
            if (res.code == 200) {
              this.agentList = res.data.list;
              this.count = res.data.page.count;
              this.max = res.data.page.max;
              this.page = res.data.page.page;
              this.size = res.data.page.size;
            }
          });
        }else if(this.distribution == 5){
          // console.log('已完成')
          request.post("/admin/project/query").then(res => {
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
      getAgentList() {//初始渲染列表方法封装某人
      this.distributionBtn1();

        request.post("/admin/values/query",{
            type : 'change_user',
          }).then(res => {
            if (res.code == 200) {
              this.change_user1 = res.data;
            }
          });

    },serachBtn(){ // 搜索功能
        if(this.distribution == 0){
          // console.log('未分配')
          // this.getAgentList();//渲染列表
          request.post("/admin/projectChange/query",{
            type : 0,
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
        }else if(this.distribution == 1){
          // console.log('已分配')
          request.post("/admin/projectChange/query",{
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
        }else if(this.distribution == 2){
          // console.log('已回收')
          request.post("/admin/projectChange/query",{
            type : 2,
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
        }else if(this.distribution == 3){
          // console.log('已完成')
          request.post("/admin/projectChange/query",{
            type : 3,
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
        }else if(this.distribution == 4){
          // console.log('已完成')
          request.post("/admin/projectChange/query",{
            type : 4,
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
        }else if(this.distribution == 5){
          // console.log('已完成')
          request.post("/admin/project/query",{
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
        this.dialogFormVisible=true;
        this.outworkid = row.admin_id;
        this.ROW = row;
      },
      ApplyChange(row){
        this.dialogFormVisibleChange=true;
        this.outworkid = row.admin_id;
        this.Id = row.id;
      },
      outworkidBtn(){//分配任务确定
        if(this.distribution == 0){
          request.post("/admin/Outwork/create",{
          id : this.ROW.id,
          outworker_relevance_name : this.outworkid,
          // page : this.currentPage,
          }).then(res => {
              if (res.code == 200) {
                this.$message({
                    // type: res.errno === 0 ? "success" : "warning",
                    type: "success",
                    message: '分配成功'//提示修改成功
                });
                this.distributionBtn1();
              }
          });
        this.dialogFormVisible=false;
        }else if(this.distribution == 5){
          request.post("/admin/Outwork/update",{
          id : this.ROW.id,
          outworker_relevance_name : this.outworkid,
          // page : this.currentPage,
          }).then(res => {
              if (res.code == 200) {
                this.$message({
                    // type: res.errno === 0 ? "success" : "warning",
                    type: "success",
                    message: '重新分配成功'//提示修改成功
                });
                this.distributionBtn1();
              }
          });
        this.dialogFormVisible=false;
        }else if(this.distribution == 1 || this.distribution == 2){
          request.post("/admin/Outwork/update",{
          id : this.ROW.id,
          outworker_relevance_name : this.outworkid,
          // page : this.currentPage,
          }).then(res => {
              if (res.code == 200) {
                this.$message({
                    // type: res.errno === 0 ? "success" : "warning",
                    type: "success",
                    message: '重新分配成功'//提示重新分配成功
                });
                this.dialogFormVisible = false;
                this.distributionBtn1();
              }
          });
        }else if(this.distribution == 4){
          
        }
        
      },
      outworkidBtn1(){
        // data[ask_univalence]
        let change_value = {'ask_univalence':this.ask_univalence};
        let change_value1 = {'money_due' : this.money_due};
        console.log(this.change_type);
        if(this.change_type == '1'){
          request.post("/admin/projectChange/submit",{
            id : this.Id,
            data : change_value,
            admin_desc : this.admin_desc,
            type : this.change_type,
            username : this.change_user,
          }).then(res => {
            this.$message({
                // type: res.errno === 0 ? "success" : "warning",
                type: "success",
                message: '申请成功'//提示申请成功
            });
            this.dialogFormVisibleChange = false;
            this.distributionBtn1();
            this.ask_univalence = '';
            this.admin_desc = '';
            this.change_type = '';
            this.change_user = '';
          })
        }else{
          request.post("/admin/projectChange/submit",{
            id : this.Id,
            data : change_value1,
            admin_desc : this.admin_desc,
            type : this.change_type,
            username : this.change_user,
          }).then(res => {
            this.$message({
                // type: res.errno === 0 ? "success" : "warning",
                type: "success",
                message: '申请成功'//提示申请成功
            });
            this.dialogFormVisibleChange = false;
            this.distributionBtn1();
            this.money_due = '';
            this.admin_desc = '';
            this.change_type = '';
            this.change_user = '';
          })
        }
        
      },
      generateReport(row){//生成报告
        this.generateReportId = row.id;
        this.dialogVisible = true;
      },
      confirmRevision(){//生成报告确定
          request.post("/admin/project/projectReport",{
            id : this.generateReportId,
            company : this.company,
            assess_type1 : this.project_classify,
            assess_type2 : this.report_tale,
            assess_type3 : this.Alphabetic,
          }).then(res => {
            if (res.code == 200) {
              this.$message({
                // type: res.errno === 0 ? "success" : "warning",
                type: "success",
                message: '生成成功'//提示修改成功
              });
              this.distributionBtn1();
              this.company = '';
              this.project_classify = '';
              this.report_tale = '';
              this.Alphabetic = '';

            }
        });
      },
      getInfo(row, event, column){//点击跳到综合页面
        window.open(row.project_info_url, '_blank')
      },
      updateAgent(row) {//修改按钮
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
      // /admin/Outwork/assigned
      this.currentPage = currentPage;
      if(this.distribution == 0){
          // console.log('未分配')
          // this.getAgentList();//渲染列表
          request.post("/admin/projectChange/query",{
            type : 0,
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
        }else if(this.distribution == 1){
          // console.log('已分配')
          request.post("/admin/projectChange/query",{
            type : 1,
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
        }else if(this.distribution == 2){
          // console.log('已回收')
          request.post("/admin/projectChange/query",{
            type : 2,
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
        }else if(this.distribution == 3){
          // console.log('已完成')
          request.post("/admin/projectChange/query",{
            type : 3,
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
        }else if(this.distribution == 4){
          // console.log('已完成')
          request.post("/admin/projectChange/query",{
            type : 4,
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
        }else if(this.distribution == 5){
          // console.log('已完成')
          request.post("/admin/project/query",{
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