<template>
  <div class=" w-full h-full">
    <div class=" w- h-[80%] flex flex-row justify-center items-center">
      <div
        class=" w-[20%] h-full mx-[2%] flex flex-col justify-between items-center"
        v-for="(item, index) in seats"
        :key="index"
      >
        <div
          v-for="(content, index2) in item"
          :key="index2"
          class=" w-full h-[60px] border-dashed border border-gray-500 flex justify-center items-center"
          draggable="true"
          @dragstart="dragMove(index, index2)"
          @drop="dropEnd(index, index2)"
          @dragover.prevent
          @dragenter.prevent
        >
          {{ content.name }}
        </div>
      </div>
    </div>
    <div class=" mt-3">
      <div class=" my-3">
        <el-tag
          v-for="(item, index) in students"
          :key="index"
          class="mx-1 my-1"
          closable
          :type="'info'"
          size="large"
          draggable="true"
          @dragstart="dragStart(item, index)"
          @close="handleRemove(index)"
          style="font-size: medium;"
          round
        >
          {{ item }}
        </el-tag>
      </div>
      <div>
        <el-form-item label="學生姓名：">
          <el-input v-model="studentName" clearable @keyup.enter="handleCreate" />
        </el-form-item>
        <el-form-item>
          <el-icon
            size="20px"
            class=" bg-red-200 w-[40%] h-[30px] rounded-lg mx-[5%] cursor-pointer hover:bg-red-400"
            @click="handleClear"
          >
            <CloseBold />
          </el-icon>
          <el-icon
            size="20px"
            class=" bg-blue-200 w-[40%] h-[30px] rounded-lg mx-[5%] cursor-pointer hover:bg-blue-400"
            @click="handleCreate"
          >
            <Select />
          </el-icon>
        </el-form-item>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { onMounted, ref, reactive } from 'vue';
import { useStudentStore } from './store/studentStore';

// interface dropEndType = {
//   row: number,
//   set: number,
//   index: number,
// }

const studentStore = useStudentStore();

const dragType = ref<'create' | 'edit'>('create');
const studentName = ref('');
const holdName = ref('');
const holdIndex = ref(0);
const seat = reactive<{
  row: number,
  set: number,
}>({
  row: -1,
  set: -1,
});

const { students, seats } = storeToRefs(studentStore);

const dragStart = (name: string, index: number) => {
  holdName.value = name;
  holdIndex.value = index;
  dragType.value = 'create';
};

const dragMove = (row: number, set: number) => {
  dragType.value = 'edit';
  seat.row = row;
  seat.set = set;
};

const dropEnd = (row: number, set: number) => {
  if (dragType.value === 'create') {
    if (!studentStore.intoSeat(row, set, holdName.value)) {
      alert('該處已有學生');
      return;
    }
    studentStore.remove(holdIndex.value);
    return;
  }

  studentStore.moveSeat(seat, { row, set });
};

const handleClear = () => {
  studentName.value = '';
};

const handleRemove = (index: number) => {
  studentStore.remove(index);
};

// const handleSubmit = () => {
//   dialogVisible.value = false;
// };

const handleCreate = () => {
  if (studentName.value === '') return;
  studentStore.createStudent(studentName.value);
  handleClear();
};

onMounted(async () => {
  studentStore.init();
});
</script>

<style scoped>
</style>
