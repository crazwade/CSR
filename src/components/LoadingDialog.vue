<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    title: string;
    visible: boolean;
  }>(),
  {
    visible: false,
  }
);

const dialogVisible = computed(() => props.visible);
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    :title="title"
    width="300"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
  >
    <div class="text-xl font-extrabold flex flex-row">
      <div class="loading">L</div>
      <div class="loading">o</div>
      <div class="loading">a</div>
      <div class="loading">d</div>
      <div class="loading">i</div>
      <div class="loading">n</div>
      <div class="loading">g</div>
      <div class="loading">.</div>
      <div class="loading">.</div>
      <div class="loading">.</div>
    </div>
  </el-dialog>
</template>

<style lang="scss" scoped>
.loading {
  animation: jump 1s ease-in infinite;
}

.loading:nth-child(even) {
  animation-delay: 0.1s;
}

.loading:nth-child(odd) {
  animation-delay: 0.2s;
}

@keyframes jump {
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-8px);
  }
}
</style>
