<template>

  <div class="app-container">

    <el-form ref="form" >
                <el-form-item>
                    <el-input v-model="search" style="width:600px;" placeholder="流水号/报告号/项目地址/小区名称/看房联系人电话/估价委托方"></el-input>
                    <el-button type="info" style="margin-left:0px;" plain >高级</el-button>
                    <el-button type="primary" style="" plain @click="searchBtn()">查询</el-button>
                    <!-- <el-button type="info" style="margin-left:0px;" plain  @click="addProjectInitiation()">资料齐全</el-button> -->
                </el-form-item>
            </el-form>

    <el-table 
      class="table-picture"
      :data="agentList"
      @cell-dblclick="getInfo"
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
      label="流水号"
      width="200px"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.serial_number" class="nooverflow">{{scope.row.serial_number}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="报告类型"
      width="120px"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.report_tale" class="nooverflow">{{scope.row.report_tale}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="估价目的"
      width="120px"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.inquiry_purpose" class="nooverflow">{{scope.row.inquiry_purpose}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="报告号"
      width="200px"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.report_number" class="nooverflow">{{scope.row.report_number}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="报告地址"
      width="300px"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.show_merge_addr" class="nooverflow">{{scope.row.show_merge_addr}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="立项时间"
      width="200px"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.create_time" class="nooverflow">{{scope.row.create_time}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="旧报告号"
      width="120px"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.source" class="nooverflow">{{scope.row.source}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="操作"
      fixed="right"
      
      width="200px" align="center">
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="updateAgent(scope.row)" >修改</el-button>
          <div v-show="dialogFormVisible" class="dialog-box"></div>
          <!-- <el-button size="small" type="info" @click="confirmDetail(scope.row)">查看</el-button> -->
          <el-button size="small" type="primary" @click="generateReport(scope.row)">生成报告</el-button>
          <!-- <el-button size="small" type="info" v-else disabled >生成报告</el-button> -->
        </template>
      </el-table-column>

      <!-- <el-table-column
        label="删除"
        width="100px" align="center"
        fixed="right">
        <template slot-scope="scope">
            <el-button size="small" type="danger" @click="confirmDel(scope.row)">删除</el-button>
        </template>
      </el-table-column> -->
      
    </el-table>

    <!--*************修改模态框*************-->
        <el-dialog
        title="生成报告号"
        :visible.sync="dialogVisible"
        width="50%">
        <!-- :before-close="handleClose" -->
            <el-form label-width="90px">

                <el-form-item label="公司简称" class="select" >
                <el-select v-model="company" @change="reportChange" filterable placeholder="请选择" style="width:250px;">
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
        search : '',
        options:map.options,
        agentList : [],//列表 绑定
        dialogFormVisible : false,//弹出框
        dialogVisible : false,//弹出框
        disa : true,
        shopId : '',//id存储
        formLabelWidth : '120px',
        Id : '',
        generateReportId:'',

        report_number :'',
        report_number1 : [],
        report_number_children : '',
        report_number_children1 : [],

        //*************分页变量*************
        // currentPage : 1, //初始页
        // pagesize : 5,   //每页的数据
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
      confirmRevision(){//生成确定
          request.post("/admin/project/projectReport",{
            id : this.generateReportId,
            company : this.company,
            assess_type1 : this.project_classify,
            assess_type2 : this.report_tale,
            assess_type3 : this.Alphabetic,

          }).then(res => {
            if (res.code == 200) {
              console.log(res)
              this.$message({
                // type: res.errno === 0 ? "success" : "warning",
                type: "success",
                message: '生成成功'//提示修改成功
              });
              this.getAgentList();
              this.company = '';
              this.project_classify = '';
              this.report_tale = '';
              this.Alphabetic = '';

            }
        });
      },
      getAgentList() {//初始渲染列表方法封装
        // this.dialogFormVisible = false;
        request.post("/admin/project/query").then(res => {
            if (res.code == 200) {
              console.log(res)
              this.agentList = res.data.list;
              this.agentList.forEach(item => {
                if(item.approval_status == 1){
                  item.approval_status = '不正常'
                }else if(item.approval_status == 0){
                  item.approval_status = '正常'
                }
              });
              this.count = res.data.page.count;
              this.max = res.data.page.max;
              this.page = res.data.page.page;
              this.size = res.data.page.size;
            }
        });
        
        request.post("/admin/projectExpress/param").then(res => {
            if (res.code == 200) {
              console.log(res)
            }
        });

        
        request.post("/admin/values/query",{
          type : 'report_number_children',
          name : '公司简称',
        }).then(res => {
            if (res.code == 200) {
              console.log(res)
              this.company1 = res.data;
            }
        });
        request.post("/admin/values/query",{
          type : 'report_number_children',
          name : '项目分类',
        }).then(res => {
            if (res.code == 200) {
              console.log(res)
              this.project_classify1 = res.data;
            }
        });
        request.post("/admin/values/query",{
          type : 'report_number_children',
          name : '报告类型',
        }).then(res => {
            if (res.code == 200) {
              console.log(res)
              this.report_tale1 = res.data;
            }
        });
        request.post("/admin/values/query",{
          type : 'report_number_children',
          name : '字母分类',
        }).then(res => {
            if (res.code == 200) {
              console.log(res)
              this.Alphabetic1 = res.data;
            }
        });

    },updateAgent(row) {//修改按钮
       this.$router.push({path:'/updateprojectInitiation',query:{row:row,id:row.id}})
       
      },
      reportChange(){//报告改变
        request.post("/admin/values/query",{
          type : 'report_number_children',
          name : this.report_number,
        }).then(res => {
            if (res.code == 200) {
              console.log(res)
              this.report_number_children1 = res.data;
            }
        });
      },
      generateReport(row){//生成报告
        console.log(row.id)
        this.generateReportId = row.id;
        this.dialogVisible = true;
      },
      getInfo(row, event, column){
        console.log(row.id);
        const {href} = this.$router.resolve({
        path: '/comprehensiveList',
        query: {
          id: row.id
        }
      })
      window.open(href, '_blank')
      },
      searchBtn(){//搜索
        request.post("/admin/project/query",{
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
      },
      addProjectInitiation(){
        // this.$router.push({path:'/addProjectInitiation'})
      },
      handleChange (value) {
        this.center = value[2];
      },
      confirmDetail(row) {//查看
         this.shopId = row.id;
          this.$router.push({path:'/detaiPprojectInitiation',query:{id:row.id}})
      },
      handleCurrentChange: function(currentPage){//换页
          request.post("/admin/project/query",{
          page : currentPage 
        }).then(res => {
            if (res.code == 200) {
              this.agentList = res.data.list;
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