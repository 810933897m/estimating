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
            <el-input v-model="search" style="width:300px;" placeholder="请输入查询数据"></el-input>
            <el-button type="primary" style="" plain @click="serachBtn">查询</el-button>
            <el-button type="primary" style="margin-left:0px;" plain @click="addCommodity">添加</el-button>
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
      label="合同编号"
      align="center">
        <template slot-scope="scope" >
          <p :title="scope.row.contract_no" style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{scope.row.contract_no}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="甲方"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.first_party" style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{scope.row.first_party}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="乙方"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.second_party" style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{scope.row.second_party}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="合同内容"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.content" style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{scope.row.content}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="创建时间"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.create_time" style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{scope.row.create_time}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="修改时间"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.update_time" style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{scope.row.update_time}}</p>
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

    <!--*************添加模态框*************-->
        <el-dialog
        title="添加"
        :visible.sync="dialogVisible1"
        width="50%">
        <!-- :before-close="handleClose" -->
            <el-form ref="updata" :model="add" label-width="90px">
                <el-form-item label="合同编号">
                    <el-input v-model="add.contract_no"></el-input>
                </el-form-item>

                <el-form-item label="甲方">
                    <el-input v-model="add.first_party"></el-input>
                </el-form-item>

                <el-form-item label="乙方">
                    <el-input v-model="add.second_party"></el-input>
                </el-form-item>

                <el-form-item label="合同内容">
                    <!-- <el-input v-model="updata.content"></el-input> -->
                    <el-input
                    type="textarea"
                    :autosize="{ minRows: 5, maxRows: 10}"
                    v-model="add.content">
                    </el-input>
                </el-form-item>

            </el-form>
        
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="confirmRevision1(),dialogVisible1 = false">保 存</el-button>
                <el-button @click="dialogVisible1 = false">取 消</el-button>
            </span>
        </el-dialog>
        <!--*************添加模态框结束*************-->

    <!--*************修改模态框*************-->
        <el-dialog
        title="修改"
        :visible.sync="dialogVisible"
        width="50%">
        <!-- :before-close="handleClose" -->
            <el-form ref="updata" :model="updata" label-width="90px">
                <el-form-item label="合同编号">
                    <el-input v-model="updata.contract_no"></el-input>
                </el-form-item>

                <el-form-item label="甲方">
                    <el-input v-model="updata.first_party"></el-input>
                </el-form-item>

                <el-form-item label="乙方">
                    <el-input v-model="updata.second_party"></el-input>
                </el-form-item>

                <el-form-item label="合同内容">
                    <!-- <el-input v-model="updata.content"></el-input> -->
                    <el-input
                    type="textarea"
                    :autosize="{ minRows: 5, maxRows: 10}"
                    v-model="updata.content">
                    </el-input>
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
        dialogVisible: false,
        dialogVisible1: false,
        timestamp : [
        ],
        updata:{
          contract_no : '',
          first_party : '',
          second_party : '',
          content : '',
        },
        add:{
          contract_no : '',
          first_party : '',
          second_party : '',
          content : '',
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
      getAgentList() {//初始渲染列表方法封装
        this.dialogFormVisible = false;
        request.post("/admin/contractManagement/query").then(res => {
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
        request.post("/admin/contractManagement/query",{
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
        request.post("/admin/contractManagement/get",{//获取修改原数据
          id : row.id,
        }).then(res => {
            // console.log(res)
            if (res.code == 200) {
              this.updata = res.data;
            }
        });
        // this.$router.push({path:'/updataInquiry',query:{id:row.id}})
      },
      confirmRevision1(){//合同添加
            request.post("/admin/contractManagement/create", {//发送数据到后台
              contract_no : this.add.contract_no,
              first_party : this.add.first_party,
              // construct_area : this.add.construct_area,
              second_party : this.add.second_party,
              content : this.add.content,
            }).then(res => {
                  // console.log(res)
              if(res.code == 200){
                    this.$message({
                // type: res.errno === 0 ? "success" : "warning",
                type: "success",
                message: '添加成功'//提示添加成功
              });
            this.getAgentList();
            this.dialogVisible1 = false;
            this.add.contract_no ='';
            this.add.first_party ='';
            this.add.second_party ='';
            this.add.content ='';
          }
        });
      },
      confirmRevision(){//确认修改
        request.post("/admin/contractManagement/update",{
          id : this.UpId,
          contract_no : this.updata.contract_no,
          first_party : this.updata.first_party,
          second_party : this.updata.second_party,
          content : this.updata.content,
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
      confirmDetail(row) {//点击查看询价详情
         this.shopId = row.id;
          this.$router.push({path:'/detailContract',query:{id:row.id}})
      },
      addProject(row){//转立项
         this.$router.push({path:'/addProjectInitiation',query:{row:row,id:row.id}})
      },
      //分页
      handleCurrentChange: function(currentPage){//换页
      // console.log(currentPage)  
          this.currentPage = currentPage;
          request.post("/admin/contractManagement/query",{
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
        // this.$router.push({path:'/addContract'})
        this.dialogVisible1 = true;
      },
      getInfo(row, event, column){
        // console.log(row.id);
        this.dialogFormVisible = true;
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