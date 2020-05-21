<template>

  <div class="app-container">
    <el-table 
      class="table-picture"
      :data="levelList.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      border
      max-height="550"
      style="width: 100%;">

      <el-table-column
      label="合作伙伴id"
      min-width="120px"
      align="center">
        <template slot-scope="scope">
          {{scope.row.partner_id}}
        </template>
      </el-table-column>

      <el-table-column
      label="代理商英文名"
      width="300px"
      align="center">
        <template slot-scope="scope">
          {{scope.row.agent_english}}
        </template>
      </el-table-column>

      <el-table-column
      label="代理商中文名"
      width="300px"
      align="center">
        <template slot-scope="scope">
          {{scope.row.agent_chinese}}
        </template>
      </el-table-column>

      <el-table-column
      label="代理商等级"
      min-width="120px"
      align="center">
        <template slot-scope="scope">
          {{scope.row.agent_grade}}
        </template>
      </el-table-column>

      <el-table-column
      label="销售认证达标"
      min-width="120px"
      align="center">
        <template slot-scope="scope">
          {{scope.row.sales_target}}
        </template>
      </el-table-column>

      <el-table-column
      label="销售认证数量"
      min-width="120px"
      align="center">
        <template slot-scope="scope">
          {{scope.row.sales_amount}}
        </template>
      </el-table-column>

      <el-table-column
      label="技术认证达标"
      min-width="120px"
      align="center">
        <template slot-scope="scope">
          {{scope.row.technology_certification}}
        </template>
      </el-table-column>

      <el-table-column
      label="acma"
      align="center">
        <template slot-scope="scope">
          {{scope.row.acma}}
        </template>
      </el-table-column>

      <el-table-column
      label="acmp"
      align="center">
        <template slot-scope="scope">
          {{scope.row.acmp}}
        </template>
      </el-table-column>

      <el-table-column
      label="acmx"
      align="center">
        <template slot-scope="scope">
          {{scope.row.acmx}}
        </template>
      </el-table-column>

      <el-table-column
      label="acsa"
      align="center">
        <template slot-scope="scope">
          {{scope.row.acsa}}
        </template>
      </el-table-column>

      <el-table-column
      label="acsp"
      align="center">
        <template slot-scope="scope">
          {{scope.row.acsp}}
        </template>
      </el-table-column>

      <el-table-column
      label="acdp"
      align="center">
        <template slot-scope="scope">
          {{scope.row.acdp}}
        </template>
      </el-table-column>

      <el-table-column
      label="cpss"
      align="center">
        <template slot-scope="scope">
          {{scope.row.cpss}}
        </template>
      </el-table-column>

      <el-table-column
      label="accp"
      align="center">
        <template slot-scope="scope">
          {{scope.row.accp}}
        </template>
      </el-table-column>

      <el-table-column
      label="accx"
      align="center">
        <template slot-scope="scope">
          {{scope.row.accx}}
        </template>
      </el-table-column>

      <el-table-column
      label="业绩时间"
      min-width="230px"
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
              
              <el-form-item label="代理商英文名">
                <el-input auto-complete="off" v-model="form.agent_english"></el-input>
              </el-form-item>

              <el-form-item label="代理商中文名">
                <el-input auto-complete="off" v-model="form.agent_chinese"></el-input>
              </el-form-item>

              <el-form-item label="代理商等级">
                <el-input auto-complete="off" v-model="form.agent_grade"></el-input>
              </el-form-item>

              <el-form-item label="销售认证达标">
                <el-input auto-complete="off" v-model="form.sales_target"></el-input>
              </el-form-item>

              <el-form-item label="销售认证数量">
                <el-input auto-complete="off" v-model="form.sales_amount"></el-input>
              </el-form-item>

              <el-form-item label="技术认证达标">
                <el-input auto-complete="off" v-model="form.technology_certification"></el-input>
              </el-form-item>

              <el-form-item label="acma">
                <el-input auto-complete="off" v-model="form.acma"></el-input>
              </el-form-item>

              <el-form-item label="acmp">
                <el-input auto-complete="off" v-model="form.acmp"></el-input>
              </el-form-item>

              <el-form-item label="acmx">
                <el-input auto-complete="off" v-model="form.acmx"></el-input>
              </el-form-item>

              <el-form-item label="acsa">
                <el-input auto-complete="off" v-model="form.acsa"></el-input>
              </el-form-item>

              <el-form-item label="acsp">
                <el-input auto-complete="off" v-model="form.acsp"></el-input>
              </el-form-item>

              <el-form-item label="acdp">
                <el-input auto-complete="off" v-model="form.acdp"></el-input>
              </el-form-item>

              <el-form-item label="cpss">
                <el-input auto-complete="off" v-model="form.cpss"></el-input>
              </el-form-item>

              <el-form-item label="accp">
                <el-input auto-complete="off" v-model="form.accp"></el-input>
              </el-form-item>

              <el-form-item label="accx">
                <el-input auto-complete="off" v-model="form.accx"></el-input>
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
    :total="levelList.length">
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
        levelList : [],//列表绑定
        dialogFormVisible : false,//弹出框
        form: {//修改绑定
            id : '',
            partner_id:'',
            agent_english : '',
            agent_chinese:'',
            agent_grade : '',
            sales_target : "",
            sales_amount:'',
            technology_certification:'',
            acma:'',
            acmp : '',
            acmx : "",
            acsa:'',
            acsp:'',
            acdp:'',
            cpss : '',
            accp : "",
            accx:'',
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
     this.getLevelList();//渲染列表
    },
    methods: {
      getLevelList() {//初始渲染列表方法封装
          this.dialogFormVisible = false;
          request.get("/api/user/attestation/list").then(res => {
              if (res.code == 200) {
                this.levelList = res.data;
              }
          });
      },
      updateAgent(row) {//修改按钮
        this.dialogFormVisible = true;//展示模态框
        //修改列表赋值
        this.form.partner_id = row.partner_id;
        this.form.agent_english = row.agent_english;
        this.form.agent_chinese = row.agent_chinese;
        this.form.agent_grade = row.agent_grade;
        this.form.sales_target = row.sales_target;
        this.form.sales_amount = row.sales_amount;
        this.form.technology_certification = row.technology_certification;
        this.form.acma = row.acma;
        this.form.acmp = row.acmp;
        this.form.acmx = row.acmx;
        this.form.acsa = row.acsa;
        this.form.acsp = row.acsp;
        this.form.acdp = row.acdp;
        this.form.cpss = row.cpss;
        this.form.accp = row.accp;
        this.form.accx = row.accx;
        this.form.performance_section = row.performance_section;
        this.Id = row.id;
      },
      confirmRevision(){//点击确定修改
          request.put("/api/user/attestation/edit",{//发送数据到后台
                //后台需要的参数
                id : this.Id,
                partner_id : this.form.partner_id,
                agent_english : this.form.agent_english,
                agent_chinese : this.form.agent_chinese,
                agent_grade : this.form.agent_grade,
                sales_target : this.form.sales_target,
                sales_amount : this.form.sales_amount,
                technology_certification : this.form.technology_certification,
                acma : this.form.acma,
                acmp : this.form.acmp,
                acmx : this.form.acmx,
                acsa : this.form.acsa,
                acsp : this.form.acsp,
                acdp : this.form.acdp,
                cpss : this.form.cpss,
                accp : this.form.accp,
                accx : this.form.accx,
                performance_section : this.form.performance_section,
            }).then(res => {
                if (res.code === 200) {
                    this.$message({
                        // type: res.errno === 0 ? "success" : "warning",
                        type: "success",
                        message: '修改成功！'//提示修改成功
                    });
                    this.dialogFormVisible = false;//隐藏模态框
                    this.getLevelList();//重新渲染数据
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
              // console.log(this.shopId)
              request.post('/api/user/attestation/delete',{
                id : this.shopId,
              }).then(res => {
                  this.$message({
                  // type: res.errno === 0 ? "success" : "warning",
                  type: "success",
                  message: '删除成功！'//提示删除成功
              });
                  this.getLevelList();
              }).catch(res => {
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
</style>