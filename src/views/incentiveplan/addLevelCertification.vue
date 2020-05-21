<template>
    <div class="app-container">
        <el-form ref="form" :model="Plan" label-width="100px">
            <el-form-item label="合作伙伴id" class="form-input" prop="title">
                <el-input v-model="Plan.partner_id" placeholder="请输入合作伙伴id"></el-input>
            </el-form-item>

            <el-form-item label="代理商英文名" class="form-input" prop="describe">
                <el-input v-model="Plan.agent_english" placeholder="请输入代理商英文名"></el-input>
            </el-form-item>

            <el-form-item label="代理商中文名" class="form-input" prop="describe">
                <el-input v-model="Plan.agent_chinese" placeholder="请输入代理商中文名"></el-input>
            </el-form-item>

            <el-form-item label="代理商等级" class="form-input" prop="describe">
                <el-input v-model="Plan.agent_grade" placeholder="请输入代理商等级"></el-input>
            </el-form-item>

            <el-form-item label="销售认证达标" class="form-input" prop="describe">
                <el-input v-model="Plan.sales_target" placeholder="请输入销售认证达标"></el-input>
            </el-form-item>

            <el-form-item label="销售认证数量" class="form-input" prop="describe">
                <el-input v-model="Plan.sales_amount" placeholder="请输入销售认证数量"></el-input>
            </el-form-item>

            <el-form-item label="技术认证达标" class="form-input" prop="describe">
                <el-input v-model="Plan.technology_certification" placeholder="请输入技术认证达标"></el-input>
            </el-form-item>

            <el-form-item label="acma" class="form-input" prop="describe">
                <el-input v-model="Plan.acma" placeholder="请输入acma"></el-input>
            </el-form-item>

            <el-form-item label="acmp" class="form-input" prop="describe">
                <el-input v-model="Plan.acmp" placeholder="请输入acmp"></el-input>
            </el-form-item>

            <el-form-item label="acmx" class="form-input" prop="describe">
                <el-input v-model="Plan.acmx" placeholder="请输入acmx"></el-input>
            </el-form-item>

            <el-form-item label="acsa" class="form-input" prop="describe">
                <el-input v-model="Plan.acsa" placeholder="请输入acsa"></el-input>
            </el-form-item>

            <el-form-item label="acsp" class="form-input" prop="describe">
                <el-input v-model="Plan.acsp" placeholder="请输入acsp"></el-input>
            </el-form-item>

            <el-form-item label="acdp" class="form-input" prop="describe">
                <el-input v-model="Plan.acdp" placeholder="请输入acdp"></el-input>
            </el-form-item>

            <el-form-item label="cpss" class="form-input" prop="describe">
                <el-input v-model="Plan.cpss" placeholder="请输入cpss"></el-input>
            </el-form-item>

            <el-form-item label="accp" class="form-input" prop="describe">
                <el-input v-model="Plan.accp" placeholder="请输入accp"></el-input>
            </el-form-item>

            <el-form-item label="accx" class="form-input" prop="describe">
                <el-input v-model="Plan.accx" placeholder="请输入accx"></el-input>
            </el-form-item>

            <el-form-item label="业绩时间" class="form-input" prop="describe">
                <el-input v-model="Plan.performance_section" placeholder="请输入业绩时间"></el-input>
            </el-form-item>
        </el-form>
        
        <el-button type="primary" style="float:left;margin-left:40%;margin-bottom:40px;" plain @click="addPrize()">立即添加</el-button>
    </div>
</template>

<script>
import request from "@/utils/request";
export default {
    created() {
        
    },
    data() {
        return {
            userTimeModel:"",
            cpPicture:[],
            paramFile : '',
            Plan : {
                partner_id : '',
                agent_english : '',
                agent_chinese : '',
                agent_grade : '',
                sales_target : '',
                sales_amount : '',
                technology_certification : '',
                acma : '',
                acmp : '',
                acmx : '',
                acsa : '',
                acsp : '',
                acdp : '',
                cpss : '',
                accp : '',
                accx : '',
                performance_section : '',
            },
        };
    },
    computed: {
       
    },
    created(){
       
    },
    methods: {
        addPrize(){//点击按钮
            request.post("/api/user/attestation/add", {//发送数据到后台
                            partner_id : this.Plan.partner_id,
                            agent_english : this.Plan.agent_english,
                            agent_chinese : this.Plan.agent_chinese,
                            agent_grade : this.Plan.agent_grade,
                            sales_target : this.Plan.sales_target,
                            sales_amount : this.Plan.sales_amount,
                            technology_certification : this.Plan.technology_certification,
                            acma : this.Plan.acma,
                            acmp : this.Plan.acmp,
                            acmx : this.Plan.acmx,
                            acsa : this.Plan.acsa,
                            acsp : this.Plan.acsp,
                            acdp : this.Plan.acdp,
                            cpss : this.Plan.cpss,
                            accp : this.Plan.accp,
                            accx : this.Plan.accx,
                            performance_section : this.Plan.performance_section,
                        }).then(res => {
                            res.errno === 0 && this.getList();
                            this.$message({
                                // type: res.errno === 0 ? "success" : "warning",
                                type: "success",
                                message: '添加成功'//提示添加成功
                            });
                            this.Plan={
                                partner_id : '',
                                agent_english : '',
                                agent_chinese : '',
                                agent_grade : '',
                                sales_target : '',
                                sales_amount : '',
                                technology_certification : '',
                                acma : '',
                                acmp : '',
                                acmx : '',
                                acsa : '',
                                acsp : '',
                                acdp : '',
                                cpss : '',
                                accp : '',
                                accx : '',
                                performance_section : '',
                            };
                    })
                    .catch(res => {
                        this.$message({
                            type: "warning",
                            message: "添加失败!"
                        });
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
    .form-input{
        width:50%;
    }
</style>