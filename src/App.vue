<template>
  <div>
    <div>
      <draggable
        class="list-group"
        data-list="list1"
        :list="list1"
        group="bionicles"
        itemKey="id"
        :move="handleMoveItem"
        @end="handleDragEndItem"
        :options="{ animation: 500 }"
      >
        <template #item="{ element }">
          <div class=" bg-gray-500 my-2" :style="element.style">
            {{ element.name }}
          </div>
        </template>
      </draggable>
    </div>
    =====
    <div>
      <draggable
        class="list-group"
        data-list="list2"
        :list="list2"
        group="bionicles"
        itemKey="id"
        :move="handleMoveItem"
        @end="handleDragEndItem"
        :options="{ animation: 500 }"
      >
        <template #item="{ element }">
          <div class=" bg-pink-500 my-2" :style="element.style">
            {{ element.name }}
          </div>
        </template>
      </draggable>
    </div>
  </div>
  <InfoForm
    :dialogVisible="dialogVisable"
    :data="studentInfo"
    :extracurriculars="extracurriculars"
    @close="handleDialogClose"
    @update="handleDialogUpdate"
  />
  <div class=" w-full h-full bg-white">
    <div class=" flex justify-center items-center">
      <el-icon size="30px" class=" text-orange-600"><Tickets /></el-icon>
      <div class=" text-base font-bold text-orange-600 ml-2">
        (座位區: 拖曳換位置)
      </div>
    </div>
    <div class=" w-full h-[80%] flex flex-row justify-center items-center my-1">
      <div
        class=" w-[20%] h-full mx-[2%] flex flex-col justify-between items-center"
        v-for="(item, index) in seats"
        :key="index"
      >
        <draggable
          class=" w-full h-full"
          :data-list="`list${index}`"
          :list="item"
          group="bionicles"
          itemKey="id"
          :move="handleMoveItem"
          @end="handleDragEndItem"
          :options="{ animation: 500 }"
        >
          <template #item="{ element }">
            <div class="w-full h-[45px] border-dashed border border-gray-500 flex justify-center items-center my-[5px] cursor-pointer bg-white hover:bg-slate-300">
              <div class=" w-full flex flex-row justify-around items-center">
                <div>
                  {{ element.name }}
                </div>
                <div>
                  <div>
                    {{ element.lessonTitle }}
                  </div>
                  <div>
                    {{  element.lessonProcess1 }} - {{ element.lessonProcess2 }}
                  </div>
                </div>
              </div>
            </div>
          </template>
        </draggable>
        <div
          v-for="(content, index2) in item"
          :key="index2"
          class=" w-full h-[45px] border-dashed border border-gray-500 flex justify-center items-center my-[5px] cursor-pointer bg-white hover:bg-slate-300"
          :draggable="true"
          @dragstart="dragMove(index, index2)"
          @drop="dropEnd(index, index2)"
          @dragover.prevent
          @dragenter.prevent
          @click="handleDialogOpen(content, index, index2)"
        >
          <div class=" w-full flex flex-row justify-around items-center">
            <div>
              {{ content.name }}
            </div>
            <div>
              <div>
                {{ content.lessonTitle }}
              </div>
              <div>
                {{  content.lessonProcess1 }} - {{ content.lessonProcess2 }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class=" flex justify-center items-center my-2">
      <el-icon size="30px" class=" text-cyan-600"><UserFilled /></el-icon>
      <div class=" text-base font-bold text-cyan-600 ml-2">
        (操作提示: 拖曳向上)
      </div>
    </div>
    <div class=" h-[20%]">
      <div class=" my-2">
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
          <el-input
            v-model="studentName"
            clearable
            @keyup.enter="handleCreate"
            style="touch-action: none;"
            :placeholder="'請輸入學生姓名'"
          />
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
        <el-form-item label="動腦時間：">
          <el-input
            v-model="extracurriculars"
            type="textarea"
            clearable
            rows="3"
            :placeholder="'請輸入動腦時間活動'"
          />
        </el-form-item>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { onMounted, ref, reactive } from 'vue';
import { useStudentStore } from './store/studentStore';
import InfoForm from './view/InfoForm.vue';
import draggable from 'vuedraggable';

const originalIndex = ref(0);
const futureIndex = ref(0);
const originalList = ref('');
const futureList = ref('');

const list1 = ref([
  {
    name: 'jacky',
  },
  {
    name: 'josh',
  },
  {
    name: 'jhonny',
  },
  {
    name: 'joooy',
  },
  {
    name: 'jossy',
  },
]);

const list2 = ref([
  {
    name: 'mike',
  },
  {
    name: 'miny',
  },
  {
    name: 'mopy',
  },
  {
    name: 'macy',
  },
  {
    name: 'mayyre',
  },
]);

const swapItems = (list1, list2, index1, index2) => {
  const temp = list1[index1];
  list1[index1] = list2[index2];
  list2[index2] = temp;
};

const handleDragEndItem = (event) => {
  console.log(event);
  const targetList = event.to.getAttribute('data-list');
  if (targetList !== 'list1' && targetList !== 'list2') {
    return;
  }
  if (futureIndex.value > list1.value.length - 1) {
    return;
  }

  console.table({
    originalIndex,
    futureIndex,
    originalList,
    futureList
  });

  if (originalList.value === 'list1' && futureList.value === 'list1') {
    swapItems(list1.value, list1.value, originalIndex.value, futureIndex.value);
  } else if (originalList.value === 'list2' && futureList.value === 'list2') {
    swapItems(list2.value, list2.value, originalIndex.value, futureIndex.value);
  } else if (originalList.value === 'list1' && futureList.value === 'list2') {
    swapItems(list1.value, list2.value, originalIndex.value, futureIndex.value);
  } else if (originalList.value === 'list2' && futureList.value === 'list1') {
    swapItems(list2.value, list1.value, originalIndex.value, futureIndex.value);
  }

  originalIndex.value = 0;
  futureIndex.value = 0;
  originalList.value = '';
  futureList.value = '';
};

const handleMoveItem = (event) => {
  originalIndex.value = event.draggedContext.index;
  futureIndex.value = event.draggedContext.futureIndex;
  originalList.value = event.from.getAttribute('data-list');
  futureList.value = event.to.getAttribute('data-list');

  return false;
};

export interface ClassRoomSeat {
  name: string;
  lastLessonKey: string | null;
  lastLessonProcess1: string | null;
  lastLessonProcess2: string | null;
  lastLessonTitle: string | null;
  lessonKey: string | null;
  lessonProcess1: string | null;
  lessonProcess2: string | null;
  lessonTitle: string | null;
  lessonContent: string | null;
  behavior: string | null,
  behaviorContent: string | null,
}

const studentStore = useStudentStore();

const dragType = ref<'create' | 'edit'>('create');
const studentName = ref('');
const extracurriculars = ref('');
const holdName = ref('');
const holdIndex = ref(0);
const seat = reactive<{
  row: number,
  set: number,
}>({
  row: -1,
  set: -1,
});
const saveSeat= reactive<{
  row: number,
  set: number,
}>({
  row: -1,
  set: -1,
});
const dialogVisable = ref(false);
const studentInfo = ref<ClassRoomSeat>({
  name: '',
  lastLessonKey: null,
  lastLessonProcess1: null,
  lastLessonProcess2: null,
  lastLessonTitle: null,
  lessonKey: null,
  lessonProcess1: null,
  lessonProcess2: null,
  lessonTitle: null,
  lessonContent: null,
  behavior: null,
  behaviorContent: null,
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

const handleCreate = () => {
  if (studentName.value === '') return;
  studentStore.createStudent(studentName.value);
  handleClear();
};

const handleDialogOpen = (data: ClassRoomSeat, row: number, set: number) => {
  saveSeat.row = row;
  saveSeat.set = set;
  if (data.name === '') {
    alert('該格沒有學生');
    return;
  }
  studentInfo.value = { ...data };
  dialogVisable.value = true;
};

const handleDialogClose = () => {
  dialogVisable.value = false;
};

const handleDialogUpdate = (updatedLessonDetail: ClassRoomSeat) => {
  studentStore.saveSeatInfo(saveSeat.row, saveSeat.set, updatedLessonDetail);
  saveSeat.row = -1;
  saveSeat.set = -1;
  dialogVisable.value = false;
};

onMounted(async () => {
  studentStore.init();
});
</script>

<style scoped>
</style>
