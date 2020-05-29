<template>
    <div class="app-container">
        <div style="margin-top:15px;margin-bottom:20px;width:100%;background:rgb(48,65,85);color:white;height:30px;"><span style="float:left;margin-left:10px;margin-top:5px;font-size:15px;">询价信息</span></div>
        <el-form ref="form" :model="form" label-width="120px" style="width:90%;padding-right:50px;">
            <el-dialog style="" :append-to-body='true' title="添加联系人" :visible.sync="dialogFormVisible">
                <el-form-item label="看房联系人" class="form-input" prop="title" style="width:90%;">
                    <el-input v-model="name"></el-input>
                </el-form-item>

                <el-form-item label="联系人电话" class="form-input" prop="title" style="width:90%;">
                    <el-input v-model="telephone"></el-input>
                </el-form-item>

                <el-button type="primary" style="margin-left:60%;" plain @click="addContactBtn()">
                    立即添加
                </el-button>

            </el-dialog>

            <el-dialog style="" :append-to-body='true' title="添加联系人" :visible.sync="dialogFormVisible1">
                <el-form-item label="姓名" class="form-input" prop="title" style="width:90%;">
                    <el-input v-model="add.name"></el-input>
                </el-form-item>

                <el-form-item label="联系人电话" class="form-input" prop="title" style="width:90%;">
                    <el-input v-model="add.telephone"></el-input>
                </el-form-item>

                <el-form-item label="公司" class="form-input" prop="title" style="width:90%;">
                    <el-input v-model="add.company"></el-input>
                </el-form-item>

                <el-form-item label="地址" class="form-input" prop="title" style="width:90%;">
                    <el-input v-model="add.company_addr"></el-input>
                </el-form-item>

                <el-form-item label="邮政编码" class="form-input" prop="title" style="width:90%;">
                    <el-input v-model="add.post_code"></el-input>
                </el-form-item>

                <el-button type="primary" style="margin-left:60%;" plain @click="addContactBtn1()">
                    立即添加
                </el-button>

            </el-dialog>

            <el-form-item label="所属机构" class="select" >
                <el-select @change="subsidiary" v-model="form.subsidiary_organ" filterable placeholder="请选择产品分类" style="width:180px;float:left;">
                    <el-option
                    v-for="item in subsidiary_organ1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
              </el-form-item>

            <el-form-item label="分支机构" class="select" >
                <el-select v-model="form.affiliated_agency" filterable placeholder="请选择产品分类" style="width:180px;float:left;">
                    <el-option
                    v-for="item in affiliated_agency1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
              </el-form-item>

            <el-form-item label="银行人员" class="form-input" prop="title" style="width:300px;float:left;">
                <el-input v-model="form.bank_clerk"></el-input>
            </el-form-item>

            <el-form-item label="银行手机" class="form-input" prop="title" style="width:300px;float:left;">
                <el-input v-model="form.bank_phone"></el-input>
            </el-form-item>
        </el-form>
        
        <div style="margin-top:15px;margin-top:10px;margin-bottom:20px;float:left;width:100%;background:rgb(48,65,85);color:white;height:30px;"><span style="float:left;margin-left:10px;margin-top:5px;font-size:15px;">项目信息</span></div>
        <el-form ref="form" :model="form" label-width="120px" style="width:90%;padding-right:50px;">
            <el-form-item label="报告号" class="form-input" prop="title" style="width:300px;float:left;">
                <el-input v-model="form.report_number"></el-input>
            </el-form-item>
            
            <el-form-item label="所属部门" class="select" >
                <el-select v-model="form.subsidiary_department" filterable placeholder="请选择产品分类" style="width:180px;float:left;">
                    <el-option
                    v-for="item in subsidiary_department1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="发送份数" class="form-input" prop="title" style="width:300px;float:left;">
                <el-input v-model="form.send_num"></el-input>
            </el-form-item>

            <el-form-item label="项目分类" class="select" >
                <el-select v-model="form.project_classify" filterable placeholder="请选择产品分类" style="width:180px;float:left;">
                    <el-option
                    v-for="item in project_classify1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
              </el-form-item>

            <el-form-item label="估价目的" class="select" >
                <el-select v-model="form.inquiry_purpose" filterable placeholder="请选择产品分类" style="width:180px;float:left;">
                    <el-option
                    v-for="item in inquiry_purpose1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
              </el-form-item>

            <el-form-item label="物业名称" class="form-input" prop="title" style="width:300px;float:left;">
                <el-input v-model="form.property_type"></el-input>
            </el-form-item>

            <el-form-item label="报告类型" class="select" >
                <el-select v-model="form.report_tale" filterable placeholder="请选择" style="width:180px;float:left;">
                    <el-option
                    v-for="item in report_tale1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
              </el-form-item>

            <el-form-item label="城市" class="form-input" prop="title" style="width:300px;float:left;">
                <el-input v-model="form.city"></el-input>
            </el-form-item>

            <el-form-item label="小区名" class="form-input" prop="title" style="width:300px;float:left;">
                <el-input v-model="form.plot_name"></el-input>
            </el-form-item>

            <el-form-item label="项目地址" class="form-input" prop="title" style="width:300px;float:left;">
                <el-input v-model="form.project_address"></el-input>
            </el-form-item>

            <el-form-item label="证载地址" class="form-input" prop="title" style="width:300px;float:left;">
                <el-input v-model="form.load_address"></el-input>
            </el-form-item>

            <el-form-item label="建筑面积" class="form-input" prop="title" style="width:300px;float:left;">
                <el-input v-model="form.construct_area"></el-input>
            </el-form-item>

            <el-form-item label="土地面积" class="form-input" prop="title" style="width:300px;float:left;">
                <el-input v-model="form.land_area"></el-input>
            </el-form-item>

            <el-form-item label="单价" class="form-input" prop="title" style="width:300px;float:left;">
                <el-input v-model="form.ask_univalence"></el-input>
            </el-form-item>

            <el-form-item label="总价" class="form-input" prop="title" style="width:300px;float:left;">
                <el-input v-model="form.ask_price_total"></el-input>
            </el-form-item>

            <el-form-item label="净值总价" class="form-input" prop="title" style="width:300px;float:left;">
                <el-input v-model="form.total_net_price"></el-input>
            </el-form-item>

            <el-form-item label="贷款机构" class="form-input" prop="title" style="width:300px;float:left;">
                <el-input v-model="form.lending_agency"></el-input>
            </el-form-item>

            <el-form-item label="贷款支行" class="form-input" prop="title" style="width:300px;float:left;">
                <el-input v-model="form.lending_bank"></el-input>
            </el-form-item>

            <el-form-item label="估价委托方" class="form-input" prop="title" style="width:300px;float:left;">
                <el-input v-model="form.valuation_principal"></el-input>
            </el-form-item>

            <el-form-item label="估价委托方电话" class="form-input" prop="title" style="width:300px;float:left;">
                <el-input v-model="form.valuation_client_phone"></el-input>
            </el-form-item>

            
        </el-form>

        <div style="margin-top:15px;float:left;margin-bottom:20px;width:100%;background:rgb(48,65,85);color:white;height:30px;"><span style="float:left;margin-left:10px;margin-top:5px;font-size:15px;">收费信息</span></div>
        <el-form ref="form" :model="form" label-width="120px" style="width:90%;padding-right:50px;">
            <el-form-item label="市场负责人" class="select" >
                <el-select v-model="form.market_leader" filterable placeholder="请选择" style="width:180px;float:left;">
                    <el-option
                    v-for="item in market_leader1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
              </el-form-item>

            <el-form-item label="是否要发票" class="form-input" prop="title" style="width:300px;float:left;">
                <el-input v-model="form.invoice"></el-input>
            </el-form-item>

            <el-form-item label="是否要合同" class="form-input" prop="title" style="width:300px;float:left;">
                <el-input v-model="form.contract"></el-input>
            </el-form-item>

            <el-form-item label="结算方式" class="form-input" prop="title" style="width:300px;float:left;">
                <el-input v-model="form.settlement_method"></el-input>
            </el-form-item>

            <el-form-item label="应收金额(元)" class="form-input" prop="title" style="width:300px;float:left;">
                <el-input v-model="form.money_due"></el-input>
            </el-form-item>

            <el-form-item label="收费备注(元)" class="form-input" prop="title" style="width:300px;float:left;">
                <el-input v-model="form.fee_note"></el-input>
            </el-form-item>
        </el-form>

        <div style="margin-top:15px;float:left;margin-bottom:20px;width:100%;background:rgb(48,65,85);color:white;height:30px;"><span style="float:left;margin-left:10px;margin-top:5px;font-size:15px;">勘察事项</span></div>
        <el-form ref="form" :model="form" label-width="120px" style="width:90%;padding-right:50px;">
            <!-- <el-form-item label="是否勘察" class="form-input" prop="title" style="width:300px;float:left;">
                <el-input v-model="form.reconnaissance"></el-input>
            </el-form-item> -->
            <el-form-item label="是否勘察" class="form-input" prop="title" style="width:300px;float:left;">
                <el-radio v-model="form.reconnaissance" label="0">是</el-radio>
                <el-radio v-model="form.reconnaissance" label="1">否</el-radio>
            </el-form-item>
            <el-form-item label="预留费用" class="form-input" prop="title" style="width:300px;float:left;">
                <el-input v-model="form.costs_reserved"></el-input>
            </el-form-item>

            <el-form-item label="资料提供方式" class="form-input" prop="title" style="width:300px;float:left;">
                <el-input v-model="form.materials_offer_way"></el-input>
            </el-form-item>

            <el-button type="primary" style="float:left;margin-left:50px;" plain @click="addContact()">
                添加联系人
            </el-button>

            <el-table 
            class="table-picture"
            :data="linkman"
            border
            max-height="200"
            style="margin-top:15px;width:80%;margin-left:50px;float:left;">

            <el-table-column
            label="看房联系人"
            align="center">
                <template slot-scope="scope">
                {{scope.row.name}}
                </template>
            </el-table-column>

            <el-table-column
            label="联系人电话"
            align="center">
                <template slot-scope="scope">
                {{scope.row.telephone}}
                </template>
            </el-table-column>

            <el-table-column
            label="操作"
            align="center">
                <template slot-scope="scope">
                    <el-button size="small" type="danger" @click="delContact(scope.$index)" >删除</el-button>
                </template>
            </el-table-column>
            </el-table>
            
        </el-form>
        
        <div style="margin-top:15px;float:left;margin-bottom:20px;width:100%;background:rgb(48,65,85);color:white;height:30px;"><span style="float:left;margin-left:10px;margin-top:5px;font-size:15px;">收件信息</span></div>
        <el-form ref="form" :model="form" label-width="120px" style="width:90%;padding-right:50px;">

            <el-form-item label="备注" class="form-input" prop="title" style="width:300px;float:left;">
                <el-input v-model="form.delivery_note"></el-input>
            </el-form-item>

            <el-form-item label="收取方式" class="select" >
                <el-select v-model="express" filterable placeholder="请选择产品分类" style="width:180px;float:left;">
                    <el-option
                    v-for="item in express1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
              </el-form-item>

              <el-button type="primary" style="float:left;margin-left:50px;" plain @click="addExpress()">
                新增地址
            </el-button>
              
              <el-table 
                class="table-picture"
                :data="ContractList"
                border
                max-height="150"
                style="margin-top:15px;width:80%;margin-left:50px;float:left;">

                <el-table-column
                label="姓名"
                align="center">
                    <template slot-scope="scope">
                    {{scope.row.name}}
                    </template>
                </el-table-column>

                <el-table-column
                label="联系人电话"
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

                <el-table-column
                label="操作"
                align="center">
                    <template slot-scope="scope">
                        <el-button size="small" type="danger" @click="delContact(scope.$index)" >删除</el-button>
                    </template>
                </el-table-column>

                </el-table>
        </el-form>

        <div style="margin-top:15px;float:left;margin-bottom:20px;width:100%;background:rgb(48,65,85);color:white;height:30px;"><span style="float:left;margin-left:10px;margin-top:5px;font-size:15px;">合同选择</span></div>
        <el-form ref="form" :model="form" label-width="120px" style="width:90%;padding-right:50px;">

                <el-table 
                class="table-picture"
                :data="contractList1"
                border
                max-height="150"
                style="width:85%;margin-left:50px;float:left;">

                <el-table-column
                label="选择"
                align="center">
                    <template slot-scope="scope" >
                    <el-radio v-model="checko" :label="scope.row.id">{{kong}}</el-radio>
                    </template>
                </el-table-column>

                <el-table-column
                label="合同编号"
                align="center">
                    <template slot-scope="scope" >
                    {{scope.row.contract_no}}
                    </template>
                </el-table-column>

                <el-table-column
                label="甲方"
                align="center">
                    <template slot-scope="scope">
                    {{scope.row.first_party}}
                    </template>
                </el-table-column>

                <el-table-column
                label="乙方"
                align="center">
                    <template slot-scope="scope">
                    {{scope.row.second_party}}
                    </template>
                </el-table-column>

                <el-table-column
                label="合同内容"
                align="center">
                    <template slot-scope="scope">
                    {{scope.row.content}}
                    </template>
                </el-table-column>

                </el-table>
        </el-form>

        <div style="margin-top:15px;float:left;margin-bottom:20px;width:100%;background:rgb(48,65,85);color:white;height:30px;"><span style="float:left;margin-left:10px;margin-top:5px;font-size:15px;">立项备注</span></div>
        <el-form ref="form" :model="form" label-width="120px" style="width:90%;padding-right:50px;">

            <el-input
            type="textarea"
            :autosize="{ minRows: 5, maxRows: 10}"
            v-model="form.project_approval_remark">
            </el-input>
            <el-button type="primary" style="margin-top:15px;margin-left:60%;" plain @click="addProjectInitiation()">
                修改立项
            </el-button>
        </el-form>
        
    </div>
</template>

<script>
import request from "@/utils/request";
import { quillEditor } from 'vue-quill-editor';
import quillConfig from '@/utils/quill-config'
import map from '@/utils/city';
export default {
    created() {
        
    },
    data() {
        return {
            subsidiary_organ1:[],
            affiliated_agency1:[],
            subsidiary_department1:[],
            contractList1:[],
            checko : '',
            add:{
                name: '',
                telephone: '',
                company: '',
                company_addr: '',
                post_code: '',
            },
            ContractList:[],
            tableShow :false,
            express : '',
            express1 : [
                {
                    label: "快递",
                    value: "1",
                }
            ],
            linkman:[],
            options:map.options,
            quillOption: quillConfig,
            cpPicture:[],
            paramFile : '',
            name : '',
            telephone : '',
            report_tale1:[],
            inquiry_purpose1:[],
            project_classify1:[],
            market_leader1:[],
            form : {
                subsidiary_organ : '',
                affiliated_agency : '',
                bank_clerk : '',
                bank_phone : '',
                subsidiary_department : '',
                send_num : '',
                project_classify : '',
                inquiry_purpose : '',
                property_type : '',
                report_tale : '',
                city : '',
                plot_name : '',
                project_address : '',
                load_address : '',
                construct_area : '',
                land_area : '',
                ask_univalence : '',
                ask_price_total : '',
                total_net_price : '',
                lending_agency : '',
                lending_bank : '',
                valuation_principal : '',
                valuation_client_phone : '',
                market_leader : '',
                invoice : '',
                contract : '',
                settlement_method : '',
                money_due : '',
                report_number:'',
                fee_note : '',
                reconnaissance : '0',
                costs_reserved : '',
                materials_offer_way : '',
                courier_method : '',
                delivery_note : '',
                project_approval_remark : '',
        },
        allInquiry1 : [],
        activeName: 'first',
        fileList:[],
        imageUrl : '',
        ask_price:[],
        bazaar_crew:[],
        param:[],
        price_check:[],
        bank:[],
        city :[],
        factor:[],
        factor_value :[],
        house_way :[],
        type :[],
        dialogFormVisible:false,
        dialogFormVisible1:false,
        //*************分页变量*************
        currentPage : 1, //初始页
        // pagesize : 5,   //每页的数据
        count : 0,
        max : 1,
        page : 1,
        size :1,
       //*************分页变量*************
        };
    },
    computed: {
       
    },
    created(){
       quillEditor,
    //    console.log(map.options)
       this.getAllInquiry(),
       this.getSelect()
    },
    methods: {
        subsidiary(){
            console.log(this.form.subsidiary_organ)
            this.subsidiary_organ1.forEach(element => {
                if(element.value == this.form.subsidiary_organ){
                    this.affiliated_agency1 = element.children;
                }
            });
        },
        addExpress(){//新增地址
            this.dialogFormVisible1 = true;
        },
        delContact(row){//删除联系人
            // console.log(row)
            this.linkman.splice(row,1)
        },
        addContact(){//添加联系人
            this.dialogFormVisible = true;
        },
        addContactBtn(){
            var s={};
            s.name = this.name;
            s.telephone = this.telephone;
            this.linkman.push(s)
            this.$message({
                // type: res.errno === 0 ? "success" : "warning",
                type: "success",
                message: '添加联系人成功'//提示添加成功
            });
            this.name = '';
            this.telephone = '';
            this.dialogFormVisible = false;
        },
        addContactBtn1(){
            var s={};
            s.name = this.add.name;
            s.telephone = this.add.telephone;
            s.company = this.add.company;
            s.company_addr = this.add.company_addr;
            s.post_code = this.add.post_code;
            this.ContractList.push(s)
            this.$message({
                // type: res.errno === 0 ? "success" : "warning",
                type: "success",
                message: '添加联系人成功'//提示添加成功
            });
            this.add.name = '';
            this.add.telephone = '';
            this.add.company = '';
            this.add.company_addr = '';
            this.add.post_code = '';
            this.dialogFormVisible1 = false;
        },
        getSelect() {//初始渲染列表方法封装
         request.post("/admin/contractManagement/query").then(res => {
                    if (res.code == 200) {
                        this.contractList1 = res.data.list;
                    }
                });
                request.post("/admin/project/param").then(res => {
                    if (res.code == 200) {
                        this.subsidiary_organ1 = res.data.param.subsidiary_organ;
                        this.subsidiary_department1 = res.data.param.subsidiary_department;
                        this.report_tale1 = res.data.param.report_tale;
                        this.market_leader1 = res.data.market_leader;
                        this.project_classify1 = res.data.param.project_classify;
                        this.inquiry_purpose1 = res.data.param.inquiry_purpose;
                    }
                });
            request.post("/admin/project/get",{
                id : this.$route.query.id
            }).then(res => {
                if (res.code == 200) {
                    // console.log(res)
                    res.data.reconnaissance = res.data.reconnaissance+'';
                    this.form=res.data;
                    this.linkman = res.data.linkman;
                    console.log(res.data.reconnaissance)
                    this.ContractList = res.data.express;
                    this.checko = project_contract_id;
                    // this.ask_price_id = res.data.ask_price_id;
                    // this.city=res.data.param.city;//城市
                    // this.bank=res.data.param.bank;//询价银行
                    // this.factor=res.data.param.factor;//特殊因素
                    // this.factor_value=res.data.param.factor_value;//净值系数
                    // this.house_way=res.data.param.house_way;//房屋用途
                    // this.type=res.data.param.type;//房屋类型
                    
                    // this.bazaar_crew=res.data.bazaar_crew;//市场人员
                    // this.ask_price=res.data.ask_price;//询值人员
                    // this.price_check=res.data.price_check;//价格变更审核人员
                }
                
            });
        },
        addProjectInitiation(){
            console.log(this.form)
            request.post("/admin/project/update",{
                report_number:this.form.report_number,
                express : this.ContractList,
                project_contract_id:this.checko,
                linkman : this.linkman,
                id : this.$route.query.id,
                ask_price_id : this.form.ask_price_id,
                subsidiary_organ : this.form.subsidiary_organ,
                affiliated_agency : this.form.affiliated_agency,
                bank_clerk : this.form.bank_clerk,
                bank_phone : this.form.bank_phone,
                subsidiary_department : this.form.subsidiary_department,
                send_num : this.form.send_num,
                project_classify : this.form.project_classify,
                inquiry_purpose : this.form.inquiry_purpose,
                property_type : this.form.property_type,
                report_tale : this.form.report_tale,
                city : this.form.city,
                plot_name : this.form.plot_name,
                project_address : this.form.project_address,
                load_address : this.form.load_address,
                construct_area : this.form.construct_area,
                land_area : this.form.land_area,
                ask_univalence : this.form.ask_univalence,
                ask_price_total : this.form.ask_price_total,
                total_net_price : this.form.total_net_price,
                lending_agency : this.form.lending_agency,
                lending_bank : this.form.lending_bank,
                valuation_principal : this.form.valuation_principal,
                valuation_client_phone : this.form.valuation_client_phone,
                market_leader : this.form.market_leader,
                invoice : this.form.invoice,
                contract : this.form.contract,
                settlement_method : this.form.settlement_method,
                money_due : this.form.money_due,
                fee_note : this.form.fee_note,
                reconnaissance : Number(this.form.reconnaissance),
                costs_reserved : this.form.costs_reserved,
                materials_offer_way : this.form.materials_offer_way,
                courier_method : this.form.courier_method,
                delivery_note : this.form.delivery_note,
                project_approval_remark : this.form.project_approval_remark,

            }).then(res => {
            // console.log(res)
            if (res.code == 200) {
            //   console.log(res)
                    this.$message({
                    // type: res.errno === 0 ? "success" : "warning",
                    type: "success",
                    message: '修改成功'//提示修改成功
                    });
            }
        });
        },
        getAllInquiry() {
            // this.dialogFormVisible = false;
            // request.post("/admin/askPrice/query").then(res => {
            //     // console.log(res)
            //     if (res.code == 200) {
                    
            //         this.allInquiry = res.data.list;
            //         this.count = res.data.page.count;
            //         this.max = res.data.page.max;
            //         this.page = res.data.page.page;
            //         this.size = res.data.page.size;
            //     }
            // });
        },
        addCommodity(){//点击提交按钮
            console.log(this.form)
                
                request.post("/admin/AskPrice/create", {//发送数据到后台
                    plot_name : this.form.plot_name,
                    unit_number : this.form.unit_number,
                    construct_area : this.form.construct_area,
                    ask_price : this.form.ask_price,
                    ask_univalence : this.form.ask_univalence,
                    ask_price_total : this.form.ask_price_total,

                    city : this.form.city,
                    district : this.form.district,
                    plot_address : this.form.plot_address,
                    floor : this.form.floor,
                    activate_time : this.form.activate_time,
                    house_way : this.form.house_way,
                    special_element : this.form.special_element,
                    ask_bank : this.form.ask_bank,
                    remark : this.form.remark,
                    total_floor : this.form.total_floor,
                    plot_special : this.form.plot_special,
                    total_prices : this.form.total_prices,
                    bazaar_crew : this.form.bazaar_crew,
                    factor : this.form.facto,
                    }).then(res => {
                    //     this.form.forEach(item => {
                    //     console.log(item)
                    //     if(item == ''){
                    //         this.$message({
                    //             // type: res.errno === 0 ? "success" : "warning",
                    //             type: "warning",
                    //             message: '请核实是否全部填写完成！'//提示未核实
                    //         });
                    //     }
                    // });
                        console.log(res)
                        if(res.code == 200){
                            this.$message({
                            // type: res.errno === 0 ? "success" : "warning",
                            type: "success",
                            message: '添加成功'//提示添加成功
                        });
                        // this.form = [];
                        this.$router.go(-1)
                        }
                    });
        },
        
        imlist(){
            
        },
        handleCurrentChange(currentPage){//换页
            // console.log(currentPage)
            this.currentPage = currentPage;
            request.post("/admin/askPrice/query",{
                plot_name : this.form.plot_name,
                page : currentPage,
            }).then(res => {
                if (res.code == 200) {
                    this.allInquiry1 = res.data.list;
                    console.log(this.allInquiry1)
                }
            });
        },
    }
};
</script>

<style style lang="less" scoped>
    .app-container {
        .table-list {
            margin: 0 auto;
            .table-content {
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
        }
        .table-page {
            margin-top: 20px;
            float: right;
        }
    }
    .editor{
        width: 200%;
        height: 300px;
    }
    .hot{
        color: #606266;
        font-size: 14px;
        margin-left:10px;
        margin-right:10px;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 50px;
        height: 50px;
        line-height: 50px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
    // .form-input{
    //     width:300px;float:left;
    // }
    el-form-item{
        width: 20% !important;
    }
    .select{
        float:left;
    }
</style>