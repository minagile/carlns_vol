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
  min-width: 1000px;
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
</style>
