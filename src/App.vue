<template>
  <div class="h-full w-full bg-pink-200 p-2 flex flex-col">
    <!-- 座位區 -->
    <div class="w-full h-4/5 bg-blue-100">
      <SeatingView />
    </div>
    <!-- 操作區 -->
    <div class="w-full h-1/5 bg-green-100">
      <OperateView />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import OperateView from './view/OperateView.vue';
import SeatingView from './view/SeatingView.vue';

onMounted(() => {
  console.log('onMounted');
});
</script>

<style scoped></style>
