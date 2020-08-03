<template>

  <div class="app-container">
    <!-- <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
    <el-tab-pane label="待领取" name="wait"></el-tab-pane>
    <el-tab-pane label="估价中" name="first"></el-tab-pane>
    <el-tab-pane label="已完成" name="last"></el-tab-pane> -->

    <!-- <el-form ref="form" >
        <el-form-item style="width:300px;float:left;">
            <el-input v-model="search" style="width:300px;float:left;" placeholder="请输入查询数据"></el-input>
        </el-form-item>
        <el-button type="primary" style="" plain @click="serachBtn">查询</el-button>
    </el-form> -->
    <el-form ref="form">
    <el-form-item>
      <el-radio v-model="distribution" label="0" @change="distributionBtn1()">待领取</el-radio>
      <el-radio v-model="distribution" label="1" @change="distributionBtn1()">估价中</el-radio>
      <el-radio v-model="distribution" label="2" @change="distributionBtn1()">已挂起</el-radio>
      <el-radio v-model="distribution" label="3" @change="distributionBtn1()">审核中</el-radio>
      <el-radio v-model="distribution" label="4" @change="distributionBtn1()">已完成</el-radio>
      
      <!-- <el-radio v-model="distribution" label="0" @change="distributionBtn1()">待领取</el-radio>
      <el-radio v-model="distribution" label="1" @change="distributionBtn1()">估价中</el-radio>
      <el-radio v-model="distribution" label="2" @change="distributionBtn1()">已完成</el-radio> -->
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

      <el-table-column
       label="挂起原因"
      width="100px"
      key="1" 
      v-if="distribution == '2'"
      align="center">
        <template slot-scope="scope" >
          <p :title="scope.row.hang_up_content" class="nooverflow">{{scope.row.hang_up_content}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="流水号"
      width="120px"
      key="2"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.serial_number" style="cursor: pointer;" @click="getInfo(scope.row)" class="nooverflow">{{scope.row.serial_number}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="报告编号"
      width="150px"
      key="3"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.report_number" class="nooverflow">{{scope.row.report_number}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="旧流水号"
      width="150px"
      key="4"
      align="center">
        <!-- <template slot-scope="scope">
          <p :title="scope.row.report_number" class="nooverflow">{{scope.row.report_number}}</p>
        </template> -->
      </el-table-column>

      <el-table-column
      label="旧报告编号"
      width="200px"
      key="5"
      align="center">
        <!-- <template slot-scope="scope">
          <p :title="scope.row.plot_address" class="nooverflow">{{scope.row.plot_address}}</p>
        </template> -->
      </el-table-column>

      <el-table-column
      label="项目地址"
      width="130px"
      key="6"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.district" class="nooverflow">{{scope.row.district}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="小区名称"
      width="100px"
      key="7"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.report_tale" class="nooverflow">{{scope.row.report_tale}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="受理时间"
      width="100px"
      key="8"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.create_time" class="nooverflow">{{scope.row.create_time}}</p>
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
      label="流程状态"
      width="100px"
      key="10"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.property_type" class="nooverflow">{{scope.row.property_type}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="分配时间"
      width="100px"
      key="11"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.updata_time" class="nooverflow">{{scope.row.updata_time}}</p>
        </template>
      </el-table-column>
    
      <el-table-column
      label="领取时间"
      width="100px"
      key="12"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.approval_status" class="nooverflow">{{scope.row.approval_status}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="报告状态"
      width="150px"
      key="13"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.report_tale" class="nooverflow">{{scope.row.report_tale}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="勘察状态"
      width="150px"
      key="14"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.create_time" class="nooverflow">{{scope.row.create_time}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="操作"
      v-if="distribution == '1'"
      fixed="right"
      width="400px" align="center">
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="downLoad_image(scope.row)" >下载图片</el-button>
          <el-button size="small" type="primary" @click="Pending(scope.row)" >挂起</el-button>
          <!-- <el-button size="small" type="primary" @click="unHangUp(scope.row)" >解挂</el-button> -->
          <!-- <el-button size="small" type="primary" @click="loadBtn(scope.row)" >下载</el-button> -->
          <el-button size="small" type="primary" @click="examineBtn(scope.row)" >审核</el-button>
          <el-button size="small" type="primary"  @click="exploration(scope.row)">外勘</el-button>
          <el-button size="small" type="primary" @click="imageBtn(scope.row)" >材料</el-button>
          <!-- <el-button size="small" type="primary" @click="Printing(scope.row)">打印</el-button>   -->
        </template>
      </el-table-column>

      <el-table-column
      label="操作"
      fixed="right"
      v-if="distribution == '0'"
      width="100px" align="center">
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="receive(scope.row)">领取</el-button>
        </template>
      </el-table-column>

      <el-table-column
      label="操作"
      fixed="right"
      v-if="distribution == '2'"
      width="100px" align="center">
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="unHangUp(scope.row)" >解挂</el-button>
        </template>
      </el-table-column>

      <el-table-column
      label="操作"
      fixed="right"
      v-if="distribution == '4'"
      width="200px" align="center">
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="uploadBtn(scope.row)">上传附件</el-button>
          <el-button size="small" type="primary" @click="uploadDetail(scope.row)">附近内容</el-button>
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
    
          <!-- 分配任务弹出框 -->
          <el-dialog style="" :append-to-body='true' title="任务分配" :visible.sync="dialogFormVisible">
           
            <el-form ref="form" label-width="120px" :model="form" style="width:100%;">
              <div style="width:100%;position:relative;height:50px;">
                  <el-form-item label="外采用户" class="select" style="position:absolute;left:0;">
                  <el-select v-model="outworkid" filterable style="width:120px;">
                      <el-option
                      v-for="item in outworkid1"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                      </el-option>
                  </el-select>
                </el-form-item>
              <el-button size="small" type="primary" style="position:absolute;left:550px;" @click="outworkidBtn()">确定</el-button>
              </div>
            </el-form>
          </el-dialog>
          <!-- **************分配任务弹出框************** -->

          <!-- 分配任务弹出框 -->
          <el-dialog style="" :append-to-body='true' title="挂起" :visible.sync="dialogFormVisible2">
           
            <el-form ref="form" label-width="120px" :model="form" style="width:100%;">
              <div style="width:100%;position:relative;height:50px;">
              <el-form-item label="挂起原因" class="form-input" prop="title" style="width:300px;float:left;">
                <el-input  placeholder="请输入挂起原因" v-model="admin_desc"></el-input>
              </el-form-item>

              <el-button size="small" type="primary" style="margin-left:20px;margin-top:5px;" @click="PendingBtn()">确定</el-button>
              </div>

            </el-form>
            
          </el-dialog>
          <!-- **************分配任务弹出框************** -->

          <!-- 下载图片弹出框 -->
          <el-dialog style="" :append-to-body='true' title="下载" :visible.sync="dialogFormVisibleImage">
              <el-table 
              class="table-picture"
              :data="imageList"
              border
              max-height="550"
              style="width: 100%;">

              <el-table-column
              label="id"
              align="center">
                <template slot-scope="scope" >
                  {{scope.row.id}}
                </template>
              </el-table-column>

              <el-table-column
              label="标题"
              align="center">
                <template slot-scope="scope" >
                  {{scope.row.title}}
                </template>
              </el-table-column>

              <el-table-column
              label="文件大小"
              align="center">
                <template slot-scope="scope" >
                  {{scope.row.size}}
                </template>
              </el-table-column>

              <el-table-column
              label="操作"
              align="center">
                <template slot-scope="scope" >
                    <el-button size="small" type="primary" @click="uploadImage(scope.row)">
                      下载
                    </el-button>
                </template>
              </el-table-column>
               </el-table>
              <span slot="footer" class="dialog-footer">
                <!-- <el-button type="primary" @click="imageDownLoadBtn(),dialogFormVisibleImage = false">保 存</el-button> -->
                <el-button @click="dialogFormVisibleImage = false">取 消</el-button>
            </span>
          </el-dialog>
          <!-- **************下载图片弹出框************** -->


          <!-- 二次审核弹出框 -->
          <el-dialog style="" :append-to-body='true' title="提交审核" :visible.sync="dialogFormVisible3">
            <el-form ref="form" label-width="120px" :model="form" style="width:100%;">
              <div style="width:100%;position:relative;height:50px;">
                  <el-form-item label="二审人员" class="select" style="float:left;">
                  <el-select v-model="twoExamine" filterable style="width:120px;">
                      <el-option
                      v-for="item in twoExamine1"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                      </el-option>
                  </el-select>
                </el-form-item>
                
              <el-button size="small" type="primary" style="margin-left:20px;margin-top:5px;" @click="outworkidBtn()">确定</el-button>
              </div>
            </el-form>
          </el-dialog>
          <!-- **************二次审核弹出框************** -->

          <!-- 分配任务弹出框 -->
          <el-dialog style="" :append-to-body='true' title="上传报告文件" :visible.sync="dialogFormVisible1">
            <el-form ref="form" label-width="150px" :model="form" style="width:100%;">

              <!-- *************文件上传************* -->
            <el-form-item label="文件" prop="coverFile">
                  <el-upload
                  ref="uploadExcel"
                  class="upload-demo"
                  drag
                  :limit="1"
                  :http-request="excelFileClass"
                  accept=".xlsx,.xls,.csv,.pdf"
                  action=""
                  multiple>
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text"><em>点击上传</em></div>
                  <div class="el-upload__tip" slot="tip">xlsx/xls/csv/pdf，且不超过200M</div>
                </el-upload>
            </el-form-item>
            <!-- *************文件上传************* -->

            <el-form-item v-for="(item,index) in uploadListBack" :key="index" :label="item.title" class="form-input" prop="title" style="width:300px;">
              <!-- <span>{{item.title}}</span> -->
                <el-input  v-model="item.value"></el-input>
            </el-form-item>

              <el-button size="small" type="primary" style="" @click="save">确定</el-button>
             <el-button size="small" type="" style="" @click="dialogFormVisible1 = false">取消</el-button>
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
        imageList : [],
        uploadListBack:[],
        admin_desc : '',
        fileList:[],
        twoExamine:'',
        twoExamine1:[],
        fileType:'',
        fileType1:[
          {
            label:'其它',
            value:'1'
          }
        ],
        distribution:'0',
        search : '',
        ROW : {},
        checked:'',
        options:map.options,
        activeName: 'wait',
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
        formData : new FormData(),
        dialogFormVisible : false,//弹出框
        dialogFormVisible1 : false,//上传附件弹出框
        dialogFormVisible2 : false,//挂起弹出框
        dialogFormVisible3 : false,
        dialogFormVisibleImage : false,
        disa : true,
        shopId : '',//id存储
        formLabelWidth : '120px',
        Id : '',
        uploadId : '',

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
      uploadDetail(row){
        this.$router.push({path:'/uploadDetail',query:{id:row.id}})
      },
      save(){//附件列表保存
        request.post("/admin/excel/save",{
          id : this.uploadId,
          data : this.uploadListBack,
        }).then(res => {
            if (res.code == 200) {
              this.$message({
                // type: res.errno === 0 ? "success" : "warning",
                type: "success",
                message: '保存成功'//提示保存成功
              });
              this.dialogFormVisible1 = false;
              this.uploadListBack = [];
            }
        });
      },
      Pending(row){//挂起
        this.dialogFormVisible2=true;
        this.Pendingid = row.id;
      },
      PendingBtn(){//挂起确定
        request.post("/admin/appraisal/hangUp",{
          hang_up_content : this.admin_desc,
          id : this.Pendingid,
          }).then(res => {
              if (res.code == 200) {
                this.$message({
                    // type: res.errno === 0 ? "success" : "warning",
                    type: "success",
                    message: '挂起成功'//提示挂起成功
                });
                this.distributionBtn1();
              }
          });
        this.dialogFormVisible2=false;
        this.admin_desc = '';
      },
      unHangUp(row){
        this.$confirm("您确定要解挂？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消"
            }).then(() => {
                request.post("/admin/appraisal/unHangUp", {
                        id:row.id
                }).then(res => {
                    // res.errno === 0 && this.getList();
                    this.$message({
                        // type: res.errno === 0 ? "success" : "warning",
                        type: "success",
                        message: '解挂成功！'
                    });
                    this.distributionBtn1();
                }).catch(res => {
                    this.$message({
                        type: "warning",
                        message: "解挂失败!"
                    });
                });
            });
      },
      excelFileClass(param){//上传附件
            let formData = new FormData();
            formData.append('id', this.uploadId);
            formData.append('excel', param.file);
            request.post("/admin/excel/upload",
              formData
              ).then(res => {
                if (res.code == 200){
                    this.$message({
                    // type: res.errno === 0 ? "success" : "warning",
                    type: "success",
                    message: '上传成功'//提示上传成功
                });
                this.$refs.uploadExcel.clearFiles();
                this.uploadListBack = res.data.data;
                }
            });
      },
      handleClick(tab, event){//改变状态
        this.agentList = [];
        if(this.activeName == 'first'){
          request.post("/admin/appraisal/query").then(res => {
            if (res.code == 200) {
              this.agentList = res.data.list;
              this.count = res.data.page.count;
              this.max = res.data.page.max;
              this.page = res.data.page.page;
              this.size = res.data.page.size;
            }
        });
        }else if(this.activeName == 'last'){
          request.post("/admin/appraisal/finish").then(res => {
            if (res.code == 200) {
              this.agentList = res.data.list;
              this.count = res.data.page.count;
              this.max = res.data.page.max;
              this.page = res.data.page.page;
              this.size = res.data.page.size;
            }
        });
        }else if(this.activeName == 'wait'){
          request.post("/admin/Appraisal/unclaimed").then(res => {
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
      distributionBtn1(){//切换单选框改变数据
      this.dialogFormVisible = false;
      this.agentList =[];
        if(this.distribution == 0){
          request.post("/admin/appraisal/query",{
            type : 0,
          }).then(res => {
            if (res.code == 200) {
              this.agentList = res.data.list;
              this.count = res.data.page.count;
              this.max = res.data.page.max;
              this.page = res.data.page.page;
              this.size = res.data.page.size;
            }
          });
        }else if(this.distribution == 1){
          request.post("/admin/appraisal/query",{
            type : 1,
          }).then(res => {
            if (res.code == 200) {
              this.agentList = res.data.list;
              this.count = res.data.page.count;
              this.max = res.data.page.max;
              this.page = res.data.page.page;
              this.size = res.data.page.size;
            }
          });
        }else if(this.distribution == 2){
          request.post("/admin/appraisal/query",{
            type : 2,
          }).then(res => {
            if (res.code == 200) {
              this.agentList = res.data.list;
              this.count = res.data.page.count;
              this.max = res.data.page.max;
              this.page = res.data.page.page;
              this.size = res.data.page.size;
            }
          });
        }else if(this.distribution == 3){
          request.post("/admin/appraisal/query",{
            type : 3,
          }).then(res => {
            if (res.code == 200) {
              this.agentList = res.data.list;
              this.count = res.data.page.count;
              this.max = res.data.page.max;
              this.page = res.data.page.page;
              this.size = res.data.page.size;
            }
          });
        }else if(this.distribution == 4){
          request.post("/admin/appraisal/query",{
            type : 4,
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
      receive(row){
        this.$confirm("您确定要领取？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消"
            }).then(() => {
                request.post("/admin/Appraisal/receive", {
                        id:row.id
                }).then(res => {
                    // res.errno === 0 && this.getList();
                    this.$message({
                        // type: res.errno === 0 ? "success" : "warning",
                        type: "success",
                        message: '领取成功！'
                    });
                    this.distributionBtn1();
                }).catch(res => {
                    this.$message({
                        type: "warning",
                        message: "领取失败!"
                    });
                });
            });
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
        request.post("/admin/appraisal/query",{
          type : 0,
        }).then(res => {
            if (res.code == 200) {
              this.agentList = res.data.list;
              this.count = res.data.page.count;
              this.max = res.data.page.max;
              this.page = res.data.page.page;
              this.size = res.data.page.size;
            }
        });


        request.post("/admin/values/query",{
          type : 'second_instance',
          name : '',
        }).then(res => {//二次人员获取
            if (res.code == 200) {
              this.twoExamine1 = res.data;
            }
        });

    },serachBtn(){ // 搜索功能
        if(this.distribution == 0){
          request.post("/admin/appraisal/query",{
            type : 0,
            keyword : this.search,
          }).then(res => {
            if (res.code == 200) {
              this.agentList = res.data.list;
              this.count = res.data.page.count;
              this.max = res.data.page.max;
              this.page = res.data.page.page;
              this.size = res.data.page.size;
            }
          });
        }else if(this.distribution == 1){
          request.post("/admin/appraisal/query",{
            type : 1,
            keyword : this.search,
          }).then(res => {
            if (res.code == 200) {
              this.agentList = res.data.list;
              this.count = res.data.page.count;
              this.max = res.data.page.max;
              this.page = res.data.page.page;
              this.size = res.data.page.size;
            }
          });
        }else if(this.distribution == 2){
          request.post("/admin/appraisal/query",{
            type : 2,
            keyword : this.search,
          }).then(res => {
            if (res.code == 200) {
              this.agentList = res.data.list;
              this.count = res.data.page.count;
              this.max = res.data.page.max;
              this.page = res.data.page.page;
              this.size = res.data.page.size;
            }
          });
        }else if(this.distribution == 3){
          request.post("/admin/appraisal/query",{
            type : 3,
            keyword : this.search,
          }).then(res => {
            if (res.code == 200) {
              this.agentList = res.data.list;
              this.count = res.data.page.count;
              this.max = res.data.page.max;
              this.page = res.data.page.page;
              this.size = res.data.page.size;
            }
          });
        }else if(this.distribution == 4){
          request.post("/admin/appraisal/query",{
            type : 4,
            keyword : this.search,
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
        this.outworkid = row.admin_id;
        this.ROW = row;
      },
      outworkidBtn(){//分配任务确定
        if(this.distribution == '1'){
          request.post("/admin/appraisal/submit",{
            id : this.Id,
            username : this.twoExamine,
          }).then(res => {
              if (res.code == 200) {
                this.$message({
                    // type: res.errno === 0 ? "success" : "warning",
                    type: "success",
                    message: '二审成功'//提示二审成功
                });
                this.distributionBtn1();
              }
          });
        this.dialogFormVisible3=false;
        }else if(this.distribution == '4'){
          request.post("/admin/appraisal/submit").then(res => {
              if (res.code == 200) {
                this.$message({
                    // type: res.errno === 0 ? "success" : "warning",
                    type: "success",
                    message: '重新分配成功'//提示修改成功
                });
              }
          });
        this.dialogFormVisible=false;
        }
        
      },
      getInfo(row, event, column){//点击跳到综合页面
        window.open(row.project_info_url, '_blank')
      },
      uploadImage(row){
        window.open(row.url, '_blank')
      },
      updateAgent(row) {//修改按钮
        // console.log(row);
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
          this.currentPage = currentPage;
        if(this.distribution == 0){
          request.post("/admin/appraisal/query",{
            type : 0,
            keyword : this.search,
            page : this.currentPage,
          }).then(res => {
            if (res.code == 200) {
              this.agentList = res.data.list;
              this.count = res.data.page.count;
              this.max = res.data.page.max;
              this.page = res.data.page.page;
              this.size = res.data.page.size;
            }
          });
        }else if(this.distribution == 1){
          request.post("/admin/appraisal/query",{
            type : 1,
            keyword : this.search,
            page : this.currentPage,
          }).then(res => {
            if (res.code == 200) {
              this.agentList = res.data.list;
              this.count = res.data.page.count;
              this.max = res.data.page.max;
              this.page = res.data.page.page;
              this.size = res.data.page.size;
            }
          });
        }else if(this.distribution == 2){
          request.post("/admin/appraisal/query",{
            type : 2,
            keyword : this.search,
            page : this.currentPage,
          }).then(res => {
            if (res.code == 200) {
              this.agentList = res.data.list;
              this.count = res.data.page.count;
              this.max = res.data.page.max;
              this.page = res.data.page.page;
              this.size = res.data.page.size;
            }
          });
        }else if(this.distribution == 3){
          request.post("/admin/appraisal/query",{
            type : 3,
            keyword : this.search,
            page : this.currentPage,
          }).then(res => {
            if (res.code == 200) {
              this.agentList = res.data.list;
              this.count = res.data.page.count;
              this.max = res.data.page.max;
              this.page = res.data.page.page;
              this.size = res.data.page.size;
            }
          });
        }else if(this.distribution == 4){
          request.post("/admin/appraisal/query",{
            type : 4,
            keyword : this.search,
            page : this.currentPage,
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
      addCommodity(){//添加询价
        this.$router.push({path:'/addInquiry'})
      },
      uploadBtn(row){
        this.uploadId = row.id;
        this.dialogFormVisible1 = true;
      },
      loadBtn(row){//下载页面
        request.post("/admin/appraisal/info",{
            id : row.id
        }).then(res => {
            if (res.code == 200) {
              // this.loadUrl = ;
              window.open(res.data.url, '_blank')
            }
        });
      },
      imageBtn(row){//图片
        this.$router.push({path:'/imageWork',query:{id:row.id,outworker_relevance_id:row.outworker_relevance_id}})
      },
      examineBtn(row){//二审提交
        this.Id = row.id;
        this.dialogFormVisible3 = true;
      },
      exploration(row){//外勘
        window.open(row.donwload_print,'_blank')
      },
      Printing(row){//打印
        window.open(row.donwload_image,'_blank')
      },
      downLoad_image(row){//下载图片
        console.log(row)
        request.post("/admin/ProjectFiles/query",{
            id : row.id
        }).then(res => {
            if (res.code == 200) {
              this.imageList = res.data;
            }
        });
        this.dialogFormVisibleImage = true;
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