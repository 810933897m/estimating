<template>
    <div class="app-container">
        <el-form ref="form" :model="form" label-width="90px">
            <el-form-item label="产品名称" class="form-input" prop="title">
                <el-input v-model="form.product_name" placeholder="请输入产品名称"></el-input>
            </el-form-item>

            <el-form-item label="产品简介" class="form-input" prop="subtitle">
                <el-input v-model="form.introduction" placeholder="请输入产品简介"></el-input>
            </el-form-item>

            <el-form-item label="公司名称" class="form-input" prop="integral">
                <el-input v-model="form.company_name" placeholder="请输入公司名称"></el-input>
            </el-form-item>

            <el-form-item label="产品介绍" class="form-input" prop="subtitle">
                <!-- <el-input v-model="form.product_content" placeholder="请输入产品介绍"></el-input> -->
                <quill-editor ref="myTextEditor" class="editor"
                        v-model="form.product_content" :options="quillOption">
                </quill-editor>
            </el-form-item>

            <el-form-item label="产品分类" style="margin-top:120px;" class="form-input" prop="integral">
                <el-select v-model="form.classify" filterable placeholder="请选择产品分类">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.product_classification"
                    :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="封面图" prop="coverFile">
                    <el-upload
                        class="upload-demo"
                        ref="upload"
                        :limit="1"
                        :http-request="ImgUploadSectionFile"
                        :with-credentials="true"
                        :auto-upload="true"
                        accept=".png,.jpg,.gif,.svg"
                        action=""
                        list-type="list"
                        :file-list="fileList">
                            <el-button slot="trigger" type="primary">选取图片</el-button>
                    </el-upload>
            </el-form-item>

            <el-form-item label="轮播图" prop="coverFile">
                    <el-upload
                        class="upload-demo"
                        ref="upload1"
                        :limit="3"
                        :http-request="ImgUploadSectionFile1"
                        :with-credentials="true"
                        :auto-upload="true"
                        accept=".png,.jpg,.gif,.svg"
                        action=""
                        list-type="list"
                        :file-list="fileList">
                            <el-button slot="trigger" type="primary">选取图片</el-button>
                    </el-upload>
            </el-form-item>
        </el-form>

        <el-button type="primary" style="float:left;margin-left:40%;margin-bottom:40px;" plain @click="addCommodity()">立即添加</el-button>
    </div>
</template>

<script>
import request from "@/utils/request";
import quillConfig from '@/utils/quill-config';
import { quillEditor } from 'vue-quill-editor';
export default {
    created() {
        
    },
    data() {
        return {
            quillOption: quillConfig,
            fileList:[],
            cpPicture:[],
            paramFile : '',
            form : {
                product_name : '',
                introduction : '',
                company_name : '',
                product_content : '',
                classify : '',
                picture : '',
            },
            imageUrl : '',
            options:[],//分类
            picture1:[],

            editorOption: {
              modules: {
                toolbar: [
                  ["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线
                  ["blockquote", "code-block"], // 引用  代码块
                  [{ header: 1 }, { header: 2 }], // 1、2 级标题
                  [{ list: "ordered" }, { list: "bullet" }], // 有序、无序列表
                  [{ script: "sub" }, { script: "super" }], // 上标/下标
                  [{ indent: "-1" }, { indent: "+1" }], // 缩进
                  // [{'direction': 'rtl'}],                         // 文本方向
                  [{ size: ["small", false, "large", "huge"] }], // 字体大小
                  [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
                  [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
                  [{ font: [] }], // 字体种类
                  [{ align: [] }], // 对齐方式
                  ["clean"], // 清除文本格式
                  ["link", "image", "video"] // 链接、图片、视频
                ], //工具菜单栏配置
              },
              placeholder: '请在这里添加产品描述', //提示
              readyOnly: false, //是否只读
              theme: 'snow', //主题 snow/bubble
              syntax: true, //语法检测
            }

        };
    },
    components: {quillEditor},
    computed: {
       
    },
    created(){
      this.getClassify()
    },
    methods: {
        getClassify(){//调用分类列表
             request.post("/api/classify/list").then(res => {
                if (res.code === 200) {
                    this.options = res.data
                }
            });
        },
        onEditorBlur(editor) {},
          // 获得焦点
        onEditorFocus(editor) {},
          // 开始
        onEditorReady(editor) {},
          // 值发生变化
        onEditorChange(editor) {
            this.form.product_content = editor.html;
        },
        ImgUploadSectionFile(param){//图片上传
            let formData = new FormData();
                formData.append('thumb', param.file);
                request.post("/api/image/add", formData).then(res => {
                    if (res.code == 200){
                        this.form.picture = res.data;
                    }
                });
        },
        ImgUploadSectionFile1(param){//轮播图片上传
            let formData = new FormData();
            formData.append('thumb', param.file);
            request.post("/api/image/add", formData).then(res => {
                if (res.code == 200){
                    this.picture1.push(res.data);
                }
            });
        },

        addCommodity(){//点击提交按钮
            this.picture1=JSON.stringify(this.picture1)
            request.post("/api/product/add", {//发送数据到后台
                product_name : this.form.product_name,
                introduction : this.form.introduction,
                company_name : this.form.company_name,
                product_content : this.form.product_content,
                classify : this.form.classify,
                thumb : this.form.picture,
                banner : this.picture1,
                }).then(res => {
                    res.errno === 0 && this.getList();
                    this.$message({
                        // type: res.errno === 0 ? "success" : "warning",
                        type: "success",
                        message: '添加成功'//提示添加成功
                    });
                    this.form.product_name = '';
                    this.form.introduction = '';
                    this.form.company_name = '';
                    this.form.product_content = '';
                    this.form.classify = '';
                    this.$refs.upload.clearFiles();
                    this.$refs.upload1.clearFiles();
            });
        },
    }
};
</script>

<style style lang="less" scoped>
    .editor{
        width: 200%;
        height: 300px;
    }
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
        width:50%;
    }
</style>