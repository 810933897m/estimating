<template>
    <div class="app-container" style="">
        <el-button type="info" style="float:right;" @click="loadBtn()">
                    下载材料
                </el-button>
        <el-tabs v-model="activeName" type="card" style="position:relative;">
            <el-tab-pane label="图片信息" name="img">
                <div style="width:100%;float:left;">
                <el-button v-for="(item,index) in list" :key="index" @click="first(index)">
                    {{item.title}}
                </el-button>

                
                <!-- <div v-for="(item,index) in list" :key="index" style="width:300px;height:30px;float:left;line-height:30px;" @click="first(index)">
                    {{item.title}}
                </div> -->
            </div>
            
            <div style="width:100%;float:left;margin-top:30px;">
                <el-button v-for="(item1,index1) in list1" :key="index1+'B'" @click="last(index1)">
                    {{item1.title}}
                </el-button>
            <!-- <div v-for="(item1,index1) in list1" :key="index1+'B'" style="width:300px;height:30px;float:left;" @click="last(index1)">
                    {{item1.title}}
                    {{index1}}
                </div> -->
                </div>
                <!-- <section>
                <img v-for="(item,index) in slide1"
                v-preview="item.src" class="preview"  :key="index" :src="item.src" alt="">
                </section> -->
                <!-- <div style="width:100%;position:absolute;left:0;top:130px;"> -->
                <vue-preview 
                :slides="slide1" 
                class="preview" 
                @onClose="closeHandler"
                deleteBtnColor="#e12e2e"
                previewBtnColor="#3caaff"
                :removeInside="true"
                @onRemove="handleRemove"
                :removeEnable="true">
                <template slot="scope"></template>
                </vue-preview>
                <!-- </div> -->

            </el-tab-pane>
            
                    <el-tab-pane label="地图信息" name="map">
                    <!-- 百度地图插件 -->
                    <baidu-map 
                    :center="center"
                    :zoom="zoom" 
                    @ready="handler" 
                    style="margin-left:20px;height:300px"
                        @click="getClickInfo" 
                        :scroll-wheel-zoom='true'></baidu-map>
                </el-tab-pane>
            
        </el-tabs>


   
    <!-- <div class="demo-image__preview" v-for="(item,index) in imgs" :key="index">
    <el-image 
        style="width: 100px; height: 100px"
        :src="item.src"
        :preview-src-list="srcList">
    </el-image>
    </div> -->

    <!-- <div> -->
        <!-- <div style=""  >
            <el-button style="" @click="delImage(ind)" v-for="(item,ind) in slide1" :key="ind">
                X
                {{ind}}
            </el-button>
        </div> -->
        
    <!-- </div> -->
    <!-- 百度地图插件 -->
  <!-- <baidu-map 
  :center="center"
   :zoom="zoom" 
   @ready="handler" 
   style="margin-left:20px;height:300px"
    @click="getClickInfo" 
    :scroll-wheel-zoom='true'></baidu-map> -->
  
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
    components: {
        // html2canvas
    },
    data() {
        return {
            activeName:'img',
            show1 : true,
            show : false,
            longitude:"",
            latitude:"",
            center: '中国',
      //  {lng: 109.45744048529967, lat: 36.49771311230842}
            zoom: 13,
            loadUrl: '',
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
        };
    },
    computed: {
       
    },
    created(){
       quillEditor,
       this.getlist()
    },
    methods: {
        handler ({BMap, map}) {
        var point = new BMap.Point(109.49926175379778, 36.60449676862417)
        map.centerAndZoom(point, 13)
        var marker = new BMap.Marker(point) // 创建标注
        map.addOverlay(marker) // 将标注添加到地图中
        var circle = new BMap.Circle(point, 6, { strokeColor: 'Red', strokeWeight: 6, strokeOpacity: 1, Color: 'Red', fillColor: '#f03' })
        map.addOverlay(circle)
        },
        getClickInfo (e) {
        console.log(e.point.lng)
        this.longitude=e.point.lng;
        this.latitude=e.point.lat;
        console.log(e.point.lat)
        //this.center.lng = e.point.lng
        //this.center.lat = e.point.lat
        },
        loadBtn(){//下载材料跳转链接
            // console.log(this.$route.query.id)
            window.open(this.loadUrl, '_blank')
        },
        first(ind){
            this.show1 = false;
            this.show = true;
            this.list1 = [];
            this.list[ind].category.forEach(element => {
                this.list1.push(element)
            });
            // for(let i=0;i<this.list[ind].category.length;i++){
            //     this.list1.push(this.list[ind].category[i]) the image could not be loaded
            //     console.log(this.list[ind].category[i].title)
            //     console.log(this.list1)
            // }
        },
        last(inx){
            this.slide1 = [];
            this.imgs = [];
            console.log(inx)
            this.list1[inx].files.forEach(element => {
                var ss={};
                ss.src = element.src;
                ss.msrc = element.thumb;
                ss.id = element.id;
                ss.title = element.title;
                ss.w = 800;
                ss.h = 800;
                
                this.slide1.push(ss)
                // this.imgs.push(ss)
                // element.thumb
                // this.list1.push(element)
            });
        },
        delImage(index){//删除图片
            console.log(this.slide1[index].src)

        },
        getlist(){
            request.post("/admin/appraisal/info",{
                id : this.$route.query.id
            }).then(res => {
                if (res.code == 200) {
                    // console.log(slide11)
                    this.list = res.data.images;
                    for(let i=0;i<this.list.length;i++){
                        this.list[i].category.forEach(element => {
                            // console.log('12412')
                            this.list11.push(element)
                            console.log(element)
                        });
                    }
                    this.slide11 = [];
                    this.imgs = [];

                    for(let j=0;j<this.list11.length;j++){
                        this.list11[j].files.forEach(element => {
                            console.log(element.thumb)
                            var ss={};
                            ss.src = element.src;
                            ss.msrc = element.thumb;
                            ss.id = element.id;
                            ss.title = element.title;
                            ss.w = 800;
                            ss.h = 800;
                            this.slide1.push(ss)
                            // this.imgs.push(ss)
                            // element.thumb
                            // this.list1.push(element)
                        });
                    }
                    console.log(this.slide1)
                    
                    this.loadUrl = res.data.url;
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
    }
};
</script>
<style style lang="less" scoped>

</style>