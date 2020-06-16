<template>

  <div class="app-container">

    <el-form ref="form" >
        <el-form-item>
            <el-radio v-model="distribution" label="0" @change="distributionBtn1()">未分配</el-radio>
            <el-radio v-model="distribution" label="1" @change="distributionBtn1()">已分配</el-radio>
            <el-radio v-model="distribution" label="2" @change="distributionBtn1()">已挂起</el-radio>
            <el-radio v-model="distribution" label="3" @change="distributionBtn1()">审核中</el-radio>
            <el-radio v-model="distribution" label="4" @change="distributionBtn1()">已完成</el-radio>
            <el-input v-model="search" style="width:200px;" placeholder="流水号/报告编号/项目地址/小区名称"></el-input>
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
      v-if="distribution == '2'"
      align="center">
        <template slot-scope="scope" >
          <p :title="scope.row.hang_up_content" class="nooverflow">{{scope.row.hang_up_content}}</p>
        </template>
      </el-table-column>

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
      label="内业人员"
      width="100px"
      key="2" 
      v-if="distribution == '1' ||distribution == '2' ||distribution == '3' ||distribution == '4' "
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.admin_username" class="nooverflow">{{scope.row.admin_username}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="操作"
      fixed="right"
      v-if="distribution == '0' ||distribution == '1'"
      width="150px" align="center">
        <template slot-scope="scope">
          <el-button size="small" type="primary" v-if="distribution == '0'" @click="AssignTasks(scope.row)" >任务分配</el-button>
          <el-button size="small" type="primary" v-if="distribution == '1'" @click="AssignTasks1(scope.row)">重新分配</el-button>
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
          <el-dialog style="" :append-to-body='true' title="分配" :visible.sync="dialogFormVisible">
            <el-form ref="form" label-width="120px" :model="form" style="width:100%;">
              <div style="width:100%;position:relative;height:50px;">
                  <el-form-item label="撰写人" class="select" style="float:left;">
                  <el-select v-model="outworkid" filterable style="width:120px;">
                      <el-option
                      v-for="item in outworkid1"
                      :key="item.value"
                      :label="item.value"
                      :value="item.value">
                      </el-option>
                  </el-select>
                </el-form-item>
              <el-button size="small" type="primary" style="margin-left:20px;margin-top:5px;" @click="outworkidBtn()">确定</el-button>
              </div>
            </el-form>
          </el-dialog>
          <!-- **************分配任务弹出框************** -->

          <!-- 分配任务弹出框 -->
          <el-dialog style="" :append-to-body='true' title="分配" :visible.sync="dialogFormVisible1">
            <el-form ref="form" label-width="120px" :model="form" style="width:100%;">
              <div style="width:100%;position:relative;height:50px;">
                  <el-form-item label="撰写人" class="select" style="float:left;">
                  <el-select v-model="outworkid2" filterable style="width:120px;">
                      <el-option
                      v-for="item in outworkid22"
                      :key="item.value"
                      :label="item.value"
                      :value="item.value">
                      </el-option>
                  </el-select>
                </el-form-item>
              <el-button size="small" type="primary" style="margin-left:20px;margin-top:5px;" @click="outworkidBtn()">确定</el-button>
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
        distribution:'0',
        search : '',
        ROW : {},
        checked:'',
        options:map.options,
        outworkid2 : '',
        outworkid22 : [],
        outworkid:'',
        outworkid1:[],
        agentList : [{
            
        },],//列表绑定
        form:{
          user : '',
        },
        dialogFormVisible : false,//弹出框
        dialogFormVisible1 : false,//弹出框
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
      distributionBtn1(){//切换单选框改变数据
      this.dialogFormVisible = false;
      this.agentList =[];
        if(this.distribution == 0){
          // console.log('未分配')
          // this.getAgentList();//渲染列表
          request.post("/admin/secretary/query",{
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
          request.post("/admin/secretary/query",{
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
          request.post("/admin/secretary/query",{
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
          request.post("/admin/secretary/query",{
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
          request.post("/admin/secretary/query",{
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
        request.post("/admin/secretary/query",{
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
          type : 'secretary_relevance_user',
          name :'',
        }).then(res => {
            if (res.code == 200) {
              this.outworkid1 = res.data;
            }
        });

    },serachBtn(){ // 搜索功能
    if(this.distribution == 0){
          request.post("/admin/secretary/query",{
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
          request.post("/admin/secretary/query",{
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
          request.post("/admin/secretary/query",{
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
          request.post("/admin/secretary/query",{
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
          request.post("/admin/secretary/query",{
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
        }
      },
      AssignTasks(row){//分配任务
        request.post("/admin/values/query",{
          type : 'secretary_relevance_user',
          name :'',
        }).then(res => {
            if (res.code == 200) {
              this.outworkid1 = res.data;
            }
        });
        this.dialogFormVisible=true;
        this.outworkid = row.admin_id;
        this.ROW = row;
      },
      AssignTasks1(row){//分配任务
        request.post("/admin/values/query",{
          type : 'secretary_relevance_user',
          name :'',
        }).then(res => {
            if (res.code == 200) {
              this.outworkid22 = res.data;
            }
        });
        this.dialogFormVisible1=true;
        // this.outworkid = row.admin_id;
        this.ROW = row;
      },
      outworkidBtn(){//分配任务确定
        if(this.distribution == '0'){
          request.post("/admin/Secretary/create",{
          id : this.ROW.id,
          secretary_relevance_name : this.outworkid,
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
        }else if(this.distribution == '1'){
          request.post("/admin/Secretary/update",{
          id : this.ROW.id,
          secretary_relevance_name : this.outworkid2,
          // page : this.currentPage,
          }).then(res => {
              if (res.code == 200) {
                this.$message({
                    // type: res.errno === 0 ? "success" : "warning",
                    type: "success",
                    message: '重新分配成功'//提示修改成功
                });
                this.dialogFormVisible1=false;
                this.distributionBtn1();
              }
          });
        // this.dialogFormVisible=false;
        }

        
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
          this.currentPage = currentPage;
          if(this.distribution == 0){
          request.post("/admin/secretary/query",{
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
          request.post("/admin/secretary/query",{
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
          request.post("/admin/secretary/query",{
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
          request.post("/admin/secretary/query",{
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
          request.post("/admin/secretary/query",{
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