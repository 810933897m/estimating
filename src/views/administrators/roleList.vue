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

    <el-table
      class="table-picture"
      :data="agentList"
      max-height="600px"
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
      label="用户"
      align="center">
        <template slot-scope="scope" >
          <p :title="scope.row.name" class="nooverflow">{{scope.row.name}}</p>
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
      label="修改时间"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.update_time" class="nooverflow">{{scope.row.update_time}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="操作"
      fixed="right"
      width="250px" 
      align="center">
        <template slot-scope="scope">
          <!-- <el-button v-if="!scope.row.project_status" size="small" type="primary" @click="updateAgent(scope.row)" >修改</el-button> -->
          <!-- <div v-show="dialogFormVisible" class="dialog-box"></div> -->
          <el-button size="small" type="primary" @click="confirmDetail(scope.row)">分配权限</el-button>
          <!-- <el-button v-if="!scope.row.project_status" size="small" type="primary" @click="addProject(scope.row)" >转立项</el-button> -->
        </template>
      </el-table-column>
      
    </el-table>
    <!-- *************分页************* -->
    <!-- <el-pagination
    style="margin-top:20px;"
    @current-change="handleCurrentChange"
    :page-sizes="[20]" 
    :page-size="page"
    layout="total, sizes, prev, pager, next, jumper"
    :total="count">
    </el-pagination> -->
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
                <el-button type="primary" @click="confirmRevision(),dialogVisible = false">修 改</el-button>
                <el-button @click="dialogVisible = false">取 消</el-button>
            </span>
        </el-dialog>
        <!--*************修改模态框结束*************-->

        <!--*************查看模态框*************-->
        <el-dialog
        title="分配权限"
        :visible.sync="dialogVisible1"
        width="50%">
        <!-- :before-close="handleClose" -->
            <el-form ref="updata" :model="form1" label-width="90px">
                <el-table 
                class="table-picture"
                :data="roles"
                border
                :show-header="false"
                style="width: 100%;">

                  <el-table-column
                  width="150px"
                  align="left">
                    <template slot-scope="scope" >
                      <el-checkbox @change="allCheck(scope.row)" :checked="scope.row.used"  v-model="scope.row.used">{{scope.row.title}}</el-checkbox>
                    </template>
                  </el-table-column>

                  <el-table-column
                  align="left">
                    <template slot-scope="scope" >
                      <el-checkbox @change="oneCheck(scope.row)" v-for="(item1,index) in scope.row.children"  v-model="item1.used" :key="index" :checked="item1.used">{{item1.title}}</el-checkbox>
                    </template>
                  </el-table-column>

                </el-table>

            </el-form>
        
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="updataRoles(),dialogVisible1 = false">保存</el-button>
                <el-button @click="dialogVisible1 = false">取 消</el-button>
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
        agentList : [],//列表绑定
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
      allCheck(row){//多选框全选反选
        // console.log(row)
        if(row.used == true){
          row.children.forEach(element => {
            element.used = true;
          });
        }else{
          row.children.forEach(element => {
            element.used = false;
          });
        }
      },
      oneCheck(row){//单选框选中则父系选中
        //  console.log(row.index)
      },
      updataRoles(){
        this.role = [];
        this.roles.forEach(element => {
          if(element.used == true){
            this.role.push(element.id)
          }else{
            
          }
          if(element.children.length != 0){
                element.children.forEach(element1 => {
                  if(element1.used == true){
                    this.role.push(element1.id)
                  }
                });
              }

        });
        request.post("/admin/access/save",{
          id : this.shopId,
          menu : this.role,
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
        request.post("/admin/access/query").then(res => {
            if (res.code == 200) {
              this.agentList = res.data;
              // this.count = res.data.page.count;
              // this.max = res.data.page.max;
              // this.page = res.data.page.page;
              // this.size = res.data.page.size;
            }
            
        });
    },serachBtn(){ // 搜索功能
        request.post("/admin/access/query",{
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
              this.updata.password = '';
            }
        });
        // this.$router.push({path:'/updataInquiry',query:{id:row.id}})
      },
      confirmRevision(){//确认修改
        request.post("/admin//admin/update",{
          id : this.UpId,
          nickname : this.updata.nickname,
          password : this.updata.password,
          status : Number(this.updata.status),
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
      handleChange (value) {
        this.center = value[2];
      },
      confirmDetail(row) {//点击查看用户详情
         this.shopId = row.id;
          this.dialogVisible1 = true;
          request.post("/admin/access/get",{
            id : row.id,
          }).then(res => {
              if (res.code == 200) {
                this.roles = res.data;
                this.roles.forEach(element => {
                  if(element.used == 1){
                    element.used = true;
                  }else{
                    element.used = false;
                  }

                  if(element.children.length != 0){
                    element.children.forEach(element1 => {
                      if(element1.used == 1){
                        element1.used = true;
                      }else{
                        element1.used = false;
                      }
                    });
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