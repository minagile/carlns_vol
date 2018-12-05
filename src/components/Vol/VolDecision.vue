<template>
  <!-- 决策支持 -->
  <div class="VolDecision">
    <chart v-if="calculater"></chart>
    <div class="circle" @click="change" v-if="calculater">计算器</div>
    <div class="circle" @click="change" v-if="!calculater">返回</div>
    <router-view></router-view>
  </div>
</template>

<script>
import Chart from './Decision/Chart'
export default {
  name: 'VolDecision',
  data () {
    return {
      calculater: true
    }
  },
  mounted () {
  },
  methods: {
    change () {
      // var animate = document.getElementsByClassName('animated')
      // // console.log(animate)
      // animate[0].classList.add('flipInY')
      if (this.calculater === false) {
        this.calculater = true
        this.$router.push({name: 'VolDecision'})
      } else {
        this.$router.push({name: 'Calculater'})
        this.calculater = false
      }
    }
  },
  components: {
    Chart
  }
}
</script>

<style lang="less" scoped>
.VolDecision {
  // background: #fff;
  height: calc(100% - 100px);
  border-radius: 16px;
  margin: 0 34px;
  overflow: hidden;
  position: relative;
  .Selector {
    border-bottom: 20px solid #F2F2F2;
  }
  .circle {
    position: absolute;
    width: 81px;
    height: 81px;
    border-radius: 50%;
    background: #FFC107;
    line-height: 81px;
    text-align: center;
    top: 30px;
    right: 155px;
    cursor: pointer;
    z-index: 99999;
  }
}
</style>
