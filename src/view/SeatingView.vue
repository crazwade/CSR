<script setup lang="ts">
import { watch, reactive, onMounted } from 'vue';
import { useDataStore } from '../store/dataStore.ts';
import SeatingView from '../components/SeatingView/SeatView.vue';
import StudentView from '../components/SeatingView/StudentView.vue';

const dataStore = useDataStore();

const classLayout = reactive<{
  row: number;
  col: number;
}>({
  row: 5,
  col: 5,
});

const dragInfo = reactive<{
  seatId: string;
  studentId: string;
}>({
  seatId: '',
  studentId: '',
});

const resetDragInfo = () => {
  dragInfo.seatId = '';
  dragInfo.studentId = '';
};

watch(
  () => classLayout.col,
  (col: number) => {
    dataStore.classLayoutChange({ row: classLayout.row, col });
  }
);

watch(
  () => classLayout.row,
  (row: number) => {
    dataStore.classLayoutChange({ row, col: classLayout.col });
  }
);

onMounted(() => {
  dataStore.initSeats();
});
</script>

<template>
  <div class="w-full h-full">
    <div
      class="fixed left-1/2 -translate-x-1/2 flex justify-center items-center gap-2 py-2"
    >
      <div class="text-5xl whitespace-nowrap">座位區</div>
      <div class="flex flex-col gap-3">
        <div class="flex gap-1 justify-center items-center">
          列
          <font-awesome-icon :icon="['fas', 'arrows-down-to-line']" />
          <select v-model="classLayout.col" class="w-[50px]">
            <option :value="1">1</option>
            <option :value="2">2</option>
            <option :value="3">3</option>
            <option :value="4">4</option>
            <option :value="5">5</option>
            <option :value="6">6</option>
            <option :value="7">7</option>
            <option :value="8">8</option>
            <option :value="9">9</option>
            <option :value="10">10</option>
          </select>
        </div>
        <div class="flex gap-1 justify-center items-center">
          欄
          <font-awesome-icon :icon="['fas', 'arrows-turn-right']" />
          <select v-model="classLayout.row" class="w-[50px]">
            <option :value="1">1</option>
            <option :value="2">2</option>
            <option :value="3">3</option>
            <option :value="4">4</option>
            <option :value="5">5</option>
            <option :value="6">6</option>
            <option :value="7">7</option>
            <option :value="8">8</option>
            <option :value="9">9</option>
            <option :value="10">10</option>
          </select>
        </div>
      </div>
    </div>
    <div
      class="grid grid-cols-5 p-5 w-full min-w-fit gap-2 pt-[80px]"
      :style="{
        'grid-template-columns': `repeat(${dataStore.classroom.column}, 1fr)`,
      }"
    >
      <SeatingView
        @dragSeat="(id) => (dragInfo.seatId = id)"
        @arrangeSeat="(payload) => dataStore.rearrangeSeat(payload)"
        @resetDragInfo="resetDragInfo"
        :data="dataStore.getSeats"
        :dragInfo="dragInfo"
      />
    </div>
    <div class="w-full h-fit flex gap-2">
      <StudentView
        @dragStudent="(id) => (dragInfo.studentId = id)"
        @close="(id) => dataStore.removeStudent(id)"
        :data="dataStore.getStudentListNotInSeat"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
../store/dataStore
