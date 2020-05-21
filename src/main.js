import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

// Basic Use - Covers most scenarios
import { VueEditor } from "vue2-editor"

// Advanced Use - Hook into Quill's API for Custom Functionality
import { Quill } from "vue2-editor"

import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor);
import '../static/UE/ueditor/ueditor.config.js'
import '../static/UE/ueditor/ueditor.all.js'
import '../static/UE/ueditor/lang/zh-cn/zh-cn.js'
import '../static/UE/ueditor/ueditor.parse.js'
import '../static/UE/ueditor/themes/default/css/ueditor.min.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
import VCharts from 'v-charts'



import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import vueJsonp from 'vue-jsonp'
Vue.use(vueJsonp)

import BaiduMap from 'vue-baidu-map'

Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: '8fPBtc4uCe9Brx65XTP4TxrBXotrprTH'
})
import VueCropper from 'vue-cropper'
Vue.use(VueCropper)
import '@/icons' // icon
import '@/permission' // permission control
import VueSocketio from 'vue-socket.io';
import socketio from 'socket.io-client';
// Vue.use(new VueSocketio({
// 	debug: true,
// 	connection: socketio('http://192.168.1.25:8900')
// }));
import VuePreview from 'vue-preview';
Vue.use(VuePreview);
import VuePreviewer from 'vue-preview-deleter'
Vue.use(VuePreviewer)

// import vuePicturePreview from 'vue-picture-preview'
// Vue.use(vuePicturePreview)

Vue.use(ElementUI, { locale })
Vue.use(VCharts)

Vue.config.productionTip = false

new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: { App },
	http: {
		headers: {
		  token: 'YXBpOnBhc3N3b3Jk'
		}
	
	  }
})
