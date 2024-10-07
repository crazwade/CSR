<script setup lang="ts">
import type { Student } from '../../store/dataStore';

defineProps<{
  data: Student[];
}>();

const emit = defineEmits<{
  dragStudent: [id: string];
  close: [id: string];
}>();

const onDragStudent = (e: DragEvent): void => {
  e.preventDefault();

  if (e.target) {
    emit('dragStudent', (e.target as HTMLElement).id);
  }
};
</script>

<template>
  <el-tag
    v-for="student in data"
    :key="student.id"
    :id="`${student.id}`"
    v-on:drag="onDragStudent"
    @close="emit('close', student.id)"
    :effect="'dark'"
    :size="'large'"
    :type="'warning'"
    :draggable="true"
    closable
    class="text-sm"
  >
    {{ student.name }}
  </el-tag>
</template>

<style lang="scss" scoped></style>
