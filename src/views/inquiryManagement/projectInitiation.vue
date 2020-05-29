<template>

  <div class="app-container">

    <el-form ref="form" >
                <el-form-item>
                    <el-input v-model="search" style="width:600px;" placeholder="流水号/报告号/项目地址/小区名称/看房联系人电话/估价委托方"></el-input>
                    <el-button type="info" style="margin-left:0px;" plain >高级</el-button>
                    <el-button type="primary" style="" plain @click="searchBtn()">搜索</el-button>
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
          {{scope.row.serial_number}}
        </template>
      </el-table-column>

      <el-table-column
      label="报告号"
      width="200px"
      align="center">
        <template slot-scope="scope">
          {{scope.row.report_number}}
        </template>
      </el-table-column>
<!-- 
      <el-table-column
      label="项目地址"
      width="250px"
      align="center">
        <template slot-scope="scope">
          {{scope.row.project_address}}
        </template>
      </el-table-column> -->

      <el-table-column
      label="报告地址"
      width="300px"
      align="center">
        <template slot-scope="scope">
          {{scope.row.show_merge_addr}}
        </template>
      </el-table-column>

      <el-table-column
      label="受理时间"
      width="200px"
      align="center">
        <template slot-scope="scope">
          {{scope.row.create_time}}
        </template>
      </el-table-column>

      <el-table-column
      label="项目分类"
      width="200px"
      align="center">
        <template slot-scope="scope">
          {{scope.row.project_classify}}
        </template>
      </el-table-column>

      <el-table-column
      label="物业类型"
      width="120px"
      align="center">
        <template slot-scope="scope">
          {{scope.row.property_type}}
        </template>
      </el-table-column>

      <el-table-column
      label="估价目的"
      width="120px"
      align="center">
        <template slot-scope="scope">
          {{scope.row.inquiry_purpose}}
        </template>
      </el-table-column>

      <el-table-column
      label="报告类型"
      width="120px"
      align="center">
        <template slot-scope="scope">
          {{scope.row.report_tale}}
        </template>
      </el-table-column>

      <el-table-column
      label="业务来源"
      width="120px"
      align="center">
        <template slot-scope="scope">
          {{scope.row.source}}
        </template>
      </el-table-column>

      <el-table-column
      label="资料齐全"
      width="120px"
      align="center">
        <template slot-scope="scope">
          {{scope.row.materials_offer_way}}
        </template>
      </el-table-column>

      <el-table-column
      label="业务员姓名"
      width="120px"
      align="center">
        <!-- <template slot-scope="scope">
          {{scope.row.ask_price_total}}
        </template> -->
      </el-table-column>

      <el-table-column
      label="受理人"
      width="120px"
      align="center">
        <template slot-scope="scope">
          {{scope.row.create_username}}
        </template>
      </el-table-column>

      <el-table-column
      label="旧流水号"
      width="100px"
      align="center">
        <!-- <template slot-scope="scope">
          {{scope.row.ask_price}}
        </template> -->
      </el-table-column>

      <el-table-column
      label="旧报告号"
      width="120px"
      align="center">
        <!-- <template slot-scope="scope">
          {{scope.row.create_time}}
        </template> -->
      </el-table-column>

      <el-table-column
      label="估价委托方"
      width="100px"
      align="center">
        <template slot-scope="scope">
          {{scope.row.valuation_principal}}
        </template>
      </el-table-column>

      <el-table-column
      label="状态"
      width="100px"
      align="center">
        <!-- <template slot-scope="scope">
          {{scope.row.remark}}
        </template> -->
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
      label="收费备注"
      width="100px"
      align="center">
        <template slot-scope="scope">
          {{scope.row.fee_note}} <!-- 0 未审核 1待审核 -->
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
          <el-button size="small" type="primary" v-if="!scope.row.report_number" @click="generateReport(scope.row)">生成报告</el-button>
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
        title="生成报告"
        :visible.sync="dialogVisible"
        width="50%">
        <!-- :before-close="handleClose" -->
            <el-form label-width="90px">

                <el-form-item label="公司简称" class="select" >
                <el-select v-model="company" filterable placeholder="请选择公司简称" style="width:250px;">
                    <el-option
                    v-for="item in company1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="评估类型1" class="select" >
                <el-select v-model="assess_type1" filterable placeholder="请选择评估类型1" style="width:250px;">
                    <el-option
                    v-for="item in assess_type11"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="评估类型2" class="select" >
                <el-select v-model="assess_type2" filterable placeholder="请选择评估类型2" style="width:250px;">
                    <el-option
                    v-for="item in assess_type22"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="字母类型" class="select" >
                <el-select v-model="assess_type3" filterable placeholder="请选择字母类型" style="width:250px;">
                    <el-option
                    v-for="item in assess_type33"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
              </el-form-item>
                <!-- <el-form-item label="昵称">
                    <el-input v-model="updata.nickname"></el-input>
                </el-form-item>

                <el-form-item label="密码">
                    <el-input v-model="updata.password"></el-input>
                </el-form-item>

                <el-form-item label="状态">
                    <el-radio v-model="updata.status" label="0">正常</el-radio>
                    <el-radio v-model="updata.status" label="1">禁用</el-radio>
                </el-form-item> -->

            </el-form>
        
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirmRevision(),dialogVisible = false">生 成</el-button>
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
        assess_type1 : '',
        assess_type11 : [],
        assess_type2 : '',
        assess_type22 : [],
        assess_type3 : '',
        assess_type33 : [],
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
            assess_type1 : this.assess_type1,
            assess_type2 : this.assess_type2,
            assess_type3 : this.assess_type3,

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
              this.assess_type1 = '';
              this.assess_type2 = '';
              this.assess_type3 = '';

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

        request.post("/admin/project/param").then(res => {
            if (res.code == 200) {
              this.company1 = res.data.param.report_number.company;
              this.assess_type11 = res.data.param.report_number.assess_type1;
              this.assess_type22 = res.data.param.report_number.assess_type2;
              this.assess_type33 = res.data.param.report_number.assess_type3;
            }
        });
    },updateAgent(row) {//修改按钮
       this.$router.push({path:'/updateprojectInitiation',query:{id:row.id}})
       
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