<template>
    <div class="box">
        <h4>分销详情</h4>
        <el-form :model="show" label-width="120px">
                <el-form-item label="文章标题:">
                    <el-input v-model="show.title" :disabled="true"></el-input>
                </el-form-item>

                <el-form-item label="文章内容:">
                    <el-input v-model="show.content" :disabled="true"></el-input>
                </el-form-item>

                <el-form-item label="封面图:">
                    <img class="picture" :src="'../../..'+show.thumb" alt="">
                </el-form-item>
        </el-form>
    </div>
</template>

<script>
import request from "@/utils/request";
export default {
    data() {
        return {
            show:[]
        };
    },
    computed: {

    },
    created(){
         this.getList();
    },
    methods: {
        getList(){
            request.post("/api/distribution/info/"+this.$route.query.id).then(res => {
                if (res.code === 200) {
                    this.show=res.data;
                }
            });
        }
    }
};
</script>

<style style lang="less" scoped>
    .box{
        width: 40%;
        margin-top: 20px;
    }
    #myVideo{
        width: 400px;
        height: 350px;
        background-color: #000000;
        border-radius: 20px;float: left;
        margin-top: 15px;
    }
    h4{
        margin-left:45px;
    }
    .picture{
        width:400px;
        margin-top: 12px;
    }
</style>