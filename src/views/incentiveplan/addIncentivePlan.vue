<template>
    <div class="app-container">
        <el-form ref="form" :model="Plan" label-width="100px">
            <el-form-item label="合作伙伴id" class="form-input" prop="title">
                <el-input v-model="Plan.partner_id" placeholder="请输入合作伙伴id"></el-input>
            </el-form-item>

            <el-form-item label="代理商名称" class="form-input" prop="describe">
                <el-input v-model="Plan.agency_company" placeholder="请输入代理商名称"></el-input>
            </el-form-item>

            <el-form-item label="挂账公司" class="form-input" prop="describe">
                <el-input v-model="Plan.payment_company" placeholder="请输入挂账公司"></el-input>
            </el-form-item>

            <el-form-item label="激励项目" class="form-input" prop="describe">
                <el-input v-model="Plan.Incentive_program" placeholder="请输入激励项目"></el-input>
            </el-form-item>

            <el-form-item label="实际业绩" class="form-input" prop="describe">
                <el-input v-model="Plan.actual_performance" placeholder="请输入实际业绩"></el-input>
            </el-form-item>

            <el-form-item label="奖励返点金额" class="form-input" prop="describe">
                <el-input v-model="Plan.rebates_money" placeholder="请输入奖励返点金额"></el-input>
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
                username : '',
                email : '',
                phone : '',
                partner_id : '',
                city : '',
                company : '',
                target_performance : '',
                actual_performance : '',
                achievement_rate : '',
                bonus_percentage : '',
                bonus : '',
                performance_time : '',
                level : '',
            },
        };
    },
    computed: {
       
    },
    created(){
       
    },
    methods: {
        addPrize(){//点击按钮
        console.log(this.userTimeModel)
            request.post("/api/user/stimulate/add", {//发送数据到后台
                            partner_id : this.Plan.partner_id,
                            agency_company : this.Plan.agency_company,
                            payment_company : this.Plan.payment_company,
                            Incentive_program : this.Plan.Incentive_program,
                            actual_performance : this.Plan.actual_performance,
                            rebates_money : this.Plan.rebates_money,
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
                                agency_company :'',
                                payment_company : '',
                                Incentive_program : '',
                                actual_performance :'',
                                rebates_money : '',
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