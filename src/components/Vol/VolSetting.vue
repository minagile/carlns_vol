<template>
  <!-- 系统设置 -->
  <div class="VolSetting">
    <SideBar :stage="'setting'" :fromVol="true"/>
    <div class="content">
      <router-view :key="$route.fullpath"></router-view>
    </div>
  </div>
</template>

<script>
import SideBar from '../common/SideBar'
export default {
  name: 'VolSetting',
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {},
  components: {
    SideBar
  }
}
</script>

<style lang="less" scoped>
.VolSetting {
  height: calc(100% - 100px);
  position: relative;
  .content {
    margin-left: 360px;
    margin-right: 34px;
    background: #fff;
    border-radius: 16px;
    height: 100%;
    animation: mymove 1s cubic-bezier(.28,1.41,1,1.1) normal;
    position: relative;
  }
}
@keyframes mymove {
  from { margin-left: 34px;}
  to { margin-left: 360px;}
}
</style>
