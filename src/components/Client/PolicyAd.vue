<template>
  <!-- 保单管理 -->
  <div class="PolicyAd">
    <SideBar/>
    <div class="content">
      <!-- PolicyAd -->
      <router-view :key="$route.fullpath"></router-view>
    </div>
  </div>
</template>

<script>
import SideBar from '../common/SideBar'
export default {
  name: 'PolicyAd',
  data () {
    return {
      flag: true
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
.PolicyAd {
  // background: #fff;
  height: calc(100% - 100px);
  // padding-top: 58px;
  position: relative;
  .content {
    margin-left: 360px;
    margin-right: 34px;
    background: #fff;
    border-radius: 16px;
    height: 100%;
    position: relative;
    animation: mymove 1s cubic-bezier(.28,1.41,1,1.1) normal;
  }
}
@keyframes mymove {
  from { margin-left: 34px;}
  to { margin-left: 360px;}
}
</style>
