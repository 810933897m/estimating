<template>
    <div class="app-container">
        <el-form ref="form" :model="form" label-width="100px">
            <el-form-item label="分类名称" class="form-input" prop="title">
                <el-input v-model="form.product_classification" placeholder="请输入分类名称"></el-input>
            </el-form-item>

        </el-form>
        <el-button type="primary" style="float:left;margin-left:550px;margin-bottom:40px;" plain @click="addCommodity()">立即添加</el-button>
    </div>
</template>

<script>
import request from "@/utils/request";
export default {
    created() {
        
    },
    data() {
        return {
            cpPicture:[],
            paramFile : '',
            form : {
                product_classification : '',
            },
            imageUrl : '',

        };
    },
    computed: {
       
    },
    created(){
       
    },
    methods: {
        addCommodity(){//点击提交按钮
            request.post("/api/classify/add", {//发送数据到后台
                product_classification : this.form.product_classification,
                }).then(res => {
                    res.errno === 0 && this.getList();
                    this.$message({
                        // type: res.errno === 0 ? "success" : "warning",
                        type: "success",
                        message: '添加成功'//提示添加成功
                    });
                    this.form.product_classification = '';
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
.form-input{
    width:50%
}
</style>