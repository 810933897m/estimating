<template>
    <div class="box">
        <h4>课程详情</h4>

        <el-form :model="show" label-width="120px">
            <el-form-item label="课程名称:">
                <el-input v-model="show.title" :disabled="true"></el-input>
            </el-form-item>

            <el-form-item label="讲师名称:">
                <el-input v-model="show.lecturer" :disabled="true"></el-input>
            </el-form-item>

            <el-form-item label="课程添加时间:">
                <el-input v-model="show.addtime" :disabled="true"></el-input>
            </el-form-item>

            <el-form-item label="学习视频:">
                <video
                id="myVideo"
                v-bind:src="'../../..'+show.course_video"
                class="avatar video-avatar"
                controls="controls">
                    您的浏览器不支持视频播放
                </video>
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
            request.post("/api/classroom/list/"+this.$route.query.id).then(res => {
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
    .picture{
        width:400px;
        margin-top: 12px;
    }
</style>