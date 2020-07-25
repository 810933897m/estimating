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
            <el-input v-model="search" style="width:300px;" placeholder=""></el-input>
            <el-button type="primary" style="" plain @click="serachBtn">查询</el-button>
            <el-button type="primary" style="margin-left:0px;" plain @click="addCommodity">添加</el-button>
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
      label="编号"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.userno" style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{scope.row.userno}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="用户名"
      align="center">
        <template slot-scope="scope" >
          <p :title="scope.row.username" style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{scope.row.username}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="邮箱地址"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.email" class="nooverflow">{{scope.row.email}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="状态"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.status" style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{scope.row.status}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="创建时间"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.create_time" class="nooverflow">{{scope.row.create_time}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="操作"
      fixed="right"
      width="250px" 
      align="center">
        <template slot-scope="scope">
          <el-button v-if="!scope.row.project_status" size="small" type="primary" @click="updatePassword(scope.row)" >修改密码</el-button>
          <el-button v-if="!scope.row.project_status" size="small" type="primary" @click="updateAgent(scope.row)" >修改</el-button>
          <!-- <div v-show="dialogFormVisible" class="dialog-box"></div> -->
          <el-button size="small" type="primary" @click="confirmDetail(scope.row)">查看</el-button>
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
                <el-form-item label="编号">
                    <el-input v-model="updata.userno"></el-input>
                </el-form-item>

                <el-form-item label="邮箱">
                    <el-input v-model="updata.email"></el-input>
                </el-form-item>

                <!-- <el-form-item label="重置密码">
                    <el-input type="password" v-model="updata.password"></el-input>
                </el-form-item> -->

                <el-form-item label="状态">
                    <el-radio v-model="updata.status" label="0">正常</el-radio>
                    <el-radio v-model="updata.status" label="1">禁用</el-radio>
                </el-form-item>
            </el-form>
        
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="confirmRevision(),dialogVisible = false">保 存</el-button>
                <el-button @click="dialogVisible = false">取 消</el-button>
            </span>
        </el-dialog>
        <!--*************修改模态框结束*************-->

        <!--*************修改模态框*************-->
        <el-dialog
        title="修改密码"
        :visible.sync="dialogVisiblePassword"
        width="50%">
        <!-- :before-close="handleClose" -->
            <el-form ref="updata" label-width="120px">
                <el-form-item label="原始密码">
                    <el-input v-model="update1.password"></el-input>
                </el-form-item>

                <el-form-item label="新密码">
                    <el-input v-model="update1.newPassword"></el-input>
                </el-form-item>

                <el-form-item label="确认密码">
                    <el-input v-model="update1.newPassword1"></el-input>
                </el-form-item>

                <!-- <el-form-item label="重置密码">
                    <el-input type="password" v-model="updata.password"></el-input>
                </el-form-item> -->
            </el-form>
        
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="confirmRevision1()">保 存</el-button>
                <el-button @click="dialogVisiblePassword = false">取 消</el-button>
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
                <el-form-item label="用户名:">
                    <p style="float:left;margin-top:0;">{{form1.username}}</p>
                    <!-- <el-input disabled v-model="form1.nickname"></el-input> -->
                </el-form-item>
                <!-- <el-form-item label="编号:">
                    <p style="float:left;margin-top:0;">{{form1.userno}}</p>
                </el-form-item> -->
                <el-form-item label="权限:">
                    <el-checkbox v-for="(item,index) in roles" :key="index" :checked="item.used" v-model="item.used">
                      {{item.name}}
                    </el-checkbox>
                </el-form-item>
                <!-- <div style="margin-bottom:20px;width:100%;background:rgb(48,65,85);color:white;height:30px;"><span style="float:left;margin-left:10px;margin-top:5px;font-size:15px;">权限</span></div> -->  
            </el-form>
        
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="updataRoles(),dialogVisible1 = false">保 存</el-button>
                <el-button @click="dialogVisible1 = false">关 闭</el-button>
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
        dialogVisiblePassword: false,
        roles:[],
        role:[],
        timestamp : [
        ],
        form1 : {
          nickname: '',
          status: '',
        },
        updata:{
          userno : '',
          email : '',
          status : '',
          password : '',
        },
        update1:{
          password : '',
          newPassword : '',
          newPassword1 : '',
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
        request.post("/admin//admin/save",{
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
        request.post("/admin//admin/query").then(res => {
            // console.log(res)
            if (res.code == 200) {
              this.agentList = res.data.list;
              this.count = res.data.page.count;
              this.max = res.data.page.max;
              this.page = res.data.page.page;
              this.size = res.data.page.size;
            }
            
        });
    },serachBtn(){ // 搜索功能
        request.post("/admin//admin/query",{
          keyword : this.search,
          // page : this.currentPage,
        }).then(res => {
            // console.log(res)
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
        request.post("/admin//admin/get",{//获取修改原数据
          id : row.id,
        }).then(res => {
            // console.log(res)
            if (res.code == 200) {
              this.updata = res.data;
              this.updata.status = res.data.status+'';
            }
        });
        // this.$router.push({path:'/updataInquiry',query:{id:row.id}})
      },
      updatePassword(row) {//修改按钮
      this.UpId =row.id;
        this.dialogVisiblePassword = true;
        // request.post("/admin//admin/get",{//获取修改原数据
        //   id : row.id,
        // }).then(res => {
        //     // console.log(res)
        //     if (res.code == 200) {
        //       this.update1 = res.data;
        //     }
        // });
        // this.$router.push({path:'/updataInquiry',query:{id:row.id}})
      },
      confirmRevision(){//确认修改
        request.post("/admin//admin/update",{
          id : this.UpId,
          userno : this.updata.userno,
          email : this.updata.email,
          status : Number(this.updata.status),
          // password : this.updata.password,
        }).then(res => {
            // console.log(res)
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
      confirmRevision1(){//确认修改
      if(this.update1.newPassword != this.update1.newPassword1){
        this.$message({
                  // type: res.errno === 0 ? "success" : "warning",
                  type: "warning",
                  message: '两次密码不一致'//提示两次密码不一致
              });
      }else{
        request.post("/admin/User/modify",{
          id : this.UpId,
          old_password : this.update1.password,
          password : this.update1.newPassword,
          confirm_password : this.update1.newPassword1,
        }).then(res => {
            // console.log(res)
            if (res.code == 200) {
              this.$message({
                  // type: res.errno === 0 ? "success" : "warning",
                  type: "success",
                  message: '密码修改成功'//提示密码修改成功
              });
              this.getAgentList();
              this.dialogVisiblePassword = false;
              this.update1.password = '';
              this.update1.newPassword = '';
              this.update1.newPassword1 = '';
            }
        });
      }
      },
      handleChange (value) {
        this.center = value[2];
      },
      confirmDetail(row) {//点击查看用户详情
         this.shopId = row.id;
          // this.$router.push({path:'/detailUser',query:{id:row.id}})
          this.dialogVisible1 = true;

          request.post("/admin//admin/get",{
          id : row.id,
          }).then(res => {
              // console.log(res)
              if (res.code == 200) {
                this.form1 = res.data;
                this.form1.status = res.data.status+'';
              }
          });
          request.post("/admin//admin/roles",{
          id : row.id,
          }).then(res => {
              // console.log(res)
              if (res.code == 200) {
                this.roles = res.data;
                this.roles.forEach(element => {
                  // console.log(element.used)
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
      // console.log(currentPage)  
          this.currentPage = currentPage;
          request.post("/admin//admin/query",{
          page : currentPage,
          keyword : this.search,
        }).then(res => {
            // console.log(res)
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