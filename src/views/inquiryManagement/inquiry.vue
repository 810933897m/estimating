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
            <el-input v-model="search" style="width:300px;" placeholder="小区名称/小区地址/询值人/创建人"></el-input>
            <el-button type="primary" style="" plain @click="serachBtn">搜索</el-button>
            <el-button style="margin-left:0px;" plain @click="addCommodity">添加询价</el-button>
        </el-form-item>
    </el-form>

    <el-table 
      @cell-dblclick="getInfo"
      class="table-picture"
      :data="agentList"
      border
      max-height="500"
      style="width: 100%;">

      <el-table-column
      label="小区名称"
      width="120px"
      align="center">
        <template slot-scope="scope" >
          {{scope.row.plot_name}}
        </template>
      </el-table-column>

      <el-table-column
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
      </el-table-column>

      <el-table-column
      label="房屋用途"
      width="120px"
      align="center">
        <template slot-scope="scope">
          {{scope.row.house_way}}
        </template>
      </el-table-column>

      <el-table-column
      label="特殊因素"
      width="120px"
      align="center">
        <template slot-scope="scope">
          {{scope.row.special_element}}
        </template>
      </el-table-column>

      <el-table-column
      label="询价银行"
      width="120px"
      align="center">
        <template slot-scope="scope">
          {{scope.row.ask_bank}}
        </template>
      </el-table-column>

      <el-table-column
      label="所在楼层"
      width="120px"
      align="center">
        <template slot-scope="scope">
          {{scope.row.floor}}
        </template>
      </el-table-column>

      <el-table-column
      label="市场人员"
      width="120px"
      align="center">
        <template slot-scope="scope">
          {{scope.row.bazaar_crew}}
        </template>
      </el-table-column>

      <el-table-column
      label="建成年代"
      width="120px"
      align="center">
        <template slot-scope="scope">
          {{scope.row.activate_time}}
        </template>
      </el-table-column>

      <el-table-column
      label="小区地址"
      width="120px"
      align="center">
        <template slot-scope="scope">
          {{scope.row.plot_address}}
        </template>
      </el-table-column>

      <el-table-column
      label="询值价格"
      width="120px"
      align="center">
        <template slot-scope="scope">
          {{scope.row.ask_price_total}}
        </template>
      </el-table-column>

      <el-table-column
      label="建筑面积"
      width="120px"
      align="center">
        <template slot-scope="scope">
          {{scope.row.construct_area}}
        </template>
      </el-table-column>

      <el-table-column
      label="询价人"
      width="100px"
      align="center">
        <template slot-scope="scope">
          {{scope.row.ask_price}}
        </template>
      </el-table-column>

      <el-table-column
      label="询价时间"
      width="200px"
      align="center">
        <template slot-scope="scope">
          {{scope.row.create_time}}
        </template>
      </el-table-column>

      <el-table-column
      label="创建人"
      width="100px"
      align="center">
        <template slot-scope="scope">
          {{scope.row.create_username}}
        </template>
      </el-table-column>

      <el-table-column
      label="备注"
      width="100px"
      align="center">
        <template slot-scope="scope">
          {{scope.row.remark}}
        </template>
      </el-table-column>

      <el-table-column
      label="已立项"
      width="100px"
      align="center">
        <template slot-scope="scope">
          {{scope.row.show_project_status}}
        </template>
      </el-table-column>

      <el-table-column
      label="已审核"
      width="100px"
      align="center">
        <template slot-scope="scope">
          {{scope.row.show_price_status}} <!-- 0 未审核 1待审核 -->
        </template>
      </el-table-column>

      <el-table-column
      label="楼栋号和单元号"
      width="180px"
      align="center">
        <template slot-scope="scope">
          {{scope.row.unit_number}}
        </template>
      </el-table-column>

      <el-table-column
      label="净值系数"
      width="120px"
      align="center">
        <template slot-scope="scope">
          {{scope.row.factor}}
        </template>
      </el-table-column>

      <el-table-column
      label="小区特殊情况"
      width="150px"
      align="center">
        <template slot-scope="scope">
          {{scope.row.plot_special}}
        </template>
      </el-table-column>

      <el-table-column
      label="操作"
      fixed="right"
      
      width="250px" align="center">
        <template slot-scope="scope">
          <el-button v-if="!scope.row.project_status" size="small" type="primary" @click="updateAgent(scope.row)" >修改</el-button>
          
          <!-- <div v-show="dialogFormVisible" class="dialog-box"></div> -->

          <el-button size="small" type="info" @click="confirmDetail(scope.row)">查看</el-button>
          <el-button v-if="!scope.row.project_status" size="small" type="primary" @click="addProject(scope.row)" >转立项</el-button>
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
    },
    methods: {
      getAgentList() {//初始渲染列表方法封装
        this.dialogFormVisible = false;
        request.post("/admin/askPrice/query").then(res => {
            console.log(res)
            if (res.code == 200) {
              this.agentList = res.data.list;
              this.count = res.data.page.count;
              this.max = res.data.page.max;
              this.page = res.data.page.page;
              this.size = res.data.page.size;
            }
            
        });
    },serachBtn(){ // 搜索功能
        request.post("/admin/askPrice/query",{
          keyword : this.search,
          // page : this.currentPage,
        }).then(res => {
            console.log(res)
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
        this.$router.push({path:'/updataInquiry',query:{id:row.id}})
      },
      handleChange (value) {
        this.center = value[2];
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
          request.post("/admin/askPrice/query",{
          page : currentPage,
          keyword : this.search,
        }).then(res => {
            console.log(res)
            if (res.code == 200) {
              this.agentList = res.data.list;
            }
        });
      },
      addCommodity(){//添加询价
        this.$router.push({path:'/addInquiry'})
      },
      getInfo(row, event, column){
        console.log(row.id);
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