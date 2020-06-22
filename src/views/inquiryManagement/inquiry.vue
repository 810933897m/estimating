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
            <!-- <el-button type="primary" style="margin-left:0px;" plain @click="publicAddCommodity">添加对公询价</el-button> -->
            
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
          <!-- <el-radio @change="radioChange(scope.row)" v-model="radioBtn" :label="scope.row.id">{{allNull}}</el-radio> -->
        </template>
      </el-table-column>

      <el-table-column
      label="流水号"
      width="200px"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.serial_number" style="cursor: pointer;" @click="getInfo(scope.row)" class="nooverflow">{{scope.row.serial_number}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="小区名称"
      width="120px"
      align="center">
        <template slot-scope="scope" >
          <p :title="scope.row.plot_name" style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{scope.row.plot_name}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="询价地址"
      width="300px"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.show_merge_addr" style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{scope.row.show_merge_addr}}</p>
        </template>
      </el-table-column>

      <!-- <el-table-column
      label="城市"
      width="100px"
      align="center">
        <template slot-scope="scope">
          {{scope.row.city}}
        </template>
      </el-table-column>

      <el-table-column
      label="行政区"
      width="100px"
      align="center">
        <template slot-scope="scope">
          {{scope.row.district}}
        </template>
      </el-table-column>

      <el-table-column
      label="总楼层"
      width="100px"
      align="center">
        <template slot-scope="scope">
          {{scope.row.total_floor}}
        </template>
      </el-table-column> -->

      <el-table-column
      label="房屋用途"
      width="120px"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.house_way" style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{scope.row.house_way}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="建筑面积"
      width="120px"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.construct_area" style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{scope.row.construct_area}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="询值单价"
      width="120px"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.ask_univalence" style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{scope.row.ask_univalence}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="备注"
      width="100px"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.remark" style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{scope.row.remark}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="市场人员"
      width="120px"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.bazaar_crew" style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{scope.row.bazaar_crew}}</p>
        </template>
      </el-table-column>
  
      <el-table-column
      label="询价银行"
      width="120px"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.ask_bank" style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{scope.row.ask_bank}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="市场人员"
      width="120px"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.ask_bank" style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{scope.row.bazaar_crew}}</p>
        </template>
      </el-table-column>

      <!-- <el-table-column
      label="所在楼层"
      width="120px"
      align="center">
        <template slot-scope="scope">
          {{scope.row.floor}}
        </template>
      </el-table-column> -->

      

      <el-table-column
      label="建成年代"
      width="120px"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.activate_time" style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{scope.row.activate_time}}</p>
        </template>
      </el-table-column>

      <!-- <el-table-column
      label="小区地址"
      width="120px"
      align="center">
        <template slot-scope="scope">
          {{scope.row.plot_address}}
        </template>
      </el-table-column> -->

      <el-table-column
      label="询值价格"
      width="120px"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.ask_price_total" style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{scope.row.ask_price_total}}</p>
        </template>
      </el-table-column>

      

      <el-table-column
      label="询价人"
      width="100px"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.ask_price" style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{scope.row.ask_price}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="询价时间"
      width="200px"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.create_time" style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{scope.row.create_time}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="创建人"
      width="100px"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.create_username" style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{scope.row.create_username}}</p>
        </template>
      </el-table-column>

      

      <el-table-column
      label="已立项"
      width="100px"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.show_project_status" style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{scope.row.show_project_status}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="已审核"
      width="100px"
      align="center">
        <template slot-scope="scope">
           <!-- 0 未审核 1待审核 -->
          <p :title="scope.row.show_price_status" style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{scope.row.show_price_status}}</p>
        </template>
      </el-table-column>

      <!-- <el-table-column
      label="楼栋号和单元号"
      width="180px"
      align="center">
        <template slot-scope="scope">
          {{scope.row.unit_number}}
        </template>
      </el-table-column> -->

      <el-table-column
      label="净值系数"
      width="120px"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.factor" style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{scope.row.factor}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="小区特殊情况"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.plot_special" style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{scope.row.plot_special}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="操作"
      fixed="right"
      width="270px" align="center">
        <template slot-scope="scope">
            <p style="display:none;">{{scope.row}}</p>
            <!-- <el-button size="small" type="primary" @click="confirmDetail(scope.row)">查看</el-button> -->
            <el-button size="small" v-if="!scope.row.project_status" type="primary" @click="examine(scope.row)" >审核</el-button>
            <el-button size="small" v-if="!scope.row.project_status" type="primary" @click="updateAgent(scope.row)" >修改</el-button>
            <el-button size="small" v-if="!scope.row.project_status" type="primary" @click="addProject(scope.row)" >转立项</el-button>
            <el-button size="small" v-if="scope.row.project_status" type="info" disabled>审核</el-button>
            <el-button size="small" v-if="scope.row.project_status" type="info" disabled>修改</el-button>
            <el-button size="small" v-if="scope.row.project_status" type="info" disabled>转立项</el-button>

          
          
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

    <!-- 分配任务弹出框 -->
          <!-- <el-dialog style="" :append-to-body='true' title="审核" :visible.sync="dialogFormVisible1">

            <el-form ref="form" label-width="120px" style="width:100%;">
              <div style="width:100%;position:relative;height:50px;">
                  <el-form-item label="提示" class="form-input" prop="title" style="width:250px;float:left;">
                    <el-input  placeholder="请输入" v-model="admin_desc"></el-input>
                </el-form-item>
              <el-button size="small" type="primary" style="float:left;margin-left:20px;margin-top:5px;" @click="outworkidBtn()">确定</el-button>
              </div>

            </el-form>
            
          </el-dialog> -->
          <!-- **************分配任务弹出框************** -->

          <!--*************修改模态框*************-->
        <el-dialog
        title="审核"
        :visible.sync="dialogFormVisible1"
        width="50%">
        <!-- :before-close="handleClose" -->
            <el-form label-width="120px">

                  <el-form-item label="审核人" class="select" style="width:500px;">
                    <el-select v-model="username" filterable style="">
                          <el-option
                          v-for="item in username1"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                          </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="新价格" class="form-input" prop="title" style="">
                    <el-input  placeholder="请输入" v-model="ask_univalence"></el-input>
                </el-form-item>

                <el-form-item label="备注" class="form-input" prop="title" style="">
                    <el-input  placeholder="请输入" v-model="admin_desc"></el-input>
                </el-form-item>

            </el-form>
        
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="outworkidBtn(),dialogFormVisible1 = false">保 存</el-button>
                <el-button @click="dialogFormVisible1 = false">取 消</el-button>
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
        allNull : '',
        ROW:{},
        project_status : 1,
        radioBtn : '',
        timestamp : [
          {
            time:'1937-5-25',
            p:[
              {
                p:'2212222222'
              },{
                p:'2224222222'
              }
            ]
          },{
            time:'1999-5-25',
            p:[
              {
                p:'222622222'
              },{
                p:'222228222'
              }
            ]
          },{
            time:'2005-2-25',
            p:[
              {
                p:'229222222'
              },{
                p:'222202222'
              }
            ]
          },{
            time:'2020-5-18',
            p:[
              {
                p:'22222222'
              },{
                p:'22222222'
              },{
                p:'22222222'
              },{
                p:'22222222'
              },{
                p:'22222222'
              },{
                p:'22222222'
              }
            ]
          }
        ],
        search : '',
        options:map.options,
        agentList : [{
            
        },],//列表绑定
        dialogFormVisible : false,//弹出框
        dialogFormVisible1 : false,//弹出框
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
       username : '',
       username1 : [],
       admin_desc : '',
       ask_univalence : '',
       examineId : '',
      }
    },
    created() {
     this.getAgentList();//渲染列表
    //  console.log(this.project_status)
    },
    methods: {
      getAgentList() {//初始渲染列表方法封装
        this.dialogFormVisible = false;
        request.post("/admin/askPrice/query").then(res => {
            // console.log(res)
            if (res.code == 200) {
              this.agentList = res.data.list;
              this.count = res.data.page.count;
              this.max = res.data.page.max;
              this.page = res.data.page.page;
              this.size = res.data.page.size;
            }
        });

        request.post("/admin/values/query",{
                    type : 'price_check_user',
                    name : '',
                }).then(res => {
                    if (res.code == 200) {
                        this.username1 = res.data;
                    }
                });

    },serachBtn(){ // 搜索功能
        request.post("/admin/askPrice/query",{
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
      radioChange(row){
        // console.log(row)
        this.ROW = row;
        this.project_status = row.project_status;
      },
      updateAgent(row) {//修改按钮
      // v-if="!scope.row.project_status"
      // console.log(row)
          this.$router.push({path:'/updataInquiry1',query:{id:row.id}})
        
        
      },
      handleChange (value) {
        this.center = value[2];
      },
      confirmDetail(row) {//点击查看询价详情
      // console.log(row)
        //  this.shopId = row.id;
          this.$router.push({path:'/detailInquiry',query:{id:row.id}})
      },
      addProject(row){//转立项
          this.$router.push({path:'/addProjectInitiation',query:{row:row,id:row.id}})
        
      },
      //分页
      handleCurrentChange: function(currentPage){//换页
      // console.log(currentPage)  
          this.currentPage = currentPage;
          request.post("/admin/askPrice/query",{
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
        this.$router.push({path:'/addInquiry'})
      },
      publicAddCommodity(){//添加对公询价
        this.$router.push({path:'/publicAddInquiry'})
      },
      getInfo(row, event, column){
        // console.log(row.id);
        // this.dialogFormVisible = true;
        window.open(row.project_info_url, '_blank')
      },
      examine(row){
        this.dialogFormVisible1 = true;
        this.examineId = row.id;
      },
      outworkidBtn(){
        console.log(this.admin_desc+','+this.examineId)
        
        
         request.post("admin/askPrice/check",{
           id : this.examineId,
           username : this.username,
           ask_univalence : this.ask_univalence,
           admin_desc : this.admin_desc,
        }).then(res => {
            // console.log(res)
            if (res.code == 200) {
              this.$message({
                  // type: res.errno === 0 ? "success" : "warning",
                  type: "success",
                  message: '添加成功'//提示添加成功
              })
              this.dialogFormVisible1 = false;
              this.ask_univalence = '';
              this.admin_desc = '';
              this.username ='';
              // this.agentList = res.data.list;
              this.getAgentList();
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