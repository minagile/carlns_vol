<template>
  <!-- 订单申请 -->
  <div class="VolOrderApply">
    <SideBar :stage="'order'" :fromVol="true"/>
    <div class="content">
      <router-view :key="$route.fullpath"></router-view>
    </div>
  </div>
</template>

<script>
import SideBar from '../common/SideBar'
export default {
  name: 'VolOrderApply',
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
.VolOrderApply {
  height: calc(100% - 100px);
  position: relative;
  .content {
    margin-left: 360px;
    margin-right: 34px;
    background: #fff;
    border-radius: 16px;
    height: 100%;
    animation: mymove 1s cubic-bezier(.28,1.41,1,1.1) normal;
  }
}
@keyframes mymove {
  from { margin-left: 34px;}
  to { margin-left: 360px;}
}
</style>
