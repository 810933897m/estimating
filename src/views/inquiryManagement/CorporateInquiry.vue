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

      <!-- <el-table-column
      label="序列号"
      width="200px"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.serial_number" style="cursor: pointer;" @click="getInfo(scope.row)" class="nooverflow">{{scope.row.serial_number}}</p>
        </template>
      </el-table-column> -->

      <el-table-column
      label="流水号"
      width="200px"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.serial_number" style="cursor: pointer;" @click="getInfo(scope.row)" class="nooverflow">{{scope.row.serial_number}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="询值人员"
      width="120px"
      align="center">
        <template slot-scope="scope" >
          <p :title="scope.row.ask_price" style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{scope.row.ask_price}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="金融机构"
      width="120px"
      align="center">
        <template slot-scope="scope" >
          <p :title="scope.row.ask_bank" style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{scope.row.ask_bank}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="项目名称"
      width="300px"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.project_name" style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{scope.row.project_name}}</p>
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
      label="测算人员"
      width="120px"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.test_user" style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{scope.row.test_user}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="用途"
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
      label="土地面积"
      width="100px"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.land_area" style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{scope.row.land_area}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="估价总价(万)"
      width="120px"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.ask_price_total" style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{scope.row.ask_price_total}}</p>
        </template>
      </el-table-column>
  
      <el-table-column
      label="估价单价"
      width="120px"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.ask_univalence" style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{scope.row.ask_univalence}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="净值(万元)"
      width="120px"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.total_prices" style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{scope.row.total_prices}}</p>
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
      label="审核人员"
      width="120px"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.check_user" style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{scope.row.check_user}}</p>
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
      label="项目特殊情况"
      width="120px"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.remark" style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{scope.row.remark}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="操作"
      fixed="right"
      width="200px" align="center">
        <template slot-scope="scope">
            <p style="display:none;">{{scope.row}}</p>
            <!-- <el-button size="small" type="primary" @click="confirmDetail(scope.row)">查看</el-button> -->
            <el-button size="small" v-if="!scope.row.project_status" type="primary" @click="updateAgent(scope.row)" >修改</el-button>
            <!-- <el-button size="small" v-if="!scope.row.project_status" type="primary" @click="addProject(scope.row)" >转立项</el-button> -->
            <el-button size="small" v-if="scope.row.project_status" type="info" disabled>修改</el-button>
            <!-- <el-button size="small" v-if="scope.row.project_status" type="info" disabled>转立项</el-button> -->

          
          
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
    //  console.log(this.project_status)
    },
    methods: {
      getAgentList() {//初始渲染列表方法封装
        this.dialogFormVisible = false;
        request.post("/admin/askPricePublic/query").then(res => {
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
        request.post("/admin/askPricePublic/query",{
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
          this.$router.push({path:'/updataInquiry2',query:{id:row.id}})
        
        
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
          request.post("/admin/askPricePublic/query",{
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
        this.$router.push({path:'/addPublicInquiry'})
      },
      publicAddCommodity(){//添加对公询价
        this.$router.push({path:'/publicAddInquiry'})
      },
      getInfo(row, event, column){
        // console.log(row.id);
        // this.dialogFormVisible = true;
        window.open(row.project_info_url, '_blank')
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