<template>
    <div>
        <el-upload
            action=""
            ref="upload"
            :http-request="chunFileUplaod"
            :show-file-list="showFileList"
            :accept="accept"
            :on-remove="remove"
            :before-upload="beforeAvatarUpload"
        >
            <slot></slot>
        </el-upload>
    </div>
</template>
<script>
import { policy } from "@/api/oss";
import {chunkFile} from '@/utils/index';
import request from '@/utils/request';
import { Loading } from 'element-ui';
import { mapState } from "vuex";
export default {
    name: "singleUpload",
    props: {
        accept: String,
        path: String,
        'showFileList': Boolean,
        type: String
    },
    data () {
        fullscreenLoading: false
    },
    computed: {
        
        imageUrl() {
            return this.value;
        },
        imageName() {
            if (this.value != null && this.value !== "") {
                return this.value.substr(this.value.lastIndexOf("/") + 1);
            } else {
                return null;
            }
        },
        fileList() {
            return [
                {
                    name: this.imageName,
                    url: this.imageUrl
                }
            ];
        }
    },
    data() {
        return {
            dataObj: {
                policy: "",
                signature: "",
                key: "",
                ossaccessKeyId: "",
                dir: "",
                host: ""
            },
            dialogVisible: false
        };
    },
    methods: {
        beforeAvatarUpload(file){
            const isLtM = file.size / 1024 / 1024 < 200;
             if (!isLtM) {
                this.$message.error('上传视频大小不能超过 200MB!');
             }
              return isLtM 
        },
        chunFileUplaod(param) {
            const loadingInstance = Loading.service({
                text: '上传中请稍等',
                background: 'rgba(0, 0, 0, 0.8)'
            });
            const file = param.file;
            // this.$store.commit('SET_VIDEO_URL', file); // state赋值
            let windowURL = window.URL || window.webkitURL;
            const file_name = file.name;
            // console.log(windowURL.creatObjectURL(file));
            const total_blob_num = Math.ceil(file.size / (5 * 1024 * 1024));
            const total = Math.ceil(file.size / (5 * 1024 * 1024));
            
            const  blob_num = 1;
            const hash = String(Date.now() + file.uid + file.lastModified);
            console.log(file_name,blob_num,total)
            // for(let i= 0; i< total; i++){
            //     i++
            //     var blob_num = i;
            // }
            const arrAxios = chunkFile(param, total, hash, 1 * 1024 * 1024);
//             const arrAxios = chunkFile(param, total, hash, 1 * 1024 * 1024);

            const name = file.name;
            Promise.all(arrAxios).then(() => {
                request.post('/api/classroom/video/merge', {
                    blob_num : blob_num,
                    total_blob_num: total,
                    file_name : file_name,
                }).then(res => {
                    this.$message({
                        // type: res.errno === 0 ? "success" : "warning",
                        type: "success",
                        message: '视频添加成功!'//提示添加成功
                    });
                    // this.$refs.upload.clearFiles();
                    localStorage.setItem('videoSrc',res.data)
                    console.log(res)
                    // res.file_name = file_name;
                    this.$emit('onSuccess', res);
                    loadingInstance.close();
                })
            })
        },
        emitInput(val) {
            this.$emit("input", val);
        },
        handleRemove(file, fileList) {
            this.emitInput("");
        },
        handlePreview(file) {
            this.dialogVisible = true;
        },
        beforeUpload(file) {
            let _self = this;
            return new Promise((resolve, reject) => {
                policy()
                    .then(response => {
                        _self.dataObj.policy = response.data.policy;
                        _self.dataObj.signature = response.data.signature;
                        _self.dataObj.ossaccessKeyId =
                            response.data.accessKeyId;
                        _self.dataObj.key = response.data.dir + "/${filename}";
                        _self.dataObj.dir = response.data.dir;
                        _self.dataObj.host = response.data.host;
                        resolve(true);
                    })
                    .catch(err => {
                        console.log(err);
                        reject(false);
                    });
            });
        },
        remove(file){
            this.$emit('removeVideo',file)
        }

    }
};
</script>
<style>
</style>
