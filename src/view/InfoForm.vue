<template>
  <el-dialog
    :model-value="dialogVisible"
    title="編輯學生課堂資訊"
    width="350px"
    :before-close="handleClose"
    class=" my-[8vh]"
  >
    <el-form-item label="學生姓名：" class=" flex justify-center items-center mb-2">
      <el-input
        v-model="lessonDetail.name"
        clearable
        style="touch-action: none;"
        :placeholder="'請輸入學生姓名'"
      />
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
          <el-select v-model="lessonDetail.lastLessonKey" class="m-2" placeholder="Select" @change="lessonDetail.lastLessonTitle = null">
            <el-option
              v-for="(item, index) in lessonKey"
              :key="index"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="課程名稱：" class=" flex justify-center items-center">
          <el-select v-model="lessonDetail.lastLessonTitle" class="m-2" placeholder="Select">
            <el-option
              v-for="(item, index) in lessonContent[lessonDetail.lastLessonKey as keyof typeof lessonContent] || []"
              :key="index"
              :label="`${item.key} - ${item.lessonName}`"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="課程進度：" class=" flex justify-center items-center">
          <el-select v-model="lessonDetail.lastLessonProcess1" class="m-2 w-[60px]" placeholder="Select" >
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
          <el-select v-model="lessonDetail.lastLessonProcess2" class="m-2 w-[60px]" placeholder="Select">
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
          <el-select v-model="lessonDetail.lessonKey" class="m-2" placeholder="Select" @change="lessonDetail.lessonTitle = null">
            <el-option
              v-for="(item, index) in lessonKey"
              :key="index"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="課程名稱：" class=" flex justify-center items-center">
          <el-select v-model="lessonDetail.lessonTitle" class="m-2" placeholder="Select">
            <el-option
              v-for="(item, index) in lessonContent[lessonDetail.lessonKey as keyof typeof lessonContent] || []"
              :key="index"
              :label="`${item.key} - ${item.lessonName}`"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="課程進度：" class=" flex justify-center items-center">
          <el-select v-model="lessonDetail.lessonProcess1" class="m-2 w-[60px]" placeholder="Select" >
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
          <el-select v-model="lessonDetail.lessonProcess2" class="m-2 w-[60px]" placeholder="Select">
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
    <!-- 課堂表現自動生成 -->
    <div>
      <span class=" flex flex-col justify-center items-center">
        <div class=" my-3 font-semibold text-base mx-3">==課堂表現自動生成==</div>
        <div class=" text-red-500 font-extrabold">
          特殊狀況建議自行填寫
        </div>
      </span>
      <div>
        <el-form-item label="表現：" class=" flex justify-center items-center">
          <el-select v-model="lessonDetail.behavior" class="m-2" placeholder="Select" @change="classBehaviorSelect">
            <el-option :label="'無'" :value="null" />
            <el-option
              v-for="(item, index) in classBehaviorKey"
              :key="index"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
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
import { lessonKey, lessonContent, classBehavior, classBehaviorKey } from '../store/data';

const props = defineProps({
  dialogVisible: Boolean,
  data: {
    type: Object as PropType<ClassRoomSeat>,
    required: true,
  },
  extracurriculars: {
    type: String,
    required: true,
  },
});

// 資料區
const lessonDetail = reactive<ClassRoomSeat>({
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

/** 本週進度 可視 */
const lastWeekVisable = ref(false);
/** 上週進度 可視 */
const thisWeekVisable = ref(true);
/** 是否有上週遺留課程 */
const switchValue = ref(false);

const classBehaviorSelect = () => {
  if (lessonDetail.behavior === null ) {
    lessonDetail.behavior = null;
    lessonDetail.behaviorContent = null;
    return;
  }
  const tmp = classBehavior[lessonDetail.behavior];
  lessonDetail.behaviorContent = tmp[Math.floor(Math.random() * tmp.length)];
};

/** 是否需要設置上週課程內容 */
watch(() => props.dialogVisible, () => {
  lessonDetail.name = props.data.name;
  if (props.dialogVisible){
    if (props.data.lastLessonTitle !== null) {
      lessonDetail.lastLessonKey = props.data.lastLessonKey;
      lessonDetail.lastLessonTitle = props.data.lastLessonTitle;
      lessonDetail.lastLessonProcess1 = props.data.lastLessonProcess1;
      lessonDetail.lastLessonProcess2 = props.data.lastLessonProcess2;
      switchValue.value = false;
    } else {
      switchValue.value = true;
    }
    lessonDetail.lessonProcess1 = props.data.lessonProcess1;
    lessonDetail.lessonProcess2 = props.data.lessonProcess2;
    lessonDetail.lessonKey = props.data.lessonKey;
    lessonDetail.lessonTitle = props.data.lessonTitle;
    lessonDetail.lessonContent = props.data.lessonContent;
    lessonDetail.behavior = props.data.behavior;
    lessonDetail.behaviorContent = props.data.behaviorContent;
  }
});

/** 課程進度 options */
const options = Array.from({ length: 26 }, (_, index) => String.fromCharCode(65 + index));
const filteredLastOptions = computed(() => {
  const selectedValue = lessonDetail.lastLessonProcess1;
  if (selectedValue === null) {
    return Array.from({ length: 26 }, (_, index) => String.fromCharCode(65 + index));
  }
  return options.filter(option => option > selectedValue);
});
const filteredOptions = computed(() => {
  const selectedValue = lessonDetail.lessonProcess1;
  if (selectedValue === null) {
    return Array.from({ length: 26 }, (_, index) => String.fromCharCode(65 + index));
  }
  return options.filter(option => option > selectedValue);
});

const emit = defineEmits(['close', 'update']);

const handleClose = () => {
  emit('close');
};

const handleSave = () => {
  emit('update', lessonDetail);
};

// 計算生成的內容
const generatedTextContent = computed(() => {
  if (lessonDetail.lessonKey === null
    && lessonDetail.lessonProcess1 === null
    && lessonDetail.lessonProcess2 === null
    && lessonDetail.lessonTitle === null
  ) {
    return; // 提前結束執行
  }
  const getLessonTitle = lessonContent[lessonDetail.lessonKey as keyof typeof lessonContent].find((item) => item.key === lessonDetail.lessonTitle);

  const header = `本週課程「${getLessonTitle?.key} - ${getLessonTitle?.lessonName}」: ${getLessonTitle?.lessonContent}`;

  const classContent = lessonDetail.behavior === null ? '\n\n<<課堂表現請自行填入>>' : `\n\n${lessonDetail.name}本週上課情形穩定，${lessonDetail.behaviorContent}`;

  let head2 = `\n\n本週課程進度: ${lessonDetail.lessonProcess1} - ${lessonDetail.lessonProcess2}。`;

  const bottom: string = props.extracurriculars === '' ? '\n\n<<尚未添加動腦時間>>' : `\n\n${props.extracurriculars}`;

  if (lessonDetail.lastLessonKey === null
    && lessonDetail.lastLessonProcess1 === null
    && lessonDetail.lastLessonProcess2 === null
    && lessonDetail.lastLessonTitle === null
  ) {
    return header + head2 + classContent + bottom;
  }

  const getLastLessonTitle = lessonContent[lessonDetail.lastLessonKey as keyof typeof lessonContent].find((item) => item.key === lessonDetail.lastLessonTitle);

  if (!switchValue.value) {
    head2 = `\n\n上週課程「${getLastLessonTitle?.key} - ${getLastLessonTitle?.lessonName}」進度: ${lessonDetail.lastLessonProcess1} - ${lessonDetail.lastLessonProcess2}。本週課程進度: ${lessonDetail.lessonProcess1} - ${lessonDetail.lessonProcess2}。`;
    return header + head2 + classContent + + bottom;
  }

  head2 = `\n\n本週課程進度: ${lessonDetail.lessonProcess1} - ${lessonDetail.lessonProcess2}。`;
  return header + head2 + classContent + + bottom;
});
</script>

<style lang="scss" scoped>

</style>
