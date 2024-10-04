<script setup lang="ts">
import { ref } from 'vue';
import { useDataStore } from '../store/dataStore.ts';
import ContainCard from '../components/ContainCard.vue';
import StudentView from '../components/OperateView/StudentView.vue';

const dataStore = useDataStore();

const studentName = ref<string>('');
const studentNameFromUrl = ref<string>('');

const classExtra = ref<string>('');

const addStudent = () => {
  if (studentName.value === '') {
    return;
  }
  dataStore.addStudent(studentName.value);
  studentName.value = '';
};

const fetchStudentFromUrl = async () => {
  if (studentNameFromUrl.value === '') {
    return;
  }

  const students: { name: string }[] = await new Promise((resolve) => {
    const tmp = [
      {
        name: 'Jacky',
      },
      {
        name: 'Jenny',
      },
    ];

    setTimeout(() => {
      resolve(tmp);
    }, 10000);
  });

  students.forEach((student) => {
    dataStore.addStudent(student.name);
  });

  studentNameFromUrl.value = '';
};
</script>

<template>
  <div class="flex flex-col justify-center items-center py-3">
    <div class="w-fit h-fit flex gap-2 flex-wrap">
      <ContainCard title="學生名單">
        <div class="w-full h-fit flex gap-2 flex-wrap px-4 py-2">
          <div v-if="dataStore.getStudentListNotInSeat.length < 1">
            目前學生名單為空
          </div>
          <StudentView
            v-else
            @dragStudent="(id) => dataStore.setDragInfo({ studentId: id })"
            @close="(id) => dataStore.removeStudent(id)"
            :data="dataStore.getStudentListNotInSeat"
          />
        </div>
      </ContainCard>
    </div>
    <div
      class="flex flex-wrap gap-3 w-full justify-center items-start pt-5 pb-2"
    >
      <!-- 學生輸入區 -->
      <ContainCard title="學生輸入區">
        <div
          class="flex gap-5 flex-col items-start justify-center px-4 py-2 sm:px-10 sm:py-4"
        >
          <div
            class="w-fit flex sm:flex-row flex-col justify-center items-start sm:items-center gap-2"
          >
            <div class="flex gap-2 justify-center items-center">
              <font-awesome-icon :icon="['fas', 'upload']" />
              手動引入
            </div>
            <div class="flex gap-3 flex-wrap">
              <input
                v-model.trim="studentName"
                type="text"
                class="rounded-lg px-2 border-gray-300 border-2"
                placeholder="請輸入學生姓名"
                @keydown.enter="addStudent"
              />
              <div class="flex gap-2">
                <button
                  class="px-9 py-1 bg-green-200 rounded-lg"
                  @click="addStudent"
                  :class="
                    studentName === ''
                      ? 'cursor-not-allowed'
                      : 'hover:bg-green-300'
                  "
                >
                  <font-awesome-icon :icon="['fas', 'user-plus']" />
                </button>
              </div>
            </div>
          </div>
          <div
            class="w-fit flex sm:flex-row flex-col justify-center items-start sm:items-center gap-2"
          >
            <div class="flex gap-2 justify-center items-center">
              <font-awesome-icon :icon="['fas', 'upload']" />
              網址引入
            </div>
            <div class="flex gap-3 flex-wrap">
              <input
                v-model.trim="studentNameFromUrl"
                type="text"
                class="rounded-lg px-2 border-gray-300 border-2"
                placeholder="請輸入點名網址"
                @keydown.enter="fetchStudentFromUrl"
              />
              <div class="flex gap-2">
                <button
                  class="px-9 py-1 bg-green-200 rounded-lg"
                  @click="fetchStudentFromUrl"
                  :class="
                    studentNameFromUrl === ''
                      ? 'cursor-not-allowed'
                      : 'hover:bg-green-300'
                  "
                >
                  <font-awesome-icon :icon="['fas', 'user-plus']" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </ContainCard>
      <!-- 動腦時間輸入區 -->
      <ContainCard title="動腦時間輸入區">
        <div
          class="flex gap-5 flex-col items-start justify-center px-4 py-2 sm:px-10 sm:py-4"
        >
          <div
            class="w-fit flex sm:flex-row flex-col justify-center items-start gap-2"
          >
            <div class="flex flex-col gap-3 flex-wrap">
              <textarea
                rows="6"
                v-model.trim="classExtra"
                class="rounded-lg px-2 border-gray-300 border-2 w-[220px] sm:w-[300px]"
                placeholder="請輸入動腦時間課程內容"
                @keydown.enter="addStudent"
              />
            </div>
          </div>
        </div>
      </ContainCard>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
