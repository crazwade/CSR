<script setup lang="ts">
import { watch, ref, reactive, computed } from 'vue';
import type { Student } from '../../store/dataStore';
import { useDataStore } from '../../store/dataStore.ts';
import { lessonKey, lessonContent, lessonProcess } from '../../store/data.ts';

const dataStore = useDataStore();
const dialogVisible = ref<boolean>(false);

const studentInfo = reactive<Student>({
  id: '',
  name: '',
  classDetail: {
    curr: {
      lessonKey: '',
      lessonContentKey: '',
      lessonContent: '',
      lessonProcess1: '',
      lessonProcess2: '',
      behaviorContent: '',
    },
    previous: {
      lessonKey: '',
      lessonContentKey: '',
      lessonContent: '',
      lessonProcess1: '',
      lessonProcess2: '',
    },
    previousFinished: false,
  },
});

const emit = defineEmits<{
  closeDialog: [];
}>();

const props = withDefaults(
  defineProps<{
    visible: boolean;
    studentId: string;
  }>(),
  {
    visible: false,
  }
);

watch(
  () => props.visible,
  (val: boolean) => {
    dialogVisible.value = val;

    if (val) {
      const { name, classDetail } = dataStore.getStudent(props.studentId)!;
      studentInfo.id = props.studentId;
      studentInfo.name = name;
      studentInfo.classDetail.previousFinished = classDetail.previousFinished;
      studentInfo.classDetail.curr = {
        lessonKey: classDetail.curr.lessonKey,
        lessonContentKey: classDetail.curr.lessonContentKey,
        lessonContent: classDetail.curr.lessonContent,
        lessonProcess1: classDetail.curr.lessonProcess1,
        lessonProcess2: classDetail.curr.lessonProcess2,
        behaviorContent: classDetail.curr.behaviorContent,
      };
      studentInfo.classDetail.previous = {
        lessonKey: classDetail.previous.lessonKey,
        lessonContentKey: classDetail.previous.lessonContentKey,
        lessonContent: classDetail.previous.lessonContent,
        lessonProcess1: classDetail.previous.lessonProcess1,
        lessonProcess2: classDetail.previous.lessonProcess2,
      };
    }
  }
);

watch(
  () => studentInfo.classDetail.curr.lessonKey,
  () => {
    studentInfo.classDetail.curr.lessonContentKey = '';
  }
);

watch(
  () => studentInfo.classDetail.previous.lessonKey,
  () => {
    studentInfo.classDetail.previous.lessonContentKey = '';
  }
);

watch(
  () => studentInfo.classDetail.curr.lessonContentKey,
  (key: string) => {
    const getContent = lessonContent[
      studentInfo.classDetail.curr.lessonKey
    ].find((item) => item.key === key.split(' ')[0]);
    studentInfo.classDetail.curr.lessonContent =
      getContent?.lessonContent || '';
  }
);

watch(
  () => studentInfo.classDetail.previous.lessonContentKey,
  (key: string) => {
    const getContent = lessonContent[
      studentInfo.classDetail.previous.lessonKey
    ].find((item) => item.key === key.split(' ')[0]);
    studentInfo.classDetail.previous.lessonContent =
      getContent?.lessonContent || '';
  }
);

watch(
  () => studentInfo.classDetail.curr.lessonProcess1,
  () => {
    studentInfo.classDetail.curr.lessonProcess2 = '';
  }
);

watch(
  () => studentInfo.classDetail.previous.lessonProcess1,
  () => {
    studentInfo.classDetail.previous.lessonProcess2 = '';
  }
);

const copyText = async () => {
  // 選取要複製的元素
  const element = document.getElementById('contactBook');

  if (element) {
    try {
      await navigator.clipboard.writeText(element?.innerText);
      console.log('文本已複製到剪貼板');
    } catch (err) {
      console.error('複製失敗：', err);
    }
  } else {
    console.error('找不到元素：contactBook');
  }
};

const getLessonTitle = (key: string) => {
  if (!lessonKey.includes(key)) {
    return [];
  }

  return lessonContent[key];
};

const getLessonProcess2 = (key: string) => {
  if (!key) {
    return lessonProcess;
  }

  const index = lessonProcess.findIndex((item) => item === key);
  return lessonProcess.slice(index);
};

const generatedTextContent = computed(() => {
  let content = '';

  if (!studentInfo.classDetail.previousFinished) {
    let tmp: string = '';
    tmp = `上週課程「${studentInfo.classDetail.previous.lessonKey} - ${studentInfo.classDetail.previous.lessonContentKey}」：進度 ${studentInfo.classDetail.previous.lessonProcess1} - ${studentInfo.classDetail.previous.lessonProcess2}。「${studentInfo.classDetail.previous.lessonContent}」\n\n`;

    content += tmp;
  }

  if (studentInfo.classDetail.curr.lessonKey) {
    let tmp: string = '';
    tmp = `本週課程「${studentInfo.classDetail.curr.lessonKey} - ${studentInfo.classDetail.curr.lessonContentKey}」：進度 ${studentInfo.classDetail.curr.lessonProcess1} - ${studentInfo.classDetail.curr.lessonProcess2}。「${studentInfo.classDetail.curr.lessonContent}」\n\n`;

    content += tmp;
  }

  if (studentInfo.classDetail.curr.behaviorContent) {
    let tmp: string = '';
    tmp = `${studentInfo.name}的課堂表現：${studentInfo.classDetail.curr.behaviorContent}\n\n`;

    content += tmp;
  }

  if (dataStore.getClassExtra !== '') {
    let tmp: string = '';
    tmp = `動腦時間：${dataStore.getClassExtra}\n\n`;

    content += tmp;
  }

  return content;
});
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    :close-on-click-modal="false"
    :title="'聯絡簿內容'"
    width="320"
    @close="emit('closeDialog')"
  >
    <div>
      <el-form :model="studentInfo" style="max-width: 600px">
        <el-form-item label="學生姓名：">
          <el-input v-model="studentInfo.name" />
        </el-form-item>
        <el-form-item label="上週課程是否完成：">
          <el-switch
            v-model="studentInfo.classDetail.previousFinished"
            active-text="完成"
            inactive-text="尚未"
          />
        </el-form-item>
        <template v-if="!studentInfo.classDetail.previousFinished">
          <div class="w-full text-center text-base font-semibold pb-2">
            ==== 上週課程 ====
          </div>
          <el-form-item label="課程主題：">
            <el-select
              v-model="studentInfo.classDetail.previous.lessonKey"
              clearable
            >
              <el-option
                v-for="(item, index) in lessonKey"
                :key="`lessonKey-${index}`"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="課程名稱：">
            <el-select
              v-model="studentInfo.classDetail.previous.lessonContentKey"
              clearable
            >
              <el-option
                v-for="(item, index) in getLessonTitle(
                  studentInfo.classDetail.previous.lessonKey
                )"
                :key="`lessonContent-${index}`"
                :label="`${item.key} ${item.lessonName}`"
                :value="`${item.key} ${item.lessonName}`"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="課程進度：">
            <el-select
              v-model="studentInfo.classDetail.previous.lessonProcess1"
              clearable
              class="w-[60px]"
            >
              <el-option
                v-for="(item, index) in lessonProcess"
                :key="`previouslessonProcess-${index}`"
                :label="item"
                :value="item"
              />
            </el-select>
            <div class="px-6">-</div>
            <el-select
              v-model="studentInfo.classDetail.previous.lessonProcess2"
              clearable
              class="w-[60px]"
            >
              <el-option
                v-for="(item, index) in getLessonProcess2(
                  studentInfo.classDetail.previous.lessonProcess1
                )"
                :key="`previouslessonProcess-${index}`"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-form-item>
        </template>
        <div class="w-full text-center text-base font-semibold pb-2">
          ==== 本週課程 ====
        </div>
        <el-form-item label="課程主題：">
          <el-select v-model="studentInfo.classDetail.curr.lessonKey" clearable>
            <el-option
              v-for="(item, index) in lessonKey"
              :key="`lessonKey-${index}`"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="課程名稱：">
          <el-select
            v-model="studentInfo.classDetail.curr.lessonContentKey"
            clearable
          >
            <el-option
              v-for="(item, index) in getLessonTitle(
                studentInfo.classDetail.curr.lessonKey
              )"
              :key="`lessonContent-${index}`"
              :label="`${item.key} ${item.lessonName}`"
              :value="`${item.key} ${item.lessonName}`"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="課程進度：">
          <el-select
            v-model="studentInfo.classDetail.curr.lessonProcess1"
            clearable
            class="w-[60px]"
          >
            <el-option
              v-for="(item, index) in lessonProcess"
              :key="`currlessonProcess-${index}`"
              :label="item"
              :value="item"
            />
          </el-select>
          <div class="px-6">-</div>
          <el-select
            v-model="studentInfo.classDetail.curr.lessonProcess2"
            clearable
            class="w-[60px]"
          >
            <el-option
              v-for="(item, index) in getLessonProcess2(
                studentInfo.classDetail.curr.lessonProcess1
              )"
              :key="`currlessonProcess-${index}`"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="課堂行為：">
          <el-input
            v-model="studentInfo.classDetail.curr.behaviorContent"
            :rows="4"
            type="textarea"
            placeholder="課堂行為"
          />
        </el-form-item>
        <div
          class="w-full text-center text-base font-semibold pb-2 flex flex-col"
        >
          ==== 聯絡簿生成 ====
          <div class="py-3 h-fit">
            <font-awesome-icon
              :icon="['fas', 'copy']"
              class="cursor-pointer hover:text-gray-400 h-[20px]"
              @click="copyText"
            />
          </div>
          <div
            class="text-sm font-normal whitespace-pre-line text-left"
            id="contactBook"
          >
            {{ generatedTextContent }}
          </div>
        </div>
        <div class="flex justify-end">
          <el-button
            class="w-full"
            type="primary"
            @click="
              dataStore.updateStudent(studentInfo);
              emit('closeDialog');
            "
          >
            儲存
          </el-button>
        </div>
      </el-form>
    </div>
  </el-dialog>
</template>

<style lang="scss" scoped></style>
