<template>

  <div class="app-container">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
    <el-tab-pane label="审核中" name="first"></el-tab-pane>

    <el-tab-pane label="已审核过" name="last"></el-tab-pane>

    <el-form ref="form" >
        <el-form-item style="width:300px;float:left;">
            <el-input v-model="search" style="width:300px;float:left;" placeholder="流水号/报告编号/项目地址/小区名称"></el-input>
        </el-form-item>
        <el-button type="primary" style="" plain @click="serachBtn">查询</el-button>
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
          {{scope.row.approval_status}}
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
          {{scope.row.report_number}}
        </template>
      </el-table-column>

      <el-table-column
      label="旧流水号"
      width="150px"
      align="center">
        <!-- <template slot-scope="scope">
          {{scope.row.city}}
        </template> -->
      </el-table-column>

      <el-table-column
      label="旧报告编号"
      width="200px"
      align="center">
        <!-- <template slot-scope="scope">
          {{scope.row.plot_address}}
        </template> -->
      </el-table-column>

      <el-table-column
      label="项目状态"
      width="100px"
      align="center">
        <!-- <template slot-scope="scope">
          {{scope.row.property_type}}
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
      label="受理时间"
      width="100px"
      align="center">
        <template slot-scope="scope">
          {{scope.row.report_tale}}
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
      label="流程状态"
      width="100px"
      align="center">
        <template slot-scope="scope">
          {{scope.row.property_type}}
        </template>
      </el-table-column>

      <el-table-column
      label="撰写人员"
      width="100px"
      align="center">
        <!-- <template slot-scope="scope">
          {{scope.row.approval_status}}
        </template> -->
      </el-table-column>
    
      <el-table-column
      label="操作"
      fixed="right"
      width="280px" align="center">
        <template slot-scope="scope">
          <el-button size="small" type="primary" v-if="activeName == 'first'" @click="AssignTasks(scope.row)" >审核记录</el-button>
          <el-button size="small" type="primary" v-if="activeName == 'first'" @click="imageBtn(scope.row)" >审核报告</el-button>
          <el-button size="small" type="primary" v-else-if="activeName == 'last'" @click="uploadBtn(scope.row)">审核历史</el-button>
          <el-button size="small" type="primary" v-if="activeName == 'first'" @click="submitBtn(scope.row)" >提交</el-button>
          <el-button size="small" type="primary" v-else-if="activeName == 'last'" @click="uploadBtn(scope.row)">查看详细</el-button>
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
    
  </el-tabs>
    
          <!-- 分配任务弹出框 -->
          <el-dialog style="" :append-to-body='true' title="任务分配" :visible.sync="dialogFormVisible">
            <p style="color:rgb(14,45,146);font-weight:800;line-height:30px;width:100%;height:30px;background:rgb(230,240,255);font-size:15px;margin-top:0;">
                项目信息
            </p>
           
            <el-form ref="form" label-width="120px" :model="form" style="width:100%;">
              <div style="width:100%;position:relative;height:50px;">
                  <el-form-item label="外采用户" class="select" style="position:absolute;left:0;">
                  <el-select v-model="outworkid" filterable style="width:120px;">
                      <el-option
                      v-for="item in outworkid1"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                      </el-option>
                  </el-select>
                </el-form-item>
                <el-checkbox style="position:absolute;left:250px;top:10px;" v-model="checked">推送到App</el-checkbox>
                <el-form-item label="查勘表" class="select" style="position:absolute;left:300px;">
                <el-select v-model="form.user" filterable style="width:120px;">
                    <el-option
                    v-for="item in form.user"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
              </el-form-item>
              <el-button size="small" type="primary" style="position:absolute;left:550px;" @click="outworkidBtn()">确定</el-button>
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

              <!-- *************文件上传************* -->
            <el-form-item label="文件" prop="coverFile">
                  <el-upload
                  class="upload-demo"
                  drag
                  :limit="1"
                  :http-request="excelFileClass"
                  accept=".xlsx,.xls,.csv,.pdf"
                  action=""
                  multiple>
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text"><em>点击上传</em></div>
                  <div class="el-upload__tip" slot="tip">xlsx/xls/csv/pdf，且不超过200M</div>
                </el-upload>

                <!-- <el-upload
                class="upload-demo"
                ref="uploadExcel"
                :limit="1"
                accept=".xlsx,.xls,.csv,.pdf"
                :http-request="excelFileClass"
                :with-credentials="true"
                :auto-upload="true"
                action=""
                list-type="list"
                :file-list="fileList">
                    <el-button slot="trigger" type="primary">
                        选取文件
                    </el-button>
                </el-upload> -->
            </el-form-item>
            <!-- *************文件上传************* -->
              
            </el-form>
          </el-dialog>
          <!-- **************分配任务弹出框************** -->

          <!-- 分配任务弹出框 -->
          <el-dialog style="" :append-to-body='true' title="报告审核人提交" :visible.sync="dialogFormVisible2">
            <el-form ref="form" label-width="120px" :model="form" style="width:100%;">
              <el-form-item label="报告审核人" class="select" style="">
                <el-select v-model="ask_univalence" filterable style="width:120px;">
                      <el-option
                      v-for="item in ask_univalence1"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                      </el-option>
                </el-select>
                <el-button size="small" type="primary" @click="submit()">提交</el-button>
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
          request.post("/admin/Auditing/query").then(res => {
            if (res.code == 200) {
              this.agentList = res.data.list;
              this.count = res.data.page.count;
              this.max = res.data.page.max;
              this.page = res.data.page.page;
              this.size = res.data.page.size;
            }
        });
        }else if(this.activeName == 'last'){
          request.post("/admin/Auditing/inquire").then(res => {
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
        request.post("/admin/Auditing/query").then(res => {
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
          request.post("/admin/Auditing/query",{
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
        }else if(this.activeName == 'last'){
          request.post("/admin/Auditing/inquire",{
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
        console.log(row)
        this.$router.push({path:'/AuditRecord',query:{row:row}})
      },
      getInfo(row, event, column){//点击跳到综合页面
        console.log(row.id);
        window.open(row.project_info_url, '_blank')
      },
      outworkidBtn(){//分配任务确定
        if(this.distribution == 1){
          request.post("/admin/Outwork/create",{
          id : this.ROW.id,
          outworkid : this.outworkid,
          // page : this.currentPage,
          }).then(res => {
              if (res.code == 200) {
                this.$message({
                    // type: res.errno === 0 ? "success" : "warning",
                    type: "success",
                    message: '分配成功'//提示修改成功
                });
              }
          });
        this.dialogFormVisible=false;
        }else if(this.distribution == 2){
          request.post("/admin/Outwork/update",{
          id : this.ROW.id,
          outworkid : this.outworkid,
          // page : this.currentPage,
          }).then(res => {
              if (res.code == 200) {
                this.$message({
                    // type: res.errno === 0 ? "success" : "warning",
                    type: "success",
                    message: '重新分配成功'//提示修改成功
                });
              }
          });
        this.dialogFormVisible=false;
        }else if(this.distribution == 3){
          
        }else if(this.distribution == 4){
          
        }

        console.log(this.ROW.id);
        console.log(this.outworkid);
        
      },
      //分页
      handleCurrentChange: function(currentPage){//换页
          console.log(currentPage)  
          this.currentPage = currentPage;
          if(this.activeName == 'first'){
              request.post("/admin/Auditing/query",{
              page : currentPage,
              keyword : this.search,
            }).then(res => {
                console.log(res)
                if (res.code == 200) {
                  this.agentList = res.data.list;
                }
            });
          }else if(this.activeName == 'last'){
            request.post("/admin/Auditing/inquire",{
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
      addCommodity(){//添加询价
        this.$router.push({path:'/addInquiry'})
      },
      uploadBtn(row){
        console.log(row);
        this.dialogFormVisible1 = true;
      },
      submitBtn(row){//提交
        this.ReportReviewerId = row.id;
        this.price_status = row.price_status;
        this.dialogFormVisible2 = true;
        console.log(this.ReportReviewerId,this.price_status)
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