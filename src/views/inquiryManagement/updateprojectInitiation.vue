<template>
    <div class="app-container">
        <div style="margin-bottom:20px;width:100%;background:rgb(48,65,85);color:white;height:30px;"><span style="float:left;margin-left:10px;margin-top:5px;font-size:15px;">询价信息</span></div>
        <el-form ref="form" :model="form" label-width="120px" style="width:90%;padding-right:50px;">
            <el-dialog style="" :append-to-body='true' title="添加" :visible.sync="dialogFormVisible">
                <el-form-item label="看房联系人" class="form-input" prop="title" style="width:90%;">
                    <el-input v-model="name" placeholder="请输入"></el-input>
                </el-form-item>

                <el-form-item label="联系人电话" class="form-input" prop="title" style="width:90%;">
                    <el-input v-model="telephone" placeholder="请输入"></el-input>
                </el-form-item>

                <el-button type="primary" style="margin-left:60%;" plain @click="addContactBtn()">
                    添加
                </el-button>

            </el-dialog>
            
            <!-- 修改联系人 -->
            <el-dialog style="" :append-to-body='true' title="修改" :visible.sync="dialogFormVisibleUpdate">
                <el-form-item label="看房联系人" class="form-input" prop="title" style="width:90%;">
                    <el-input v-model="update.name"></el-input>
                </el-form-item>

                <el-form-item label="联系人电话" class="form-input" prop="title" style="width:90%;">
                    <el-input v-model="update.telephone"></el-input>
                </el-form-item>

                <el-button type="primary" style="margin-left:60%;" plain @click="updateContactBtn()">
                    保存
                </el-button>

            </el-dialog>
            <!-- 修改联系人 -->


            <el-dialog style="" :append-to-body='true' title="添加" :visible.sync="dialogFormVisible1">
                <el-form-item label="姓名" class="form-input" prop="title" style="width:90%;">
                    <el-input v-model="add.name" placeholder="请输入"></el-input>
                </el-form-item>

                <el-form-item label="联系电话" class="form-input" prop="title" style="width:90%;">
                    <el-input v-model="add.telephone" placeholder="请输入"></el-input>
                </el-form-item>

                <el-form-item label="所属机构" class="form-input" prop="title" style="width:90%;">
                    <el-input v-model="add.subsidiary_organ" placeholder="请输入"></el-input>
                </el-form-item>

                <el-form-item label="分支机构" class="form-input" prop="title" style="width:90%;">
                    <el-input v-model="add.affiliated_agency" placeholder="请输入"></el-input>
                </el-form-item>

                <el-form-item label="地址" class="form-input" prop="title" style="width:90%;">
                    <el-input v-model="add.company_addr" placeholder="请输入"></el-input>
                </el-form-item>

                <!-- <el-form-item label="邮政编码" class="form-input" prop="title" style="width:90%;">
                    <el-input v-model="add.post_code"></el-input>
                </el-form-item> -->

                <el-button type="primary" style="margin-left:60%;" plain @click="addContactBtn1()">
                    立即添加
                </el-button>

            </el-dialog>

            <el-dialog style="" :append-to-body='true' title="修改" :visible.sync="dialogFormVisibleUpdate1">
                <el-form-item label="姓名" class="form-input" prop="title" style="width:90%;">
                    <el-input v-model="update1.name" placeholder="请输入"></el-input>
                </el-form-item>

                <el-form-item label="联系电话" class="form-input" prop="title" style="width:90%;">
                    <el-input v-model="update1.telephone" placeholder="请输入"></el-input>
                </el-form-item>

                <el-form-item label="所属机构" class="form-input" prop="title" style="width:90%;">
                    <el-input v-model="update1.subsidiary_organ" placeholder="请输入"></el-input>
                </el-form-item>

                <el-form-item label="分支机构" class="form-input" prop="title" style="width:90%;">
                    <el-input v-model="update1.affiliated_agency" placeholder="请输入"></el-input>
                </el-form-item>

                <el-form-item label="地址" class="form-input" prop="title" style="width:90%;">
                    <el-input v-model="update1.company_addr" placeholder="请输入"></el-input>
                </el-form-item>

                <!-- <el-form-item label="邮政编码" class="form-input" prop="title" style="width:90%;">
                    <el-input v-model="add.post_code"></el-input>
                </el-form-item> -->

                <el-button type="primary" style="margin-left:60%;" plain @click="updateContactBtn1()">
                    保存
                </el-button>

            </el-dialog>

            <el-form ref="form" :model="form" label-width="120px" style="width:90%;padding-right:50px;">
            <el-form-item class="" style="position:relative;width:300px;float:left;">
                <span style="float:left;cursor: pointer;position:absolute;left:50px;" @click="Select('enquiry_department','')">所属部门*</span>
                <el-input  style="width:180px;" placeholder="请输入"  v-model="form.enquiry_department"></el-input>
              </el-form-item>

            <el-form-item class="" style="position:relative;width:300px;float:left;">
                <span style="float:left;cursor: pointer;position:absolute;left:50px;" @click="Select('city','')">城市*</span>
                <el-input  style="width:180px;" placeholder="请输入"  v-model="form.city"></el-input>
              </el-form-item>

            <el-form-item style="position:relative;width:300px;float:left;">
                <span style="float:left;cursor: pointer;position:absolute;left:50px;" @click="Select('city_children','')">行政区*</span>
                <el-input  style="width:180px;" placeholder="请输入"  v-model="form.district"></el-input>
            </el-form-item>

            <el-form-item label="小区名称" class="form-input" prop="title" style="width:300px;float:left;">
                <el-input placeholder="请输入" v-model="form.plot_name"></el-input>
            </el-form-item>

            <el-form-item label="小区地址" class="form-input" prop="title" style="width:300px;float:left;">
                <el-input placeholder="请输入" v-model="form.plot_address"></el-input>
            </el-form-item>

            <el-form-item label="楼栋单元号" class="form-input" prop="title" style="width:300px;float:left;">
                <el-input placeholder="请输入" v-model="form.unit_number"></el-input>
            </el-form-item>

            <el-form-item style="position:relative;width:300px;float:left;">
                <span style="float:left;cursor: pointer;position:absolute;left:50px;">房屋类型*</span>
                <el-input style="width:180px;" disabled placeholder="请输入"  v-model="form.house_type"></el-input>
            </el-form-item>

            <el-form-item style="position:relative;width:300px;float:left;">
                <span style="float:left;cursor: pointer;position:absolute;left:50px;" @click="Select('house_way','')">房屋用途*</span>
                <el-input  style="width:180px;" placeholder="请输入"  v-model="form.house_way"></el-input>
            </el-form-item>

            <el-form-item label="建筑面积" class="form-input" prop="title" style="width:300px;float:left;position:relative;">
                <el-input placeholder="请输入" disabled v-model="form.construct_area"></el-input>
            </el-form-item>
            
            <span style="margin-top:10px;margin-left:2px;float:left;"> </span>

            <el-form-item label="所在楼层" class="form-input" prop="title" style="width:300px;float:left;">
                <el-input placeholder="请输入" v-model="form.floor"></el-input>
            </el-form-item>

            <el-form-item label="总楼层" class="form-input" prop="title" style="width:300px;float:left;">
                <el-input placeholder="请输入" v-model="form.total_floor"></el-input>
            </el-form-item>

            <!-- <el-form-item label="权力性质" class="form-input" prop="title" style="width:300px;float:left;">
                <el-input placeholder="请输入权力性质" v-model="form.right_nature"></el-input>
            </el-form-item> -->
            <el-form-item style="position:relative;width:300px;float:left;">
                <span style="float:left;cursor: pointer;position:absolute;left:50px;" @click="Select('right_nature','')">权利性质*</span>
                <el-input  style="width:180px;" placeholder="请输入"  v-model="form.right_nature"></el-input>
            </el-form-item>

            <el-form-item style="position:relative;width:300px;float:left;">
                <span style="float:left;cursor: pointer;position:absolute;left:50px;" @click="Select('ask_bank1','')">询价银行*</span>
                <el-input  style="width:180px;" placeholder="请输入"  v-model="form.ask_bank"></el-input>
            </el-form-item>

            <el-form-item style="position:relative;width:300px;float:left;">
                <span style="float:left;cursor: pointer;position:absolute;left:50px;" @click="Select('bazaar_crew','')">市场人员*</span>
                <el-input  style="width:180px;" placeholder="请输入"  v-model="form.bazaar_crew"></el-input>
            </el-form-item>

            <el-form-item style="position:relative;width:300px;float:left;">
                <span style="float:left;cursor: pointer;position:absolute;left:50px;" @click="Select('ask_price','')">报值人员*</span>
                <el-input  style="width:180px;" placeholder="请输入"  v-model="form.ask_price"></el-input>
            </el-form-item>

            <el-form-item label="询值单价" class="form-input" prop="title" style="width:300px;float:left;">
                <el-input placeholder="请输入" disabled v-model="form.ask_univalence"></el-input>
            </el-form-item>

            <el-form-item  label="询值总价" class="form-input" prop="title" style="width:300px;float:left;">
                <el-input placeholder="请输入" disabled v-model="form.ask_price_total"></el-input>
            </el-form-item>

            <el-form-item  label="抵押总价" class="form-input" prop="title" style="width:300px;float:left;">
                <el-input placeholder="请输入" disabled v-model="form.mortgage_price"></el-input>
            </el-form-item>

            <el-form-item label="土地出让金" class="form-input" prop="title" style="width:300px;float:left;">
                <el-input placeholder="请输入" disabled v-model="form.land_leasing"></el-input>
            </el-form-item>

            <el-form-item  label="净值系数" class="form-input" prop="title" style="width:300px;float:left;">
                <el-input placeholder="请输入" disabled v-model="form.factor"></el-input>
            </el-form-item>

            <el-form-item label="净值总价" class="form-input" prop="title" style="width:300px;float:left;">
                <el-input placeholder="请输入" disabled v-model="form.total_prices"></el-input>
            </el-form-item>

            <el-form-item label="建成年代" class="form-input" prop="title" style="width:300px;float:left;">
                <el-input placeholder="请输入" v-model="form.activate_time"></el-input>
            </el-form-item>
            
            <el-form-item label="备注" class="form-input" prop="title" style="width:300px;float:left;">
                <el-input placeholder="请输入" v-model="form.remark"></el-input>
            </el-form-item>

            <el-form-item label="小区特殊情况" class="form-input" prop="title" style="width:300px;float:left;">
                <el-input placeholder="请输入" v-model="form.plot_special"></el-input>
            </el-form-item>

        </el-form>

            <el-form-item label="银行人员" class="form-input" prop="title" style="width:300px;float:left;">
                <el-input v-model="form.bank_clerk" placeholder="请输入"></el-input>
            </el-form-item>

            <el-form-item label="银行手机" class="form-input" prop="title" style="width:300px;float:left;">
                <el-input v-model="form.bank_phone" placeholder="请输入"></el-input>
            </el-form-item>
        </el-form>
        
        <div style="margin-top:15px;margin-top:10px;margin-bottom:20px;float:left;width:100%;background:rgb(48,65,85);color:white;height:30px;"><span style="float:left;margin-left:10px;margin-top:5px;font-size:15px;">项目信息</span></div>
        <el-form ref="form" :model="form" label-width="120px" style="width:90%;padding-right:50px;">
            
            <el-form-item label="报告号" class="form-input" prop="title" style="width:300px;float:left;">
                <el-input v-model="form.report_number" placeholder="请输入"></el-input>
            </el-form-item>

            <el-form-item label="发送份数" class="form-input" prop="title" style="width:300px;float:left;">
                <el-input v-model="form.send_num" placeholder="请输入"></el-input>
            </el-form-item>

            <el-form-item class="" style="position:relative;width:300px;float:left;">
                <span style="float:left;cursor: pointer;position:absolute;left:50px;" @click="Select('project_classify','')">项目分类*</span>
                <el-input  style="width:180px;" placeholder="请输入"  v-model="form.project_classify"></el-input>
            </el-form-item>
            
            <el-form-item class="" style="position:relative;width:300px;float:left;">
                <span style="float:left;cursor: pointer;position:absolute;left:50px;" @click="Select('inquiry_purpose','')">估价目的*</span>
                <el-input  style="width:180px;" placeholder="请输入"  v-model="form.inquiry_purpose"></el-input>
              </el-form-item>

            <!-- <el-form-item label="估价目的" class="form-input" prop="title" style="width:300px;float:left;">
                <el-input v-model="form.inquiry_purpose"></el-input>
            </el-form-item> -->
            
            <el-form-item class="" style="position:relative;width:300px;float:left;">
                <span style="float:left;cursor: pointer;position:absolute;left:50px;" @click="Select('report_tale','')">报告类型*</span>
                <el-input  style="width:180px;" placeholder="请输入"  v-model="form.report_tale"></el-input>
              </el-form-item>

            <!-- <el-form-item label="城市" class="form-input" prop="title" style="width:300px;float:left;">
                <el-input v-model="form.city"></el-input>
            </el-form-item>

            <el-form-item label="小区名" class="form-input" prop="title" style="width:300px;float:left;">
                <el-input v-model="form.plot_name"></el-input>
            </el-form-item> -->

            <el-form-item label="项目地址" class="form-input" prop="title" style="width:300px;float:left;">
                <el-input v-model="form.project_address" placeholder="请输入"></el-input>
            </el-form-item>

            <el-form-item label="证载地址" class="form-input" prop="title" style="width:300px;float:left;">
                <el-input v-model="form.load_address" placeholder="请输入"></el-input>
            </el-form-item>

            <!-- <el-form-item label="建筑面积" class="form-input" prop="title" style="width:300px;float:left;">
                <el-input v-model="form.construct_area"></el-input>
            </el-form-item> -->

            <el-form-item label="土地面积" class="form-input" prop="title" style="width:300px;float:left;">
                <el-input v-model="form.land_area" placeholder="请输入"></el-input>
            </el-form-item>

            <!-- <el-form-item label="单价" class="form-input" prop="title" style="width:300px;float:left;">
                <el-input v-model="form.ask_univalence"></el-input>
            </el-form-item>

            <el-form-item label="总价" class="form-input" prop="title" style="width:300px;float:left;">
                <el-input v-model="form.ask_price_total"></el-input>
            </el-form-item>

            <el-form-item label="净值总价" class="form-input" prop="title" style="width:300px;float:left;">
                <el-input v-model="form.total_prices"></el-input>
            </el-form-item> -->

            <!-- <el-form-item label="贷款机构" class="form-input" prop="title" style="width:300px;float:left;">
                <el-input v-model="form.lending_agency"></el-input>
            </el-form-item>

            <el-form-item label="贷款支行" class="form-input" prop="title" style="width:300px;float:left;">
                <el-input v-model="form.lending_bank"></el-input>
            </el-form-item> -->

            <el-form-item class="" style="position:relative;width:300px;float:left;">
                <span style="float:left;cursor: pointer;position:absolute;left:50px;" @click="Select('ask_bank2','')">贷款机构*</span>
                <el-input  style="width:180px;" placeholder="请输入"  v-model="form.lending_agency"></el-input>
            </el-form-item>
            
            <el-form-item class="" style="position:relative;width:300px;float:left;">
                <span style="float:left;cursor: pointer;position:absolute;left:50px;" @click="Select('ask_bank_children2','')">贷款支行*</span>
                <el-input  style="width:180px;" placeholder="请输入"  v-model="form.lending_bank"></el-input>
            </el-form-item>
            
            <el-form-item class="" style="position:relative;width:300px;float:left;">
                <span style="float:left;cursor: pointer;position:absolute;left:50px;" @click="Select('ask_bank','')">所属机构*</span>
                <el-input  style="width:180px;" placeholder="请输入"  v-model="form.subsidiary_organ"></el-input>
              </el-form-item>

            <el-form-item style="position:relative;width:300px;float:left;">
                <span style="float:left;cursor: pointer;position:absolute;left:50px;" @click="Select('ask_bank_children','')">分支机构*</span>
                <el-input  style="width:180px;" placeholder="请输入"  v-model="form.affiliated_agency"></el-input>
            </el-form-item>

            <el-form-item label="估价委托方" class="form-input" prop="title" style="width:300px;float:left;">
                <el-input v-model="form.valuation_principal" placeholder="请输入"></el-input>
            </el-form-item>

            <el-form-item label="估价委托方电话" class="form-input" prop="title" style="width:300px;float:left;">
                <el-input v-model="form.valuation_client_phone" placeholder="请输入"></el-input>
            </el-form-item>

            <el-form-item style="position:relative;width:300px;float:left;">
                <span style="float:left;cursor: pointer;position:absolute;left:50px;" @click="Select('settlement_method','')">结算方式*</span>
                <el-input  style="width:180px;" placeholder="请输入" v-model="form.settlement_method"></el-input>
            </el-form-item>

            <!-- <el-form-item label="" class="form-input" prop="title" style="width:300px;float:left;">
                <el-input v-model="form.settlement_method"></el-input>
            </el-form-item> -->

            <el-form-item label="应收金额(元)" class="form-input" prop="title" style="width:300px;float:left;">
                <el-input v-model="form.money_due" placeholder="请输入"></el-input>
            </el-form-item>

            <el-form-item label="付费" class="select" style="">
                <el-select v-model="form.payment_order" filterable style="width:120px;">
                      <el-option
                      v-for="item in payment_order"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                      </el-option>
                </el-select>
              </el-form-item>

        </el-form>

        <!-- <div style="margin-top:15px;float:left;margin-bottom:20px;width:100%;background:rgb(48,65,85);color:white;height:30px;"><span style="float:left;margin-left:10px;margin-top:5px;font-size:15px;">收费信息</span></div>
        <el-form ref="form" :model="form" label-width="120px" style="width:90%;padding-right:50px;">

            <el-form-item label="是否要发票" class="form-input" prop="title" style="width:300px;float:left;">
                <el-input v-model="form.invoice"></el-input>
            </el-form-item>

            <el-form-item label="是否要合同" class="form-input" prop="title" style="width:300px;float:left;">
                <el-input v-model="form.contract"></el-input>
            </el-form-item>

            

            <el-form-item label="收费备注(元)" class="form-input" prop="title" style="width:300px;float:left;">
                <el-input v-model="form.fee_note"></el-input>
            </el-form-item>
        </el-form> -->

        <div style="margin-top:15px;float:left;margin-bottom:20px;width:100%;background:rgb(48,65,85);color:white;height:30px;"><span style="float:left;margin-left:10px;margin-top:5px;font-size:15px;">勘察事项</span></div>
        <el-form ref="form" :model="form" label-width="120px" style="width:90%;padding-right:50px;">
            <!-- <el-form-item label="是否勘察" class="form-input" prop="title" style="width:300px;float:left;">
                <el-input v-model="form.reconnaissance"></el-input>
            </el-form-item> -->
            <el-form-item label="勘察" class="form-input" prop="title" style="width:300px;float:left;">
                <el-radio v-model="reconnaissance" label="1">是</el-radio>
                <el-radio v-model="reconnaissance" label="0">否</el-radio>
            </el-form-item>
            <el-form-item label="勘察备注" class="form-input" prop="title" style="width:300px;float:left;">
                <el-input v-model="form.costs_reserved" placeholder="请输入"></el-input>
            </el-form-item>

            <el-button type="primary" style="float:left;margin-left:50px;" plain @click="addContact()">
                添加
            </el-button>

            <el-table 
            class="table-picture"
            :data="linkman"
            border
            max-height="150"
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
                    <el-button size="small" type="primary" @click="updateContact(scope.row,scope.$index)" >修改</el-button>
                    <el-button size="small" type="danger" @click="delContact(scope.$index)" >删除</el-button>
                </template>
            </el-table-column>

            </el-table>
            
        </el-form>
        
        <div style="margin-top:15px;float:left;margin-bottom:20px;width:100%;background:rgb(48,65,85);color:white;height:30px;"><span style="float:left;margin-left:10px;margin-top:5px;font-size:15px;">报告发送方式</span></div>
        <el-form ref="form" :model="form" label-width="120px" style="width:90%;padding-right:50px;">

            <el-form-item label="备注" class="form-input" prop="title" style="width:300px;float:left;">
                <el-input v-model="form.delivery_note" placeholder="请输入"></el-input>
            </el-form-item>

            <el-form-item label="收取方式" class="select" >
                <el-select @change="selectExpress" v-model="express" filterable placeholder="请选择" style="width:180px;float:left;">
                    <el-option
                    v-for="item in express1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
              </el-form-item>

              <el-button type="primary" v-show="tableShow" style="float:left;margin-left:50px;" plain @click="addExpress()">
                添加
            </el-button>
              
              <el-table 
              v-show="tableShow"
                class="table-picture"
                :data="ContractList"
                border
                max-height="150"
                style="width:80%;margin-left:50px;float:left;">

                <el-table-column
                label="姓名"
                align="center">
                    <template slot-scope="scope">
                    {{scope.row.name}}
                    </template>
                </el-table-column>

                <el-table-column
                label="联系电话"
                align="center">
                    <template slot-scope="scope">
                    {{scope.row.telephone}}
                    </template>
                </el-table-column>

                <el-table-column
                label="所属机构"
                align="center">
                    <template slot-scope="scope">
                    {{scope.row.subsidiary_organ}}
                    </template>
                </el-table-column>

                <el-table-column
                label="分支机构"
                align="center">
                    <template slot-scope="scope">
                    {{scope.row.affiliated_agency}}
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
                label="操作"
                align="center">
                    <template slot-scope="scope">
                        <el-button size="small" type="primary" @click="updateContact1(scope.row,scope.$index)" >修改</el-button>
                        <el-button size="small" type="danger" @click="delContact1(scope.$index)" >删除</el-button>
                    </template>
                </el-table-column>

                </el-table>
        </el-form>

        <div style="margin-top:15px;float:left;margin-bottom:20px;width:100%;background:rgb(48,65,85);color:white;height:30px;"><span style="float:left;margin-left:10px;margin-top:5px;font-size:15px;">合同选择</span></div>
        <el-form ref="form" style="width:90%;padding-right:50px;">
            <el-form-item >
                <!-- <el-input v-model="search" style="width:300px;" placeholder="请输入查询数据"></el-input>
                <el-button type="primary" style="" plain @click="serachBtn">搜索</el-button> -->
            </el-form-item>
        </el-form>
        <el-form ref="form" :model="form" label-width="120px" style="width:90%;padding-right:50px;">

                <el-form-item>
                    <el-input v-model="search" style="width:300px;" placeholder="甲方/合同编号"></el-input>
                    <el-button type="primary" style="" plain @click="serachBtn">搜索</el-button>
                </el-form-item>

                <el-table 
                @row-click="clickRow"
                class="table-picture"
                :data="contractList1"
                border
                ref="tb"
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
             placeholder="请输入"
            type="textarea"
            :autosize="{ minRows: 5, maxRows: 10}"
            v-model="form.project_approval_remark">
            </el-input>
            <el-button type="primary" style="margin-top:15px;margin-left:60%;" plain @click="addProjectInitiation()">
                确认修改
            </el-button>
        </el-form>

        <!--*************模态框*************-->
        <el-dialog
        title="选择"
        :visible.sync="dialogVisible"
        width="50%">
                <el-button style="margin-top:10px;" v-for="(item,index) in selectBox" :key="index" @click="selectBtn(item.value,item.label)">{{item.value}}</el-button>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <!-- <el-button type="primary" @click="confirmRevision(),dialogVisible = false">修 改</el-button> -->
            </span>
        </el-dialog>
        <!--*************模态框结束*************-->

        <!--*************模态框*************-->
        <el-dialog
        title="选择"
        :visible.sync="dialogVisible1"
        width="50%">
                <el-button style="margin-top:10px;" v-for="(item,index) in selectBox1" :key="index" @click="selectBtn1(item.value,item.label)">{{item.label}}</el-button>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <!-- <el-button type="primary" @click="confirmRevision(),dialogVisible = false">修 改</el-button> -->
            </span>
        </el-dialog>
        <!--*************模态框结束*************-->
        
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
            search : '',
            dialogVisible : false,
            dialogVisible1 : false,
            dialogFormVisibleUpdate : false,
            dialogFormVisibleUpdate1 : false,
            update : {
                name:'',
                telephone: '',
            },
            i : '',
            k : '',
            subsidiary_organ1:[],
            affiliated_agency1:[],
            subsidiary_department1:[],
            kong : '',
            contractList1:[],
            checko : '',


            values_type : '',
            selectBox : [],
            selectBox1 : [],
            update1:{
                name: '',
                telephone: '',
                subsidiary_organ: '',
                affiliated_agency: '',
                company_addr: '',
            },
            add:{
                name: '',
                telephone: '',
                subsidiary_organ: '',
                affiliated_agency: '',
                company_addr: '',
            },
            report_tale1:[],
            inquiry_purpose1:[],
            project_classify1:[],
            market_leader1:[],
            ContractList:[],
            tableShow :true,
            express : '快递',
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
            payment_order : [
                {
                    label:'先付费',
                    value : '0'
                },{
                    label:'后付费',
                    value : '1'
                }
            ],
            form : {
                mortgage_price : '',
                payment_order : '',
                report_number:'',
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
                fee_note : '',
                costs_reserved : '',
                materials_offer_way : '',
                courier_method : '',
                delivery_note : '',
                project_approval_remark : '',
                right_nature : '',
            },
            reconnaissance : '1',
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
       this.getSelect()
    },
    methods: {
        clickRow(row){
            this.$refs.tb.toggleRowSelection(row);
        },
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
        delContact1(row){//删除联系人
            // console.log(row)
            this.ContractList.splice(row,1)
        },
        addContact(){//添加联系人
            this.dialogFormVisible = true;
        },
        selectExpress(){//收取方式
            if(this.express == '1'){
                this.tableShow = true;
                // request.post("/admin/project/getContractList").then(res => {
                //     if (res.code == 200) {
                //         this.contractList1 = res.data;
                //     }
                // });
            }
        },
        serachBtn(){
            console.log(this.search)
            request.post("/admin/contractManagement/query",{
                keyword : this.search,
            }).then(res => {
                if (res.code == 200) {
                    this.contractList1 = res.data.list;
                }
            });
        },
        addContactBtn(){
            var s={};
            s.name = this.name;
            s.telephone = this.telephone;
            console.log(s)
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
            s.subsidiary_organ = this.add.subsidiary_organ;
            s.affiliated_agency = this.add.affiliated_agency;
            s.company_addr = this.add.company_addr;
            // s.post_code = this.add.post_code;
            this.ContractList.push(s)
            this.ContractList.forEach(element => {
                console.log(element)
            });
            this.$message({
                // type: res.errno === 0 ? "success" : "warning",
                type: "success",
                message: '添加联系人成功'//提示添加成功
            });
            this.add.name = '';
            this.add.telephone = '';
            this.add.subsidiary_organ = '';
            this.add.affiliated_agency = '';
            this.add.company_addr = '';
            // this.add.post_code = '';
            this.dialogFormVisible1 = false;
        },
        getSelect() {//初始渲染列表方法封装
            this.form = this.$route.query.row;
            // if()
            this.reconnaissance = this.$route.query.row.reconnaissance
            if(this.reconnaissance == 0){
                this.reconnaissance = '0'
            }else{
                this.reconnaissance = '1'
            }
            console.log(this.reconnaissance)
            this.form.project_address = this.$route.query.row.district+this.$route.query.row.plot_name+this.$route.query.row.plot_address+this.$route.query.row.unit_number;
            console.log(this.form.reconnaissance)
            console.log(this.form)
            if(this.form.payment_order == '0'){
                this.form.payment_order ='先付费'
            }else{
                this.form.payment_order ='后付费'
            }
            // request.post("/admin/askPrice/param").then(res => {
                
            //     // console.log(res.data)
            //     if (res.code == 200) {
            //         console.log(res)
            //         this.city=res.data.param.city;//城市
            //         this.bank=res.data.param.bank;//询价银行
            //         this.factor=res.data.param.factor;//特殊因素
            //         this.factor_value=res.data.param.factor_value;//净值系数
            //         this.house_way=res.data.param.house_way;//房屋用途
            //         this.type=res.data.param.type;//房屋类型
                    
            //         this.bazaar_crew=res.data.bazaar_crew;//市场人员
            //         this.ask_price=res.data.ask_price;//报值人员
            //         this.price_check=res.data.price_check;//价格变更审核人员
            //         console.log(this.ask_price)
            //     }
            // });
            request.post("/admin/project/get",{
                id : this.$route.query.row.id,
            }).then(res => {
                    if (res.code == 200) {
                        console.log(res)
                        this.linkman = res.data.linkman;
                        if(!this.linkman){
                            this.linkman = [];
                        }
                        this.ContractList = res.data.express;
                        if(!this.ContractList){
                            this.ContractList = [];
                        }
                        this.checko = res.data.project_contract_id;
                    }
            });

            request.post("/admin/contractManagement/query").then(res => {
                    if (res.code == 200) {
                        this.contractList1 = res.data.list;
                    }
            });

        },
        addProjectInitiation(){
            
            // console.log(this.form)
            if(this.form.payment_order == '先付费'){
                this.form.payment_order = 0;
            }else if(this.form.payment_order == '后付费'){
                this.form.payment_order = 1;
            }
            request.post("/admin/project/update",{
                id : this.$route.query.row.id,
                // ask_price_id : this.$route.query.row.ask_price_id,
                house_type : this.house_type,
                plot_name : this.form.plot_name,
                right_nature : this.form.right_nature,
                unit_number : this.form.unit_number,
                construct_area : this.form.construct_area,
                ask_price : this.form.ask_price,
                ask_univalence : this.form.ask_univalence,
                ask_price_total : this.form.ask_price_total,
                project_enquiry_department : this.form.enquiry_department,
                city : this.form.city,
                district : this.form.district,
                plot_address : this.form.plot_address,
                floor : this.form.floor,
                activate_time : this.form.activate_time,
                house_way : this.form.house_way,
                ask_bank : this.form.ask_bank,
                remark : this.form.remark,
                total_floor : this.form.total_floor,
                plot_special : this.form.plot_special,
                total_prices : this.form.total_prices,
                bazaar_crew : this.form.bazaar_crew,
                factor : this.form.factor,
                bank_clerk : this.form.bank_clerk,
                bank_phone : this.form.bank_phone,
                subsidiary_department : this.form.subsidiary_department,
                send_num : this.form.send_num,
                subsidiary_organ : this.form.subsidiary_organ,
                affiliated_agency : this.form.affiliated_agency,
                mortgage_price : this.form.mortgage_price,
                project_contract_id :this.checko,
                linkman : this.linkman,
                // ask_price_id : this.$route.query.id,
                
                project_classify : this.form.project_classify,
                inquiry_purpose : this.form.inquiry_purpose,
                property_type : this.form.property_type,
                report_tale : this.form.report_tale,
                express : this.ContractList,
                project_address : this.form.project_address,
                load_address : this.form.load_address,

                lending_agency : this.form.lending_agency,
                lending_bank : this.form.lending_bank,

                valuation_principal : this.form.valuation_principal,
                valuation_client_phone : this.form.valuation_client_phone,
                settlement_method : this.form.settlement_method,
                land_area : this.form.land_area,
                total_net_price : this.form.total_net_price,
                money_due : this.form.money_due,
                payment_order : this.form.payment_order,
                market_leader : this.form.market_leader,
                invoice : this.form.invoice,
                contract : this.form.contract,
                fee_note : this.form.fee_note,
                reconnaissance : this.reconnaissance,
                costs_reserved : this.form.costs_reserved,
                materials_offer_way : this.form.materials_offer_way,
                courier_method : this.form.courier_method,
                report_number:this.form.report_number,
                delivery_note : this.form.delivery_note,
                project_approval_remark : this.form.project_approval_remark,
            }).then(res => {
            // console.log(res)
            if (res.code == 200) {
              this.$message({
                // type: res.errno === 0 ? "success" : "warning",
                type: "success",
                message: '修改成功'//提示修改成功
            });
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
        Select1(type,name){
            if(type == 'payment_order'){
                this.dialogVisible1 = true;
                request.post("/admin/values/query",{
                    type : type,
                    name : name,
                }).then(res => {
                    if (res.code == 200) {
                        console.log(res)
                        this.values_type = 'payment_order';
                        this.selectBox1 = res.data;
                    }
                });
            }
        },
        Select(type,name){
            this.selectBox = [];
            if(type == 'city'){
                this.dialogVisible = true;
                request.post("/admin/values/query",{
                    type : type,
                    name : name,
                }).then(res => {
                    if (res.code == 200) {
                        this.values_type = 'city';
                        this.selectBox = res.data;
                    }
                });
            }else if(type == 'city_children'){
                this.dialogVisible = true;
                request.post("/admin/values/query",{
                    type : type,
                    name : this.form.city,
                }).then(res => {
                    if (res.code == 200) {
                        this.values_type = 'city_children';
                        this.selectBox = res.data;
                    }
                });
            }else if(type == 'enquiry_department'){
                this.dialogVisible = true;
                request.post("/admin/values/query",{
                    type : type,
                    name : name,
                }).then(res => {
                    if (res.code == 200) {
                        this.values_type = 'enquiry_department';
                        this.selectBox = res.data;
                    }
                });
            }else if(type == 'house_way'){
                this.dialogVisible = true;
                request.post("/admin/values/query",{
                    type : type,
                    name : name,
                }).then(res => {
                    if (res.code == 200) {
                        this.values_type = 'house_way';
                        this.selectBox = res.data;
                    }
                });
            }else if(type == 'ask_bank'){
                this.dialogVisible = true;
                request.post("/admin/values/query",{
                    type : type,
                    name : name,
                }).then(res => {
                    if (res.code == 200) {
                        this.values_type = 'ask_bank';
                        this.selectBox = res.data;
                    }
                });
            }else if(type == 'ask_bank_children'){
                this.dialogVisible = true;
                request.post("/admin/values/query",{
                    type : type,
                    name : this.form.subsidiary_organ,
                }).then(res => {
                    if (res.code == 200) {
                        this.values_type = 'ask_bank_children';
                        this.selectBox = res.data;
                    }
                });
            }else if(type == 'ask_bank2'){
                this.dialogVisible = true;
                request.post("/admin/values/query",{
                    type : 'ask_bank',
                    name : name,
                }).then(res => {
                    if (res.code == 200) {
                        this.values_type = 'ask_bank2';
                        this.selectBox = res.data;
                    }
                });
            }else if(type == 'ask_bank_children2'){
                this.dialogVisible = true;
                request.post("/admin/values/query",{
                    type : 'ask_bank_children',
                    name : this.form.lending_agency,
                }).then(res => {
                    if (res.code == 200) {
                        this.values_type = 'ask_bank_children2';
                        this.selectBox = res.data;
                    }
                });
            }else if(type == 'project_classify'){
                this.dialogVisible = true;
                request.post("/admin/values/query",{
                    type : type,
                    name : name,
                }).then(res => {
                    if (res.code == 200) {
                        this.values_type = 'project_classify';
                        this.selectBox = res.data;
                    }
                });
            }else if(type == 'inquiry_purpose'){
                this.dialogVisible = true;
                request.post("/admin/values/query",{
                    type : type,
                    name : name,
                }).then(res => {
                    if (res.code == 200) {
                        this.values_type = 'inquiry_purpose';
                        this.selectBox = res.data;
                    }
                });
            }else if(type == 'report_tale'){
                this.dialogVisible = true;
                request.post("/admin/values/query",{
                    type : type,
                    name : name,
                }).then(res => {
                    if (res.code == 200) {
                        this.values_type = 'report_tale';
                        this.selectBox = res.data;
                    }
                });
            }else if(type == 'settlement_method'){
                this.dialogVisible = true;
                request.post("/admin/values/query",{
                    type : type,
                    name : name,
                }).then(res => {
                    if (res.code == 200) {
                        this.values_type = 'settlement_method';
                        this.selectBox = res.data;
                    }
                });
            }else if(type == 'ask_bank1'){
                this.dialogVisible = true;
                request.post("/admin/values/query",{
                    type : 'ask_bank',
                    name : name,
                }).then(res => {
                    if (res.code == 200) {
                        this.values_type = 'ask_bank1';
                        this.selectBox = res.data;
                    }
                });
            }else if(type == 'bazaar_crew'){
                this.dialogVisible = true;
                request.post("/admin/values/query",{
                    type : type,
                    name : name,
                }).then(res => {
                    if (res.code == 200) {
                        this.values_type = 'bazaar_crew';
                        this.selectBox = res.data;
                    }
                });
            }else if(type == 'ask_price'){
                this.dialogVisible = true;
                request.post("/admin/values/query",{
                    type : type,
                    name : name,
                }).then(res => {
                    if (res.code == 200) {
                        this.values_type = 'ask_price';
                        this.selectBox = res.data;
                    }
                });
            }else if(type == 'subsidiary_department'){
                this.dialogVisible = true;
                request.post("/admin/values/query",{
                    type : type,
                    name : name,
                }).then(res => {
                    if (res.code == 200) {
                        this.values_type = 'subsidiary_department';
                        this.selectBox = res.data;
                    }
                });
            }else if(type == 'subsidiary_department_children'){
                this.dialogVisible = true;
                request.post("/admin/values/query",{
                    type : type,
                    name : this.form.lending_agency,
                }).then(res => {
                    if (res.code == 200) {
                        this.values_type = 'subsidiary_department_children';
                        this.selectBox = res.data;
                    }
                });
            }else if(type == 'right_nature'){
                this.dialogVisible = true;
                request.post("/admin/values/query",{
                    type : type,
                    name : name,
                }).then(res => {
                    if (res.code == 200) {
                        this.values_type = 'right_nature';
                        this.selectBox = res.data;
                    }
                });
            }
        },
        updateContact(row,index){//修改联系人
            // console.log(row,index)
            this.i = index;
            this.update.name = row.name;
            this.update.telephone = row.telephone;
            this.dialogFormVisibleUpdate = true;
            // console.log(this.update)
        },
        updateContactBtn(){
            this.linkman[this.i].name = this.update.name;
            this.linkman[this.i].telephone = this.update.telephone;
            // console.log(this.update)
            // this.linkman.splice(this.i,1,this.update);
            // console.log(this.linkman)
            this.$message({
                // type: res.errno === 0 ? "success" : "warning",
                type: "success",
                message: '修改成功'//提示修改成功
            });
            this.update.name = '';
            this.update.telephone = '';
            this.dialogFormVisibleUpdate = false;
        },
        updateContact1(row,index){//修改联系人
            // console.log(row,index)
            this.k = index;
            this.update1.name = row.name;
            this.update1.telephone = row.telephone;
            this.update1.subsidiary_organ = row.subsidiary_organ;
            this.update1.affiliated_agency = row.affiliated_agency;
            this.update1.company_addr = row.company_addr;
            this.dialogFormVisibleUpdate1 = true;
            // console.log(this.update)
        },
        updateContactBtn1(){
            this.ContractList[this.k].name = this.update1.name;
            this.ContractList[this.k].telephone = this.update1.telephone;
            this.ContractList[this.k].subsidiary_organ = this.update1.subsidiary_organ;
            this.ContractList[this.k].affiliated_agency = this.update1.affiliated_agency;
            this.ContractList[this.k].company_addr = this.update1.company_addr;
            // console.log(this.update)
            // this.linkman.splice(this.i,1,this.update);
            // console.log(this.linkman)
            this.$message({
                // type: res.errno === 0 ? "success" : "warning",
                type: "success",
                message: '修改成功'//提示修改成功
            });
            
            this.update1.name = '';
            this.update1.telephone = '';
            this.update1.subsidiary_organ = '';
            this.update1.affiliated_agency = '';
            this.update1.company_addr = '';
            this.dialogFormVisibleUpdate1 = false;
        },
        selectBtn1(value,label){
            // console.log(this.values_type)
            if(this.values_type == 'payment_order'){
                this.dialogVisible1 = false;
                this.form.payment_order = label;
            }
        },
        selectBtn(value,label){
            if(this.values_type == 'city'){
                this.dialogVisible = false;
                this.form.city = value;
            }else if(this.values_type == 'city_children'){
                this.dialogVisible = false;
                this.form.district = value;
            }else if(this.values_type == 'enquiry_department'){
                this.dialogVisible = false;
                this.form.enquiry_department = value;
            }else if(this.values_type == 'house_way'){
                this.dialogVisible = false;
                this.form.house_way = value;
            }else if(this.values_type == 'ask_bank'){
                this.dialogVisible = false;
                this.form.subsidiary_organ = value;
            }else if(this.values_type == 'ask_bank_children'){
                this.dialogVisible = false;
                this.form.affiliated_agency = value;
            }else if(this.values_type == 'project_classify'){
                this.dialogVisible = false;
                this.form.project_classify = value;
            }else if(this.values_type == 'inquiry_purpose'){
                this.dialogVisible = false;
                this.form.inquiry_purpose = value;
            }else if(this.values_type == 'report_tale'){
                this.dialogVisible = false;
                this.form.report_tale = value;
            }else if(this.values_type == 'settlement_method'){
                this.dialogVisible = false;
                this.form.settlement_method = value;
            }else if(this.values_type == 'ask_bank1'){
                this.dialogVisible = false;
                this.form.ask_bank = value;
            }else if(this.values_type == 'bazaar_crew'){
                this.dialogVisible = false;
                this.form.bazaar_crew = value;
            }else if(this.values_type == 'ask_price'){
                this.dialogVisible = false;
                this.form.ask_price = value;
            }else if(this.values_type == 'subsidiary_department'){
                this.dialogVisible = false;
                this.form.lending_agency = value;
            }else if(this.values_type == 'subsidiary_department_children'){
                this.dialogVisible = false;
                this.form.lending_bank = value;
            }else if(this.values_type == 'ask_bank2'){
                this.dialogVisible = false;
                this.form.lending_agency = value;
            }else if(this.values_type == 'ask_bank_children2'){
                this.dialogVisible = false;
                this.form.lending_bank = value;
            }else if(this.values_type == 'right_nature'){
                this.dialogVisible = false;
                this.form.right_nature = value;
            }
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