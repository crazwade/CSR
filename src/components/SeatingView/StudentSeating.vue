<script setup lang="ts">
import { useDataStore } from '../../store/dataStore.ts';

const dataStore = useDataStore();

defineProps<{
  studentId?: string;
}>();
</script>

<template>
  <div v-if="!studentId">(空位置)</div>
  <div v-else class="w-full flex justify-around items-center">
    <div>
      {{ dataStore.getStudent(studentId)!.name }}
    </div>
    <div class="flex flex-col justify-start items-center text-sm">
      <!-- 上週課程 -->
      <div
        v-if="dataStore.getStudent(studentId)?.classDetail.previousFinished"
        class="flex justify-center items-center min-w-[66px] text-green-700"
      >
        上週已完成
      </div>
      <div v-else class="flex justify-center items-center min-w-[70px]">
        <div class="w-[30px]">
          {{
            dataStore
              .getStudent(studentId)
              ?.classDetail?.previous?.lessonContentKey.split(' ')[0] ?? '未填'
          }}
        </div>
        <div>
          {{
            dataStore.getStudent(studentId)?.classDetail?.previous
              ?.lessonProcess1 ?? ''
          }}
          -
          {{
            dataStore.getStudent(studentId)?.classDetail?.previous
              ?.lessonProcess2 ?? ''
          }}
        </div>
      </div>
      <!-- 本週課程 -->
      <div
        v-if="!dataStore.getStudent(studentId)?.classDetail.curr"
        class="flex justify-center items-center min-w-[66px] text-red-500"
      >
        本週未填寫
      </div>
      <div v-else class="flex justify-center items-center min-w-[70px]">
        <div class="w-[30px]">
          {{
            dataStore
              .getStudent(studentId)
              ?.classDetail?.curr?.lessonContentKey.split(' ')[0] ?? '未填'
          }}
        </div>
        <div>
          {{
            dataStore.getStudent(studentId)?.classDetail?.curr
              ?.lessonProcess1 ?? ''
          }}
          -
          {{
            dataStore.getStudent(studentId)?.classDetail?.curr
              ?.lessonProcess2 ?? ''
          }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
