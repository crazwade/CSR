<script setup lang="ts">
import { watch, reactive, onMounted } from 'vue';
import { useDataStore } from '../store/dataStore.ts';
import SeatingView from '../components/SeatingView/SeatView.vue';

const dataStore = useDataStore();

const classLayout = reactive<{
  row: number;
  col: number;
}>({
  row: 5,
  col: 5,
});

const classLayoutOptions = [
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' },
  { value: 4, label: '4' },
  { value: 5, label: '5' },
  { value: 6, label: '6' },
  { value: 7, label: '7' },
  { value: 8, label: '8' },
  { value: 9, label: '9' },
  { value: 10, label: '10' },
];

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
    <div class="flex justify-center items-center gap-2 py-2">
      <div class="text-5xl whitespace-nowrap">
        <font-awesome-icon :icon="['fas', 'chair']" />
        座位區
      </div>
      <div class="flex flex-col gap-3">
        <div class="flex gap-1 justify-center items-center">
          列
          <font-awesome-icon :icon="['fas', 'arrows-down-to-line']" />
          <select v-model="classLayout.col" class="w-[50px]">
            <option
              :value="option.value"
              v-for="option in classLayoutOptions"
              :key="option.value"
            >
              {{ option.label }}
            </option>
          </select>
        </div>
        <div class="flex gap-1 justify-center items-center">
          欄
          <font-awesome-icon :icon="['fas', 'arrows-turn-right']" />
          <select v-model="classLayout.row" class="w-[50px]">
            <option
              :value="option.value"
              v-for="option in classLayoutOptions"
              :key="option.value"
            >
              {{ option.label }}
            </option>
          </select>
        </div>
      </div>
    </div>
    <div class="w-full h-fit max-h-[600px] overflow-auto scrollbarHidden">
      <div
        class="grid grid-cols-5 p-5 w-full min-w-fit gap-2"
        :style="{
          'grid-template-columns': `repeat(${dataStore.classroom.column}, 1fr)`,
        }"
      >
        <SeatingView
          @dragSeat="(id) => dataStore.setDragInfo({ seatId: id })"
          @arrangeSeat="(payload) => dataStore.rearrangeSeat(payload)"
          @resetDragInfo="dataStore.resetDragInfo"
          :data="dataStore.getSeats"
          :dragInfo="dataStore.getDragInfo"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.scrollbarHidden {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.scrollbarHidden::-webkit-scrollbar {
  display: none;
}
</style>
../store/dataStore
