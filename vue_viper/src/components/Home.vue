<template>
    <el-container direction="vertical">
        <el-header>
            <div>
                <img src="../assets/heima.png" alt="" width="50px" height="50px">
                <span>铭塑会员管理</span>
            </div>
            <el-button type="info" @click="Logout">退出</el-button>
        </el-header>
        <el-container>
            <el-aside :width="isCollapse ? '64px' : '210px'">
                <div class="collapes" @click="opearteCollapse">
                    <div :class="toggleBtn"></div>
                </div>
                <el-menu class="el-menu-vertical-demo" background-color="#333744" text-color="#fff" :router="true" :default-active="this.$route.path.slice(1)"
                    active-text-color="rgb(64, 158, 255)" mode="vertical" :unique-opened="true" :collapse="isCollapse">
                    <el-menu-item :index="welcome.path" :key="welcome.id">
                      <i class="el-icon-s-home"></i>
                      <span slot="title">{{ welcome.authName }}</span>
                    </el-menu-item>
                    <el-submenu v-for="item in menulist" :index="item.id + ''" :key="item.id">
                        <template slot="title">
                            <i :class="iconClass(item)"></i>
                            <span>{{item.authName}}</span>
                        </template>
                        <el-menu-item v-for="subitem in item.children" :index="subitem.path" :key="subitem.id">
                            <template slot="title">
                              <i :class="iconClass(subitem)"></i>
                              <span>{{subitem.authName}}</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-main>
                <router-view></router-view>
                <!-- <el-footer>Footer</el-footer> -->
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {
    data () {
        return {
            welcome: {
                id: 121,
                authName: '首页',
                path: 'welcome'
            },
            menulist: [
              {
                id: 125,
                authName: '会员管理',
                path: 'users',
                children: [
                  {
                    id: 110,
                    authName: '会员列表',
                    path: 'users',
                    children: [],
                    order: null
                  },
                  {
                    id: 120,
                    authName: '回收站',
                    path: 'recycle',
                    children: [],
                    order: null
                  }
                ],
                order: 1
              },
              {
                id: 145,
                authName: '数据统计',
                path: 'reports',
                children: [
                  {
                    id: 146,
                    authName: '数据报表',
                    path: 'reports',
                    children: [],
                    order: null
                  }
                ],
                order: 5
              }
            ],
            iconList: {
                users: 'el-icon-user-solid',
                recycle: 'el-icon-delete-solid',
                rights: 'el-icon-burger',
                goods: 'el-icon-s-goods',
                orders: 'el-icon-s-order',
                reports: 'el-icon-s-data'
            },
            isCollapse: false,
            toggleBtn: 'el-icon-arrow-right'
        }
    },
    methods: {
        Logout () {
            window.sessionStorage.clear()
            this.$router.push('/login')
        },
         iconClass (item) {
            return this.iconList[item.path] || 'el-icon-location'
        },
        opearteCollapse () {
            this.isCollapse = !this.isCollapse
            this.toggleBtn = this.isCollapse ? 'el-icon-arrow-right right' : 'el-icon-arrow-right'
        }
    }
}
</script>

<style scoped>
    .el-container {
        height: 100%;
        overflow-y: hidden;
    }
    .el-header {
        background-color: #373d41;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-left: 0px;
    }
    .el-header div{
        display: flex;
        align-items: center;
        color: #fff;
    }
    .el-header span{
        font-size: 25px;
        padding-left: 15px;
    }
    .el-aside {
        background-color: #333744;
        transition: width, 0.5s;
    }
    .el-menu {
        border-right: none;
    }
    .el-main {
        background-color: #eaedf1
    }
    .collapes {
        padding: 10px 0;
        background-color: #4a5064;
        display: flex;
        justify-content: center;
    }
    .el-icon-arrow-right {
        display: block;
        color: #fff;
        font-weight: bold;
        font-size: 30px;
        transition: 0.2s;
        transform: rotate(180deg);
        cursor: pointer;
    }
    .el-icon-arrow-right:hover {
        color: rgb(64, 158, 255);
    }
    .right {
        transform:none;
    }

</style>
