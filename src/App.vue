<template>
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
        class=" w-[25%] h-full mx-[2px] flex flex-col justify-between items-center"
        v-for="(item, index) in seats"
        :key="index"
      >
        <draggable
          class=" w-full h-full"
          :data-list="`list-${index}`"
          :list="item"
          :itemKey="'id'"
          group="bionicles"
          :move="handleMoveItem"
          @end="handleDragEndItem"
          :options="{ animation: 500 }"
        >
          <template #item="{ element, index: indexList }">
            <div
              class="w-full h-[45px] border-dashed border border-gray-500 flex justify-center items-center my-[5px] cursor-pointer bg-white text-black hover:bg-slate-300"
              @click="handleDialogOpen(element, index, indexList)"
            >
              <div class=" w-full flex flex-row justify-around items-center">
                <div class=" text-base">
                  {{ element.name }}
                </div>
                <div>
                  <div class=" text-sm">
                    {{ element.lessonTitle }}
                  </div>
                  <div class=" text-sm">
                    {{  element.lessonProcess1 }} - {{ element.lessonProcess2 }}
                  </div>
                </div>
              </div>
            </div>
          </template>
        </draggable>
      </div>
    </div>
    <div class=" flex justify-center items-center my-2">
      <el-icon size="30px" class=" text-cyan-600"><UserFilled /></el-icon>
      <div class=" text-base font-bold text-cyan-600 ml-2">
        (操作提示: 拖曳向上)
      </div>
    </div>
    <div class=" h-[20%]">
      <div class="my-2">
        <draggable
          v-model="students"
          group="bionicles"
          :data-list="'tagArea'"
          :itemKey="'id'"
          :move="handleMoveTag"
          @end="handleDragEndTag"
        >
          <template #item="{ element, index }">
            <el-tag
              class="mx-1 my-1"
              closable
              :type="'info'"
              size="large"
              draggable="true"
              @close="handleRemove(index)"
              style="font-size: medium;"
              round
            >
              {{ element }}
            </el-tag>
          </template>
        </draggable>
      </div>
      <div>
        <el-form-item label="學生姓名：">
          <el-input
            v-model="studentName"
            clearable
            @keyup.enter="handleCreate"
            style="touch-action: none;"
            :placeholder="'請輸入學生姓名(點擊 Enter 新增)'"
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

const studentName = ref('');
const extracurriculars = ref('');
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

const handleMoveTag = (event: {
  draggedContext: {
    index: number;
    futureIndex: number;
  };
  from: HTMLElement;
  to: HTMLElement;
}) => {
  futureIndex.value = event.draggedContext.futureIndex;
  futureList.value = event.to.getAttribute('data-list') || '';

  return false;
};

const handleDragEndTag = (event: {
  item: {
    _underlying_vm_: string;
  }
}) => {
  const getRow = Number(futureList.value.split('-')[1]);
  const getName = event.item._underlying_vm_;
  const isBlockEmpty = seats.value[getRow][futureIndex.value].name === '';

  if(!isBlockEmpty) {
    alert('該位置已有學生');
    return;
  }

  const getStudentIndex = students.value.findIndex((item) => item === getName);

  studentStore.intoSeat(getRow, futureIndex.value, getName);
  studentStore.remove(getStudentIndex);

  futureIndex.value = 0;
  futureList.value = '';
};

const handleMoveItem = (event: {
  draggedContext: {
    index: number;
    futureIndex: number;
  };
  from: HTMLElement;
  to: HTMLElement;
}) => {
  originalIndex.value = event.draggedContext.index;
  futureIndex.value = event.draggedContext.futureIndex;
  originalList.value = event.from.getAttribute('data-list') || '';
  futureList.value = event.to.getAttribute('data-list') || '';

  return false;
};

const handleDragEndItem = () => {
  if (futureList.value === 'tagArea') {
    return;
  }
  if (futureIndex.value > 9) {
    return;
  }
  if (originalIndex.value > 9) {
    return;
  }

  const getFurSet: number = Number(futureList.value.split('-')[1]);
  const getOriSet: number = Number(originalList.value.split('-')[1]);

  if (getFurSet === null || isNaN(getFurSet)) {
    return;
  }
  if (getOriSet === null || isNaN(getOriSet)) {
    return;
  }

  studentStore.moveSeat({ row: getOriSet, set: originalIndex.value }, { row: getFurSet, set: futureIndex.value });

  originalIndex.value = 0;
  futureIndex.value = 0;
  originalList.value = '';
  futureList.value = '';
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
    alert('該座位沒有學生');
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
