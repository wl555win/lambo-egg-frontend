<template>
  <Layout>
    <Header>
      <div class="logo">
        <Icon type="social-reddit-outline" size="40"></Icon>
        <span class="text">服务管理平台</span>
      </div>
      <Menu mode="horizontal" theme="dark" active-name="1" class="menu" @on-select="onSelect">
        <MenuItem name="服务定义">
          <Icon type="social-dribbble-outline"></Icon>
          服务管理
        </MenuItem>
        <MenuItem name="服务测试">
          <Icon type="social-designernews-outline"></Icon>
          服务测试
        </MenuItem>
        <Submenu name="3">
          <template slot="title">
            <Icon type="stats-bars"></Icon>
            统计分析
          </template>
          <MenuItem name="3-1">调用次数</MenuItem>
          <MenuItem name="3-2">执行耗时</MenuItem>
          <MenuItem name="3-3">错误日志</MenuItem>
        </Submenu>
        <MenuItem name="帮助与设置">
          <Icon type="settings"></Icon>
          设置&帮助
        </MenuItem>
      </Menu>
    </Header>
    <Content class="content">
      <router-view></router-view>
    </Content>
  </Layout>
</template>

<script>
    export default {
      name: "main-nav",
      methods:{
        onSelect:function(name){
          this.$router.push({name});
        }
      }
    }
</script>

<style lang="less" scoped>
  .logo{
    float:left;
    color:rgba(255,255,255,.7);
    font-size:18px;
    .ivu-icon{
      float:left;
      margin-top:10px;
    }
    .text{
      float:left;
      margin-left:5px;
    }
  }
  .menu{
    float:left;
    margin-left:20px;
  }
  .content{
    padding-bottom:20px;
  }
  .ivu-menu-horizontal{
    line-height:67px;
  }
</style>
