<template>

  <div class="app-container">
    <!-- <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
    <el-tab-pane label="发票对私" name="first"></el-tab-pane>
    <el-tab-pane label="发票对公" name="success"></el-tab-pane> -->

    <!-- <el-form ref="form" >
        <el-form-item style="width:300px;float:left;">
            <el-input v-model="search" style="width:300px;float:left;" placeholder="请输入查询数据"></el-input>
        </el-form-item>
        <el-button type="primary" style="" plain @click="serachBtn">查询</el-button>
    </el-form> -->

    <el-form ref="form" >
        <el-form-item>
            <el-radio v-model="activeName" label="first" @change="handleClick()">申请发票</el-radio>
            <el-radio v-model="activeName" label="two" @change="handleClick()">待审核</el-radio>
            <el-radio v-model="activeName" label="success" @change="handleClick()">开票成功</el-radio>
            <el-radio v-model="activeName" label="no" @change="handleClick()">开票失败</el-radio>
            <el-radio v-model="activeName" label="refund" @change="handleClick()">发票回收</el-radio>
            <el-input v-model="search" style="width:200px;" placeholder="请输入查询数据"></el-input>
            <el-button type="primary" style="" plain @click="serachBtn">查询</el-button>
            <el-button type="primary" style="" v-if="activeName == 'first'" plain @click="BillingBtn()">添加发票</el-button>
        </el-form-item>
    </el-form>

    <el-table 
      class="table-picture"
      :data="agentList"
      border
       max-height="550"
      style="width: 100%;">

      <el-table-column
          v-if="activeName == 'first'"
          width="40px"
          key="1"
          align="left">
            <template slot-scope="scope" >
              <el-checkbox v-model="scope.row.checked"></el-checkbox>
            </template>
      </el-table-column>

      <el-table-column
       label="id"
      width="50px"
      key="2"
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
          {{scope.row.approval_status}}
        </template>
      </el-table-column> -->
      <el-table-column
      label="应收金额"
      width="150px"
      v-if="activeName == 'first'"
      key="61"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.money_due" class="nooverflow">{{scope.row.money_due}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="已收金额"
      width="150px"
      v-if="activeName == 'first'"
      key="6"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.actual_charge" class="nooverflow">{{scope.row.actual_charge}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="流水号"
      width="120px"
      key="5"
      v-if="activeName == 'first'"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.serial_number" style="cursor: pointer;" @click="getInfo(scope.row)" class="nooverflow">{{scope.row.serial_number}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="报告编号"
      width="150px"
      v-if="activeName == 'first'"
      key="611"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.report_number" class="nooverflow">{{scope.row.report_number}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="项目地址"
      width="130px"
      v-if="activeName == 'first'"
      key="10"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.plot_address" class="nooverflow">{{scope.row.plot_address}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="小区名称"
      width="100px"
      v-if="activeName == 'first'"
      key="11"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.plot_name" class="nooverflow">{{scope.row.plot_name}}</p>
        </template>
      </el-table-column>

      <el-table-column
      label="受理时间"
      v-if="activeName == 'first'"
      key="12"
      align="center">
        <template slot-scope="scope">
          <p :title="scope.row.create_time" class="nooverflow">{{scope.row.create_time}}</p>
        </template>
      </el-table-column>

      <el-table-column
          label="开票类型"
          v-if="activeName != 'first'"
          key="15"
          align="center">
            <template slot-scope="scope" >
              <p :title="scope.row.invoice_type" class="nooverflow">{{scope.row.invoice_type}}</p>
            </template>
          </el-table-column>

          <el-table-column
          label="开票金额"
          v-if="activeName != 'first'"
          key="151"
          align="center">
            <template slot-scope="scope" >
              <p :title="scope.row.invoice_money_total" class="nooverflow">{{scope.row.invoice_money_total}}</p>
            </template>
          </el-table-column>
          
          <el-table-column
          v-if="activeName != 'first'"
          key="16"
          label="名称"
          align="center">
            <template slot-scope="scope" >
              <p :title="scope.row.invoice_company" class="nooverflow">{{scope.row.invoice_company}}</p>
            </template>
          </el-table-column>

          <el-table-column
          label="纳税人识别码"
          v-if="activeName != 'first'"
          key="17"
          width="160px"
          align="center">
            <template slot-scope="scope" >
              <p :title="scope.row.taxpayer_identification" class="nooverflow">{{scope.row.taxpayer_identification}}</p>
            </template>
          </el-table-column>

          <el-table-column
          label="电话"
          v-if="activeName != 'first'"
          key="18"
          align="center">
            <template slot-scope="scope" >
              <p :title="scope.row.invoice_telephone" class="nooverflow">{{scope.row.invoice_telephone}}</p>
            </template>
          </el-table-column>

          <el-table-column
          label="地址"
          v-if="activeName != 'first'"
          key="19"
          align="center">
            <template slot-scope="scope" >
              <p :title="scope.row.invoice_address" class="nooverflow">{{scope.row.invoice_address}}</p>
            </template>
          </el-table-column>

          <!-- <el-table-column
          label="开票人姓名"
          align="center">
            <template slot-scope="scope" >
              {{scope.row.invoice_username}}
            </template>
          </el-table-column> -->

          <el-table-column
          label="开户行"
          v-if="activeName != 'first'"
          key="20"
          align="center">
            <template slot-scope="scope" >
              <p :title="scope.row.invoice_bank" class="nooverflow">{{scope.row.invoice_bank}}</p>
            </template>
          </el-table-column>

          <el-table-column
          v-if="activeName != 'first'"
          key="21"
          label="开户账户"
          align="center">
            <template slot-scope="scope" >
              <p :title="scope.row.invoice_bank_card" class="nooverflow">{{scope.row.invoice_bank_card}}</p>
            </template>
          </el-table-column>
     
      <el-table-column
      label="操作"
      fixed="right"
      v-if="activeName != 'success' && activeName != 'refund'"
      width="100px" align="center">
        <template slot-scope="scope">
          <!-- <el-button size="small" type="primary" v-if="activeName == 'first'" @click="Report(scope.row)" >发送报告</el-button> -->
          <!-- <el-button size="small" type="primary" @click="Report(scope.row)" >新增记录</el-button> -->
          <el-button size="small" type="primary" @click="recordDetail(scope.row)">记录查询</el-button>
          </template>
      </el-table-column>

      <el-table-column
      label="操作"
      fixed="right"
      v-else-if="activeName == 'success'"
      width="200px" align="center">
        <template slot-scope="scope">
          <!-- <el-button size="small" type="primary" v-if="activeName == 'first'" @click="Report(scope.row)" >发送报告</el-button> -->
          <!-- <el-button size="small" type="primary" @click="Report(scope.row)" >新增记录</el-button> -->
          <el-button size="small" type="primary" @click="recovery(scope.row)">发票回收</el-button>
          <el-button size="small" type="primary" @click="recordDetail(scope.row)">记录查询</el-button>
          </template>
      </el-table-column>
      
    </el-table>
    <!-- *************分页************* -->
    <el-pagination
    style="margin-top:20px;"
    @current-change="handleCurrentChange"
    @size-change="handleSizeChange"
    :page-sizes="[20,50,100,150]"  
    :page-size="page"
    layout="total, sizes, prev, pager, next, jumper"
    :total="count">
    </el-pagination>
    <!-- *************分页************* -->
    
  <!-- </el-tabs> -->


        <!--*************收款记录模态框*************-->
        <el-dialog
        title="项目列表"
        :visible.sync="dialogVisibleRecordDetail"
        width="50%">

          <el-table 
            class="table-picture"
            :data="recordDetailList"
            border
            max-height="300"
            style="width: 100%;">

            <el-table-column
            label="流水号"
            align="center">
              <template slot-scope="scope" >
                <p :title="scope.row.serial_number" class="nooverflow">{{scope.row.serial_number}}</p>
              </template>
            </el-table-column>
            
            <el-table-column
            label="报告号"
            align="center">
              <template slot-scope="scope" >
                <p :title="scope.row.report_number" class="nooverflow">{{scope.row.report_number}}</p>
              </template>
            </el-table-column>

            <el-table-column
            label="项目地址"
            align="center">
              <template slot-scope="scope" >
                <p :title="scope.row.project_address" class="nooverflow">{{scope.row.project_address}}</p>
              </template>
            </el-table-column>

            <!-- <el-table-column
            label="发票号码"
            align="center">
              <template slot-scope="scope" >
                <p :title="scope.row.invoice_number" class="nooverflow">{{scope.row.invoice_number}}</p>
              </template>
            </el-table-column> -->

            <el-table-column
            label="开票类型"
            align="center">
              <template slot-scope="scope" >
                <p :title="scope.row.invoice_type" class="nooverflow">{{scope.row.invoice_type}}</p>
              </template>
            </el-table-column>

            <!-- <el-table-column
            label="开票人姓名"
            align="center">
              <template slot-scope="scope" >
                {{scope.row.invoice_username}}
              </template>
            </el-table-column> -->

            <el-table-column
            label="名称"
            align="center">
              <template slot-scope="scope" >
                <p :title="scope.row.invoice_company" class="nooverflow">{{scope.row.invoice_company}}</p>
              </template>
            </el-table-column>

            <el-table-column
            label="发票金额"
            align="center">
              <template slot-scope="scope" >
                <p :title="scope.row.invoice_money" class="nooverflow">{{scope.row.invoice_money}}</p>
              </template>
            </el-table-column>

            <el-table-column
            label="开票备注"
            align="center">
              <template slot-scope="scope" >
                <p :title="scope.row.invoice_note" class="nooverflow">{{scope.row.invoice_note}}</p>
              </template>
            </el-table-column>

            <el-table-column
            label="开票创建人"
            align="center">
              <template slot-scope="scope" >
                <p :title="scope.row.create_username" class="nooverflow">{{scope.row.create_username}}</p>
              </template>
            </el-table-column>

            </el-table>

            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisibleRecordDetail = false">取 消</el-button>
            </span>
        </el-dialog>
      <!--*************收款记录模态框*************-->

      <!--*************收款记录模态框*************-->
        <el-dialog
        title="开票记录"
        :visible.sync="dialogVisibleRecordDetail1"
        width="50%">

            <el-table 
          class="table-picture"
          :data="recordDetailList"
          border
          max-height="300"
          style="width: 100%;">

          <el-table-column
          label="发票号码"
          align="center">
            <template slot-scope="scope" >
              <p :title="scope.row.invoice_number" class="nooverflow">{{scope.row.invoice_number}}</p>
            </template>
          </el-table-column>
          
          <el-table-column
          label="开票类型"
          align="center">
            <template slot-scope="scope" >
              <p :title="scope.row.invoice_type" class="nooverflow">{{scope.row.invoice_type}}</p>
            </template>
          </el-table-column>

          <el-table-column
          label="名称"
          align="center">
            <template slot-scope="scope" >
              <p :title="scope.row.invoice_company" class="nooverflow">{{scope.row.invoice_company}}</p>
            </template>
          </el-table-column>

          <el-table-column
          label="纳税人识别码"
          width="160px"
          align="center">
            <template slot-scope="scope" >
              <p :title="scope.row.taxpayer_identification" class="nooverflow">{{scope.row.taxpayer_identification}}</p>
            </template>
          </el-table-column>

          <el-table-column
          label="发票金额"
          align="center">
            <template slot-scope="scope" >
              <p :title="scope.row.invoice_money" class="nooverflow">{{scope.row.invoice_money}}</p>
            </template>
          </el-table-column>

          <!-- <el-table-column
          label="开票人姓名"
          align="center">
            <template slot-scope="scope" >
              {{scope.row.invoice_username}}
            </template>
          </el-table-column> -->

          <el-table-column
          label="开票备注"
          align="center">
            <template slot-scope="scope" >
              <p :title="scope.row.invoice_note" class="nooverflow">{{scope.row.invoice_note}}</p>
            </template>
          </el-table-column>

          <el-table-column
          label="开票审核状态"
          width="160px"
          align="center">
            <template slot-scope="scope" >
              <p :title="scope.row.invoice_examiner_status" class="nooverflow">{{scope.row.invoice_examiner_status}}</p>
            </template>
          </el-table-column>

          <el-table-column
          label="退票状态"
          align="center">
            <template slot-scope="scope" >
              <p :title="scope.row.chargeback_status" class="nooverflow">{{scope.row.chargeback_status}}</p>
            </template>
          </el-table-column>

          <el-table-column
          label="开票操作人"
          width="160px"
          align="center">
            <template slot-scope="scope" >
              <p :title="scope.row.create_username" class="nooverflow">{{scope.row.create_username}}</p>
            </template>
          </el-table-column>
 
          </el-table>

            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisibleRecordDetail1 = false">取 消</el-button>
            </span>
        </el-dialog>
      <!--*************收款记录模态框*************-->
    
          <!-- 分配任务弹出框 -->
          <el-dialog style="" :append-to-body='true' title="新增记录" :visible.sync="dialogFormVisible">
            
            <el-form ref="form" label-width="120px" style="width:100%;">
              <!-- <div style="width:100%;position:relative;height:50px;"> -->

              <el-form-item label="开票类型" class="form-input" prop="title" style="width:500px;">
                <el-radio v-model="form.invoice_type" label="普票">普票</el-radio>
                <el-radio v-model="form.invoice_type" label="专票">专票</el-radio>
              </el-form-item>

              <el-form-item label="名称" class="form-input" prop="title" style="width:500px;">
                <el-input  placeholder="请输入" v-model="form.invoice_company"></el-input>
              </el-form-item>

              <el-form-item label="识别码" class="form-input" prop="title" style="width:500px;">
                <el-input  placeholder="请输入" v-model="form.taxpayer_identification"></el-input>
              </el-form-item>

              <el-form-item label="电话" class="form-input" prop="title" style="width:500px;">
                <el-input  placeholder="请输入" v-model="form.invoice_telephone"></el-input>
              </el-form-item>

              <el-form-item label="地址" class="form-input" prop="title" style="width:500px;">
                <el-input  placeholder="请输入" v-model="form.invoice_address"></el-input>
              </el-form-item>

              <!-- <el-form-item label="开票人姓名" class="form-input" prop="title" style="width:500px;">
                <el-input  placeholder="请输入" v-model="form.invoice_username"></el-input>
              </el-form-item> -->

              <el-form-item label="开户行" class="form-input" prop="title" style="width:500px;">
                <el-input  placeholder="请输入" v-model="form.invoice_bank"></el-input>
              </el-form-item>

              <el-form-item label="开户账户" class="form-input" prop="title" style="width:500px;">
                <el-input  placeholder="请输入" v-model="form.invoice_bank_card"></el-input>
              </el-form-item>

              <el-form-item label="开票备注" class="form-input" prop="title" style="width:500px;">
                <el-input  placeholder="请输入" v-model="form.invoice_note"></el-input>
              </el-form-item>

              <!-- <el-form-item label="开票审核人id" class="select" style="width:500px;">
                <el-select v-model="form.Invoice_examiner_id" filterable style="">
                      <el-option
                      v-for="item in invoice_examiner"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                      </el-option>
                </el-select>
              </el-form-item> -->
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="outworkidBtn1(),dialogFormVisible = false">保 存</el-button>
                <el-button @click="dialogFormVisible = false">取 消</el-button>
            </span>
          </el-dialog>
          <!-- **************分配任务弹出框************** -->

          <!-- 分配任务弹出框 -->
          <el-dialog style="" :append-to-body='true' title="回收" :visible.sync="dialogFormVisibleRefund">
            
            <el-form ref="form" label-width="120px" style="width:100%;">
              <!-- <div style="width:100%;position:relative;height:50px;"> -->
              <el-form-item label="退单撤单" class="select" style="">
                  <el-select v-model="chargeback_invoice_status" filterable style="">
                      <el-option
                      v-for="item in chargeback_invoice_status1"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                      </el-option>
                  </el-select>
                </el-form-item>

              <el-form-item label="回收备注" class="form-input" prop="title"  style="width:500px;">
                <el-input  placeholder="请输入" v-model="chargeback_remark"></el-input>
              </el-form-item>

            </el-form>
            
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="outworkidBtnRefund(),dialogFormVisibleRefund = false">保 存</el-button>
                <el-button @click="dialogFormVisibleRefund = false">取 消</el-button>
            </span>
          </el-dialog>

          <!--*************添加收款模态框*************-->
        <el-dialog
        title="添加"
        :visible.sync="dialogVisibleAdd"
        width="60%">
        <!-- :before-close="handleClose" -->
            <el-form label-width="90px" style="float:left;">

                <el-form-item label="开票类型" class="form-input" prop="title" style="width:250px;float:left;">
                <el-radio v-model="add.invoice_type" label="普票">普票</el-radio>
                <el-radio v-model="add.invoice_type" label="专票">专票</el-radio>
              </el-form-item>

              <el-form-item label="名称" class="form-input" prop="title" style="width:250px;float:left;">
                <el-input  placeholder="请输入" v-model="add.invoice_company"></el-input>
              </el-form-item>

              <el-form-item label="识别码" class="form-input" prop="title" style="width:250px;float:left;">
                <el-input  placeholder="请输入" v-model="add.taxpayer_identification"></el-input>
              </el-form-item>

              <el-form-item label="电话" class="form-input" prop="title" style="width:250px;float:left;">
                <el-input  placeholder="请输入" v-model="add.invoice_telephone"></el-input>
              </el-form-item>

              <el-form-item label="地址" class="form-input" prop="title" style="width:250px;float:left;">
                <el-input  placeholder="请输入" v-model="add.invoice_address"></el-input>
              </el-form-item>

              <!-- <el-form-item label="开票人姓名" class="form-input" prop="title" style="width:500px;">
                <el-input  placeholder="请输入" v-model="form.invoice_username"></el-input>
              </el-form-item> -->

              <el-form-item label="开户行" class="form-input" prop="title" style="width:250px;float:left;">
                <el-input  placeholder="请输入" v-model="add.invoice_bank"></el-input>
              </el-form-item>

              <el-form-item label="开户账户" class="form-input" prop="title"  style="width:250px;float:left;">
                <el-input  placeholder="请输入" v-model="add.invoice_bank_card"></el-input>
              </el-form-item>

              <el-form-item label="收费总金额" style="width:250px;float:left;" >
                  <el-input disabled placeholder="请输入收费金额" v-model="add.charge_amount"></el-input>
                </el-form-item>

                <el-form-item label="开票备注" class="form-input" prop="title" style="width:500px;">
                <el-input  placeholder="请输入" v-model="form.invoice_note"></el-input>
              </el-form-item>

                <el-table 
                class="table-picture"
                :data="billingList"
                border
                max-height="200"
                style="width: 100%;">

                <el-table-column
                label="id"
                align="center">
                  <template slot-scope="scope" >
                    {{scope.row.id}}
                  </template>
                </el-table-column>

                <el-table-column
                label="流水号"
                align="center">
                  <template slot-scope="scope">
                    <p :title="scope.row.serial_number" style="cursor: pointer;" @click="getInfo(scope.row)" class="nooverflow">{{scope.row.serial_number}}</p>
                  </template>
                </el-table-column>

                <el-table-column
                label="报告编号"
                align="center">
                  <template slot-scope="scope">
                    <p :title="scope.row.report_number" class="nooverflow">{{scope.row.report_number}}</p>
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
                label="开票金额"
                align="center">
                  <template slot-scope="scope">
                    <el-input @change="countMoney(scope.row.charge_amount)" v-model="scope.row.charge_amount"></el-input>
                  </template>
                </el-table-column>

                </el-table>

            </el-form>
        
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="confirmRevisionAdd(),dialogVisibleAdd = false">保 存</el-button>
                <el-button @click="dialogVisibleAdd = false">取 消</el-button>
            </span>
        </el-dialog>
        <!--*************添加收款模态框*************-->

  </div>
</template>
<script>
import request from "@/utils/request";
// import check from "@/views/shopAdministration/checkClerk"
// import map from '@/utils/city';
export default {
    data() {
      return {
        chargeback_invoice_status : '',
        chargeback_invoice_status1 : [],
        chargeback_remark : '',
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
        billingList : [],
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
        // options:map.options,
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
          // invoice_username : '',
          invoice_bank : '',
          invoice_bank_card : '',
          Invoice_examiner_id:'',
          invoice_type : '普票',
          invoice_note:'',
        },
        add:{
          charge_amount : 0,
          invoice_company : '',
          taxpayer_identification : '',
          invoice_telephone : '',
          invoice_address : '',
          invoice_bank : '',
          invoice_bank_card : '',
          Invoice_examiner_id:'',
          invoice_type : '普票',
        },
        invoice_examiner:[],
        recordDetailList :[],//发票记录
        dialogFormVisible : false,//弹出框
        dialogFormVisible1 : false,//上传附件弹出框
        dialogFormVisible2 : false,//报告审核人弹出框
        dialogVisibleRecordDetail : false,//发票记录弹出框
        dialogVisibleRecordDetail1 : false,//发票记录弹出框
        dialogVisibleAdd : false,//发票记录弹出框
        dialogFormVisibleRefund : false,//发票记录弹出框
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
        // console.log(this.activeName)
        this.agentList = [];
        if(this.activeName == 'first'){
          request.post("/admin/ProjectInvoice/query").then(res => {
            if (res.code == 200) {
              this.agentList = res.data.list;
              this.count = res.data.page.count;
              this.max = res.data.page.max;
              this.page = res.data.page.page;
              this.size = res.data.page.size;
            }
        });
        }else if(this.activeName == 'two'){
          request.post("/admin/ProjectInvoice/invoiceQuery",{
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
        }else if(this.activeName == 'no'){
          request.post("/admin/ProjectInvoice/invoiceQuery",{
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
        }else if(this.activeName == 'refund'){
          request.post("/admin/ProjectInvoice/chargebackQuery").then(res => {
            if (res.code == 200) {
              this.agentList = res.data.list;
              this.count = res.data.page.count;
              this.max = res.data.page.max;
              this.page = res.data.page.page;
              this.size = res.data.page.size;
            }
        });
        }else{
          request.post("/admin/ProjectInvoice/invoiceQuery",{
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
        }
      },
      getInfo(row, event, column){//点击跳到综合页面
        // console.log(row.id);
        window.open(row.project_info_url, '_blank')
      },
      recovery(row){//回收
        this.dialogFormVisibleRefund = true;
        this.Id = row.id;
      },
      getAgentList() {//初始渲染列表方法封装某人
        request.post("/admin/ProjectInvoice/query",{
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
          type : 'chargeback_invoice_status',
          name : '',
        }).then(res => {
          if (res.code == 200) {
            this.chargeback_invoice_status1 = res.data;
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
        request.post("/admin/ProjectInvoice/query",{
        keyword : this.search,
        type : 0,
        pageSize : this.pagesize,
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
    }else if(this.activeName == 'two'){
          request.post("/admin/ProjectInvoice/invoiceQuery",{
          keyword : this.search,
          type : 1,
          pageSize : this.pagesize,
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
          request.post("/admin/ProjectInvoice/invoiceQuery",{
          keyword : this.search,
          type : 2,
          pageSize : this.pagesize,
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
        }else if(this.activeName == 'no'){
          request.post("/admin/ProjectInvoice/invoiceQuery",{
          keyword : this.search,
          type : 3,
          pageSize : this.pagesize,
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
        }else if(this.activeName == 'refund'){
          request.post("/admin/ProjectInvoice/chargebackQuery",{
          keyword : this.search,
          pageSize : this.pagesize,
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
      recordDetail(row){//详情
        if(this.activeName != 'first'){
          request.post("/admin/ProjectInvoice/getInvoiceList",{
            id : row.id,
          }).then(res => {
            if (res.code == 200) {
              this.recordDetailList =res.data.list;
            }
          });
          
          this.dialogVisibleRecordDetail = true;
        }else{
          request.post("/admin/ProjectInvoice/getProjectInvoice",{
            id : row.id,
          }).then(res => {
            if (res.code == 200) {
              this.recordDetailList =res.data.list;
            }
          });
          this.dialogVisibleRecordDetail1 = true;
        }
        
      },
      Report(row){
        this.tongyi = false;
        // console.log(row)
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
      outworkidBtnRefund(){//回收确认
        request.post("/admin/ProjectInvoice/Recycle ",{
            id : this.Id,
            chargeback_invoice_status : this.chargeback_invoice_status,
            chargeback_remark : this.chargeback_remark,
          }).then(res => {
              if (res.code == 200) {
                this.$message({
                    // type: res.errno === 0 ? "success" : "warning",
                    type: "success",
                    message: '回收成功'//提示回收成功
                });
                this.chargeback_invoice_status = '';
                this.chargeback_remark = '';
                this.handleClick();

              }
          });
      },
      outworkidBtn1(){//报告装订
          request.post("/admin/ProjectInvoice/create",{
          project_id : this.Id,
          // invoice_examiner_id : this.form.Invoice_examiner_id,
          invoice_company : this.form.invoice_company,
          taxpayer_identification : this.form.taxpayer_identification,
          invoice_telephone : this.form.invoice_telephone,
          invoice_address : this.form.invoice_address,
          // invoice_username : this.form.invoice_username,
          invoice_type : this.form.invoice_type,
          invoice_bank : this.form.invoice_bank,
          invoice_bank_card : this.form.invoice_bank_card,
          invoice_note : this.form.invoice_note,
          }).then(res => {
              if (res.code == 200) {
                this.$message({
                    // type: res.errno === 0 ? "success" : "warning",
                    type: "success",
                    message: '发送成功'//提示发送成功
                });
                this.add = {
                  invoice_bank_card : '',
                  taxpayer_identification : '',
                  invoice_telephone : '',
                  invoice_address : '',
                  invoice_type : '普票',
                  invoice_bank : '',
                  invoice_bank_card : '',
                  invoice_note : '',
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
            request.post("/admin/ProjectInvoice/query",{
              type : 0,
              page : currentPage,
              pageSize : this.pagesize,
              keyword : this.search,
          }).then(res => {
              // console.log(res)
              if (res.code == 200) {
                this.agentList = res.data.list;
              }
          });
          }else if(this.activeName == 'two'){
          request.post("/admin/ProjectInvoice/invoiceQuery",{
            page : currentPage,
            keyword : this.search,
            pageSize : this.pagesize,
            type : 1,
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
            request.post("/admin/ProjectInvoice/invoiceQuery",{
              page : currentPage,
              keyword : this.search,
              pageSize : this.pagesize,
              type : 2,
          }).then(res => {
              // console.log(res)
              if (res.code == 200) {
                this.agentList = res.data.list;
              }
          });
          }else if(this.activeName == 'no'){
          request.post("/admin/ProjectInvoice/invoiceQuery",{
            page : currentPage,
            keyword : this.search,
            pageSize : this.pagesize,
            type : 3,
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
        }else if(this.activeName == 'refund'){
          request.post("/admin/ProjectInvoice/chargebackQuery",{
            page : currentPage,
            keyword : this.search,
            pageSize : this.pagesize,
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
      handleSizeChange: function (size) {
            this.pagesize = size;
            // console.log(this.pagesize)  //每页下拉显示数据
            if(this.activeName == 'first'){
            request.post("/admin/ProjectInvoice/query",{
              type : 0,
              page : this.currentPage,
              pageSize : this.pagesize,
              keyword : this.search,
          }).then(res => {
              // console.log(res)
              if (res.code == 200) {
                this.agentList = res.data.list;
              }
          });
          }else if(this.activeName == 'two'){
          request.post("/admin/ProjectInvoice/invoiceQuery",{
            page : this.currentPage,
            keyword : this.search,
            pageSize : this.pagesize,
            type : 1,
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
            request.post("/admin/ProjectInvoice/invoiceQuery",{
              page : this.currentPage,
              keyword : this.search,
              pageSize : this.pagesize,
              type : 2,
          }).then(res => {
              // console.log(res)
              if (res.code == 200) {
                this.agentList = res.data.list;
              }
          });
          }else if(this.activeName == 'no'){
          request.post("/admin/ProjectInvoice/invoiceQuery",{
            page : this.currentPage,
            keyword : this.search,
            pageSize : this.pagesize,
            type : 3,
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
        }else if(this.activeName == 'refund'){
          request.post("/admin/ProjectInvoice/chargebackQuery",{
            page : this.currentPage,
            keyword : this.search,
            pageSize : this.pagesize,
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
      BillingBtn(){//开票
        this.billingList = [];
          this.agentList.forEach(element => {
            if(element.checked){
              this.billingList.push(element)
            }
          });
          console.log(this.billingList)
          this.dialogVisibleAdd = true;
        },
        countMoney(money){
          // console.log()
          let sum = 0;
          this.billingList.forEach(element => {
            sum += Number(element.charge_amount)
          });
          // console.log(sum)
          this.add.charge_amount = sum;
        },
        confirmRevisionAdd(){
          console.log(this.add)
          let list1={}
          let list2 = [];
          this.billingList.forEach(element => {
            list1 = {
              project_id:element.id,
              invoice_money : element.charge_amount
            }
            list2.push(list1)
          });
          console.log(list2)

          request.post("/admin/ProjectInvoice/create",{
            // project_id : this.Id,
              // invoice_examiner_id : this.add.Invoice_examiner_id,
              invoice_company : this.add.invoice_company,
              taxpayer_identification : this.add.taxpayer_identification,
              invoice_telephone : this.add.invoice_telephone,
              invoice_address : this.add.invoice_address,
              // invoice_username : this.form.invoice_username,
              invoice_type : this.add.invoice_type,
              invoice_bank : this.add.invoice_bank,
              invoice_bank_card : this.add.invoice_bank_card,
              invoice_money_total : this.add.charge_amount,
              child : list2,
              invoice_note : this.form.invoice_note,
          }).then(res => {
              if (res.code == 200) {
                this.$message({
                    // type: res.errno === 0 ? "success" : "warning",
                    type: "success",
                    message: '添加成功'//提示添加成功
                });
                this.form = {
                  invoice_bank_card : '',
                  taxpayer_identification : '',
                  invoice_telephone : '',
                  invoice_address : '',
                  invoice_type : '普票',
                  invoice_bank : '',
                  invoice_bank_card : '',
                  charge_amount : '',
                };
                this.express_type = '';
                this.type = '';
                this.send_type = '';
                this.handleClick();
              }
          });
        this.dialogVisibleAdd=false;
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