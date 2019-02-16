<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 内容卡片区 -->
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            placeholder="请输入搜索内容"
            v-model="queryParams.query"
            :clearable="true"
            @clear="getUserInfos"
            @keyup.enter.native="getUserInfos"
          >
            <el-button slot="append" icon="el-icon-search" @click="getUserInfos"></el-button>
          </el-input>
        </el-col>
        <el-col :span="6">
          <el-button type="primary">添加用户</el-button>
        </el-col>
      </el-row>

      <!-- 数据列表展示区域 -->
      <el-table :data="userInfos" border style="width: 100%">
        <el-table-column type="index" label="日期" width="60"></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="mobile" label="手机号码" width="140"></el-table-column>
        <el-table-column prop="role_name" label="角色" width="130"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="150"></el-table-column>
        <el-table-column label="状态" width="70">
          <el-switch
            v-model="info.row.mg_state"
            slot-scope="info"
            @change="changeState(info.row.id,info.row.mg_state)"
          ></el-switch>
          <!-- 在此获得每个用户的信息,用户信息已经被插槽传递到此位置，自动接收即可，每个用户数据具体是通过“row"关键字定义的 -->
          <!-- <span slot-scope="info">{{info.column}}</span> -->
        </el-table-column>
        <el-table-column label="操作" width="230">
          <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
          <el-tooltip content="分配角色" placement="top" :enterable="false">
            <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
          </el-tooltip>
        </el-table-column>
      </el-table>

      <!-- 数据分页展示区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryParams.pagenum"
        :page-sizes="[3, 5, 10, 15]"
        :page-size="queryParams.pagesize"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="queryParams.total"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  // 生命周期函数
  created() {
    this.getUserInfos()
  },
  methods: {
    // 数据分页相关1
    // 每页信息条数变化回调函数处理
    handleSizeChange(val) {
      // val:代表变化后的每页信息显示条数
      this.queryParams.pagesize = val
      // 根据变化后的 显示条数 重新获得数据
      this.getUserInfos()
    },
    // 当前页码变化回调处理
    handleCurrentChange(val) {
      // val:代表变化后的 页码
      this.queryParams.pagenum = val
      // 根据变化后的 页码 重新获得数据
      this.getUserInfos()
    },

    async changeState(id, state) {
      const { data: res } = await this.$http.put(`users/${id}/state/${state}`)
      if (res.meta.status !== 200) {
        return this.$message.error('修改状态失败!')
      }
      this.$message({
        message: '修改成功',
        type: 'success',
        duration: 1500
      })
    },

    // 数据分页相关2

    // 获得首屏用户数据
    async getUserInfos() {
      const { data: res } = await this.$http.get('users', {
        params: this.queryParams
      })

      // 获取数据失败
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }

      this.queryParams.total = res.data.total
      // 把获得的用户数据 赋予给userInfos成员
      // console.log(res)
      this.userInfos = res.data.users
    }
  },
  data() {
    return {
      // 搜索关键字
      keywords: '',
      // 接收用户数据
      userInfos: [],
      // 定义获取用户数据时用到的查询条件参数
      queryParams: {
        query: '',
        pagenum: 1, // 当前页码
        pagesize: 3, // 每页显示条数
        total: 0 // 记录总条数
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
