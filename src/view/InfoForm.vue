<template>
  <el-dialog
    v-model="visabelRef"
    title="Tips"
    width="80%"
    :before-close="handleClose"
  >
    <span>This is a message</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">Cancel</el-button>
        <el-button type="primary" @click="handleClose">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang='ts'>
import { ref, watch } from 'vue';

const props = defineProps({
  dialogVisible: Boolean,
});

const visabelRef = ref(false);

watch(() => props.dialogVisible, (newVal) => {
  visabelRef.value = newVal;
});

const emit = defineEmits(['close']);

const handleClose = () => {
  emit('close');
};
</script>

<style lang="scss" scoped>

</style>
