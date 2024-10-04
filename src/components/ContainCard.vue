<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string;
    width?: 'full' | 'fit';
  }>(),
  {
    width: 'fit',
  }
);
</script>

<template>
  <div
    class="flex flex-col justify-start gap-3"
    :class="[width === 'fit' ? 'w-fit' : 'w-full']"
  >
    <h1 v-if="title" class="text-xl font-bold">{{ title }}</h1>
    <div class="rounded-3xl bg-white p-3">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
