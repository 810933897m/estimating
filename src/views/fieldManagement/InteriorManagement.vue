<template>

  <div class="app-container">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
    <el-tab-pane label="未分配" name="first">
      
    </el-tab-pane>

    <el-tab-pane label="已分配" name="two">
    </el-tab-pane>

    <el-form ref="form" >
        <el-form-item style="width:300px;float:left;">
            <el-input v-model="search" style="width:300px;float:left;" placeholder="流水号/报告编号/项目地址/小区名称"></el-input>
        </el-form-item>
            <!-- <el-form-item label="是否需要外业" class="select" style="width:300px;float:left;">
                <el-select v-model="outworkid" filterable style="width:180px;float:left;">
                    <el-option
                    v-for="item in outworkid1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="外业是否完成" class="select" style="width:300px;float:left;">
                <el-select v-model="outworkid" filterable style="width:180px;float:left;">
                    <el-option
                    v-for="item in outworkid1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
              </el-form-item> -->
              <el-button type="primary" style="" plain @click="serachBtn">查询</el-button>
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
      width="200px"
      align="center">
        <template slot-scope="scope">
          {{scope.row.plot_address}}
        </template>
      </el-table-column>

      <el-table-column
      label="小区名称"
      width="130px"
      align="center">
        <template slot-scope="scope">
          {{scope.row.plot_name}}
        </template>
      </el-table-column>

      <el-table-column
      label="紧急程度"
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
      label="物业类型"
      width="100px"
      align="center">
        <template slot-scope="scope">
          {{scope.row.property_type}}
        </template>
      </el-table-column>

      <el-table-column
      label="项目状态"
      width="100px"
      align="center">
        <template slot-scope="scope">
          {{scope.row.approval_status}}
        </template>
      </el-table-column>
    
      <el-table-column
      label="撰写人员"
      width="100px"
      v-if="activeName == 'two'"
      align="center">
        <template slot-scope="scope">
          {{scope.row.approval_status}}
        </template>
      </el-table-column>

      <el-table-column
      label="流程状态"
      width="100px"
      align="center">
        <template slot-scope="scope">
          {{scope.row.approval_status}}
        </template>
      </el-table-column>

      <el-table-column
      label="立项时间"
      v-if="activeName == 'first'"
      width="150px"
      align="center">
        <template slot-scope="scope">
          {{scope.row.create_time}}
        </template>
      </el-table-column>

      <el-table-column
      label="分配时间"
      v-else-if="activeName == 'two'"
      width="150px"
      align="center">
        <template slot-scope="scope">
          {{scope.row.finish_time}}
        </template>
      </el-table-column>

      <el-table-column
      label="操作"
      fixed="right"
      width="150px" align="center">
        <template slot-scope="scope">
          <el-button size="small" type="primary" v-if="activeName == 'first'" @click="AssignTasks(scope.row)" >任务分配</el-button>
          <el-button size="small" type="primary" v-else-if="activeName == 'two'" @click="AssignTasks(scope.row)">重新分配</el-button>
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
           
            <el-form ref="form" label-width="120px" :model="form" style="width:100%;">
              <div style="width:100%;position:relative;height:50px;">
                  <el-form-item label="外采用户" class="select" style="float:left;">
                  <el-select v-model="outworkid" filterable style="width:120px;">
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
            <!-- </div> -->
            <!-- <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="confirmRevision()">确定修改</el-button>
            </div> -->
            
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
        console.log(this.activeName)
        if(this.activeName == 'first'){
          this.getAgentList();//渲染列表
        }else if(this.activeName == 'two'){
          // console.log('2')
          request.post("/admin/Secretary/assigned").then(res => {
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
        request.post("/admin/Secretary/undistributed").then(res => {
            if (res.code == 200) {
              this.agentList = res.data.list;
              this.count = res.data.page.count;
              this.max = res.data.page.max;
              this.page = res.data.page.page;
              this.size = res.data.page.size;
            }
        });

        request.post("/admin/Secretary/param").then(res => {
            if (res.code == 200) {
              console.log(res)
              this.outworkid1 = res.data.admin_username;
            }
        });

    },serachBtn(){ // 搜索功能
      if(this.activeName == 'first'){
          request.post("/admin/Secretary/undistributed",{
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
          request.post("/admin/Secretary/assigned",{
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
        this.dialogFormVisible=true;
        console.log(row)
        this.outworkid = row.admin_id;
        this.ROW = row;
      },
      outworkidBtn(){//分配任务确定
        if(this.activeName == 'first'){
          request.post("/admin/Secretary/create",{
          id : this.ROW.id,
          secretaryid : this.outworkid,
          // page : this.currentPage,
          }).then(res => {
              if (res.code == 200) {
                this.$message({
                    // type: res.errno === 0 ? "success" : "warning",
                    type: "success",
                    message: '分配成功'//提示修改成功
                });
                this.handleClick();
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
        this.dialogFormVisible=false;
        }

        console.log(this.ROW.id);
        console.log(this.outworkid);
        
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
      updateAgent(row) {//修改按钮
        console.log(row);
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
      console.log(currentPage)  
          this.currentPage = currentPage;
          if(this.activeName == 'first'){
            request.post("/admin/Secretary/undistributed",{
            page : currentPage,
            keyword : this.search,
          }).then(res => {
              console.log(res)
              if (res.code == 200) {
                this.agentList = res.data.list;
              }
          });
          }else if(this.activeName == 'two'){
            request.post("/admin/Secretary/assigned",{
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