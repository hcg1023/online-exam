<script setup lang="ts">
import { BaseQuestion } from "/@/views/components/questions/question.type";

defineProps<{
  question: BaseQuestion;
  value: string;
  onUpdateValue: (value: string) => void;
  readonly: boolean;
}>();
</script>

<template>
  <div class="question">
    <div class="question-title">
      {{ question.title }}
    </div>
    <div class="question-container">
      <el-input
        :disabled="readonly"
        :model-value="value"
        @input="onUpdateValue"
        type="textarea"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.question-title {
  display: flex;
  .el-textarea {
    width: 100%;
  }
}
</style>
