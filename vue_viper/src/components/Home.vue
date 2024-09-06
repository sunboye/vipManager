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
                    <div v-for="item in menulist" :index="item.id + ''" :key="item.id">
                        <el-submenu v-if="item.children && item.children.length">
                            <template slot="title">
                                <i :class="item.icon"></i>
                                <span>{{item.authName}}</span>
                            </template>
                            <el-menu-item v-for="subitem in item.children" :index="subitem.path" :key="subitem.id">
                                <template slot="title">
                                <i :class="item.icon"></i>
                                <span>{{subitem.authName}}</span>
                                </template>
                            </el-menu-item>
                        </el-submenu>
                        <el-menu-item v-else :index="item.path">
                            <template slot="title">
                                <i :class="item.icon"></i>
                                <span>{{item.authName}}</span>
                            </template>
                        </el-menu-item>
                    </div>
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
            menulist: [],
            isCollapse: false,
            toggleBtn: 'el-icon-arrow-right'
        }
    },
    created () {
        this.getMenuList()
    },
    methods: {
        Logout () {
            window.sessionStorage.clear()
            this.$router.push('/login')
        },
         iconClass (item) {
            return this.iconList[item.path] || 'el-icon-location'
        },
        getMenuList() {
            this.$axios.get('/getMenus').then(res => {
                if (res.success) {
                    this.menulist = res.data || []
                } else {
                    this.$message.error(res.msg)
                }
            })
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
