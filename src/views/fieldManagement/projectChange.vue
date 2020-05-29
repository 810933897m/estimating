<template>

  <div class="app-container">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
    <el-tab-pane label="项目列表" name="first"></el-tab-pane>
    <!-- <el-tab-pane label="盖章成功" name="success"></el-tab-pane>
    <el-tab-pane label="盖章收回" name="last"></el-tab-pane> -->

    <el-form ref="form" >
        <el-form-item style="width:300px;float:left;">
            <el-input v-model="search" style="width:300px;float:left;" placeholder="流水号/报告编号/项目地址/小区名称"></el-input>
        </el-form-item>
        <el-button type="primary" style="" plain @click="serachBtn">查询</el-button>
        <el-button type="primary" style="" plain @click="AssignTasks">申请项目变更</el-button>
    </el-form>

    <el-table 
      class="table-picture"
      :data="agentList"
      border
      @cell-dblclick="getInfo"
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
          {{scope.row.serial_number}}
        </template>
      </el-table-column>

      <el-table-column
      label="报告编号"
      width="150px"
      align="center">
        <!-- <template slot-scope="scope">
          {{scope.row.city}}
        </template> -->
      </el-table-column>

      <el-table-column
      label="项目地址"
      width="130px"
      align="center">
        <template slot-scope="scope">
          {{scope.row.plot_name}}
        </template>
      </el-table-column>

      <el-table-column
      label="小区名称"
      width="100px"
      align="center">
        <template slot-scope="scope">
          {{scope.row.report_tale}}
        </template>
      </el-table-column>

      <el-table-column
      label="物业来源"
      width="100px"
      align="center">
        <template slot-scope="scope">
          {{scope.row.report_tale}}
        </template>
      </el-table-column>

      <el-table-column
      label="项目状态"
      width="100px"
      align="center">
        <template slot-scope="scope">
          {{scope.row.status}}
        </template>
      </el-table-column>

      <el-table-column
      label="报告类型"
      width="100px"
      align="center">
        <template slot-scope="scope">
          {{scope.row.report_tale}}
        </template>
      </el-table-column>

      <el-table-column
      label="估价目的"
      width="100px"
      align="center">
        <template slot-scope="scope">
          {{scope.row.report_tale}}
        </template>
      </el-table-column>

      <el-table-column
      label="业务来源"
      width="100px"
      align="center">
        <!-- <template slot-scope="scope">
          {{scope.row.report_tale}}
        </template> -->
      </el-table-column>

      <el-table-column
      label="状态"
      width="100px"
      align="center">
        <template slot-scope="scope">
          {{scope.row.project_status}}
        </template>
      </el-table-column>

      <el-table-column
      label="申请日期"
      width="100px"
      align="center">
        <template slot-scope="scope">
          {{scope.row.create_time}}
        </template>
      </el-table-column>

      <el-table-column
      label="加收金额"
      width="100px"
      align="center">
        <template slot-scope="scope">
          {{scope.row.money_due}}
        </template>
      </el-table-column>
    
      <el-table-column
      label="操作"
      fixed="right"
      width="200px" align="center">
        <template slot-scope="scope">
          <!-- <el-button size="small" type="primary" @click="AssignTasks(scope.row)" >申请项目变更</el-button> -->
          <el-button size="small" type="primary" v-if="scope.row.status == '0'" @click="refuse(scope.row)" >撤销</el-button>
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
          <el-dialog style="" :append-to-body='true' title="选择项目" :visible.sync="dialogFormVisible">
           
            <el-form ref="form" label-width="120px" :model="form" style="width:100%;">
              <div style="width:100%;position:relative;height:50px;">
              <!-- <el-form-item label="提示信息" class="form-input" prop="title" style="width:300px;float:left;">
                <el-input  placeholder="请输入提示信息" v-model="admin_desc"></el-input>
              </el-form-item> -->

              <el-button size="small" type="primary" style="margin-left:20px;margin-top:5px;" @click="outworkidBtn()">确认选中</el-button>
              </div>
              <el-table 
              class="table-picture"
              :data="porject"
              border
               
              style="width: 100%;">

              <el-table-column
              label=""
              align="center">
                <template slot-scope="scope">
                   <el-radio v-model="radio" :label="scope.row.id">{{ssss}}</el-radio>
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

            </el-form>
            
          </el-dialog>
          <!-- **************分配任务弹出框************** -->

          <!-- 分配任务弹出框 -->
          <el-dialog style="" :append-to-body='true' title="上传报告文件" :visible.sync="dialogFormVisible1">
            <el-form ref="form" label-width="120px" :model="form" style="width:100%;">
              <el-form-item label="文件类型" class="select" style="">
                <el-select v-model="fileType" filterable style="width:120px;">
                      <el-option
                      v-for="item in fileType1"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                      </el-option>
                </el-select>
              </el-form-item>
              
            </el-form>
          </el-dialog>
          <!-- **************分配任务弹出框************** -->

          <!-- 选择项目弹出框 -->
          <el-dialog style="" :append-to-body='true' title="选择项目" :visible.sync="dialogFormVisible2">
            <el-form ref="form" label-width="120px" :model="form" style="width:100%;">
              <el-form-item label="流水号" class="form-input" prop="title" style="width:250px;">
                <el-input :disabled="true"  v-model="serial_number"></el-input>
              </el-form-item>
              
              <el-form-item label="变更类型" class="select" style="">
                <el-select v-model="change_type" filterable style="width:120px;">
                      <el-option
                      v-for="item in change_type1"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                      </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="加收金额" class="form-input" prop="title" style="width:250px;">
                <el-input v-model="money"></el-input>
              </el-form-item>

              <el-form-item label="变更原因" class="select" style="">
                <el-select v-model="change_because" filterable style="width:120px;">
                      <el-option
                      v-for="item in change_because1"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                      </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="重新看房" class="select" style="">
                <el-select v-model="scan_room" filterable style="width:120px;">
                      <el-option
                      v-for="item in scan_room1"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                      </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="修改审批人" class="select" style="">
                <el-select v-model="change_user" filterable style="width:120px;">
                      <el-option
                      v-for="item in change_user1"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                      </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="备注" class="form-input" prop="title" style="width:250px;">
                <el-input v-model="admin_desc"></el-input>
              </el-form-item>

              <el-button size="small" type="primary" style="margin-left:20px;margin-top:5px;" @click="changeBtn()">提交</el-button>
              
            </el-form>
          </el-dialog>
          <!-- **************选择项目弹出框************** -->

  </div>
</template>
<script>
import request from "@/utils/request";
// import check from "@/views/shopAdministration/checkClerk"
import map from '@/utils/city';
export default {
    data() {
      return {
        admin_desc : '',
        serial_number : '',
        money : '0.00',
        change_type : '',
        change_type1 : [],
        change_because : '',
        change_because1 : [],
        scan_room : '',
        scan_room1 : [],
        change_user : '',
        change_user1 : [],
        radio :'',
        porject : [],
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
        agentList : [{
            
        },],//列表绑定
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
        ssss:'',
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
          request.post("/admin/projectChange/query").then(res => {
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
        request.post("/admin/projectChange/query").then(res => {
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

    },serachBtn(){ // 搜索功能
      if(this.activeName == 'first'){
          request.post("/admin/projectChange/query",{
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
      AssignTasks(){//申请项目变更
        this.tongyi = true;
        this.dialogFormVisible = true;
        request.post("/admin/projectChange/param").then(res => {
              if (res.code == 200) {
                this.porject = res.data.porject;
                this.change_type1 = res.data.change_type;
                this.change_because1 = res.data.change_because;
                this.scan_room1 = res.data.scan_room;
                this.change_user1 = res.data.change_user;
              }
          });

      },
      refuse(row){
        // this.tongyi = false;
        console.log(row)
        // this.dialogFormVisible = true;
        // this.Id = row.id;
         request.post("/admin/projectChange/callback",{
          id : row.id,
          }).then(res => {
              if (res.code == 200) {
                this.$message({
                    // type: res.errno === 0 ? "success" : "warning",
                    type: "success",
                    message: '撤销成功'//提示撤销成功
                });
                this.getAgentList();
              }
          });
      },
      outworkidBtn(){//分配任务确定
        console.log(this.radio)
        this.Id = this.radio;
        if(this.radio !=''){
          this.dialogFormVisible = false;
          this.dialogFormVisible2 = true;
        }
      },
      changeBtn(){
        console.log(this.change_type,this.change_because,this.scan_room,this.change_user,this.money,this.admin_desc)
        request.post("/admin/projectChange/create",{
          id : this.Id,
          change_type : this.change_type,
          change_because : this.change_because,
          scan_room : this.scan_room,
          change_user_id : this.change_user,
          change_price : this.money,
          admin_desc : this.admin_desc,
          }).then(res => {
              if (res.code == 200) {
                this.$message({
                    // type: res.errno === 0 ? "success" : "warning",
                    type: "success",
                    message: '提交成功'//提示提交成功
                });
                this.radio = '';
                this.change_type = '';
                this.change_because = '';
                this.scan_room = '';
                this.change_user = '';
                this.money = '0.00';
                this.admin_desc = '';
                this.dialogFormVisible2 = false;
                this.getAgentList();
              }
          });
      },
      getInfo(row, event, column){//点击跳到综合页面
        console.log(row.id);
        const {href} = this.$router.resolve({
        path: '/comprehensiveList',
        query: {
          id: row.id
        }
      })
      window.open(href, '_blank')
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
            request.post("/admin/projectChange/query",{
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