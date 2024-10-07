<script setup lang="ts">
import { ref } from 'vue';
import type { Seat } from '../../store/dataStore';
import ContactBook from './ContactBook.vue';
import StudentSeating from './StudentSeating.vue';

const visible = ref<boolean>(false);
const selectStudentId = ref<string>('');

const props = defineProps<{
  data: Seat[];
  dragInfo: {
    seatId: string;
    studentId: string;
  };
}>();

const emit = defineEmits<{
  dragSeat: [id: string];
  arrangeSeat: [
    { currSeadId?: string; studentId?: string; targetSeatId: string },
  ];
  resetDragInfo: [];
}>();

const onDragSeat = (e: DragEvent): void => {
  e.preventDefault();

  if (e.target) {
    emit('dragSeat', (e.target as HTMLElement).id);
  }
};

const onDrop = (e: DragEvent): void => {
  e.preventDefault();

  if (!props.dragInfo.seatId && !props.dragInfo.studentId) {
    return;
  }

  if (e.target) {
    const dropSeadId = (e.target as HTMLElement).id;

    if (props.dragInfo.seatId) {
      emit('arrangeSeat', {
        currSeadId: props.dragInfo.seatId,
        targetSeatId: dropSeadId,
      });

      emit('resetDragInfo');

      return;
    }

    emit('arrangeSeat', {
      studentId: props.dragInfo.studentId,
      targetSeatId: dropSeadId,
    });

    emit('resetDragInfo');
  }
};

const dragover = (e: DragEvent) => {
  e.preventDefault();
};

const openContactBook = (seatInfo: Seat) => {
  const { studentId } = seatInfo;

  if (!studentId) {
    return;
  }

  selectStudentId.value = studentId;
  visible.value = true;
};

const closeContactBook = () => {
  visible.value = false;
};
</script>

<template>
  <ContactBook
    :studentId="selectStudentId"
    @closeDialog="closeContactBook"
    :visible="visible"
  />
  <div
    v-for="seat in data"
    :key="seat.id"
    :id="`${seat.id}`"
    v-on:drag="onDragSeat"
    v-on:drop="onDrop"
    v-on:dragover="dragover"
    :draggable="true"
    class="select-none p-2 border-dashed border-2 border-black min-w-[150px] w-full cursor-pointer"
    @click="openContactBook(seat)"
  >
    <div
      class="w-full h-[40px] flex justify-center items-center pointer-events-none"
    >
      <StudentSeating :studentId="seat.studentId" />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
