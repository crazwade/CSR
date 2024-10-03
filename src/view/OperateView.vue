<script setup lang="ts">
import { useDataStore } from '../store/dataStore.ts';
import StudentView from '../components/OperateView/StudentView.vue';

const dataStore = useDataStore();
</script>

<template>
  <div class="flex flex-col">
    <!-- 學生輸入區 -->
    <div>輸入區</div>
    <div class="w-full max-w-full h-fit flex gap-2 flex-wrap">
      <StudentView
        @dragStudent="(id) => dataStore.setDragInfo({ studentId: id })"
        @close="(id) => dataStore.removeStudent(id)"
        :data="dataStore.getStudentListNotInSeat"
      />
    </div>
    <!-- 動腦時間輸入區 -->
    <div>動腦時間輸入區</div>
  </div>
</template>

<style lang="scss" scoped></style>
