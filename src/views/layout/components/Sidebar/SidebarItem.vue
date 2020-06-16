<template>
  <div class="menu-wrapper">
    <!-- <div>
      1213
    </div> -->
    <template v-for="item in routes" v-if="!item.hidden&&item.children">

      <router-link v-if="hasOneShowingChildren(item.children) && !item.children[0].children&&!item.alwaysShow" :to="item.path+'/'+item.children[0].path"
        :key="item.children[0].name">
        <el-menu-item :index="item.path+'/'+item.children[0].path" :class="{'submenu-title-noDropdown':!isNest}">
          <svg-icon v-if="item.children[0].meta&&item.children[0].meta.icon" :icon-class="item.children[0].meta.icon"></svg-icon>
          <span v-if="item.children[0].meta&&item.children[0].meta.title" slot="title">{{item.children[0].meta.title}}</span>
        </el-menu-item>
      </router-link>

      <el-submenu v-else :index="item.name||item.path" :key="item.name">
        <template slot="title">
          <svg-icon v-if="item.meta&&item.meta.icon" :icon-class="item.meta.icon"></svg-icon>
          <span v-if="item.meta&&item.meta.title" slot="title">{{item.meta.title}}</span>
        </template>

        <template v-for="child in item.children" v-if="!child.hidden">
          <sidebar-item :is-nest="true" class="nest-menu" v-if="child.children&&child.children.length>0" :routes="[child]" :key="child.path"></sidebar-item>

          <router-link v-else :to="item.path+'/'+child.path" :key="child.name">
            <el-menu-item :index="item.path+'/'+child.path">
              <svg-icon v-if="child.meta&&child.meta.icon" :icon-class="child.meta.icon"></svg-icon>
              <span v-if="child.meta&&child.meta.title" slot="title">{{child.meta.title}}</span>
            </el-menu-item>
          </router-link>
        </template>
      </el-submenu>

      

    </template>
    


    <!-- <el-menu
					       v-for="item in routes" :key="item.name"
					      class="el-menu-vertical-demo"
					      router
					      active-text-color='#29A88D'
						  background-color="#272D34"
     					  text-color="#fff">
                <div >
                  <el-submenu :index="item.path" v-if="item.key">
                    <template slot="title">
                      <i :class="item.icon"></i>
                      <span>{{item.name}}</span>
                    </template>
                    <el-menu-item :index="val.path" v-for="val in item.son" :key="val.name">
                      <template slot="title">
                        <i class="icon iconfont">*</i>
                        <span>{{val.name}}</span>
                      </template>
                    </el-menu-item>
                  </el-submenu>
                  <el-menu-item :index="item.path" v-else>
                    <template slot="title">
                      <i :class="item.icon"></i>
                      <span>{{item.name}}</span>
                    </template>
                  </el-menu-item>
                </div>
	</el-menu> -->

  </div>
</template>

<script>
import request from "@/utils/request";
export default {
  data(){
    return{
      arr:[],
      routers1:[
        {
          "name": "商家管理",
          "path": "/inquiryManagement",
          "icon": "sms",
          "key": true,
          "son": [
            {
              "name": "商家列表",
              "path": "/inquiry",
              "icon": "sms"
            }
          ]
        },
      ]
    }
  },
  name: 'SidebarItem',
  props: {
    routes: {
      type: Array
    },
    isNest: {
      type: Boolean,
      default: false
    }
  },
  data() {
        return {
            pathList: []
        };
    },
    computed: {
        routeList() {
            this.pathList = localStorage.getItem("pathList").map(
                item => item.path
            );
            const list = JSON.parse(JSON.stringify(this.routes));
            const home = [];
            if (this.pathList.includes("/")) {
                home.push({ ...this.routes[3] });
            }
            return [...home, ...this.getRouter(list)];
        }
    },
    created(){
       this.getList()
    },
  methods: {
    hasOneShowingChildren(children) {
      console.log(children)
      const showingChildren = children.filter(item => {
        console.log()
        return !item.hidden
      })
      if (showingChildren.length === 1) {
        return true
      }
      return false
    },
    getList(){
      // request.post("/admin/access/menu").then(res => {
      //       // console.log(res)
      //       if (res.code == 200) {
      //         console.log(res)
      //         // localStorage.setItem('user_id',res.data.user.id)
      //       }
      //   });
    },
        getRouter(arr, path) {
            let data = [];
            for (let i = 0; i < arr.length; i++) {
                if (!arr[i].hidden) {
                    if (arr[i].children) {
                        const children = this.getRouter(
                            arr[i].children,
                            arr[i].path
                        );
                        if (!children.length) {
                            delete arr[i]["children"];
                            data.push({
                                ...arr[i]
                            });
                        } else {
                            arr[i]["children"] = children;
                            data.push({
                                ...arr[i]
                            });
                        }
                    } else {
                        const router = path ? `${path}/${arr[i].path}` : path;
                        // console.log(router, this.pathList.includes(router));
                        if (this.pathList.includes(router)) {
                            data.push(arr[i]);
                        }
                    }
                }
            }
            console.log(data)
            return data;
        }
  }
}
</script>
