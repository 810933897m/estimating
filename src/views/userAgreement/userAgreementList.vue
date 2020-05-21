<template>
    <div class="app-container">
        <!-- *************列表渲染************* -->
        <div>
        </div>
       <div id="app">
            <div id="Test">
              <quill-editor ref="myTextEditor"
                    v-model="content" :options="quillOption">
              </quill-editor> 
            </div>
      </div>

      <el-button type="primary" style="margin-left:80%;margin-top:80px;" plain @click="submitUser()">
          保存
      </el-button>
    </div>
</template>

<script>
import request from "@/utils/request";
import quillConfig from '@/utils/quill-config'
import { quillEditor } from 'vue-quill-editor'
// import UE from '../../components/ue/ue.vue';
export default {
  components: {quillEditor},
    created() {
        this.tableListColumn = [...TABLE_LIST_COLUMN];
        // this.tableCrriculumList = [...TABLE_CRRICULUM_LIST];
        console.log(this.quillOption)
    },
    data() {
        return {
          quillOption: quillConfig,
          defaultMsg:'',
            config:{
                serverUrl:"http://192.168.2.137:100/uploadsFiles/php/controller.php?",
                autoHeightEnabled: true,
                autoFloatEnabled: true
            },
          editorText: '', // 双向同步的变量
          editorTextCopy: '',  // content-change 事件回掉改变的对象
            content: '',
            Id:'',
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
    computed: {
         editor() {
            return this.$refs.myTextEditor.quillEditor;
          }
    },
    created(){
       this.getList();
    },
    methods: {
        onContentChange (val) {
          this.editorTextCopy = val;
          window.console.log(this.editorTextCopy)
        },
        afterChange () {
          
        },
        ss(){
            console.log('2222')
        },
        getList(){
            request.post("/api/index/agreement").then(res => {
                if (res.code === 200) {
                    this.Id = res.data.id;
                    this.content = res.data.content;
                    this.defaultMsg = res.data.content;
                    // console.log(this.content)
                }
            });
        },
        onEditorBlur(editor) {},
          // 获得焦点
        onEditorFocus(editor) {},
          // 开始
        onEditorReady(editor) {},
          // 值发生变化
        // onEditorChange(editor) {
        //     // console.log(editor)
        //     this.editorText = editor.html;
        // },
        submitUser(){
          console.log(this.content)
            request.post("/api/user/agreement/info/"+this.Id,{
                content : this.content,
                // content : this.defaultMsg,
                id : this.Id,
            }).then(res => {
                if (res.code === 200) {
                    this.$message({
                        // type: res.errno === 0 ? "success" : "warning",
                        type: "success",
                        message: '用户协议修改成功!'//提示添加成功
                    });
                }
            });
        }
          
    }
};
</script>

<style style lang="less" scoped>
#Test{
  height: 500px;
  overflow: auto;
}
.ivu-upload {
    display: none;
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

.editor {
    line-height: normal !important;
    height: 500px;
  }
  .ql-snow .ql-tooltip[data-mode=link]::before {
    content: "请输入链接地址:";
  }
  .ql-snow .ql-tooltip.ql-editing a.ql-action::after {
      border-right: 0px;
      content: '保存';
      padding-right: 0px;
  }
 
  .ql-snow .ql-tooltip[data-mode=video]::before {
      content: "请输入视频地址:";
  }
 
  .ql-snow .ql-picker.ql-size .ql-picker-label::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item::before {
    content: '14px';
  }
  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value=small]::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=small]::before {
    content: '10px';
  }
  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value=large]::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=large]::before {
    content: '18px';
  }
  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value=huge]::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=huge]::before {
    content: '32px';
  }
 
  .ql-snow .ql-picker.ql-header .ql-picker-label::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item::before {
    content: '文本';
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
    content: '标题1';
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
    content: '标题2';
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
    content: '标题3';
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
    content: '标题4';
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
    content: '标题5';
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
    content: '标题6';
  }
 
  .ql-snow .ql-picker.ql-font .ql-picker-label::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item::before {
    content: '标准字体';
  }
  .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=serif]::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=serif]::before {
    content: '衬线字体';
  }
  .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=monospace]::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=monospace]::before {
    content: '等宽字体';
  }
</style>