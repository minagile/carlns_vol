<template>
  <!-- 决策支持 -->
  <div class="Decision">
    <selector></selector>
  </div>
</template>

<script>
import Selector from '../common/Selector'
export default {
  name: 'Decision',
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {},
  components: {
    Selector
  }
}
</script>

<style lang="less" scoped>
.Decision {
  background: #fff;
  min-height: calc(100% - 100px);
  border-radius: 16px;
  margin: 0 34px;
  padding: 25px 3.44%;
  box-sizing: border-box;
}
</style>
