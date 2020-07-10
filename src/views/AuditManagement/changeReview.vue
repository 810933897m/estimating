<template>

  <div class="app-container">
    <!-- <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
    <el-tab-pane label="未审核" name="first"></el-tab-pane>
    <el-tab-pane label="审核成功" name="success"></el-tab-pane>
    <el-tab-pane label="审核收回" name="last"></el-tab-pane> -->

    <el-form ref="form" >
        <el-form-item>
            <el-radio v-model="activeName" label="first" @change="handleClick()">等待审核</el-radio>
            <el-radio v-model="activeName" label="success" @change="handleClick()">审核通过</el-radio>
            <el-radio v-model="activeName" label="last" @change="handleClick()">审核失败</el-radio>
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
      v-if="activeName == 'success'"
      label="备注"
      width="120px"
      key="1" 
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.admin_desc" class="nooverflow">{{scope.row.admin_desc}}</p>
        </template>
      </el-table-column>

      <el-table-column
      v-if="activeName == 'last'"
      label="原因"
      width="120px"
      key="2" 
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.admin_desc" class="nooverflow">{{scope.row.admin_desc}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="流水号"
      width="120px"
      key="3" 
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.serial_number" style="cursor: pointer;" @click="getInfo(scope.row)" class="nooverflow">{{scope.row.serial_number}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="报告编号"
      key="4" 
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.report_number" class="nooverflow">{{scope.row.report_number}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="项目状态"
      key="5" 
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.property_type" class="nooverflow">{{scope.row.property_type}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="项目地址"
      key="6" 
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.plot_address" class="nooverflow">{{scope.row.plot_address}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="小区名称"
      key="7" 
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.plot_name" class="nooverflow">{{scope.row.plot_name}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="受理时间"
      key="8" 
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.create_time" class="nooverflow">{{scope.row.create_time}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="报告类型"
      key="9" 
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.report_tale" class="nooverflow">{{scope.row.report_tale}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="流程状态"
      key="10" 
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.approval_status" class="nooverflow">{{scope.row.approval_status}}</p>
        </template>
      </el-table-column>
    
      <el-table-column
      label="操作"
      fixed="right"
      v-if="activeName == 'first'"
      width="100px" align="center">
        <template slot-scope="scope">
          <el-button size="small" type="primary" v-if="activeName == 'first'" @click="refuse(scope.row)" >审核</el-button>
          <!-- <el-button size="small" type="primary" v-if="activeName == 'first'" @click="AssignTasks(scope.row)" >同意</el-button>
          <el-button size="small" type="primary" v-if="activeName == 'first'" @click="refuse(scope.row)" >拒绝</el-button> -->

          <!-- <el-button size="small" type="primary" v-else-if="activeName == 'last'" @click="uploadBtn(scope.row)">审核历史</el-button>
          <el-button size="small" type="primary" v-if="activeName == 'first'" @click="submitBtn(scope.row)" >提交</el-button>
          <el-button size="small" type="primary" v-else-if="activeName == 'last'" @click="uploadBtn(scope.row)">查看详细</el-button> -->
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
    
    <!-- 分配任务弹出框 -->
          <el-dialog style="" :append-to-body='true' title="提示" :visible.sync="dialogFormVisibleTips">
           
            <el-form ref="form" label-width="120px" :model="form" style="width:100%;">
              <div style="width:100%;position:relative;height:50px;">
              </div>

            </el-form>
            
          </el-dialog>
          <!-- **************分配任务弹出框************** -->

          <!-- 分配任务弹出框 -->
          <el-dialog style="" :append-to-body='true' title="操作" :visible.sync="dialogFormVisible">
           <p v-html="title" style="margin-left:20px;"></p>
            <el-form ref="form" label-width="120px" :model="form" style="width:100%;">
              <div style="width:100%;position:relative;height:50px;">
              <el-form-item label="审核" class="form-input" prop="title" style="width:300px;float:left;">
                <el-input  placeholder="请输入审核建议" v-model="admin_desc"></el-input>
              </el-form-item>

              <el-button size="small" type="primary" style="margin-left:20px;margin-top:5px;" @click="outworkidBtn()">同意</el-button>
              <el-button size="small" type="primary" style="margin-left:20px;margin-top:5px;" @click="outworkidBtn1()">拒绝</el-button>
              </div>

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

  </div>
</template>
<script>
import request from "@/utils/request";
// import check from "@/views/shopAdministration/checkClerk"
import map from '@/utils/city';
export default {
    data() {
      return {
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
        title : '',
        dialogFormVisible : false,//弹出框
        dialogFormVisible1 : false,//上传附件弹出框
        dialogFormVisible2 : false,//报告审核人弹出框
        dialogFormVisibleTips : false,//报告审核人弹出框
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
          // console.log(param);
            // let formData = new FormData();
            // formData.append('Excelfile', param.file);
            // request.post("/api/classroom/questions/add", formData).then(res => {
            //     if (res.code == 200){
            //         this.questions = res.data;
            //     }
            // });
      },
      handleClick(tab, event){//改变状态
      this.agentList =[];
        // console.log(this.activeName)
        if(this.activeName == 'first'){
          request.post("/admin/projectChangeCheck/query",{
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
        }else if(this.activeName == 'success'){
          request.post("/admin/projectChangeCheck/query",{
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
        }
        else if(this.activeName == 'last'){
          request.post("/admin/projectChangeCheck/query",{
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
        request.post("/admin/projectChangeCheck/query",{
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
        request.post("/admin/values/query",{
          type : 'change_auditor',
          name:'',
        }).then(res => {
            if (res.code == 200) {
              // console.log(res)
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
          request.post("/admin/projectChangeCheck/query",{
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
        }else if(this.activeName == 'success'){
          request.post("/admin/projectChangeCheck/query",{
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
        else if(this.activeName == 'last'){
          request.post("/admin/projectChangeCheck/query",{
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
        }
        
      },
      Tips(row){
        this.dialogFormVisibleTips = true;
        this.Id = row.id;
      },
      AssignTasks(row){//分配任务
        this.tongyi = true;
        // console.log(row)
        this.dialogFormVisible = true;
        this.Id = row.id;
      },
      refuse(row){
        request.post("/admin/projectChangeCheck/messgae",{
          id : row.id,
          }).then(res => {
            this.title = res.data;
          })
        this.tongyi = false;
        // console.log(row)
        this.dialogFormVisible = true;
        this.Id = row.id;
      },
      outworkidBtn(){//分配任务确定
          request.post("/admin/projectChangeCheck/submit",{
          id : this.Id,
          admin_desc : this.admin_desc,
          }).then(res => {
              if (res.code == 200) {
                this.$message({
                    // type: res.errno === 0 ? "success" : "warning",
                    type: "success",
                    message: '通过成功'//提示变成成功
                });
                this.handleClick();
              }
          });
        this.dialogFormVisible=false;
        this.admin_desc = '';
        // console.log(this.ROW.id);
        // console.log(this.outworkid);
      },
      outworkidBtn1(){//分配任务确定
          request.post("/admin/projectChangeCheck/refuse",{
          id : this.Id,
          admin_desc : this.admin_desc,
          }).then(res => {
              if (res.code == 200) {
                this.$message({
                    // type: res.errno === 0 ? "success" : "warning",
                    type: "success",
                    message: '拒绝成功'//提示拒绝成功
                });
                this.handleClick();
              }
          });
        this.dialogFormVisible=false;
        this.admin_desc = '';
        
        // console.log(this.ROW.id);
        // console.log(this.outworkid);
      },
      //分页
      handleCurrentChange: function(currentPage){//换页
          // console.log(currentPage)  
          this.currentPage = currentPage;
          if(this.activeName == 'first'){
          request.post("/admin/projectChangeCheck/query",{
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
        }else if(this.activeName == 'success'){
          request.post("/admin/projectChangeCheck/query",{
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
        }
        else if(this.activeName == 'last'){
          request.post("/admin/projectChangeCheck/query",{
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
        }
          
      },
      addCommodity(){//添加询价
        this.$router.push({path:'/addInquiry'})
      },
      uploadBtn(row){
        // console.log(row);
        this.dialogFormVisible1 = true;
      },
      submitBtn(row){//提交
        this.ReportReviewerId = row.id;
        this.price_status = row.price_status;
        this.dialogFormVisible2 = true;
        // console.log(this.ReportReviewerId,this.price_status)
      },
      getInfo(row, event, column){//点击跳到综合页面
        // console.log(row.id);
        window.open(row.project_info_url, '_blank')
      },
      submit(){
        request.post("/admin/Auditing/affirm",{
          id : this.ReportReviewerId,
          price_status : this.price_status,
          ask_univalence : this.ask_univalence,
        }).then(res => {
            // console.log(res)
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