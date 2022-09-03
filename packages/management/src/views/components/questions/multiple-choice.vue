<script setup lang="ts">
import { BaseQuestion } from "/@/views/components/questions/question.type";

const props = defineProps<{
  question: BaseQuestion;
  value: string[];
  onUpdateValue: (value: string[]) => void;
}>();

const onChange = (value: string[]) => {
  props.onUpdateValue(value);
};
</script>

<template>
  <div class="question">
    <div class="question-title">{{ question.title }}</div>
    <el-checkbox-group
      class="question-options"
      :model-value="value"
      @change="onChange"
    >
      <el-checkbox
        v-for="option in question.options"
        :key="option.title"
        :label="option.title"
        ><span class="question-option-title">{{ option.title }}:</span
        >{{ option.value }}</el-checkbox
      >
    </el-checkbox-group>
  </div>
</template>

<style lang="scss">
.question {
  font-size: 18px;
  &-options {
    font-size: 18px;
  }
}
.question-option-title {
  font-weight: bold;
  padding-right: 10px;
}
</style>
