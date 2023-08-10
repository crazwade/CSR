<template>
  <el-dialog
    :model-value="dialogVisible"
    title="編輯學生課堂資訊"
    width="350px"
    :before-close="handleClose"
    class=" my-[8vh]"
  >
    <el-form-item label="學生姓名：" class=" flex justify-center items-center mb-2">
      {{ data?.name }}
    </el-form-item>
    <el-form-item label="是否有上週未完成的專案" class=" flex justify-center items-center mb-2">
      <el-switch
        v-model="switchValue"
        size="default"
        active-text="沒有"
        inactive-text="有"
      />
    </el-form-item>
    <!-- 上週專案進度 -->
    <div v-if="!switchValue">
      <el-divider class=" border-2 my-3" />
      <span class=" flex justify-center items-center">
        <div class=" my-3 font-semibold text-base mx-3">==上週進度==</div>
        <el-icon class=" mx-3 cursor-pointer" v-if="lastWeekVisable" @click="lastWeekVisable = !lastWeekVisable" size="25px"><View /></el-icon>
        <el-icon class=" mx-3 cursor-pointer" v-else @click="lastWeekVisable = !lastWeekVisable" size="25px"><Hide /></el-icon>
      </span>
      <div v-if="lastWeekVisable">
        <el-form-item label="課程主題：" class=" flex justify-center items-center">
          <el-select v-model="lastLessonInfo.lastLessonKey" class="m-2" placeholder="Select" @change="lastLessonInfo.lastLessonTitle = null">
            <el-option
              v-for="(item, index) in lessonKey"
              :key="index"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="課程名稱：" class=" flex justify-center items-center">
          <el-select v-model="lastLessonInfo.lastLessonTitle" class="m-2" placeholder="Select">
            <el-option
              v-for="(item, index) in lessonContent[lastLessonInfo.lastLessonKey as keyof typeof lessonContent] || []"
              :key="index"
              :label="`${item.key} - ${item.lessonName}`"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="課程進度：" class=" flex justify-center items-center">
          <el-select v-model="lastLessonProcess1" class="m-2 w-[60px]" placeholder="Select" >
            <el-option
              v-for="option in options"
              :key="option"
              :label="option"
              :value="option"
            />
          </el-select>
          <div>
            -
          </div>
          <el-select v-model="lastLessonProcess2" class="m-2 w-[60px]" placeholder="Select">
            <el-option
              v-for="option in filteredLastOptions"
              :key="option"
              :label="option"
              :value="option"
            />
          </el-select>
        </el-form-item>
      </div>
      <div v-else>
        已隱藏(點擊眼睛開啟)
      </div>
    </div>
    <el-divider class=" border-2 my-3" />
    <!-- 本週專案進度 -->
    <div>
      <span class=" flex justify-center items-center">
        <div class=" my-3 font-semibold text-base mx-3">==本週進度==</div>
        <el-icon class=" mx-3 cursor-pointer" v-if="thisWeekVisable" @click="thisWeekVisable = !thisWeekVisable" size="25px"><View /></el-icon>
        <el-icon class=" mx-3 cursor-pointer" v-else @click="thisWeekVisable = !thisWeekVisable" size="25px"><Hide /></el-icon>
      </span>
      <div v-if="thisWeekVisable">
        <el-form-item label="課程主題：" class=" flex justify-center items-center">
          <el-select v-model="lessonInfo.lessonKey" class="m-2" placeholder="Select" @change="lessonInfo.lessonTitle = null">
            <el-option
              v-for="(item, index) in lessonKey"
              :key="index"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="課程名稱：" class=" flex justify-center items-center">
          <el-select v-model="lessonInfo.lessonTitle" class="m-2" placeholder="Select">
            <el-option
              v-for="(item, index) in lessonContent[lessonInfo.lessonKey as keyof typeof lessonContent] || []"
              :key="index"
              :label="`${item.key} - ${item.lessonName}`"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="課程進度：" class=" flex justify-center items-center">
          <el-select v-model="LessonProcess1" class="m-2 w-[60px]" placeholder="Select" >
            <el-option
              v-for="option in options"
              :key="option"
              :label="option"
              :value="option"
            />
          </el-select>
          <div>
            -
          </div>
          <el-select v-model="LessonProcess2" class="m-2 w-[60px]" placeholder="Select">
            <el-option
              v-for="option in filteredOptions"
              :key="option"
              :label="option"
              :value="option"
            />
          </el-select>
        </el-form-item>
      </div>
      <div v-else>
        已隱藏(點擊眼睛開啟)
      </div>
    </div>
    <el-divider class=" border-2 my-3" />
    <!-- 自動產生紀錄 -->
    <div>
      <span class=" flex justify-center items-center">
        <div class=" my-3 font-semibold text-base mx-3">==自動產生紀錄==</div>
      </span>
      <div class=" text-left whitespace-pre-line">
        {{ generatedTextContent }}
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">關閉</el-button>
        <el-button type="primary" @click="handleSave" class=" bg-blue-400">
          儲存
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang='ts'>
import { PropType, watch, ref, reactive, computed } from 'vue';
import type { ClassRoomSeat } from '../App.vue';
import { lessonKey, lessonContent } from '../store/data';

const props = defineProps({
  dialogVisible: Boolean,
  data: {
    type: Object as PropType<ClassRoomSeat>,
    required: true,
  },
});

const lessonDetail = ref<ClassRoomSeat>({
  name: '',
  lastLessonKey: null,
  lastLessonProcess: null,
  lastLessonTitle: null,
  lessonKey: null,
  lessonProcess: null,
  lessonTitle: null,
  lessonContent: null,
});

const lastWeekVisable = ref(false);
const thisWeekVisable = ref(true);

// 本週專案資訊
const lessonInfo = reactive<{
  lessonKey: string | null;
  lessonProcess: string | null;
  lessonTitle: string | null;
}>({
  lessonKey: null,
  lessonProcess: null,
  lessonTitle: null,
});

// 上週專案資訊
const lastLessonInfo = reactive<{
  lastLessonKey: string | null;
  lastLessonProcess: string | null;
  lastLessonTitle: string | null;
}>({
  lastLessonKey: null,
  lastLessonProcess: null,
  lastLessonTitle: null,
});

/** 上週課程進度 */
const lastLessonProcess1 = ref('');
const lastLessonProcess2 = ref('');
const switchValue = ref(false);

/** 本週課程進度 */
const LessonProcess1 = ref('');
const LessonProcess2 = ref('');

/** 是否需要設置上週課程內容 */
watch(() => props.dialogVisible, (newVal) => {
  if (newVal && props.data.lastLessonTitle !== null) {
    lastLessonInfo.lastLessonKey = props.data.lastLessonKey;
    lastLessonInfo.lastLessonTitle = props.data.lastLessonTitle;
    const process = props.data?.lastLessonProcess?.split(' - ');
    lastLessonProcess2.value = process?.[1] || '';
    lastLessonProcess1.value = process?.[0] || '';
    switchValue.value = false;
  } else {
    switchValue.value = true;
  }
});

/** 課程進度 options */
const options = Array.from({ length: 26 }, (_, index) => String.fromCharCode(65 + index));
const filteredLastOptions = computed(() => {
  const selectedValue = lastLessonProcess1.value;
  return options.filter(option => option > selectedValue);
});
const filteredOptions = computed(() => {
  const selectedValue = LessonProcess1.value;
  return options.filter(option => option > selectedValue);
});

const emit = defineEmits(['close']);

const handleClose = () => {
  emit('close');
};

const handleSave = () => {
  if (lastLessonInfo.lastLessonKey !== null) {
    lastLessonInfo.lastLessonProcess = `${lastLessonProcess1.value} - ${lastLessonProcess2.value}`;
    lessonDetail.value.lastLessonKey = lastLessonInfo.lastLessonKey;
    lessonDetail.value.lastLessonProcess = lastLessonInfo.lastLessonProcess;
    lessonDetail.value.lastLessonTitle = lastLessonInfo.lastLessonTitle;
  }

  lessonDetail.value.name = props.data.name;
  lessonDetail.value.lessonKey = lessonInfo.lessonKey;
  lessonDetail.value.lessonProcess = `${LessonProcess1.value} - ${LessonProcess2.value}`;
  lessonDetail.value.lessonTitle = lessonInfo.lessonTitle;
  const tmp: {
    key: string;
    lessonName: string;
    lessonContent: string;
  } | undefined = lessonContent[lessonInfo.lessonKey as keyof typeof lessonContent].find((item) => item.key === lessonInfo.lessonTitle);
  lessonDetail.value.lessonContent = tmp?.lessonContent ?? null;

  console.log(lessonDetail.value);
};

// 計算生成的內容
const generatedTextContent = computed(() => {
  if (lessonInfo.lessonKey === null && lessonInfo.lessonProcess === null && lessonInfo.lessonTitle === null && LessonProcess1.value === '' && LessonProcess2.value === '') {
    return; // 提前結束執行
  }
  const getLessonTitle = lessonContent[lessonInfo.lessonKey as keyof typeof lessonContent].find((item) => item.key === lessonInfo.lessonTitle);
  const header = `本週課程「${getLessonTitle?.key} - ${getLessonTitle?.lessonName}」: ${getLessonTitle?.lessonContent}`;

  let head2 = `\n\n本週課程進度: ${LessonProcess1.value} - ${LessonProcess2.value}。`;

  let contentAct = '\n\n(模擬動腦時間)程式是由指令和邏輯構成的一組指令集合，用於執行特定任務或運算，讓電腦能夠自動化處理資料和操作。';

  if (lastLessonInfo.lastLessonKey === null && lastLessonInfo.lastLessonProcess === null && lastLessonInfo.lastLessonTitle === null && lastLessonProcess1.value === '' && lastLessonProcess2.value === '') {
    return header + head2 + contentAct;
  }

  const getLastLessonTitle = lessonContent[lastLessonInfo.lastLessonKey as keyof typeof lessonContent].find((item) => item.key === lastLessonInfo.lastLessonTitle);

  if (!switchValue.value) {
    head2 = `\n\n上週課程「${getLastLessonTitle?.key} - ${getLastLessonTitle?.lessonName}」進度: ${lastLessonProcess1.value} - ${lastLessonProcess2.value}。本週課程進度: ${LessonProcess1.value} - ${LessonProcess2.value}。`;
    return header + head2 + contentAct;
  }

  head2 = `\n\n本週課程進度: ${LessonProcess1.value} - ${LessonProcess2.value}。`;
  return header + head2 + contentAct;


  // if (switchValue.value) {
  //   head2 = `本週課程進度${LessonProcess1.value} - ${LessonProcess2.value}`;
  // } else {
  //   head2 = `上週課程「${getLastLessonTitle?.key} - ${getLastLessonTitle?.lessonName}」進度: ${lastLessonProcess1.value} - ${lastLessonProcess2.value}。本週課程進度: ${LessonProcess1.value} - ${LessonProcess2.value}`;
  // }
});
</script>

<style lang="scss" scoped>

</style>
