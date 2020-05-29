<template>

  <div class="app-container">
      <!-- 查看报告任务弹出框 -->
      <el-dialog style="" :append-to-body='true' title="查看报告" :visible.sync="dialogFormVisible">
          <el-timeline>
              <el-timeline-item v-for="(item,index) in timestamp" :key="index" :timestamp="item.time" placement="top">
                  <p v-for="(item1,ind) in item.p" :key="ind">{{item1.p}}</p>
              </el-timeline-item>
            </el-timeline>
      </el-dialog>
      <!-- **************查看报告任务弹出框************** -->
    
    <el-form ref="form" >
        <el-form-item>
            <el-input v-model="search" style="width:300px;" placeholder="小区名称/小区地址/询值人/创建人"></el-input>
            <el-button type="primary" style="" plain @click="serachBtn">搜索</el-button>
            <el-button style="margin-left:0px;" plain @click="addCommodity">添加</el-button>
        </el-form-item>
    </el-form>

    <el-table
      class="table-picture"
      :data="agentList"
      max-height="500px"
      border
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
      label="用户名"
      align="center">
        <template slot-scope="scope" >
          {{scope.row.username}}
        </template>
      </el-table-column>

      <el-table-column
      label="昵称"
      align="center">
        <template slot-scope="scope">
          {{scope.row.nickname}}
        </template>
      </el-table-column>

      <el-table-column
      label="状态"
      align="center">
        <template slot-scope="scope">
          {{scope.row.status}}
        </template>
      </el-table-column>

      <el-table-column
      label="创建时间"
      align="center">
        <template slot-scope="scope">
          {{scope.row.create_time}}
        </template>
      </el-table-column>

      <el-table-column
      label="修改时间"
      align="center">
        <template slot-scope="scope">
          {{scope.row.update_time}}
        </template>
      </el-table-column>

      <el-table-column
      label="操作"
      fixed="right"
      width="250px" 
      align="center">
        <template slot-scope="scope">
          <el-button v-if="!scope.row.project_status" size="small" type="primary" @click="updateAgent(scope.row)" >修改</el-button>
          <!-- <div v-show="dialogFormVisible" class="dialog-box"></div> -->
          <el-button size="small" type="info" @click="confirmDetail(scope.row)">查看</el-button>
          <!-- <el-button v-if="!scope.row.project_status" size="small" type="primary" @click="addProject(scope.row)" >转立项</el-button> -->
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

    <!--*************修改模态框*************-->
        <el-dialog
        title="修改"
        :visible.sync="dialogVisible"
        width="50%">
        <!-- :before-close="handleClose" -->
            <el-form ref="updata" :model="updata" label-width="90px">
                <el-form-item label="昵称">
                    <el-input v-model="updata.nickname"></el-input>
                </el-form-item>

                <el-form-item label="密码">
                    <el-input v-model="updata.password"></el-input>
                </el-form-item>

                <el-form-item label="状态">
                    <el-radio v-model="updata.status" label="0">正常</el-radio>
                    <el-radio v-model="updata.status" label="1">禁用</el-radio>
                </el-form-item>

            </el-form>
        
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirmRevision(),dialogVisible = false">修 改</el-button>
            </span>
        </el-dialog>
        <!--*************修改模态框结束*************-->

        <!--*************查看模态框*************-->
        <el-dialog
        title="查看"
        :visible.sync="dialogVisible1"
        width="50%">
        <!-- :before-close="handleClose" -->
            <el-form ref="updata" :model="form1" label-width="90px">
                <el-form-item label="昵称">
                    <el-input disabled v-model="form1.nickname"></el-input>
                </el-form-item>

                <el-form-item label="状态">
                    <el-radio disabled v-model="form1.status" label="0">正常</el-radio>
                    <el-radio disabled v-model="form1.status" label="1">禁用</el-radio>
                </el-form-item>

                <!-- <el-table 
                :data="roles"
                max-height="300"
                style="width: 100%;margin-left:0px;">

                <el-table-column
                label=""
                style="width: 20%;"
                align="center">
                  <template slot-scope="scope" >
                    <el-checkbox :checked="scope.row.used" v-model="scope.row.used">
                      {{scope.row.name}}
                    </el-checkbox>
                  </template>
                </el-table-column>
                 </el-table> -->
                 <el-checkbox v-for="(item,index) in roles" :key="index" :checked="item.used" v-model="item.used">
                      {{item.name}}
                    </el-checkbox>

            </el-form>
        
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible1 = false">取 消</el-button>
                <el-button type="primary" @click="updataRoles(),dialogVisible1 = false">菜单更新</el-button>
            </span>
        </el-dialog>
        <!--*************查看模态框结束*************-->

  </div>
</template>
<script>
import request from "@/utils/request";
// import check from "@/views/shopAdministration/checkClerk"
import map from '@/utils/city';
export default {
    data() {
      return {
        dialogVisible: false,
        dialogVisible1: false,
        roles:[],
        role:[],
        timestamp : [
        ],
        form1 : {
          nickname: '',
          status: '',
        },
        updata:{
          nickname : '',
          password : '',
          status : '',
        },
        search : '',
        options:map.options,
        agentList : [{
            
        },],//列表绑定
        dialogFormVisible : false,//弹出框
        disa : true,
        shopId : '',//id存储
        formLabelWidth : '120px',
        Id : '',
        UpId:'',

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
      updataRoles(){
        this.role = [];
        this.roles.forEach(element => {
          if(element.used == true){
            this.role.push(element.id)
          }else{
            
          }
        });
        request.post("/admin/admin/save",{
          id : this.shopId,
          roles : this.role,
        }).then(res => {
            if (res.code == 200) {
              this.$message({
                  // type: res.errno === 0 ? "success" : "warning",
                  type: "success",
                  message: '修改成功'//提示修改成功
              });
              this.getAgentList();
            }
        });
      },
      getAgentList() {//初始渲染列表方法封装
        this.dialogFormVisible = false;
        request.post("/admin/admin/query").then(res => {
            console.log(res)
            if (res.code == 200) {
              this.agentList = res.data.list;
              this.count = res.data.page.count;
              this.max = res.data.page.max;
              this.page = res.data.page.page;
              this.size = res.data.page.size;
            }
            
        });
    },serachBtn(){ // 搜索功能
        request.post("/admin/admin/query",{
          keyword : this.search,
          // page : this.currentPage,
        }).then(res => {
            console.log(res)
            if (res.code == 200) {
              this.agentList = res.data.list;
              this.count = res.data.page.count;
              this.max = res.data.page.max;
              this.page = res.data.page.page;
              this.size = res.data.page.size;
            }
        });
      },
      updateAgent(row) {//修改按钮
      this.UpId =row.id;
        this.dialogVisible = true;
        request.post("/admin/admin/get",{//获取修改原数据
          id : row.id,
        }).then(res => {
            console.log(res)
            if (res.code == 200) {
              this.updata = res.data;
              this.updata.status = res.data.status+'';
              this.updata.password = '';
            }
        });
        // this.$router.push({path:'/updataInquiry',query:{id:row.id}})
      },
      confirmRevision(){//确认修改
        request.post("/admin/admin/update",{
          id : this.UpId,
          nickname : this.updata.nickname,
          password : this.updata.password,
          status : Number(this.updata.status),
        }).then(res => {
            console.log(res)
            if (res.code == 200) {
              this.$message({
                  // type: res.errno === 0 ? "success" : "warning",
                  type: "success",
                  message: '修改成功'//提示修改成功
              });
              this.getAgentList();
            }
        });
      },
      handleChange (value) {
        this.center = value[2];
      },
      confirmDetail(row) {//点击查看用户详情
         this.shopId = row.id;
          // this.$router.push({path:'/detailUser',query:{id:row.id}})
          this.dialogVisible1 = true;

          request.post("/admin/admin/get",{
          id : row.id,
          }).then(res => {
              console.log(res)
              if (res.code == 200) {
                this.form1 = res.data;
                this.form1.status = res.data.status+'';
              }
          });
          request.post("/admin/admin/roles",{
          id : row.id,
          }).then(res => {
              console.log(res)
              if (res.code == 200) {
                this.roles = res.data;
                this.roles.forEach(element => {
                  console.log(element.used)
                  if(element.used == 1){
                    element.used = true;
                  }else{
                    element.used = false;
                  }
                });
              }
          });
      },
      addProject(row){//转立项
         this.$router.push({path:'/addProjectInitiation',query:{row:row,id:row.id}})
      },
      //分页
      handleCurrentChange: function(currentPage){//换页
      console.log(currentPage)  
          this.currentPage = currentPage;
          request.post("/admin/admin/query",{
          page : currentPage,
          keyword : this.search,
        }).then(res => {
            console.log(res)
            if (res.code == 200) {
              this.agentList = res.data.list;
            }
        });
      },
      addCommodity(){//添加询价
        this.$router.push({path:'/addUser'})
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