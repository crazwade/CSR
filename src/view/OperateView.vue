<script setup lang="ts">
import { ref, watch } from 'vue';
import { useDataStore } from '../store/dataStore.ts';
import ContainCard from '../components/ContainCard.vue';
import StudentView from '../components/OperateView/StudentView.vue';
import LoadingDialog from '../components/LoadingDialog.vue';

const dataStore = useDataStore();

const dialogVisible = ref<boolean>(false);
const studentName = ref<string>('');
const studentNameFromUrl = ref<string>('www.orangeapple.co/?class=2024-01-01');

const classExtra = ref<string>('');

const addStudent = () => {
  if (studentName.value === '') {
    return;
  }
  dataStore.addStudent(studentName.value);
  studentName.value = '';
};

// TODO 從 URL 取得學生資料
// 供測試用
const fetchStudentFromUrl = async () => {
  if (studentNameFromUrl.value === '') {
    return;
  }

  dialogVisible.value = true;

  const students: { name: string }[] = await new Promise((resolve) => {
    const tmp = [
      {
        name: '吳宗憲',
      },
      {
        name: '宋少卿',
      },
      {
        name: '成龍',
      },
      {
        name: '王陽明',
      },
      {
        name: '陳楚香',
      },
      {
        name: '蔣淑君',
      },
      {
        name: '林嘉慈',
      },
      {
        name: '李淑娟',
      },
      {
        name: '歐陽瑩營',
      },
      {
        name: '諸葛孔明',
      },
    ];

    setTimeout(() => {
      resolve(tmp);
      dialogVisible.value = false;
    }, 5000);
  });

  students.forEach((student) => {
    dataStore.addStudent(student.name);
  });

  studentNameFromUrl.value = '';
};

watch(
  () => classExtra.value,
  () => {
    dataStore.updateClassExtra(classExtra.value);
  }
);
</script>

<template>
  <LoadingDialog :title="'載入學生名單中(DEMO)'" :visible="dialogVisible" />
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
                v-model="classExtra"
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
