<script setup lang="ts">
import { computed } from "vue";
import { BaseQuestion } from "/@/views/components/questions/question.type";

const props = defineProps<{
  question: BaseQuestion;
  value: string[];
  onUpdateValue: (value: string[]) => void;
  readonly: boolean;
}>();

const replyTitle = computed(() => {
  let title = props.question.title;
  let str = "";
  let result = [];
  let inputIndex = 0;
  const reg = /^\((.+?)\)/;
  while (title.length) {
    if (reg.test(title)) {
      if (str) {
        result.push({
          type: "title",
          value: str
        });
        str = "";
      }
      const [matcher, innerTitle] = title.match(reg);
      result.push({
        type: "input",
        value: innerTitle ?? "",
        index: inputIndex++
      });
      title = title.slice(matcher.length);
    } else {
      str = str + title.slice(0, 1);
      title = title.slice(1);
    }
  }
  if (str) {
    result.push({
      type: "title",
      value: str
    });
  }

  return result;
});

const onChange = (index: number, value: string) => {
  const newValue = props.value.slice();
  newValue[index] = value;
  props.onUpdateValue(newValue);
};
</script>

<template>
  <div class="question">
    <div class="question-title">
      <template v-for="(item, index) in replyTitle" :key="index">
        <span v-if="item.type === 'title'">{{ item.value }}</span>
        <el-input
          v-else-if="item.type === 'input'"
          :model-value="value[item.index]"
          :disabled="readonly"
          @input="onChange(item.index, $event)"
        />
        <span v-if="index !== replyTitle.length - 1 && item.type === 'input'"
          >,</span
        >
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.question-title {
  display: flex;
  :deep(.el-input) {
    display: inline-block;
    width: 100px;
    border-bottom: 2px solid #000;
    .el-input__wrapper {
      box-shadow: unset;
    }
  }
}
</style>
