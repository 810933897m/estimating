<template>

  <div class="app-container">
    <el-table 
      class="table-picture"
      :data="planList.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      border
      max-height="550"
      style="width: 100%;">

      <el-table-column
      label="合作伙伴id"
      width="120px"
      align="center">
        <template slot-scope="scope">
          {{scope.row.partner_id}}
        </template>
      </el-table-column>

      <el-table-column
      label="代理商名称"
      width="200px"
      align="center">
        <template slot-scope="scope">
          {{scope.row.agency_company}}
        </template>
      </el-table-column>

      <el-table-column
      label="挂账公司"
      width="200px"
      align="center">
        <template slot-scope="scope">
          {{scope.row.payment_company}}
        </template>
      </el-table-column>

      <el-table-column
      label="激励项目"
      width="200px"
      align="center">
        <template slot-scope="scope">
          {{scope.row.Incentive_program}}
        </template>
      </el-table-column>

      <el-table-column
      label="实际业绩"
      width="200px"
      align="center">
        <template slot-scope="scope">
          {{scope.row.actual_performance}}
        </template>
      </el-table-column>

      <el-table-column
      label="奖励返点金额"
      width="200px"
      align="center">
        <template slot-scope="scope">
          {{scope.row.rebates_money}}
        </template>
      </el-table-column>

      <el-table-column
      label="业绩时间"
      width="300px"
      align="center">
        <template slot-scope="scope">
          {{scope.row.performance_section}}
        </template>
      </el-table-column>

      <el-table-column
      label="修改"
      fixed="right"
      
      width="100px" align="center">
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="updateAgent(scope.row)" >修改</el-button>
          
          <!-- 修改弹出框 -->
          
          <el-dialog :append-to-body='true' title="修改用户" :visible.sync="dialogFormVisible">
            <!-- <div style="height:400px;overflow-x:auto;"> -->
            <el-form :model="form"  label-width="120px" style="z-index:99999;">
              <el-form-item label="合作伙伴id">
                <el-input auto-complete="off" v-model="form.partner_id"></el-input>
              </el-form-item>
              
              <el-form-item label="代理商名称">
                <el-input auto-complete="off" v-model="form.agency_company"></el-input>
              </el-form-item>

              <el-form-item label="挂账公司">
                <el-input auto-complete="off" v-model="form.payment_company"></el-input>
              </el-form-item>

              <el-form-item label="激励项目">
                <el-input auto-complete="off" v-model="form.Incentive_program"></el-input>
              </el-form-item>

              <el-form-item label="实际业绩">
                <el-input auto-complete="off" v-model="form.actual_performance"></el-input>
              </el-form-item>

              <el-form-item label="奖励返点金额">
                <el-input auto-complete="off" v-model="form.rebates_money"></el-input>
              </el-form-item>

              <el-form-item label="业绩时间">
                <el-input auto-complete="off" v-model="form.performance_section"></el-input>
              </el-form-item>

            </el-form>
            <!-- </div> -->
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="confirmRevision()">确定修改</el-button>
            </div>
            
          </el-dialog>
          <!-- **************修改弹出框结束************** -->
          <div v-show="dialogFormVisible" class="dialog-box"></div>
        </template>
      </el-table-column>

      <el-table-column
        label="删除"
        width="100px" align="center"
        fixed="right">
        <template slot-scope="scope">
            <el-button size="small" type="danger" @click="confirmDel(scope.row)">删除</el-button>
        </template>
      </el-table-column>
      
    </el-table>
    <!-- *************分页************* -->
    <el-pagination
    style="margin-top:20px;"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="currentPage"
    :page-sizes="[5, 10, 20, 40]" 
    :page-size="pagesize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="planList.length">
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
        planList : [],//列表绑定
        dialogFormVisible : false,//弹出框
        form: {//修改绑定
            id : '',
            partner_id:'',
            agency_company : '',
            payment_company:'',
            Incentive_program : '',
            actual_performance : "",
            rebates_money:'',
            performance_section:'',
        },
        disa : true,
        shopId : '',//id存储
        formLabelWidth : '120px',
        Id : '',

        //*************分页变量*************
        currentPage : 1, //初始页
        pagesize : 5,   //每页的数据
       //*************分页变量*************

      }
    },
    created() {
     this.getPlanList();//渲染列表
  },
    methods: {
      getPlanList() {//初始渲染列表方法封装
        this.dialogFormVisible = false;
        request.get("/api/user/stimulate/list").then(res => {
            if (res.code == 200) {
              this.planList = res.data;
            }
        });
    },updateAgent(row) {//修改按钮
       this.dialogFormVisible = true;//展示模态框
       //修改列表赋值
       
       this.form.partner_id = row.partner_id;
       this.form.agency_company = row.agency_company;
       this.form.payment_company = row.payment_company;
       this.form.Incentive_program = row.Incentive_program;
       this.form.actual_performance = row.actual_performance;
       this.form.rebates_money = row.rebates_money;
       this.form.performance_section = row.performance_section;
       this.Id = row.id;
      },
      confirmRevision(){//点击确定修改
          request.put("/api/user/stimulate/edit",{//发送数据到后台
                //后台需要的参数
                id : this.Id,
                partner_id : this.form.partner_id,
                agency_company : this.form.agency_company,
                payment_company : this.form.payment_company,
                Incentive_program : this.form.Incentive_program,
                actual_performance : this.form.actual_performance,
                rebates_money : this.form.rebates_money,
                performance_section : this.form.performance_section,
            }).then(res => {
                    if (res.code === 200) {
                    this.$message({
                        // type: res.errno === 0 ? "success" : "warning",
                        type: "success",
                        message: '修改成功！'//提示修改成功
                    });
                    this.dialogFormVisible = false;//隐藏模态框
                    this.getPlanList();//重新渲染数据
                }
            });
      },
      handleChange (value) {
        this.center = value[2];
      },
      confirmDel(row) {//点击删除按钮弹出提示框
         this.shopId = row.id;
            this.$confirm("您确定要删除？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消"
            }).then(() => {
              console.log(this.shopId)
                request.post('/api/user/stimulate/delete',{
                id : this.shopId,
                }).then(res => {
                    this.$message({
                      // type: res.errno === 0 ? "success" : "warning",
                      type: "success",
                      message: '删除成功！'//提示删除成功
                    });
                      this.getPlanList();
                })
                .catch(res => {
                    this.$message({
                    type: "warning",
                    message: "删除失败!"//删除失败
                    });
                });
            });
      },
      //分页
      handleSizeChange: function (size) {//选择条数
          this.pagesize = size;
      },
      handleCurrentChange: function(currentPage){//换页
          this.currentPage = currentPage;
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
// .dialog-box{
//   position: fixed;
//     top: 0;
//     left: 0;
//     right: 0;
//     bottom: 0;
//     background: rgba(0,0,0,0.5);
//     z-index: 999;
// }
</style>