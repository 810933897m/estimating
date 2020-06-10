<template>

  <div class="app-container">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
    <el-tab-pane label="发票对私" name="first"></el-tab-pane>
    <el-tab-pane label="发票对公" name="success"></el-tab-pane>

    <el-form ref="form" >
        <el-form-item style="width:300px;float:left;">
            <el-input v-model="search" style="width:300px;float:left;" placeholder="流水号/报告编号/项目地址/小区名称"></el-input>
        </el-form-item>
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
      label="紧急程度"
      width="120px"
      align="center">
        <template slot-scope="scope">
          {{scope.row.approval_status}}
        </template>
      </el-table-column>

      <el-table-column
      label="项目报告份数"
      width="120px"
      align="center">
        <template slot-scope="scope">
          {{scope.row.send_num}}
        </template>
      </el-table-column>

      <el-table-column
      label="已发报告份数"
      width="120px"
      align="center">
        <template slot-scope="scope">
          {{scope.row.is_send_num}}
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
        <template slot-scope="scope">
          {{scope.row.report_number}}
        </template>
      </el-table-column>

      <el-table-column
      label="旧流水号"
      width="150px"
      align="center">
        <!-- <template slot-scope="scope">
          {{scope.row.city}}
        </template> -->
      </el-table-column>

      <el-table-column
      label="旧报告编号"
      width="200px"
      align="center">
        <!-- <template slot-scope="scope">
          {{scope.row.plot_address}}
        </template> -->
      </el-table-column>

      <el-table-column
      label="项目状态"
      width="100px"
      align="center">
        <!-- <template slot-scope="scope">
          {{scope.row.property_type}}
        </template> -->
      </el-table-column>

      <el-table-column
      label="项目地址"
      width="130px"
      align="center">
        <template slot-scope="scope">
          {{scope.row.plot_name}}
        </template>
      </el-table-column>

      <el-table-column
      label="小区名称"
      width="100px"
      align="center">
        <template slot-scope="scope">
          {{scope.row.report_tale}}
        </template>
      </el-table-column>

      <el-table-column
      label="受理时间"
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
      label="流程状态"
      width="100px"
      align="center">
        <template slot-scope="scope">
          {{scope.row.property_type}}
        </template>
      </el-table-column>

      <el-table-column
      label="撰写人员"
      width="100px"
      align="center">
        <!-- <template slot-scope="scope">
          {{scope.row.approval_status}}
        </template> -->
      </el-table-column>
    
      <el-table-column
      label="操作"
      fixed="right"
      width="100px" align="center">
        <template slot-scope="scope">
          <!-- <el-button size="small" type="primary" v-if="activeName == 'first'" @click="Report(scope.row)" >发送报告</el-button> -->
          <el-button size="small" type="primary" @click="Report(scope.row)" >申请发票</el-button>
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
          <el-dialog style="" :append-to-body='true' title="申请发票" :visible.sync="dialogFormVisible">
           
            <el-form ref="form" label-width="120px" style="width:100%;">
              <!-- <div style="width:100%;position:relative;height:50px;"> -->

              <el-form-item label="单位名称" class="form-input" prop="title" style="width:500px;">
                <el-input  placeholder="请输入" v-model="form.invoice_company"></el-input>
              </el-form-item>

              <el-form-item label="纳税人识别码" class="form-input" prop="title" style="width:500px;">
                <el-input  placeholder="请输入" v-model="form.taxpayer_identification"></el-input>
              </el-form-item>

              <el-form-item label="开票人电话" class="form-input" prop="title" style="width:500px;">
                <el-input  placeholder="请输入" v-model="form.invoice_telephone"></el-input>
              </el-form-item>

              <el-form-item label="开票人地址" class="form-input" prop="title" style="width:500px;">
                <el-input  placeholder="请输入" v-model="form.invoice_address"></el-input>
              </el-form-item>

              <el-form-item label="开票人姓名" class="form-input" prop="title" style="width:500px;">
                <el-input  placeholder="请输入" v-model="form.invoice_username"></el-input>
              </el-form-item>

              <el-form-item label="开票人开户行" class="form-input" prop="title" style="width:500px;">
                <el-input  placeholder="请输入" v-model="form.invoice_bank"></el-input>
              </el-form-item>

              <el-form-item label="开票人银行账户" class="form-input" prop="title" style="width:500px;">
                <el-input  placeholder="请输入" v-model="form.invoice_bank_card"></el-input>
              </el-form-item>

              <el-form-item label="开票审核人id" class="select" style="width:500px;">
                <el-select v-model="form.Invoice_examiner_id" filterable style="">
                      <el-option
                      v-for="item in invoice_examiner"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                      </el-option>
                </el-select>
              </el-form-item>

              <el-button size="small" type="primary" style="margin-left:20px;margin-top:5px;margin-bottom:20px;" @click="outworkidBtn1()">添加发票</el-button>
              <!-- </div> -->

              <!-- <el-table 
              class="table-picture"
              :data="listAdd"
              border
               
              style="width: 100%;">

              <el-table-column
              label="姓名"
              align="center">
                <template slot-scope="scope">
                  {{scope.row.create_username}}
                </template>
              </el-table-column>

              <el-table-column
              label="手机号"
              align="center">
                <template slot-scope="scope">
                  {{scope.row.telephone}}
                </template>
              </el-table-column>

              <el-table-column
              label="公司"
              align="center">
                <template slot-scope="scope">
                  {{scope.row.company}}
                </template>
              </el-table-column>

              <el-table-column
              label="地址"
              align="center">
                <template slot-scope="scope">
                  {{scope.row.company_addr}}
                </template>
              </el-table-column>

              <el-table-column
              label="邮政编码"
              align="center">
                <template slot-scope="scope">
                  {{scope.row.post_code}}
                </template>
              </el-table-column>

              </el-table> -->

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
        type:'',
        listAdd:[],
        type1:[],
        send_type:'',
        send_type1:[],
        express_type:'',
        express_type1:[],
        tongyi : '',
        admin_desc:'',
        ReportReviewerId: '',
        price_status: '',
        ask_univalence: '',
        ask_univalence1 : [],
        fileList:[],
        fileType:'',
        fileType1:[
          {
            label:'其它',
            value:'1'
          }
        ],
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
          invoice_company : '',
          taxpayer_identification : '',
          invoice_telephone : '',
          invoice_address : '',
          invoice_username : '',
          invoice_bank : '',
          invoice_bank_card : '',
          Invoice_examiner_id:'',
        },
        invoice_examiner:[],

        dialogFormVisible : false,//弹出框
        dialogFormVisible1 : false,//上传附件弹出框
        dialogFormVisible2 : false,//报告审核人弹出框
        disa : true,
        shopId : '',//id存储
        formLabelWidth : '120px',
        Id : '',
        Invoice_examiner_id : '',

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
     this.getAgentList();//-渲染列表
    },
    methods: {
      excelFileClass(param){//修改题目
          console.log(param);
            // let formData = new FormData();
            // formData.append('Excelfile', param.file);
            // request.post("/api/classroom/questions/add", formData).then(res => {
            //     if (res.code == 200){
            //         this.questions = res.data;
            //     }
            // });
      },
      handleClick(tab, event){//改变状态
        console.log(this.activeName)
        if(this.activeName == 'first'){
          request.post("/admin/ProjectInvoice/ProjectList").then(res => {
            if (res.code == 200) {
              this.agentList = res.data.list;
              this.count = res.data.page.count;
              this.max = res.data.page.max;
              this.page = res.data.page.page;
              this.size = res.data.page.size;
            }
        });
        }else if(this.activeName == 'success'){
          request.post("/admin/ProjectInvoice/ProjectPublicList").then(res => {
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
        request.post("/admin/ProjectInvoice/ProjectList").then(res => {
            if (res.code == 200) {
              this.agentList = res.data.list;
              this.count = res.data.page.count;
              this.max = res.data.page.max;
              this.page = res.data.page.page;
              this.size = res.data.page.size;
            }
        });
        request.post("/admin/ProjectInvoice/param").then(res => {
            if (res.code == 200) {
              console.log(res)
              this.invoice_examiner = res.data.invoice_examiner;
              // this.agentList = res.data.list;
            }
        });

        // request.post("/admin/outwork/param").then(res => {
        //     if (res.code == 200) {
        //       console.log(res)
        //       this.outworkid1 = res.data.admin_username;
        //     }
        // });

    },serachBtn(){ // 搜索功能
      if(this.activeName == 'first'){
          request.post("/admin/ProjectInvoice/ProjectList",{
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
        }else if(this.activeName == 'success'){
          request.post("/admin/ProjectInvoice/ProjectPublicList",{
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
        this.tongyi = true;
        console.log(row)
        this.dialogFormVisible = true;
        this.Id = row.id;
      },
      Report(row){
        this.tongyi = false;
        console.log(row)
        this.dialogFormVisible = true;
        this.Id = row.id;
        this.Invoice_examiner_id = row.Invoice_examiner_id;

        // request.post("/admin/ProjectInvoice/param").then(res => {
        //       if (res.code == 200) {
        //         console.log(res)
        //           this.finance_user = res.data.finance_user;
        //         // this.handleClick();
        //       }
        //   });
      },
      outworkidBtn1(){//报告装订
          request.post("/admin/ProjectInvoice/create",{
          project_id : this.Id,
          invoice_examiner_id : this.form.Invoice_examiner_id,
          invoice_company : this.form.invoice_company,
          taxpayer_identification : this.form.taxpayer_identification,
          invoice_telephone : this.form.invoice_telephone,
          invoice_address : this.form.invoice_address,
          invoice_username : this.form.invoice_username,
          invoice_bank : this.form.invoice_bank,
          invoice_bank_card : this.form.invoice_bank_card,
          }).then(res => {
              if (res.code == 200) {
                this.$message({
                    // type: res.errno === 0 ? "success" : "warning",
                    type: "success",
                    message: '发送成功'//提示发送成功
                });
                this.form = {
                  invoice_bank_card : '',
                  taxpayer_identification : '',
                  invoice_telephone : '',
                  invoice_address : '',
                  invoice_username : '',
                  invoice_bank : '',
                  invoice_bank_card : '',
                };
                this.express_type = '';
                this.type = '';
                this.send_type = '';
                this.handleClick();
              }
          });
        this.dialogFormVisible=false;
        
      },
      //分页
      handleCurrentChange: function(currentPage){//换页
          console.log(currentPage)  
          this.currentPage = currentPage;
          if(this.activeName == 'first'){
            request.post("/admin/ProjectInvoice/ProjectList",{
              
              page : currentPage,
              keyword : this.search,
          }).then(res => {
              console.log(res)
              if (res.code == 200) {
                this.agentList = res.data.list;
              }
          });
          }else if(this.activeName == 'success'){
            request.post("/admin/ProjectInvoice/ProjectPublicList",{
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