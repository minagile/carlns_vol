<template>
  <div id="app">
    <router-view/>
    <!-- <router-view :key="$route.fullpath"></router-view> -->
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
  /* font-size: 12px; */
}
html, body {
  height:100%;
}
#app {
  height: 100%;
  font-family: MicrosoftYaHei;
  min-width: 1500px;
  min-height: 900px;
}
a {
  cursor: pointer;
  text-decoration: none;
}
li {
  list-style: none;
}
input {
  outline: none;
}
button {
  cursor: pointer;
  outline: none;
  border: 0;
}
/*滚动条样式*/
::-webkit-scrollbar {/*滚动条整体样式*/
  width: 4px;     /*高宽分别对应横竖滚动条的尺寸*/
  height: 4px;
}
::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.1);
  background: rgba(0,0,0,0.1);
}
::-webkit-scrollbar-track {/*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.01);
  border-radius: 0;
  background: rgba(0,0,0,0.01);
}
.el-pagination {
  text-align: center;
  position: absolute;
  width: 100%;
  bottom: 20px;
}
.el-pagination button {
  border: 1px solid rgba(223,223,223,1);
  height: 38px;
  border-radius: 4px;
}
.el-pagination .btn-prev, .el-pagination .btn-next {
  padding: 0 12px;
  margin: 0 4px;
}
.el-pagination .el-pager li {
  line-height: 38px;
  border: 1px solid rgba(223,223,223,1);
  height: 38px;
  border-radius: 4px;
  margin: 0 4px;
  width: 38px;
  padding: 0;
}
.el-pagination .el-pager li.active {
  background: #4977FC;
  color: #fff;
}
.el-pagination .el-pager li.active+li {
  border-left: 1px solid rgba(223,223,223,1);
}
.el-pagination .el-pager li:hover, .el-pagination button:hover {
  background: #4977FC;
  color: #fff;
}
.el-pagination button, .el-pagination span:not([class*=suffix]) {
  line-height: 38px;
  height: 38px;
}
.el-pagination .el-input {
  height: 38px;
  line-height: 38px;
}

.Volbasic .el-pagination .el-pager li.active {
  background: #000000;
  color: #fff;
}
.Volbasic .el-pagination .el-pager li:hover, .Volbasic .el-pagination button:hover {
  background: #000000;
  color: #fff;
}
</style>
