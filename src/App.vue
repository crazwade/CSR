<template>
  <el-dialog
    v-model="dialogVisible"
    title="新增課堂資訊"
    width="80%"
    :before-close="handleClose"
  >
    <el-form-item label="學生姓名：">
      <el-input v-model="studentName" clearable @keyup.enter="handleCreate" />
    </el-form-item>
    <el-form-item>
      <el-icon size="20px" class=" bg-red-200 w-[40%] h-[30px] rounded-lg mx-[5%] cursor-pointer hover:bg-red-400" @click="handleClear"><CloseBold /></el-icon>
      <el-icon size="20px" class=" bg-blue-200 w-[40%] h-[30px] rounded-lg mx-[5%] cursor-pointer hover:bg-blue-400" @click="handleCreate"><Select /></el-icon>
    </el-form-item>
    <el-tag
      v-for="item in students"
      :key="item.name"
      class="mx-1 my-1"
      closable
      :type="'info'"
      size="large"
      @close="handleRemove(item.name)"
      style="font-size: medium;"
      round
    >
      {{ item.name }}
    </el-tag>
    <el-divider class=" border-2" />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false" class=" bg-blue-500">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
  <div>

  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import { useStudentStore } from './store/studentStore';

const studentStore = useStudentStore();

const dialogVisible = ref(true);
const studentName = ref('');

const { students } = storeToRefs(studentStore);

const handleClose = () => {
  dialogVisible.value = false;
};

const handleClear = () => {
  studentName.value = '';
};

const handleRemove = (name: string) => {
  studentStore.remove(name);
};

const handleCreate = () => {
  if (studentName.value === '') return;
  studentStore.addStudent(studentName.value);
  studentName.value = '';
};

onMounted(async () => {
  studentStore.init();
});
</script>

<style scoped>
</style>
