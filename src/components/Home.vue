<template>
  <el-container>
    <el-header>
      <div id="logo-box">
        <img src="../assets/img/heima.png" alt>
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <el-aside :width="menushow ? '65px' : '200px'">
        <div
          style="height:25px;color:red;text-align:center;line-height:25px;background-color:rgb(74, 80, 100);font-size:12px;letter-spacing:0.1em;cursor:pointer;user-select:none;"
          @click="menushow=!menushow"
        >|||</div>
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409EFF"
          :style="menushow?'width:65px;':'width:200px;'"
          :collapse="menushow"
          :collapse-transition="false"
          :unique-opened="true"
        >
          <!-- :unique-opened="true"同一时间只显示一个权限项目 -->
          <el-submenu :index="item.id+''" v-for="(item,k) in menuList" :key="item.id+''">
            <template slot="title">
              <i :class="'iconfont icon-'+menuicon[k]"></i>
              <span style="user-select:none;">{{item.authName}}</span>
            </template>

            <el-menu-item
              :index="item.id+'-'+item2.id"
              v-for="item2 in item.children"
              :key="item2.id+''"
              style="user-select:none;"
            >
              <i class="el-icon-menu"></i>
              {{item2.authName}}
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
          <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  // 生命周期函数
  created() {
    // 获得左侧功能按钮列表数据
    this.getMenuList()
  },
  data() {
    return {
      // 设定 左侧菜单 收起、展开
      menushow: false,
      menuList: [], // 接收左侧功能按钮数据
      menuicon: ['users', 'tijikongjian', 'shangpin', 'danju', 'baobiao']
    }
  },
  methods: {
    // 获得左侧功能按钮数据
    async getMenuList() {
      const { data: res } = await this.$http.get('menus')
      //   console.log(res)
      // 获得数据失败情形
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      // 把获得好的权限数据赋予给menuList
      this.menuList = res.data
    },
    // 退出系统
    logout() {
      // 确认
      // token清除
      // 跳转到登录页面
      this.$confirm('确认要退出系统么?', '提示', {
        confirmButtonText: '确定',
        canselButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          window.sessionStorage.removeItem('token')
          this.$router.push('/login')
        })
        .catch(() => {})
    }
  }
}
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
  .el-header {
    background-color: rgb(55, 61, 65);
    padding: 0;
    padding-right: 20px;
    // 弹性布局
    display: flex;
    justify-content: space-between;
    #logo-box {
      font-size: 22px;
      color: #fff;
      display: flex;
      align-items: center;
      // 禁止被用户选中
      user-select: none;
      img {
        width: 50px;
        height: 50px;
        margin-right: 10px;
      }
    }
  }
  .el-aside {
    background-color: #333744;
  }
  .el-main {
    background-color: #eaedf1;
  }
}
</style>
