<template>

  <div class="app-container">
    <!-- <el-tabs v-model="activeName" type="card">
    <el-tab-pane label="外业跟进" name="first"> -->
      <el-form ref="form" >
        <el-form-item>
            <!-- <el-radio v-model="distribution" label="1" @change="distributionBtn1()">待领取</el-radio>
            <el-radio v-model="distribution" label="2" @change="distributionBtn1()">已领取</el-radio>
            <el-radio v-model="distribution" label="3" @change="distributionBtn1()">已挂起</el-radio>
            <el-radio v-model="distribution" label="4" @change="distributionBtn1()">已完成</el-radio>
            <el-radio v-model="distribution" label="5" @change="distributionBtn1()">已回收</el-radio> -->
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
      key="11"
      align="center">
        <template slot-scope="scope" >
          {{scope.row.id}}
        </template>
      </el-table-column>

      <el-table-column
      label="流水号"
      width="200px"
      key="12"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.serial_number" style="cursor: pointer;" @click="getInfo(scope.row)" class="nooverflow">{{scope.row.serial_number}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="报告号"
      width="120px"
      key="13"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.report_number" class="nooverflow">{{scope.row.report_number}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="报告地址"
      width="120px"
      key="14"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.show_merge_addr" class="nooverflow">{{scope.row.show_merge_addr}}</p>
        </template>
      </el-table-column>

      <!-- <el-table-column
      label="项目状态"
      width="200px"
      key="15"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.project_status" class="nooverflow">{{scope.row.project_status}}</p>
        </template>
      </el-table-column> -->

      <el-table-column
      label="外业状态"
      key="16"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.outworker_relevance_status" class="nooverflow">{{scope.row.outworker_relevance_status}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="内业状态"
      key="18"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.secretary_relevance_status" class="nooverflow">{{scope.row.secretary_relevance_status}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="二审状态"
      width="150px"
      key="19"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.secretary_relevance_check" class="nooverflow">{{scope.row.secretary_relevance_check}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="终审状态"
      width="150px"
      key="20"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.final_appraisal_check" class="nooverflow">{{scope.row.final_appraisal_check}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="财务状态"
      width="150px"
      key="21"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.finance_status" class="nooverflow">{{scope.row.finance_status}}</p>
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
          <el-dialog style="" :append-to-body='true' title="分配" :visible.sync="dialogFormVisible">
            <el-form ref="form" label-width="120px" :model="form" style="">
              <div style="width:100%;position:relative;height:50px;">
                  <el-form-item label="撰写人" class="select" style="float:left;">
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


  </div>
</template>
<script>
import request from "@/utils/request";
// import check from "@/views/shopAdministration/checkClerk"
import map from '@/utils/city';
export default {
    data() {
      return {
        company : '',
        company1 : [],
        project_classify : '',
        project_classify1 : [],
        report_tale : '',
        report_tale1 : [],
        Alphabetic : '',
        Alphabetic1 : [],

        distribution:'1',
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

       hang_up_contentShow:false,
      }
    },
    created() {
     this.getAgentList();//渲染列表
    },
    methods: {
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
          request.post("/admin/outwork/query",{
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
          request.post("/admin/EntryDetails/outQuery",{
            type : 0,
            id : localStorage.getItem('user_id'),
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
          request.post("/admin/EntryDetails/outQuery",{
            type : 1,
            id : localStorage.getItem('user_id'),
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
          request.post("/admin/EntryDetails/outQuery",{
            type : 2,
            id : localStorage.getItem('user_id'),
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
          request.post("/admin/EntryDetails/outQuery",{
            type : 3,
            id : localStorage.getItem('user_id'),
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
          request.post("/admin/EntryDetails/outQuery",{
            type : 4,
            id : localStorage.getItem('user_id'),
          }).then(res => {
            if (res.code == 200) {
              this.agentList = res.data.list;
              this.count = res.data.page.count;
              this.max = res.data.page.max;
              this.page = res.data.page.page;
              this.size = res.data.page.size;
            }
          });
        }else if(this.distribution == 6){
          request.post("/admin/outwork/query",{
            type : 6,
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
      getAgentList() {//初始渲染列表方法封装某人
        request.post("/admin/EntryDetails/outQuery",{
          id : localStorage.getItem('user_id')
        }).then(res => {
              if (res.code == 200) {
                this.agentList = res.data.list;
                this.count = res.data.page.count;
                this.max = res.data.page.max;
                this.page = res.data.page.page;
                this.size = res.data.page.size;
              }
          });
        // request.post("/admin/outwork/query",{
        //     type : 0,
        //   }).then(res => {
        //     if (res.code == 200) {
        //       this.agentList = res.data.list;
        //       this.count = res.data.page.count;
        //       this.max = res.data.page.max;
        //       this.page = res.data.page.page;
        //       this.size = res.data.page.size;
        //     }
        //   });
        

        request.post("/admin/values/query",{
          type : 'report_number_children',
          name : '公司简称',
        }).then(res => {
            if (res.code == 200) {
              this.company1 = res.data;
            }
        });
        request.post("/admin/values/query",{
          type : 'report_number_children',
          name : '项目分类',
        }).then(res => {
            if (res.code == 200) {
              this.project_classify1 = res.data;
            }
        });
        request.post("/admin/values/query",{
          type : 'report_number_children',
          name : '报告类型',
        }).then(res => {
            if (res.code == 200) {
              this.report_tale1 = res.data;
            }
        });
        request.post("/admin/values/query",{
          type : 'report_number_children',
          name : '字母分类',
        }).then(res => {
            if (res.code == 200) {
              this.Alphabetic1 = res.data;
            }
        });
        
        request.post("/admin/values/query",{
          type : 'outworker_relevance_user',
          name :'',
        }).then(res => {
            if (res.code == 200) {
              this.outworkid1 = res.data;
            }
        });

    },serachBtn(){ // 搜索功能
      if(this.distribution == 0){
          request.post("/admin/outwork/query",{
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
          request.post("/admin/EntryDetails/outQuery",{
            keyword : this.search,
            id : localStorage.getItem('user_id'),
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
          request.post("/admin/EntryDetails/outQuery",{
            type : 1,
            keyword : this.search,
            id : localStorage.getItem('user_id'),
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
          request.post("/admin/EntryDetails/outQuery",{
            type : 2,
            keyword : this.search,
            id : localStorage.getItem('user_id'),
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
          request.post("/admin/EntryDetails/outQuery",{
            type : 3,
            keyword : this.search,
            id : localStorage.getItem('user_id'),
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
          request.post("/admin/EntryDetails/outQuery",{
            type : 4,
            keyword : this.search,
            id : localStorage.getItem('user_id'),
          }).then(res => {
            if (res.code == 200) {
              this.agentList = res.data.list;
              this.count = res.data.page.count;
              this.max = res.data.page.max;
              this.page = res.data.page.page;
              this.size = res.data.page.size;
            }
          });
        }else if(this.distribution == 6){
          request.post("/admin/outwork/query",{
            type : 6,
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
          request.post("/admin/outwork/query",{
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
          request.post("/admin/EntryDetails/outQuery",{
            keyword : this.search,
            page : currentPage,
            id : localStorage.getItem('user_id'),
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
          request.post("/admin/EntryDetails/outQuery",{
            type : 1,
            keyword : this.search,
            page : currentPage,
            id : localStorage.getItem('user_id'),
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
          request.post("/admin/EntryDetails/outQuery",{
            type : 2,
            keyword : this.search,
            page : currentPage,
            id : localStorage.getItem('user_id'),
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
          request.post("/admin/EntryDetails/outQuery",{
            type : 3,
            keyword : this.search,
            page : currentPage,
            id : localStorage.getItem('user_id'),
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
          request.post("/admin/EntryDetails/outQuery",{
            type : 4,
            keyword : this.search,
            page : currentPage,
            id : localStorage.getItem('user_id'),
          }).then(res => {
            if (res.code == 200) {
              this.agentList = res.data.list;
              this.count = res.data.page.count;
              this.max = res.data.page.max;
              this.page = res.data.page.page;
              this.size = res.data.page.size;
            }
          });
        }else if(this.distribution == 6){
          request.post("/admin/outwork/query",{
            type : 6,
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