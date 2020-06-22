<template>

  <div class="app-container">
    <el-form ref="form" >
        <el-form-item>
            <el-radio v-model="activeName" label="first" @change="handleClick()">未审核</el-radio>
            <el-radio v-model="activeName" label="success" @change="handleClick()">已审核</el-radio>
            <el-radio v-model="activeName" label="no" @change="handleClick()">审核失败</el-radio>
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
      key="1"
      align="center">
        <template slot-scope="scope" >
          {{scope.row.id}}
        </template>
      </el-table-column>

      <el-table-column
      label="审核建议"
      width="120px"
      key="2"
      v-if="activeName == 'success' || activeName == 'no'"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.admin_desc" class="nooverflow">{{scope.row.admin_desc}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="流水号"
      key="3"
      width="120px"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.serial_number" style="cursor: pointer;" @click="getInfo(scope.row)" class="nooverflow">{{scope.row.serial_number}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="报告编号"
      width="150px"
      key="4"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.report_number" class="nooverflow">{{scope.row.report_number}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="项目地址"
      width="200px"
      key="5"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.plot_address" class="nooverflow">{{scope.row.plot_address}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="小区名称"
      width="130px"
      key="6"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.plot_name" class="nooverflow">{{scope.row.plot_name}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="紧急程度"
      width="100px"
      key="8"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.report_tale" class="nooverflow">{{scope.row.report_tale}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="报告类型"
      width="100px"
      key="9"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.report_tale" class="nooverflow">{{scope.row.report_tale}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="物业类型"
      width="100px"
      key="10"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.property_type" class="nooverflow">{{scope.row.property_type}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="项目状态"
      width="100px"
      key="11"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.approval_status" class="nooverflow">{{scope.row.approval_status}}</p>
        </template>
      </el-table-column>
    
      <el-table-column
      label="撰写人员"
      width="100px"
      key="12"
      v-if="activeName == 'two'"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.approval_status" class="nooverflow">{{scope.row.approval_status}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="流程状态"
      width="100px"
      key="13"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.approval_status" class="nooverflow">{{scope.row.approval_status}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="立项时间"
      v-if="activeName == 'first'"
      width="150px"
      key="14"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.create_time" class="nooverflow">{{scope.row.create_time}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="分配时间"
      v-else-if="activeName == 'two'"
      width="150px"
      key="15"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.finish_time" class="nooverflow">{{scope.row.finish_time}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="操作"
      fixed="right"
      v-if="activeName == 'first'"
      width="150px" align="center">
        <template slot-scope="scope">
          <el-button size="small" type="primary" v-if="activeName == 'first'" @click="AssignTasks(scope.row)" >同意</el-button>
          <el-button size="small" type="primary" v-if="activeName == 'first'" @click="AssignTasks1(scope.row)" >拒绝</el-button>
          <!-- <el-button size="small" type="primary" v-else-if="activeName == 'two'" @click="AssignTasks(scope.row)">重新分配</el-button> -->
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
          <el-dialog style="" :append-to-body='true' title="审核提交" :visible.sync="dialogFormVisible">

            <el-form ref="form" label-width="120px" :model="form" style="width:100%;">
              <div style="width:100%;position:relative;height:50px;">
                <!-- <p style="margin-left:50px;">原始单价{{old_price}},修改单价{{new_price}}</p> -->
                  <el-form-item label="审核建议" class="form-input" prop="title" style="width:250px;float:left;">
                    <el-input  placeholder="请输入" v-model="admin_desc"></el-input>
                </el-form-item>
                <el-button v-if="passShow" size="small" type="primary" style="float:left;margin-left:20px;margin-top:5px;" @click="outworkidBtn()">确定</el-button>
                <el-button v-if="!passShow" size="small" type="primary" style="float:left;margin-left:20px;margin-top:5px;" @click="outworkidBtn1()">确定</el-button>
              </div>

              <!-- <el-checkbox style="width:120px;" v-model="checked">推送到App</el-checkbox>
              <el-form-item label="查勘表" class="select" style="width:30%;">
                <el-select v-model="form.user" filterable style="width:120px;">
                    <el-option
                    v-for="item in form.user"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
              </el-form-item> -->


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
        old_price: '',
        new_price: '',
        ask_univalence:'',
        distribution:'1',
        search : '',
        ROW : {},
        checked:'',
        options:map.options,
        activeName: 'first',
        admin_desc : '',
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
        passShow : false,
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
      this.agentList = [];
        if(this.activeName == 'first'){
          request.post("/admin/askPriceCheck/query",{
            status : 0
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
          request.post("/admin/askPriceCheck/query",{
            status : 1
          }).then(res => {
            if (res.code == 200) {
              this.agentList = res.data.list;
              this.count = res.data.page.count;
              this.max = res.data.page.max;
              this.page = res.data.page.page;
              this.size = res.data.page.size;
            }
          });
        }else if(this.activeName == 'no'){
          request.post("/admin/askPriceCheck/query",{
            status : 2
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
        request.post("/admin/askPriceCheck/query",{
            status : 0
          }).then(res => {
            if (res.code == 200) {
              this.agentList = res.data.list;
              this.count = res.data.page.count;
              this.max = res.data.page.max;
              this.page = res.data.page.page;
              this.size = res.data.page.size;
            }
          });

        // request.post("/admin/Secretary/param").then(res => {
        //     if (res.code == 200) {
        //       console.log(res)
        //       this.outworkid1 = res.data.admin_username;
        //     }
        // });

    },serachBtn(){ // 搜索功能
      if(this.activeName == 'first'){
          request.post("/admin/askPriceCheck/query",{
          keyword : this.search,
          status:0,
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
        }else if(this.activeName == 'success'){
          request.post("/admin/askPriceCheck/query",{
          keyword : this.search,
          status:1,
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
        }else if(this.activeName == 'no'){
          request.post("/admin/askPriceCheck/query",{
          keyword : this.search,
          status:2,
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
        this.old_price = row.old_price;
        this.new_price = row. new_price;
        this.passShow = true;
        // this.ask_univalence = row.ask_univalence;
      },
      AssignTasks1(row){//分配任务
        this.dialogFormVisible=true;
        console.log(row)
        this.outworkid = row.admin_id;
        this.ROW = row;
        this.old_price = row.old_price;
        this.new_price = row. new_price;
        this.passShow = false;
        // this.ask_univalence = row.ask_univalence;
      },
      outworkidBtn(){//分配任务确定
        if(this.activeName == 'first'){
          request.post("/admin/askPriceCheck/submit",{
            id : this.ROW.id,
            admin_desc:this.admin_desc,
          }).then(res => {
              if (res.code == 200) {
                this.$message({
                    // type: res.errno === 0 ? "success" : "warning",
                    type: "success",
                    message: '同意变更成功'//提示同意变更成功
                });
                this.admin_desc = '';
                this.handleClick();
              }
          });
        this.dialogFormVisible=false;
        }
      },
      outworkidBtn1(){//分配任务确定
        if(this.activeName == 'first'){
          request.post("admin/askPriceCheck/refuse",{
            id : this.ROW.id,
            admin_desc:this.admin_desc,
          }).then(res => {
              if (res.code == 200) {
                this.$message({
                    // type: res.errno === 0 ? "success" : "warning",
                    type: "success",
                    message: '取消变更成功'//取消变更成功
                });
                this.admin_desc = '';
                this.handleClick();
              }
          });
        this.dialogFormVisible=false;
        }
      },
      updateAgent(row) {//修改按钮
        console.log(row);
        // this.$router.push({path:'/updataInquiry',query:{id:row.id}})
      },
      getInfo(row, event, column){//点击跳到综合页面
        console.log(row.id);
        window.open(row.project_info_url, '_blank')
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
            request.post("/admin/askPriceCheck/query",{
            page : currentPage,
            keyword : this.search,
            status:0,
          }).then(res => {
              console.log(res)
              if (res.code == 200) {
                this.agentList = res.data.list;
              }
          });
          }else if(this.activeName == 'success'){
            request.post("/admin/askPriceCheck/query",{
            page : currentPage,
            keyword : this.search,
            status:1,
          }).then(res => {
              console.log(res)
              if (res.code == 200) {
                this.agentList = res.data.list;
              }
          });
          }else if(this.activeName == 'no'){
            request.post("/admin/askPriceCheck/query",{
            page : currentPage,
            keyword : this.search,
            status:2,
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