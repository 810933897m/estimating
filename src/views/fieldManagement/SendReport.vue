<template>

  <div class="app-container">
    <!-- <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
    <el-tab-pane label="等待发送" name="first"></el-tab-pane>
    <el-tab-pane label="已发送" name="success"></el-tab-pane>

    <el-form ref="form" >
        <el-form-item style="width:300px;float:left;">
            <el-input v-model="search" style="width:300px;float:left;" placeholder="请输入查询数据"></el-input>
        </el-form-item>
        <el-button type="primary" style="" plain @click="serachBtn">查询</el-button>
    </el-form> -->
    <el-form ref="form" >
        <el-form-item>
            <el-radio v-model="activeName" label="first" @change="handleClick()">等待发送</el-radio>
            <el-radio v-model="activeName" label="success" @change="handleClick()">已发送</el-radio>
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
      align="center">
        <template slot-scope="scope" >
          {{scope.row.id}}
        </template>
      </el-table-column>

      <!-- <el-table-column
      label="紧急程度"
      width="120px"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.approval_status" class="nooverflow">{{scope.row.approval_status}}</p>
        </template>
      </el-table-column> -->

      <el-table-column
      label="项目报告份数"
      width="120px"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.send_num" class="nooverflow">{{scope.row.send_num}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="已发报告份数"
      width="120px"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.is_send_num" class="nooverflow">{{scope.row.is_send_num}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="流水号"
      width="120px"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.serial_number" style="cursor: pointer;" @click="getInfo(scope.row)" class="nooverflow">{{scope.row.serial_number}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="报告编号"
      width="150px"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.report_number" class="nooverflow">{{scope.row.report_number}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="旧流水号"
      width="150px"
      align="center">
        <!-- <template slot-scope="scope">
          <p :title="scope.row.city" class="nooverflow">{{scope.row.city}}</p>
        </template> -->
      </el-table-column>

      <el-table-column
      label="旧报告编号"
      width="200px"
      align="center">
        <!-- <template slot-scope="scope">
          <p :title="scope.row.plot_address" class="nooverflow">{{scope.row.plot_address}}</p>
        </template> -->
      </el-table-column>

      <el-table-column
      label="项目状态"
      width="100px"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.property_type" class="nooverflow">{{scope.row.property_type}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="项目地址"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.project_address" class="nooverflow">{{scope.row.project_address}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="小区名称"
      width="100px"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.report_tale" class="nooverflow">{{scope.row.report_tale}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="受理时间"
      width="100px"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.create_time" class="nooverflow">{{scope.row.create_time}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="报告类型"
      width="100px"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.property_type" class="nooverflow">{{scope.row.property_type}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="流程状态"
      width="100px"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.invoice_status" class="nooverflow">{{scope.row.invoice_status}}</p>
        </template>
      </el-table-column>
    
      <el-table-column
      label="操作"
      fixed="right"
      v-if="activeName == 'first'"
      width="300px" align="center">
        <template slot-scope="scope">
          <el-button size="small" type="primary" v-if="activeName == 'first'" @click="Report(scope.row)" >发送快递</el-button>
          <el-button size="small" type="primary" v-if="activeName == 'first'" @click="recordDetail(scope.row)" >查看记录</el-button>
          <el-button size="small" type="primary" v-if="activeName == 'first'" @click="refuse(scope.row)" >确认发送</el-button>
          </template>
      </el-table-column>

      <el-table-column
      label="操作"
      fixed="right"
      v-if="activeName == 'success'"
      width="100px" align="center">
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="recordDetail(scope.row)" >查看记录</el-button>
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
    
  <!-- </el-tabs> -->

        <!--*************发送记录模态框*************-->
        <el-dialog
        title="发送记录"
        :visible.sync="dialogVisibleRecordDetail"
        width="50%">

        <el-table 
        class="table-picture"
        :data="recordDetailList"
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
        label="发送份数"
        align="center">
          <template slot-scope="scope" >
            <p :title="scope.row.send_num" class="nooverflow">{{scope.row.send_num}}</p>
          </template>
        </el-table-column>

        <el-table-column
        label="类型"
        align="center">
          <template slot-scope="scope" >
            <p :title="scope.row.send_type" class="nooverflow">{{scope.row.send_type}}</p>
          </template>
        </el-table-column>

        <el-table-column
        label="物品类型"
        align="center">
          <template slot-scope="scope" >
            <p :title="scope.row.type" class="nooverflow">{{scope.row.type}}</p>
          </template>
        </el-table-column>

        <el-table-column
        label="快递公司类型"
        align="center">
          <template slot-scope="scope" >
            <p :title="scope.row.express_type" class="nooverflow">{{scope.row.express_type}}</p>
          </template>
        </el-table-column>

        <el-table-column
        label="快递单号"
        align="center">
          <template slot-scope="scope" >
            <p :title="scope.row.express_num" class="nooverflow">{{scope.row.express_num}}</p>
          </template>
        </el-table-column>

        <el-table-column
        label="公司名字"
        align="center">
          <template slot-scope="scope" >
            <p :title="scope.row.company" class="nooverflow">{{scope.row.company}}</p>
          </template>
        </el-table-column>

        <el-table-column
        label="公司地址"
        align="center">
          <template slot-scope="scope" >
            <p :title="scope.row.company_addr" class="nooverflow">{{scope.row.company_addr}}</p>
          </template>
        </el-table-column>

        <el-table-column
        label="联系人名字"
        align="center">
          <template slot-scope="scope" >
            <p :title="scope.row.name" class="nooverflow">{{scope.row.name}}</p>
          </template>
        </el-table-column>

        <el-table-column
        label="联系电话"
        align="center">
          <template slot-scope="scope" >
            <p :title="scope.row.telephone" class="nooverflow">{{scope.row.telephone}}</p>
          </template>
        </el-table-column>

        </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisibleRecordDetail = false">取 消</el-button>
            </span>
        </el-dialog>
        <!--*************发送记录模态框*************-->

        <!-- 确认发送弹出框 -->
          <el-dialog style="" :append-to-body='true' title="发送" :visible.sync="dialogFormVisibleBtn">
           
            <el-form ref="form" label-width="120px" :model="form" style="width:100%;">
              <div style="width:100%;position:relative;height:50px;">
              <el-form-item label="提示信息" class="form-input" prop="title" style="width:300px;float:left;">
                <el-input  placeholder="请输入提示信息" v-model="admin_desc"></el-input>
              </el-form-item>

              <el-button size="small" type="primary" style="margin-left:20px;margin-top:5px;" @click="outworkidBtn2()">确认</el-button>
              </div>

            </el-form>
            
          </el-dialog>
          <!-- **************确认发送弹出框************** -->
    
          <!-- 分配任务弹出框 -->
          <el-dialog style="" :append-to-body='true' title="发送报告" :visible.sync="dialogFormVisible">
           
            <el-form ref="form" label-width="120px" style="width:100%;">
              <!-- <div style="width:100%;position:relative;height:50px;"> -->
              <el-form-item label="发送份数" class="form-input" prop="title" style="width:300px;float:left;">
                <el-input  placeholder="请输入" v-model="form.send_num"></el-input>
              </el-form-item>

              <el-form-item label="类型" class="select" style="width:300px;float:left;">
                <el-select v-model="send_type" filterable style="">
                      <el-option
                      v-for="item in send_type1"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                      </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="物品类型" class="select" style="width:300px;float:left;">
                <el-select v-model="type" filterable style="">
                      <el-option
                      v-for="item in type1"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                      </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="快递公司类型" class="select" style="width:300px;float:left;">
                <el-select v-model="form.express_type" filterable style="">
                      <el-option
                      v-for="item in express_type1"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                      </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="快递单号" class="form-input" prop="title" style="width:300px;float:left;">
                <el-input  placeholder="请输入" v-model="form.express_num"></el-input>
              </el-form-item>

              <el-form-item label="公司名字" class="form-input" prop="title" style="width:300px;float:left;">
                <el-input  placeholder="请输入" v-model="form.company"></el-input>
              </el-form-item>

              <el-form-item label="公司地址" class="form-input" prop="title" style="width:300px;float:left;">
                <el-input  placeholder="请输入" v-model="form.company_addr"></el-input>
              </el-form-item>

              <el-form-item label="联系人名字" class="form-input" prop="title" style="width:300px;float:left;">
                <el-input  placeholder="请输入" v-model="form.name"></el-input>
              </el-form-item>

              <el-form-item label="联系电话" class="form-input" prop="title" style="width:300px;float:left;">
                <el-input  placeholder="请输入" v-model="form.telephone"></el-input>
              </el-form-item>

              <el-button size="small" type="primary" style="float:left;margin-left:20px;margin-top:5px;margin-bottom:20px;" @click="outworkidBtn1()">报告发送</el-button>
              <!-- </div> -->

              <el-table 
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

              </el-table>

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
        type1:[
          {
            label:'报告',
            value : '报告'
          },{
            label:'发票',
            value : '发票'
          },
        ],
        send_type:'',
        send_type1:[
          {
            label:'快递',
            value : '快递'
          },{
            label:'自取',
            value : '自取'
          },{
            label:'市场派送',
            value : '市场派送'
          },
        ],
        recordDetailList:[],
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
          send_num : '',
          express_type : '',
          express_num : '',
          company : '',
          company_addr : '',
          name : '',
          telephone : '',
        },
        dialogFormVisible : false,//弹出框
        dialogFormVisible1 : false,//上传附件弹出框
        dialogFormVisible2 : false,//报告审核人弹出框
        dialogFormVisibleBtn : false,//确认发送弹出框
        dialogVisibleRecordDetail: false,//确认发送弹出框
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
     this.getAgentList();//-渲染列表
    },
    methods: {
      excelFileClass(param){//修改题目
          // console.log(param);
            // let formData = new FormData();
            // formData.append('Excelfile', param.file);
            // request.post("/api/classroom/questions/add", formData).then(res => {
            //     if (res.code == 200){
            //         this.questions = res.data;
            //     }
            // });
      },
      handleClick(tab, event){//改变状态
        this.agentList =[];
        // console.log(this.activeName)
        if(this.activeName == 'first'){
          request.post("/admin/projectExpress/query").then(res => {
            if (res.code == 200) {
              this.agentList = res.data.list;
              this.count = res.data.page.count;
              this.max = res.data.page.max;
              this.page = res.data.page.page;
              this.size = res.data.page.size;
            }
        });
        }else if(this.activeName == 'success'){
          request.post("/admin/projectExpress/finish").then(res => {
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
        // console.log(row.id);
        window.open(row.project_info_url, '_blank')
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
        request.post("/admin/projectExpress/query").then(res => {
            if (res.code == 200) {
              this.agentList = res.data.list;
              this.count = res.data.page.count;
              this.max = res.data.page.max;
              this.page = res.data.page.page;
              this.size = res.data.page.size;
            }
        });

        request.post("/admin/values/query",{
          type : 'express_type',
          name : '',
        }).then(res => {
            if (res.code == 200) {
              this.express_type1 = res.data;
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
          request.post("/admin/projectExpress/query",{
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
          request.post("/admin/projectExpress/finish",{
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
        // console.log(row)
        this.dialogFormVisible = true;
        this.Id = row.id;
      },
      Report(row){
        this.tongyi = false;
        // console.log(row)
        this.dialogFormVisible = true;
        this.Id = row.id;
      },
      refuse(row){
        this.dialogFormVisibleBtn = true;
        this.Id = row.id;
      },
      outworkidBtn1(){//发送快递
          request.post("/admin/projectExpress/create",{
            id : this.Id,
            send_num : this.form.send_num,
            send_type : this.send_type,
            type : this.type,
            express_type : this.form.express_type,
            company : this.form.company,
            company_addr : this.form.company_addr,
            name : this.form.name,
            telephone : this.form.telephone,
            express_num : this.form.express_num,
          }).then(res => {
              if (res.code == 200) {
                this.$message({
                    // type: res.errno === 0 ? "success" : "warning",
                    type: "success",
                    message: '发送成功'//提示发送成功
                });
                this.form = {
                  telephone : '',
                  company_addr : '',
                  company : '',
                  name : '',
                  send_num : '',
                  express_num : '',
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
          // console.log(currentPage)  
          this.currentPage = currentPage;
          if(this.activeName == 'first'){
            request.post("/admin/projectExpress/query",{
              page : currentPage,
              keyword : this.search,
          }).then(res => {
              // console.log(res)
              if (res.code == 200) {
                this.agentList = res.data.list;
              }
          });
          }else if(this.activeName == 'success'){
            request.post("/admin/projectExpress/finish",{
              page : currentPage,
              keyword : this.search,
          }).then(res => {
              // console.log(res)
              if (res.code == 200) {
                this.agentList = res.data.list;
              }
          });
          }
      },
      outworkidBtn2(){
         request.post("/admin/projectExpress/submit",{
          id : this.Id,
          admin_desc : this.admin_desc,
          }).then(res => {
              if (res.code == 200) {
                this.$message({
                    // type: res.errno === 0 ? "success" : "warning",
                    type: "success",
                    message: '发送成功'//提示发送成功
                });
                this.handleClick();
              }
          });
        this.dialogFormVisibleBtn=false;
        this.admin_desc = '';
      },
      recordDetail(row){//详情
        this.dialogVisibleRecordDetail = true;
        request.post("/admin/projectExpress/info",{
            id : row.id,
          }).then(res => {
            if (res.code == 200) {
              // console.log(res)
              this.recordDetailList =res.data;

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