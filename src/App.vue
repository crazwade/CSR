<script setup lang="ts">
import OperateView from './view/OperateView.vue';
import SeatingView from './view/SeatingView.vue';
import { version } from '../package.json';
</script>

<template>
  <div class="h-full w-full flex flex-col">
    <!-- 座位區 -->
    <div class="w-full h-fit spec-bg pb-3">
      <SeatingView />
    </div>
    <!-- 操作區 -->
    <div class="w-full h-fit overflow-auto px-2">
      <OperateView />
    </div>
  </div>
  <div class="absolute top-0 right-1 text-sm text-gray-400">
    {{ version }}
  </div>
</template>

<style scoped>
.spec-bg {
  background-image: linear-gradient(to top, #fad0c4 0%, #ffd1ff 100%);
}
</style>
