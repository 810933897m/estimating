<template>
    <div class="app-container" style="">
        
        <!-- <el-tabs v-model="activeName" type="card" style="position:relative;">
            <el-tab-pane label="图片信息" name="img" style="display:flex;width:100%;"> -->
                
                <div style="width:690px;float:left;margin-top:10px;">
                    <!-- <el-button type="success" style="float:right;margin-top:5px;margin-right:10px;" circle icon="el-icon-check" @click="del(item.guid)"></el-button> -->
                    <div style="width:100%;float:left;">
                        <el-button type="primary" style="float:left;margin-left:20px;margin-top:0px;" plain @click="sortBtn()">保存排序</el-button>
                        <el-button type="info" style="float:left;margin-left:20px;margin-top:0px;" plain @click="loadBtn()">下载PDF</el-button>
                        <el-button type="primary" style="float:left;margin-left:20px;margin-top:0px;" plain @click="downdloadImage()">外勘图片上传</el-button>
                    </div>
                    <div v-for="(item,index) in slide1" v-dragging="{ list: slide1, item: item, group: 'src' }" :key="index" style="width:230px;float:left;margin-top:10px;">
                <!-- 　　　　<img :src=" item.src " alt=""> -->
                        <img @click="preview(item.src)" :src="item.msrc" alt="" class="preview">
                        <p style="margin-left:30px;float:left;width:150px;">{{item.title}}</p>
                        <el-button type="danger" style="float:right;margin-top:5px;margin-right:10px;" circle icon="el-icon-delete" @click="del(item.id)"></el-button>
                　　    
                    </div>
                    
                    
                    <!-- 查看报告任务弹出框 -->
                        <el-dialog style="" :append-to-body='true' title="查看大图" :visible.sync="dialogFormVisible">
                            <img class="preview1" :src="suolueImg" alt="">
                        </el-dialog>
                        <!-- **************查看报告任务弹出框************** -->
                </div>
                
                <div style="width:570px;float:left;border:1px solid #ccc;">
                    <!-- <p>回收站</p> -->
                    <div style="margin-top:0px;float:left;width:100%;background:rgb(48,65,85);color:white;height:30px;">
                        <span style="float:left;margin-left:10px;margin-top:5px;font-size:15px;">回收站</span>
                    </div>

                    <!-- <img class="preview" src="https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2815163630,30850862&fm=26&gp=0.jpg" alt="">
                    <img class="preview" src="https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2815163630,30850862&fm=26&gp=0.jpg" alt="">
                    <img class="preview" src="https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2815163630,30850862&fm=26&gp=0.jpg" alt="">
                    <img class="preview" src="https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2815163630,30850862&fm=26&gp=0.jpg" alt="">
                    <img class="preview" src="https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2815163630,30850862&fm=26&gp=0.jpg" alt="">
                    <img class="preview" src="https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2815163630,30850862&fm=26&gp=0.jpg" alt=""> -->
                    <div v-for="(item,index) in recovery" :key="index" style="width:230px;float:left;margin-top:10px;">
                <!-- 　　　　<img :src=" item.src " alt=""> -->
                        <img :src="item.thumb" alt="" class="preview2">
                        <p style="margin-left:30px;float:left;width:120px;">{{item.title}}</p>
                        <!-- <el-button type="danger" style="float:right;margin-top:5px;margin-right:10px;" circle icon="el-icon-delete" @click="del(item.id)"></el-button> -->
                        <!-- <el-button type="success" style="float:left;" circle @click="reduction(item.id)"></el-button> -->
                        <el-button type="primary" style="float:left;margin-top:5px;" plain @click="reduction(item.id)">还原</el-button>
                    </div>
                </div>

            <!-- </el-tab-pane> -->
            
                    
                        
                    <!-- <el-tab-pane label="地图信息" name="map"> -->

                        <el-form ref="form" label-width="120px" style="margin-top:10px;display:none;">
                            
                            <el-form-item label="具体位置" class="form-input" prop="title" style="width:60%;float:left;">
                                <el-input  placeholder="请输入" v-model="position"></el-input>
                            </el-form-item>

                            <el-button @click="positionBtn">
                                搜索
                            </el-button>

                            <el-button @click="canvas">
                                截屏
                            </el-button>
                            <!-- <el-button @click="baiduShowBtn">
                                地图
                            </el-button> -->

                            <el-tabs v-model="activeName1" @tab-click="handleClick" style="float:left;width:1000px;height:600px;">
                                <el-tab-pane label="全景图" name="first">
                                    <img v-show="!baiduShow1" style="width;1000px;height:600px;" :src="bigImg" alt="">
                                </el-tab-pane>

                                <el-tab-pane label="小区" name="second">
                                    <img v-show="!baiduShow1" style="width:1000px;height:600px;" :src="smallImg" alt="">
                                </el-tab-pane>
                                <!-- 百度地图插件 -->
                                <div style="float:left;width:1000px;height:600px;margin-top:;">
                                    <baidu-map 
                                    v-show="baiduShow1"
                                    id="allmap"
                                    :center="center"
                                    :zoom="zoom" 
                                    @ready="handler" 
                                    style="float:left;width:1000px;height:600px;"
                                    @click="getClickInfo" 
                                    :scroll-wheel-zoom='true'></baidu-map>
                                </div>
                            </el-tabs>
                            
                        </el-form>
                <!-- </el-tab-pane>
        </el-tabs> -->

        <div v-show="showText">
            <p>{{offsetX}}{{offsetY}}</p>
        </div>

          <!--*************收款记录模态框*************-->
        <el-dialog
        title="外勘图片上传"
        :visible.sync="dialogFormVisibleDownLoad"
        width="50%">
            <el-form ref="form" label-width="120px" style="width:100%;">
                  <el-form-item label="分类1" class="select" style="">
                  <el-select v-model="category"  @change="categoryChange" filterable style="width:300px;">
                      <el-option
                      v-for="item in category1"
                      :key="item.value"
                      :label="item.title"
                      :value="item.id">
                      </el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="分类2" class="select" style="">
                  <el-select v-model="Category" filterable style="width:300px;">
                      <el-option
                      v-for="item in Category1"
                      :key="item.value"
                      :label="item.title"
                      :value="item.id">
                      </el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="上传图片" prop="coverFile">
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
                    <el-button slot="trigger" type="primary">
                        选取图片
                    </el-button>
                </el-upload>
            </el-form-item>
            
                </el-form>
                  
            <span slot="footer" class="dialog-footer" style="margin-top:10px;">
                <el-button type="primary" @click="downLoadBtn(),dialogFormVisibleDownLoad = false">保 存</el-button>
                <el-button @click="dialogFormVisibleDownLoad = false">取 消</el-button>
            </span>
        </el-dialog>
        <!--*************收款记录模态框*************-->

    </div>
</template>

<script>
import request from "@/utils/request";
import { quillEditor } from 'vue-quill-editor';
import quillConfig from '@/utils/quill-config'
import map from '@/utils/city';
import {getImage} from '@/utils/image.js'
// import html2canvas from 'html2canvas'
export default {
    created() {
        
    },
    components: {
        // html2canvas
    },
    data() {
        return {
            picture : '',
            fileList : [],
            category : '',
            Category : '',
            category1 : [],
            Category1 : [],
            showText : false,
            offsetX : '',
            offsetY : '',
            loader : 'all',
            showImg : false,
            suolueImg : '',
            activeName1:'first',
            bigImg : '',
            smallImg:'',
            baiduShow1 : false,
            position : '',
            activeName:'img',
            show1 : true,
            show : false,
            longitude:"",
            latitude:"",
            index_img:'',
            index11 : '',
            center: '中国',
      //  {lng: 109.45744048529967, lat: 36.49771311230842}
            zoom: 17,
            loadUrl: '',
            dialogFormVisible : false,
            dialogFormVisibleDownLoad : false,
            imgs: [
        {
          src: 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1598707441,413137432&fm=26&gp=0.jpg',
          author: 'Folkert Gorter',
          desc: 'This is dummy caption.',
          srcc: 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2785088131,2664545642&fm=26&gp=0.jpg',
        },
        {
            srcc: 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2785088131,2664545642&fm=26&gp=0.jpg',
          src: 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1598707441,413137432&fm=26&gp=0.jpg'
        },
        {
            srcc: 'https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1232401408,947868274&fm=26&gp=0.jpg',
          src: 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1598707441,413137432&fm=26&gp=0.jpg',
          author: 'Folkert Gorter2',
          msrc:'https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=125888265,1423921403&fm=26&gp=0.jpg',
          desc: 'It\'s a dummy caption. He who searches for meaning here will be sorely disappointed.'
        }
      ],
      srcList: [
          'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
          'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg',
          'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
        ],
            radio : '',
            list:[],
            list1:[],
            list11:[],
            slide1: [],
            slide11 : [],
            recovery : [],
        };
    },
    computed: {
       
    },
    mounted() {
　　　　this.$dragging.$on('dragged', (value) => {
        this.slide1.forEach((element,index) => {
            // console.log(index)
        });
　　　　//因为我这在排序的时候不需要做处理，所以空着就行
            // console.log(value)
            // console.log(this.slide1)
　　　　})
　　},
    created(){
       quillEditor,
       this.getlist()
    },
    methods: {
        handleClick(tab, event){
            this.baiduShow1 = false;
        },
        baiduShowBtn(){//百度地图显示
            
        },
        canvas(){
            localStorage.setItem('imgId',this.$route.query.id);
            // console.log('124124')
            if(this.activeName1 == 'first'){
                localStorage.setItem('big','big_image');
            }else{
                localStorage.setItem('big','small_image');
            }
            
            getImage()
            this.$message({
                // type: res.errno === 0 ? "success" : "warning",
                type: "success",
                message: '图片保存成功'//图片保存成功
            });
            // setTimeout()
            // setTimeout(location.reload(), 10000);
            //   let _this=this
                setTimeout(function()  {
                
                    location.reload()
                
                }, 2000);

            
        },
        preview(row){
            this.suolueImg = row;
            this.dialogFormVisible = true;
        },
        positionBtn(){
            // var map = new BMap.Map("allmap");          
            // map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);
            // var local = new BMap.LocalSearch(map, {
            // renderOptions:{map: map}
            // });
            // local.search(this.center);

            this.center = this.position;
            if(this.baiduShow1 == false){
                this.baiduShow1 = true;
                console.log(this.baiduShow1)
            }
            //else{
            //     this.baiduShow = false;
            // }
        },
        handler ({BMap, map}) {
            var point = new BMap.Point(109.49926175379778, 36.60449676862417)
            map.centerAndZoom(point, 13)
            var marker = new BMap.Marker(point) // 创建标注
            map.addOverlay(marker) // 将标注添加到地图中
            var circle = new BMap.Circle(point, 6, { strokeColor: 'Red', strokeWeight: 6, strokeOpacity: 1, Color: 'Red', fillColor: '#f03' })
            map.addOverlay(circle)
        },
        getClickInfo (e) {
            this.showText =true;
            this.offsetX = event.offsetX;
            this.offsetY = event.offsetY;
            console.log(event.offsetX,event.offsetY)
            var point = new BMap.Point(e.point.lng, e.point.lat);
                var gc = new BMap.Geocoder();
                let _this = this;
                gc.getLocation(point, function (rs) {
                    var addComp = rs.addressComponents;
                    // console.log(rs);//地址信息
                    // console.log(rs.surroundingPois[0].title);//地址信息
                    _this.position = rs.surroundingPois[0].address;
 
                });
        // console.log(e.point.lng)
        this.longitude=e.point.lng;
        this.latitude=e.point.lat;
        // console.log(e.point.lat)
        //this.center.lng = e.point.lng
        //this.center.lat = e.point.lat
        },
        loadBtn(){//下载材料跳转链接
            // console.log(this.$route.query.id)
            window.open(this.loadUrl, '_blank')
        },
        first(ind){
            // console.log(ind)
            this.index11= ind;
            
            this.show1 = false;
            this.show = true;
            this.list1 = [];
            this.list[this.index11].category.forEach(element => {
                this.list1.push(element)
            });
            // for(let i=0;i<this.list[ind].category.length;i++){
            //     this.list1.push(this.list[ind].category[i]) the image could not be loaded
            //     console.log(this.list[ind].category[i].title)
            //     console.log(this.list1)
            // }
        },
        last(inx){
            this.loader = 'one';
            this.index_img = inx;
            this.showImg = true;
            this.slide1 = [];
            this.imgs = [];
            console.log(inx)
            this.list1[this.index_img].files.forEach(element => {
                var ss={};
                ss.src = element.src;
                ss.msrc = element.thumb;
                ss.id = element.id;
                ss.title = element.title;
                ss.guid = element.guid;
                ss.w = 800;
                ss.h = 800;
                ss.order = element.order;
                
                this.slide1.push(ss)
                // this.imgs.push(ss)
                // element.thumb
                // this.list1.push(element)
            });
        },
        reduction(row){//删除图片
            console.log(row)
            this.$confirm("您确定要还原？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消"
            }).then(() => {
                request.post("/admin/appraisal/reduction", {
                        id:row
                }).then(res => {
                    // res.errno === 0 && this.getList();
                    this.$message({
                        // type: res.errno === 0 ? "success" : "warning",
                        type: "success",
                        message: '还原成功！'
                    });
                    if(this.showImg == false){
                        this.getlist();
                    }else{
                        location.reload();
                    }
                    
                }).catch(res => {
                    this.$message({
                        type: "warning",
                        message: "还原失败!"
                    });
                });
            });
        },
        del(row){//删除图片
            console.log(row)
            this.$confirm("您确定要删除？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消"
            }).then(() => {
                request.post("/admin/appraisal/delete", {
                        id:row
                }).then(res => {
                    // res.errno === 0 && this.getList();
                    this.$message({
                        // type: res.errno === 0 ? "success" : "warning",
                        type: "success",
                        message: '删除成功！'
                    });
                    if(this.showImg == false){
                        this.getlist();
                    }else{
                        location.reload();
                    }
                    
                }).catch(res => {
                    this.$message({
                        type: "warning",
                        message: "删除失败!"
                    });
                });
            });
        },
        getlist(){
            this.category1 = [];
            this.list11 = [];
            this.slide1 = [];
            request.post("/admin/appraisal/info",{
                id : this.$route.query.id
            }).then(res => {
                if (res.code == 200) {
                    this.slide11 = res.data.images
                    // console.log(slide11)
                    this.position = res.data.baidu.query;
                    this.bigImg = res.data.baidu.big_image;
                    this.smallImg = res.data.baidu.small_image;
                    // this.list = res.data.images;
                    // for(let i=0;i<this.list.length;i++){
                    //     this.list[i].category.forEach(element => {
                    //         // console.log('12412')
                    //         this.list11.push(element)
                    //     });
                    // }
                    // this.slide11 = [];
                    // this.imgs = [];

                    // for(let j=0;j<this.slide11.length;j++){
                        this.slide11.forEach(element => {
                            var ss={};
                            ss.src = element.src;
                            ss.msrc = element.thumb;
                            ss.id = element.id;
                            ss.guid = element.guid;
                            ss.title = element.title;
                            // console.log(element.id)
                            ss.w = 800;
                            ss.h = 800;
                            // ss.order = element.order;
                            this.slide1.push(ss)
                            // this.imgs.push(ss)
                            // element.thumb
                            // this.list1.push(element)
                        });
                    // }
                    this.recovery = res.data.recovery;
                    
                    this.loadUrl = res.data.download;
                }
            });
            
            request.post("/admin/appraisal/uploadType").then(res => {
                if (res.code == 200){
                    res.data.forEach(element => {
                        this.category1.push(element)
                    });
                    console.log(this.category1)
                    // this.category1 = res.data;
                }
            });
            
        },
        closeHandler () {
            console.log('cloooooose')
        },
        handleRemove (index, fileList, target) {
            console.log(index + fileList + target)
            this.imgs = fileList
        },
        sortBtn(){//排序
            let sort = [];
            this.slide1.forEach(element => {
                // console.log(element.id)
                // console.log(element.id)
                sort.push(element.id)
            });
            // console.log(sort)
            request.post("/admin/appraisal/order",{
                data : sort,
                // order : order,
            }).then(res => {
                if(res.code == 200){
                        this.$message({
                        // type: res.errno === 0 ? "success" : "warning",
                        type: "success",
                        message: '排序成功'//提示排序成功
                    });
                    // console.log(this.loader)
                    if(this.loader == 'all'){
                        this.getlist();
                    }
                    // else{
                    //     location.reload();
                    // }
                }
            })
        },
        downdloadImage(){
            console.log(this.$route.query.id)
            this.dialogFormVisibleDownLoad = true;
        },
        ImgUploadSectionFile(param){//图片上传
            let formData = new FormData();
            formData.append('images', param.file);
            request.post("/admin/appraisal/upload", formData).then(res => {
                if (res.code == 200){
                        this.$message({
                        // type: res.errno === 0 ? "success" : "warning",
                        type: "success",
                        message: '上传成功'//提示上传成功
                        });
                    this.picture = res.data;
                }
            });
        },
        downLoadBtn(){//确认按钮
            request.post("/admin/appraisal/uploads", {
                images : this.picture,
                pos : this.category,
                type : this.Category,
                id : this.$route.query.id
            }).then(res => {
                if (res.code == 200){
                        this.$message({
                        // type: res.errno === 0 ? "success" : "warning",
                        type: "success",
                        message: '上传成功'//提示上传成功
                        });
                    this.picture = res.data;
                    this.getlist();

                }
            });
            this.category = '';
            this.Category = '';
            this.$refs.upload.clearFiles();
            console.log(this.Category,this.category)
        },
        categoryChange(selVal){//改变第一层获取第二层数据
        this.Category1 = [];
            this.category1.forEach(element => {
                if(element.id == selVal){
                    element.category.forEach(element1 => {
                        this.Category1.push(element1)
                    });
                }
            });
        },
    }
};
</script>
<style style lang="less" scoped>
    .preview{
        width:200px;
        margin-left:20px;
        height: 200px;
        float:left;
        cursor: pointer;
    }
    .preview1{
        width:90%;
        margin-left:5%;
        height: 500px;
    }
    .preview2{
        width:200px;
        margin-left:20px;
        height: 200px;
        float:left;
    }
</style>