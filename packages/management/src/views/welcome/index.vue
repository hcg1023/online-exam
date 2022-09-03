<script setup lang="ts">
import { ref, computed } from "vue";
import Bar from "./components/Bar.vue";
import Pie from "./components/Pie.vue";
import Line from "./components/Line.vue";
import avatars from "/@/assets/avatars.jpg";
import Github from "./components/Github.vue";
import Infinite from "./components/Infinite.vue";

defineOptions({
  name: "Welcome"
});

const date: Date = new Date();
let loading = ref<boolean>(true);

setTimeout(() => {
  loading.value = !loading.value;
}, 800);

let greetings = computed(() => {
  if (date.getHours() >= 0 && date.getHours() < 12) {
    return "上午阳光明媚，祝你薪水翻倍🌞！";
  } else if (date.getHours() >= 12 && date.getHours() < 18) {
    return "下午小风娇好，愿你青春不老😃！";
  } else {
    return "折一根天使羽毛，愿拂去您的疲惫烦恼忧伤🌛！";
  }
});

const openDepot = (): void => {
  window.open("https://github.com/xiaoxian521/vue-pure-admin");
};
</script>

<template>
  <div class="welcome">
    <h1>欢迎来到考试系统</h1>
  </div>
</template>
<style>
.el-scrollbar__view {
  height: 100%;
}
</style>
<style lang="scss" scoped>
.welcome {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  h1 {
    font-size: 40px;
    font-weight: bold;
  }
}
</style>
